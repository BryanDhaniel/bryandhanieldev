"use client";

import { useCallback, useEffect, useRef } from "react";

type InkRevealProps = {
  /** RGB color of the temporary mask that sits over the image. */
  maskColor?: [number, number, number];
  /** Maximum radius of each revealed ink stamp, in pixels. */
  brushSize?: number;
  /** How long an individual stamp remains visible, in milliseconds. */
  lifetime?: number;
  /** Minimum starting radius of a stamp. */
  rStart?: number;
  /** Random variation applied to each stamp radius, from 0–1. */
  rVary?: number;
  /** Minimum pixel distance between stamps in one pointer stroke. */
  stampStep?: number;
  /** Maximum number of active stamps. */
  maxStamps?: number;
  /** Number of segments used to shape each organic stamp. */
  segments?: number;
  /** Organic wobble weights for the stamp outline. */
  wobble?: [number, number, number];
  /** Gradient inner-radius factor, relative to the stamp radius. */
  gradientInnerRadius?: number;
  /** Opacity stops for the ink-reveal gradient. */
  gradientStops?: [number, number, number];
  className?: string;
  style?: React.CSSProperties;
};

type Stamp = {
  x: number;
  y: number;
  born: number;
  seed: number;
  rmax: number;
};

export default function InkReveal({
  maskColor = [16, 16, 16],
  brushSize = 128,
  lifetime = 760,
  rStart = 10,
  rVary = 0.45,
  stampStep = 10,
  maxStamps = 200,
  segments = 36,
  wobble = [0.14, 0.08, 0.05],
  gradientInnerRadius = 0.2,
  gradientStops = [0.95, 0.88, 0],
  className,
  style,
}: InkRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stampsRef = useRef<Stamp[]>([]);
  const runningRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const loopRef = useRef<(() => void) | null>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;

    if (!canvas || !parent) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = parent.getBoundingClientRect();
    dimensionsRef.current = { width, height };
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.globalCompositeOperation = "source-over";
    context.fillStyle = `rgb(${maskColor.join(",")})`;
    context.fillRect(0, 0, width, height);
  }, [maskColor]);

  const carveInk = useCallback(
    (context: CanvasRenderingContext2D, x: number, y: number, radius: number, seed: number, alpha: number) => {
      const gradient = context.createRadialGradient(x, y, radius * gradientInnerRadius, x, y, radius);
      gradient.addColorStop(0, `rgba(0,0,0,${gradientStops[0] * alpha})`);
      gradient.addColorStop(0.5, `rgba(0,0,0,${gradientStops[1] * alpha})`);
      gradient.addColorStop(1, `rgba(0,0,0,${gradientStops[2] * alpha})`);
      context.fillStyle = gradient;

      context.beginPath();
      for (let index = 0; index <= segments; index += 1) {
        const angle = (index / segments) * Math.PI * 2;
        const organicOffset =
          0.78 +
          wobble[0] * Math.sin(angle * 3 + seed) +
          wobble[1] * Math.sin(angle * 5 + seed * 2.1) +
          wobble[2] * Math.sin(angle * 7 + seed * 0.7);
        const pointX = x + Math.cos(angle) * radius * organicOffset;
        const pointY = y + Math.sin(angle) * radius * organicOffset;

        if (index === 0) context.moveTo(pointX, pointY);
        else context.lineTo(pointX, pointY);
      }
      context.closePath();
      context.fill();
    },
    [gradientInnerRadius, gradientStops, segments, wobble],
  );

  const addStamp = useCallback(
    (x: number, y: number) => {
      const stamps = stampsRef.current;

      if (stamps.length >= maxStamps) stamps.shift();
      stamps.push({
        x,
        y,
        born: performance.now(),
        seed: Math.random() * Math.PI * 2,
        rmax: brushSize * (1 - rVary + Math.random() * rVary),
      });
    },
    [brushSize, maxStamps, rVary],
  );

  const stampAlong = useCallback(
    (x: number, y: number) => {
      const lastPosition = lastPosRef.current;

      if (!lastPosition) {
        addStamp(x, y);
      } else {
        const distance = Math.hypot(x - lastPosition.x, y - lastPosition.y);
        const steps = Math.max(1, Math.ceil(distance / stampStep));

        for (let index = 1; index <= steps; index += 1) {
          addStamp(lastPosition.x + ((x - lastPosition.x) * index) / steps, lastPosition.y + ((y - lastPosition.y) * index) / steps);
        }
      }

      lastPosRef.current = { x, y };
    },
    [addStamp, stampStep],
  );

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const { width, height } = dimensionsRef.current;
    const now = performance.now();
    const stamps = stampsRef.current;

    context.globalCompositeOperation = "source-over";
    context.fillStyle = `rgb(${maskColor.join(",")})`;
    context.fillRect(0, 0, width, height);
    context.globalCompositeOperation = "destination-out";

    for (let index = stamps.length - 1; index >= 0; index -= 1) {
      const stamp = stamps[index];
      const elapsed = (now - stamp.born) / lifetime;

      if (elapsed >= 1) {
        stamps.splice(index, 1);
        continue;
      }

      const eased = 1 - (1 - elapsed) ** 3;
      const radius = rStart + (stamp.rmax - rStart) * eased;
      carveInk(context, stamp.x, stamp.y, radius, stamp.seed, 1 - elapsed * elapsed);
    }

    if (stamps.length > 0) {
      animationFrameRef.current = requestAnimationFrame(() => loopRef.current?.());
    } else {
      runningRef.current = false;
      animationFrameRef.current = null;
    }
  }, [carveInk, lifetime, maskColor, rStart]);

  useEffect(() => {
    loopRef.current = loop;

    return () => {
      loopRef.current = null;
    };
  }, [loop]);

  const startLoop = useCallback(() => {
    if (!runningRef.current) {
      runningRef.current = true;
      animationFrameRef.current = requestAnimationFrame(() => loopRef.current?.());
    }
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [resize]);

  const getRelativePosition = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getRelativePosition(event);
    stampAlong(x, y);
    startLoop();
  };

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        cursor: "none",
        ...style,
      }}
      onMouseEnter={handleMouseMove}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        lastPosRef.current = null;
      }}
    />
  );
}
