"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Cloud, fetchSimpleIcons, renderSimpleIcon } from "react-icon-cloud";
import type { ICloud, SimpleIcon } from "react-icon-cloud";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", onStoreChange);

  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getServerReducedMotionSnapshot() {
  return true;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeToReducedMotion, getReducedMotionSnapshot, getServerReducedMotionSnapshot);
}

export const cloudProps: Omit<ICloud, "children"> = {
  id: "bryan-skills-cloud",
  containerProps: {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      minHeight: 300,
      padding: "1rem",
    },
  },
  canvasProps: {
    "aria-hidden": true,
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "grab",
    dragControl: true,
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.035,
    minSpeed: 0.015,
  },
};

export function renderCustomIcon(icon: SimpleIcon, theme: string) {
  const isDark = theme === "dark";

  return renderSimpleIcon({
    icon,
    bgHex: isDark ? "#101010" : "#f4f1eb",
    fallbackHex: isDark ? "#f4f1eb" : "#101010",
    minContrastRatio: isDark ? 2 : 1.2,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (event) => event.preventDefault(),
    },
  });
}

export type IconCloudProps = {
  iconSlugs: string[];
  skillLabels: string[];
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

function StaticToolList({ labels, message }: { labels: string[]; message: string }) {
  return (
    <div aria-hidden="true" className="flex h-full min-h-[20rem] flex-col items-center justify-center px-6 text-center">
      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#00ffc6]/75">{message}</p>
      <div className="mt-5 flex max-w-sm flex-wrap justify-center gap-2">
        {labels.slice(0, 12).map((label) => (
          <span key={label} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white/55">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function IconCloud({ iconSlugs, skillLabels }: IconCloudProps) {
  const cloudContainerRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [data, setData] = useState<IconData | null>(null);
  const [hasFailed, setHasFailed] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { resolvedTheme, theme } = useTheme();
  const activeTheme = resolvedTheme ?? theme ?? "dark";

  useEffect(() => {
    const target = cloudContainerRef.current;
    if (!target) return;

    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setIsNearViewport(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "180px" },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isNearViewport || prefersReducedMotion) return;

    let isCurrent = true;

    fetchSimpleIcons({ slugs: iconSlugs })
      .then((icons) => {
        if (!isCurrent) return;

        if (Object.keys(icons.simpleIcons).length > 0) {
          setData(icons);
        } else {
          setHasFailed(true);
        }
      })
      .catch(() => {
        if (isCurrent) setHasFailed(true);
      });

    return () => {
      isCurrent = false;
    };
  }, [iconSlugs, isNearViewport, prefersReducedMotion]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;

    return Object.values(data.simpleIcons).map((icon) => renderCustomIcon(icon, activeTheme));
  }, [activeTheme, data]);

  useEffect(() => {
    if (!renderedIcons || typeof MutationObserver === "undefined") return;

    const cloudContainer = cloudContainerRef.current?.querySelector("#canvas-container-bryan-skills-cloud");
    if (!(cloudContainer instanceof HTMLElement)) return;

    const observer = new MutationObserver(() => {
      if (cloudContainer.style.display === "none") setHasFailed(true);
    });

    observer.observe(cloudContainer, { attributes: true, attributeFilter: ["style"] });

    return () => observer.disconnect();
  }, [renderedIcons]);

  const accessibleTools = skillLabels.join(", ");

  return (
    <div ref={cloudContainerRef} className="h-full">
      <p className="sr-only">Technology skills: {accessibleTools}.</p>
      {prefersReducedMotion ? (
        <StaticToolList labels={skillLabels} message="Toolkit at a glance" />
      ) : hasFailed ? (
        <StaticToolList labels={skillLabels} message="Technology toolkit" />
      ) : renderedIcons ? (
        <Cloud {...cloudProps}>{renderedIcons}</Cloud>
      ) : (
        <StaticToolList labels={skillLabels} message={isNearViewport ? "Preparing the toolkit" : "Explore the toolkit"} />
      )}
    </div>
  );
}
