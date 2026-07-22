"use client";

import Link from "next/link";
import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { PiArrowDownBold, PiArrowUpRightBold } from "react-icons/pi";

class HeartCurve extends THREE.Curve<THREE.Vector3> {
  constructor() {
    super();
  }
  getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    t = t * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

    return optionalTarget.set(x * 0.002, (y + 6) * 0.002, 0);
  }
}

const sharedHeartCurve = new HeartCurve();

function ResponsiveGroup({ children }: { children: React.ReactNode }) {
  const { viewport } = useThree();
  const scale = Math.min(1.1, viewport.width / 3.5);
  return <group scale={scale}>{children}</group>;
}

function GlassCapsule({ color, power, intensity }: { color: string, power: number, intensity: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    color: { value: new THREE.Color('#ffffff') },
    power: { value: 2.5 },
    intensity: { value: 0.6 },
  }), []);

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.color.value.set(color);
      materialRef.current.uniforms.power.value = power;
      materialRef.current.uniforms.intensity.value = intensity;
    }
  });

  return (
    <mesh>
      <sphereGeometry args={[0.30, 64, 64, 0, Math.PI * 2, 0, Math.PI]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewPosition = -mvPosition.xyz;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 color;
          uniform float power;
          uniform float intensity;
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewPosition);
            float fresnel = 1.0 - max(dot(viewDir, normal), 0.0);
            fresnel = pow(fresnel, power);
            gl_FragColor = vec4(color, fresnel * intensity);
          }
        `}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

const earBaseMat = new THREE.MeshStandardMaterial({ color: '#f0f0f0', roughness: 0.5 });
const earRingMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.3 });
const earCenterMat = new THREE.MeshStandardMaterial({ color: '#cccccc', roughness: 0.8 });
const antennaBaseMat = new THREE.MeshStandardMaterial({ color: '#999999', roughness: 0.4, metalness: 0.5 });
const antennaStickMat = new THREE.MeshStandardMaterial({ color: '#d0d0d0', roughness: 0.4, metalness: 0.2 });
const antennaTipMat = new THREE.MeshStandardMaterial({ color: '#ff3366', roughness: 0.2, toneMapped: false });

function RobotEar({ position, scale = 1, isLeft = false }: { position: [number, number, number], scale?: number, isLeft?: boolean }) {
  const dir = isLeft ? -1 : 1;

  return (
    <group position={position} scale={scale}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow material={earBaseMat}>
        <cylinderGeometry args={[0.04, 0.04, 0.025, 32]} />
      </mesh>

      <mesh position={[dir * 0.012, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow material={earRingMat}>
        <torusGeometry args={[0.032, 0.008, 16, 32]} />
      </mesh>

      <mesh position={[dir * 0.012, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow material={earCenterMat}>
        <cylinderGeometry args={[0.03, 0.03, 0.005, 32]} />
      </mesh>

      <group position={[dir * 0.015, 0.035, 0]} rotation={[-0.4, 0, 0]}>
        <mesh position={[0, 0.01, 0]} castShadow receiveShadow material={antennaBaseMat}>
           <cylinderGeometry args={[0.006, 0.008, 0.02, 16]} />
        </mesh>
        <mesh position={[0, 0.06, 0]} castShadow receiveShadow material={antennaStickMat}>
          <cylinderGeometry args={[0.003, 0.003, 0.1, 8]} />
        </mesh>
        <mesh position={[0, 0.11, 0]} castShadow receiveShadow material={antennaTipMat}>
          <sphereGeometry args={[0.006, 16, 16]} />
        </mesh>
      </group>
    </group>
  );
}

const eyeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(2, 2, 2), toneMapped: false, transparent: true });
const heartMat = new THREE.MeshBasicMaterial({ color: '#ff3366', toneMapped: false });

function RobotEye({ position, rotation, scale = 1, blinkDuration = 0.15, blinkCycle = 3.0, isLovedRef }: { position: [number, number, number], rotation: [number, number, number], scale?: number, blinkDuration?: number, blinkCycle?: number, isLovedRef: React.MutableRefObject<boolean> }) {
  const groupRef = useRef<THREE.Group>(null);
  const normalEyesRef = useRef<THREE.Group>(null);
  const heartEyeRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current || !normalEyesRef.current || !heartEyeRef.current) return;

    const isHeart = isLovedRef.current;

    normalEyesRef.current.visible = !isHeart;
    heartEyeRef.current.visible = isHeart;

    const cycle = clock.getElapsedTime() % blinkCycle;

    let targetScaleY = 1;

    if (cycle < blinkDuration && !isHeart) {

      const progress = cycle / blinkDuration;
      const blinkClose = Math.sin(progress * Math.PI);

      targetScaleY = Math.max(0.05, 1.0 - blinkClose);
    }

    groupRef.current.scale.set(scale, scale * targetScaleY, scale);
  });

  const { topPath, bottomPath } = useMemo(() => {
    const w = 0.025;
    const h = 0.035;
    const r = 0.02;
    const g = 0.005;

    const tPath = new THREE.CurvePath<THREE.Vector3>();
    tPath.add(new THREE.LineCurve3(new THREE.Vector3(-w, g, 0), new THREE.Vector3(-w, h - r, 0)));
    tPath.add(new THREE.QuadraticBezierCurve3(
       new THREE.Vector3(-w, h - r, 0),
       new THREE.Vector3(-w, h, 0),
       new THREE.Vector3(-w + r, h, 0)
    ));
    tPath.add(new THREE.LineCurve3(new THREE.Vector3(-w + r, h, 0), new THREE.Vector3(w - r, h, 0)));
    tPath.add(new THREE.QuadraticBezierCurve3(
       new THREE.Vector3(w - r, h, 0),
       new THREE.Vector3(w, h, 0),
       new THREE.Vector3(w, h - r, 0)
    ));
    tPath.add(new THREE.LineCurve3(new THREE.Vector3(w, h - r, 0), new THREE.Vector3(w, g, 0)));

    const bPath = new THREE.CurvePath<THREE.Vector3>();
    bPath.add(new THREE.LineCurve3(new THREE.Vector3(-w, -g, 0), new THREE.Vector3(-w, -(h - r), 0)));
    bPath.add(new THREE.QuadraticBezierCurve3(
       new THREE.Vector3(-w, -(h - r), 0),
       new THREE.Vector3(-w, -h, 0),
       new THREE.Vector3(-w + r, -h, 0)
    ));
    bPath.add(new THREE.LineCurve3(new THREE.Vector3(-w + r, -h, 0), new THREE.Vector3(w - r, -h, 0)));
    bPath.add(new THREE.QuadraticBezierCurve3(
       new THREE.Vector3(w - r, -h, 0),
       new THREE.Vector3(w, -h, 0),
       new THREE.Vector3(w, -(h - r), 0)
    ));
    bPath.add(new THREE.LineCurve3(new THREE.Vector3(w, -(h - r), 0), new THREE.Vector3(w, -g, 0)));

    return { topPath: tPath, bottomPath: bPath };
  }, []);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <mesh ref={heartEyeRef} visible={false} material={heartMat}>
        <tubeGeometry args={[sharedHeartCurve, 64, 0.0035, 8, true]} />
      </mesh>

      <group ref={normalEyesRef}>
        <mesh material={eyeMat}>
          <tubeGeometry args={[topPath, 20, 0.0035, 8, false]} />
        </mesh>
        <mesh material={eyeMat}>
          <tubeGeometry args={[bottomPath, 20, 0.0035, 8, false]} />
        </mesh>
      </group>
    </group>
  );
}

function generatePbrTexturesAsync(): Promise<{ colorMap: THREE.CanvasTexture, bumpMap: THREE.CanvasTexture }> {
  return new Promise((resolve) => {

    setTimeout(() => {

      const size = 512;
      const canvasC = document.createElement('canvas');
      const canvasB = document.createElement('canvas');
      canvasC.width = canvasB.width = size;
      canvasC.height = canvasB.height = size;
      const ctxC = canvasC.getContext('2d');
      const ctxB = canvasB.getContext('2d');

      if (ctxC && ctxB) {
        ctxC.fillStyle = '#dcdcdc';
        ctxC.fillRect(0, 0, size, size);
        ctxB.fillStyle = '#808080';
        ctxB.fillRect(0, 0, size, size);

        for (let i = 0; i < 10000; i++) {
          const x = Math.random() * size;
          const y = Math.random() * size;
          const r = 0.5 + Math.random() * 1.5;
          const isDark = Math.random() > 0.15;

          ctxC.beginPath();
          ctxC.arc(x, y, r, 0, Math.PI * 2);
          ctxC.fillStyle = isDark ? '#222222' : '#dddddd';
          ctxC.fill();

          ctxB.beginPath();
          ctxB.arc(x, y, r, 0, Math.PI * 2);
          ctxB.fillStyle = isDark ? '#000000' : '#ffffff';
          ctxB.fill();
        }
      }

      const texC = new THREE.CanvasTexture(canvasC);
      const texB = new THREE.CanvasTexture(canvasB);
      texC.wrapS = texB.wrapS = THREE.RepeatWrapping;
      texC.wrapT = texB.wrapT = THREE.RepeatWrapping;

      texC.repeat.set(6, 3);
      texB.repeat.set(6, 3);
      texC.needsUpdate = true;
      texB.needsUpdate = true;

      resolve({ colorMap: texC, bumpMap: texB });
    }, 0);
  });
}

function RobotPrototype({ neckParams = { baseR: 0.25, baseH: -0.01, midR: 0.23, midH: 0.02, lipBottomR: 0.27, lipBottomH: 0.025, lipTopR: 0.28, lipTopH: 0.05, innerR: 0.24, innerDropH: 0.03 }, bodyParams = { bodyBevelR: 0.21, bodyBevelY: 0.38, bodyBevelT: 0.015 }, reducedMotion = false }: { neckParams?: Record<string, number>, bodyParams?: Record<string, number>, reducedMotion?: boolean }) {
  const isLovedRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  const [textures, setTextures] = useState<{ colorMap: THREE.CanvasTexture | null, bumpMap: THREE.CanvasTexture | null }>({ colorMap: null, bumpMap: null });

  const design = {
    pantallaColor: '#00ffc6',
    pantallaGrosor: 3.8,
    pantallaBrillo: 1.2,
    separacionOjos: 0.07,
    tamañoOrejas: 1.3,
    escalaOjos: 1.1,
    parpadeoFrecuencia: 3.0,
    parpadeoDuracion: 0.45,
    colorChasis: '#c4c4c4',
    alturaCabeza: 0.60
  };

  const config = {
    moveSpeed: 0.35,
    bodyRotSpeed: 10.0,
    headRotSpeed: 20.0,
    bodyTiltX: 0.0,
    bodyTiltY: 0.95,
    headLookX: 0.30,
    headLookY: 1.80
  };

  useFrame((state, delta) => {
    if (!bodyRef.current || !headRef.current) return;

    if (reducedMotion) {
      bodyRef.current.position.x = 0;
      bodyRef.current.rotation.set(0, 0, 0);
      headRef.current.rotation.set(0, 0, 0);
      return;
    }

    const dt = Math.min(delta, 0.1);

    const tx = state.pointer.x;
    const ty = state.pointer.y;

    const maxMoveX = state.viewport.width / 3.5;
    const targetPosX = tx * maxMoveX;
    bodyRef.current.position.x = THREE.MathUtils.lerp(bodyRef.current.position.x, targetPosX, config.moveSpeed * dt);

    const relativeX = tx - (bodyRef.current.position.x / 2.5);

    const bodyTargetRotY = -relativeX * config.bodyTiltY;

    const bodyTargetRotX = (relativeX * relativeX * config.bodyTiltX) - (ty * 0.25);

    const bodyTargetRotZ = -relativeX * 0.15;

    bodyRef.current.rotation.y = THREE.MathUtils.lerp(bodyRef.current.rotation.y, bodyTargetRotY, config.bodyRotSpeed * dt);
    bodyRef.current.rotation.x = THREE.MathUtils.lerp(bodyRef.current.rotation.x, bodyTargetRotX, config.bodyRotSpeed * dt);
    bodyRef.current.rotation.z = THREE.MathUtils.lerp(bodyRef.current.rotation.z, bodyTargetRotZ, config.bodyRotSpeed * dt);

    const headTargetRotY = relativeX * config.headLookY;
    const headTargetRotX = -ty * config.headLookX;

    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, headTargetRotY, config.headRotSpeed * dt);
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, headTargetRotX, config.headRotSpeed * dt);
  });

  useEffect(() => {
    let mounted = true;
    let generatedMaps: { colorMap: THREE.CanvasTexture, bumpMap: THREE.CanvasTexture } | null = null;

    generatePbrTexturesAsync().then((res) => {
      if (mounted) {
        generatedMaps = res;
        setTextures(res);
      } else {
        res.colorMap.dispose();
        res.bumpMap.dispose();
      }
    });

    return () => {
      mounted = false;

      if (generatedMaps) {
        generatedMaps.colorMap.dispose();
        generatedMaps.bumpMap.dispose();
      }
    };
  }, []);

  const handlePointerDown = (e: import('@react-three/fiber').ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    isLovedRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isLovedRef.current = false;
    }, 2000);
  };

  const neckProfile = useMemo(() => {
    const points = [];

    points.push(new THREE.Vector2(neckParams.innerR, neckParams.baseH));

    points.push(new THREE.Vector2(neckParams.baseR, neckParams.baseH));

    points.push(new THREE.Vector2(neckParams.midR, neckParams.midH));

    points.push(new THREE.Vector2(neckParams.lipBottomR, neckParams.lipBottomH));

    points.push(new THREE.Vector2(neckParams.lipTopR, neckParams.lipTopH));

    points.push(new THREE.Vector2(neckParams.innerR, neckParams.lipTopH));

    points.push(new THREE.Vector2(neckParams.innerR, neckParams.lipTopH - neckParams.innerDropH));
    return points;
  }, [neckParams]);

  const headMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#111111',
      roughness: 1.0,
      metalness: 0.0,
    });
  }, []);

  if (!textures.colorMap) return null;

  return (
    <group
      ref={bodyRef}
      position={[0, -0.3, 0]}
      onPointerDown={handlePointerDown}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
    >
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.43, 64, 64, 0, Math.PI * 2, Math.PI * 0.15, Math.PI * 0.85]} />
        <meshStandardMaterial
          color={design.colorChasis}
          map={textures.colorMap || undefined}
          bumpMap={textures.bumpMap || undefined}
          bumpScale={0.005}
          roughness={1.0}
          metalness={0.0}
          envMapIntensity={0.0}
        />
      </mesh>

      {bodyParams.bodyBevelT > 0 && (
        <mesh position={[0, bodyParams.bodyBevelY, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <torusGeometry args={[bodyParams.bodyBevelR, bodyParams.bodyBevelT, 32, 64]} />
          <meshStandardMaterial
            color={design.colorChasis}
            map={textures.colorMap || undefined}
            bumpMap={textures.bumpMap || undefined}
            bumpScale={0.005}
            roughness={1.0}
            metalness={0.0}
            envMapIntensity={0.0}
          />
        </mesh>
      )}

      <mesh position={[0, 0.38, 0]} receiveShadow castShadow>
        <latheGeometry args={[neckProfile, 64]} />
        <meshStandardMaterial
          color={design.colorChasis}
          map={textures.colorMap || undefined}
          bumpMap={textures.bumpMap || undefined}
          bumpScale={0.005}
          roughness={1.0}
          metalness={0.0}
          envMapIntensity={0.0}
        />
      </mesh>

      <group ref={headRef} position={[0, design.alturaCabeza, 0]}>

        <mesh material={headMat} castShadow receiveShadow>
          <sphereGeometry args={[0.28, 64, 64, 0, Math.PI * 2, 0, Math.PI]} />
        </mesh>

        <GlassCapsule color={design.pantallaColor} power={design.pantallaGrosor} intensity={design.pantallaBrillo} />

        <group position={[0, -0.02, 0.29]}>
          <RobotEye position={[-design.separacionOjos, 0, 0]} rotation={[0, -0.2, 0]} scale={design.escalaOjos} blinkDuration={design.parpadeoDuracion} blinkCycle={design.parpadeoFrecuencia} isLovedRef={isLovedRef} />
          <RobotEye position={[design.separacionOjos, 0, 0]} rotation={[0, 0.2, 0]} scale={design.escalaOjos} blinkDuration={design.parpadeoDuracion} blinkCycle={design.parpadeoFrecuencia} isLovedRef={isLovedRef} />
        </group>

        <RobotEar position={[-0.29, 0, 0]} isLeft={true} scale={design.tamañoOrejas} />
        <RobotEar position={[0.29, 0, 0]} isLeft={false} scale={design.tamañoOrejas} />

      </group>
    </group>
  );
}

export interface NavItem {
  label: string;
  href: string;
  target?: string;
}

export interface RobotHeroProps {
  backgroundText?: string;
  navItemsLeft?: NavItem[];
  contactText?: string;
  contactHref?: string;
  contactTarget?: string;
  ctaText?: string;
  ctaHref?: string;
  ctaTarget?: string;
  heroEyebrow?: string;
  heroTitle?: React.ReactNode;
  heroDescription?: string;
  availabilityText?: string;
  scrollHref?: string;
}

function AntennaNavbar({
  leftItems,
  contactText,
  contactHref,
  contactTarget,
  ctaText,
  ctaHref,
  ctaTarget
}: {
  leftItems: NavItem[],
  contactText: string,
  contactHref: string,
  contactTarget?: string,
  ctaText: string,
  ctaHref?: string,
  ctaTarget?: string
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollY } = useScroll();
  const lineOpacity = useTransform(scrollY, [0, 50], [1, 0]);

  return (
    <nav className="sticky top-0 z-50 w-full px-4 pt-4 sm:px-8 sm:pt-7 pointer-events-none">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col relative pointer-events-auto">

        <div className="flex items-center justify-between relative gap-3">

          <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-1 pr-2 sm:gap-3 sm:pb-0 z-20 no-scrollbar">
            {leftItems.map((item, idx) => (
              <Link
                key={item.label}
                href={item.href}
                target={item.target}
                rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative shrink-0 overflow-hidden rounded-full bg-white px-3.5 py-2 text-[11px] font-bold text-black shadow-[0_4px_14px_rgba(255,255,255,0.15)] transition-all hover:bg-zinc-200 sm:px-5 sm:py-2.5 sm:text-sm"
              >
                {item.label}
                {hoveredIndex === idx && (
                  <motion.div
                    layoutId="navbar-indicator-left"
                    className="absolute inset-0 border-b-[3px] border-black"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <a href="#top" aria-label="Back to top" className="hidden xl:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center pointer-events-auto cursor-pointer group z-10">
            <div className="relative flex items-center justify-center h-12 w-16">
              <div className="absolute left-2 w-1.5 h-4 bg-zinc-300 rounded-l-md transition-transform duration-300 group-hover:-translate-x-1" />
              <div className="absolute right-2 w-1.5 h-4 bg-zinc-300 rounded-r-md transition-transform duration-300 group-hover:translate-x-1" />

              <div className="z-10 w-10 h-10 bg-white/10 border-2 border-white/20 backdrop-blur-md rounded-[12px] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:bg-white/20 group-hover:shadow-[0_4px_25px_rgba(255,255,255,0.15)]">
                <div className="w-[70%] h-[60%] bg-[#0a0a0a] rounded-lg flex items-center justify-center gap-1.5 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
                  <div className="w-1.5 h-3 bg-[#00ffc6] rounded-[2px] shadow-[0_0_8px_#00ffc6] transition-transform duration-200 group-hover:scale-y-[0.2]" />
                  <div className="w-1.5 h-3 bg-[#00ffc6] rounded-[2px] shadow-[0_0_8px_#00ffc6] transition-transform duration-200 group-hover:scale-y-[0.2]" />
                </div>
              </div>
            </div>
          </a>

          <div className="hidden sm:flex shrink-0 items-center gap-2 sm:gap-3 z-20">
            <a
              href={contactHref}
              target={contactTarget}
              rel={contactTarget === "_blank" ? "noopener noreferrer" : undefined}
              className="rounded-full bg-white px-4 py-2 text-xs font-bold text-black shadow-[0_4px_14px_rgba(255,255,255,0.15)] transition-all hover:bg-zinc-200 lg:px-5 lg:py-2.5 lg:text-sm"
            >
              {contactText}
            </a>
            <Link
              href={ctaHref || "#projects"}
              target={ctaTarget}
              rel={ctaTarget === "_blank" ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2 rounded-full bg-[#00ffc6] px-4 py-2 text-xs font-black text-black shadow-[0_0_20px_rgba(0,255,198,0.4)] transition-colors hover:bg-[#00e5b2] lg:px-5 lg:py-2.5 lg:text-sm"
            >
              {ctaText}
              <PiArrowUpRightBold size={16} />
            </Link>
          </div>
          <a
            href={contactHref}
            target={contactTarget}
            rel={contactTarget === "_blank" ? "noopener noreferrer" : undefined}
            className="flex shrink-0 items-center rounded-full bg-[#00ffc6] px-3 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-black shadow-[0_0_18px_rgba(0,255,198,0.35)] sm:hidden"
          >
            {contactText}
          </a>

        </div>

        <motion.div
          style={{ opacity: lineOpacity }}
          className="mt-3 w-full border-b-2 border-dotted border-white/30 sm:mt-5"
        />

      </div>
    </nav>
  );
}

export function RobotHero({
  backgroundText = 'BRYANDEV',
  navItemsLeft = [
    { label: 'Projects', href: '#' },
    { label: 'Experience', href: '#' },
    { label: 'Skills', href: '#' },
    { label: 'About', href: '#' },
  ],
  contactText = 'Contact',
  contactHref = '#',
  contactTarget,
  ctaText = 'View work',
  ctaHref = '#projects',
  ctaTarget,
  heroEyebrow = 'CREATIVE DEVELOPER / DIGITAL DESIGNER',
  heroTitle = <>I bring ideas to life with <span className="text-[#00ffc6]">code.</span></>,
  heroDescription = 'I engineer software and AI-driven systems, always chasing the how and why behind every problem.',
  availabilityText = 'Open to thoughtful collaborations',
  scrollHref = '#projects'
}: RobotHeroProps = {}) {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const entorno = {
    fondoArriba: '#cecbcb',
    fondoMedio: '#9a9a9a',
    fondoAbajo: '#bebebe',
    luzAmbiente: 0.75,
    luzPrincipal: 0.0,
    luzPrincipalColor: '#00ffe2',
    luzRelleno: 0.0,
    luzRellenoColor: '#dbdbdb',
    sombraOpacidad: 0.85,
    sombraBlur: 1.7
  };

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden"
      style={{ background: `linear-gradient(to bottom, ${entorno.fondoArriba} 0%, ${entorno.fondoArriba} 55%, ${entorno.fondoMedio} 65%, ${entorno.fondoAbajo} 100%)` }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <p
          aria-hidden="true"
          className="font-sans font-black select-none whitespace-nowrap"
          style={{
            color: '#000000',
            opacity: 0.13,
            letterSpacing: '-0.05em',
            fontSize: 'clamp(4rem, 15vw, 14rem)',
            lineHeight: 1,
            transform: `translate(0px, 40px) rotate(0deg)`
          }}
        >
          {backgroundText}
        </p>
      </div>

      <div className="absolute inset-0 z-10">
        <Canvas
          shadows
          camera={{ position: [0, 0.2, 6], fov: 40 }}
          frameloop={shouldReduceMotion ? "demand" : "always"}
          fallback={
            <div aria-hidden="true" className="grid h-full w-full place-items-center">
              <div className="relative h-36 w-40 rounded-[2.25rem] bg-[#111] shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <div className="absolute inset-2 rounded-[1.7rem] border border-[#00ffc6]/50" />
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-4">
                  <span className="h-4 w-4 rounded-full bg-[#00ffc6] shadow-[0_0_14px_#00ffc6]" />
                  <span className="h-4 w-4 rounded-full bg-[#00ffc6] shadow-[0_0_14px_#00ffc6]" />
                </div>
                <div className="absolute -bottom-5 left-1/2 h-10 w-20 -translate-x-1/2 rounded-t-[1.5rem] bg-[#c4c4c4]" />
              </div>
            </div>
          }
        >
          <ambientLight intensity={entorno.luzAmbiente} color="#ffffff" />

          <directionalLight
            position={[0, 6, 3]}
            intensity={entorno.luzPrincipal}
            color={entorno.luzPrincipalColor}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0005}
          >
            <orthographicCamera attach="shadow-camera" args={[-1.5, 1.5, 1.5, -1.5, 0.1, 20]} />
          </directionalLight>

          <directionalLight position={[-5, 2, -5]} intensity={entorno.luzRelleno} color={entorno.luzRellenoColor} />

          <Environment preset="studio" blur={0.5} />

          <ResponsiveGroup>
            <ContactShadows position={[0, -0.79, 0]} opacity={entorno.sombraOpacidad} scale={15} resolution={1024} blur={entorno.sombraBlur} far={2.5} color="#000000" />
            <RobotPrototype
              neckParams={{ baseR: 0.215, baseH: -0.050, midR: 0.280, midH: 0.020, lipBottomR: 0.295, lipBottomH: 0.045, lipTopR: 0.270, lipTopH: 0.055, innerR: 0.100, innerDropH: 0.000 }}
              bodyParams={{ bodyBevelR: 0.235, bodyBevelY: 0.340, bodyBevelT: 0.025 }}
              reducedMotion={Boolean(shouldReduceMotion)}
            />
          </ResponsiveGroup>
        </Canvas>
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col">
        <AntennaNavbar
          leftItems={navItemsLeft}
          contactText={contactText}
          contactHref={contactHref}
          contactTarget={contactTarget}
          ctaText={ctaText}
          ctaHref={ctaHref}
          ctaTarget={ctaTarget}
        />

        <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-5 sm:px-8">

          <div className="mt-auto grid w-full grid-cols-1 items-end gap-5 pb-7 sm:pb-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12 lg:pb-12">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto max-w-[37rem]"
            >
              <div className="mb-3 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-black/70 sm:text-xs">
                <span className="h-2 w-2 rounded-full bg-[#00ffc6] shadow-[0_0_12px_#00ffc6]" />
                {heroEyebrow}
              </div>
              <h1 className="max-w-[13ch] text-[clamp(2.25rem,5.2vw,5.2rem)] font-black leading-[0.89] tracking-[-0.065em] text-black">
                {heroTitle}
              </h1>
              <p className="mt-4 max-w-md text-sm font-medium leading-relaxed text-black/70 sm:text-base">
                {heroDescription}
              </p>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.65, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto flex items-center justify-between gap-4 lg:flex-col lg:items-end"
            >
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-black/65 sm:text-xs lg:max-w-[12rem] lg:text-right">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#ff3366] shadow-[0_0_10px_rgba(255,51,102,0.7)]" />
                {availabilityText}
              </div>
              <a
                href={scrollHref}
                className="group flex items-center gap-2 rounded-full border border-black/15 bg-white/30 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-black backdrop-blur-sm transition-colors hover:bg-white/60 sm:px-4 sm:text-xs"
              >
                Explore
                <PiArrowDownBold className="transition-transform duration-300 group-hover:translate-y-0.5" size={14} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
}
