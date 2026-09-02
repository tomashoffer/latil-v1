"use client";

import { useEffect, useRef } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { HUBS, LINKS } from "./data";

const LOOP = 14000;
const FALLBACK_COUNT = 620;
const GEO_URL = "/geo/countries-110m.json";

interface Dot {
  sx: number; sy: number;
  tx: number; ty: number;
  d: number;  s: number;
  fade: number;
}

/**
 * Hero background: particles scattered across the frame gather into the world
 * landmass, hold, then loosen. Geometry is real (Natural Earth 110m via
 * world-atlas), rasterised once per layout to an offscreen canvas and sampled,
 * so coastlines are accurate and the dot density is even in screen space.
 *
 * Never replace this with a hand-drawn shape.
 */
export default function HeroMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0, h = 0;
    let dots: Dot[] = [];
    let land: any = null;
    let proj: any = null;
    let origin = { x: 0, y: 0 };
    let raf = 0;
    let cancelled = false;

    const smooth = (e0: number, e1: number, x: number) => {
      const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
      return t * t * (3 - 2 * t);
    };
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    /** Rasterise the landmass and keep one target point per lit pixel of a coarse grid. */
    const landTargets = (gx: number, gy: number, gw: number, gh: number) => {
      if (!land) return [] as Array<{ x: number; y: number }>;
      const off = document.createElement("canvas");
      off.width = Math.max(2, Math.round(gw));
      off.height = Math.max(2, Math.round(gh));
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return [];
      proj = geoNaturalEarth1().fitSize([off.width, off.height], land);
      const path = geoPath(proj, octx);
      octx.fillStyle = "#fff";
      octx.beginPath();
      path(land);
      octx.fill();
      origin = { x: gx, y: gy };
      const data = octx.getImageData(0, 0, off.width, off.height).data;
      const step = Math.max(4, Math.round(off.width / 190));
      const out: Array<{ x: number; y: number }> = [];
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          if (data[(y * off.width + x) * 4 + 3] > 90) {
            out.push({ x: gx + x + (Math.random() - 0.5) * 1.4, y: gy + y + (Math.random() - 0.5) * 1.4 });
          }
        }
      }
      return out;
    };

    const layout = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const narrow = w < 760;
      const gx = narrow ? w * 0.02 : w * 0.3;
      const gw = narrow ? w * 0.96 : w * 0.72;
      const gh = Math.min(narrow ? h * 0.46 : h * 0.74, gw * (narrow ? 0.62 : 0.46));
      const gy = narrow ? h * 0.56 - gh / 2 : h * 0.5 - gh / 2;

      const targets = landTargets(gx, gy, gw, gh);
      if (targets.length) {
        dots = targets.map((p) => ({
          sx: Math.random() * w,
          sy: Math.random() * h,
          tx: p.x,
          ty: p.y,
          d: ((p.x - gx) / gw) * 0.34 + Math.random() * 0.22,
          s: 0.8 + Math.random() * 0.9,
          fade: 1,
        }));
        return;
      }

      // Geometry not loaded yet: a feathered ordered field, never a hard rectangle.
      const cols = 30;
      const rows = Math.max(6, Math.round(FALLBACK_COUNT / cols));
      dots = new Array(FALLBACK_COUNT).fill(0).map((_, i) => {
        const c = i % cols;
        const r2 = Math.floor(i / cols);
        const ex = Math.abs((c / (cols - 1)) * 2 - 1);
        const ey = Math.abs((r2 / Math.max(1, rows - 1)) * 2 - 1);
        const fade = (1 - smooth(0.35, 1, ex)) * (1 - smooth(0.3, 1, ey)) * (0.55 + Math.random() * 0.45);
        return {
          sx: Math.random() * w,
          sy: Math.random() * h,
          tx: gx + (c / (cols - 1)) * gw + (Math.random() - 0.5) * 3,
          ty: gy + (r2 / Math.max(1, rows - 1)) * Math.min(gh, rows * 15),
          d: (c / cols) * 0.35 + Math.random() * 0.25,
          s: 0.7 + Math.random() * 1.1,
          fade: Math.max(0.05, Math.min(1, fade)),
        };
      });
    };

    const frame = (now: number, schedule = true) => {
      const t = (now % LOOP) / LOOP;
      // 0 → .42 gather · .42 → .78 hold · .78 → 1 loosen (never fully disperses,
      // otherwise the hero reads as a failed video for a quarter of the loop)
      const phase = t < 0.42 ? t / 0.42 : t < 0.78 ? 1 : 1 - (0.72 * (t - 0.78)) / 0.22;
      const drift = now / 2600;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < dots.length; i++) {
        const p = dots[i];
        const local = Math.max(0, Math.min(1, (phase - p.d) / (1 - p.d)));
        const k = ease(local);
        const wob = (1 - k) * 6 * Math.sin(drift + p.d * 12);
        const x = p.sx + (p.tx - p.sx) * k + wob;
        const y = p.sy + (p.ty - p.sy) * k;
        const edge = 1 - k * (1 - p.fade);
        ctx.globalAlpha = (0.42 + k * 0.46) * edge;
        ctx.fillStyle = k > 0.8 ? "#A78BFA" : "#6E5FC4";
        ctx.fillRect(x, y, p.s * (1 + k * 1.6), p.s * 1.3);
      }

      // delivery corridors, only once the map has formed
      if (proj && phase > 0.5) {
        const a = Math.min(1, (phase - 0.5) / 0.3);
        for (let i = 0; i < LINKS.length; i++) {
          const p1 = proj(HUBS[LINKS[i][0]]);
          const p2 = proj(HUBS[LINKS[i][1]]);
          if (!p1 || !p2) continue;
          const x1 = origin.x + p1[0], y1 = origin.y + p1[1];
          const x2 = origin.x + p2[0], y2 = origin.y + p2[1];
          const mx = (x1 + x2) / 2;
          const my = (y1 + y2) / 2 - Math.hypot(x2 - x1, y2 - y1) * 0.22;

          ctx.globalAlpha = a * 0.32;
          ctx.strokeStyle = "#A78BFA";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.quadraticCurveTo(mx, my, x2, y2);
          ctx.stroke();

          const tt = (now / 3400 + i * 0.21) % 1;
          const inv = 1 - tt;
          const px = inv * inv * x1 + 2 * inv * tt * mx + tt * tt * x2;
          const py = inv * inv * y1 + 2 * inv * tt * my + tt * tt * y2;
          ctx.globalAlpha = a * (0.4 + 0.6 * Math.sin(Math.PI * tt));
          ctx.fillStyle = "#EDEEF2";
          ctx.fillRect(px - 1.2, py - 1.2, 2.4, 2.4);
        }
      }

      ctx.globalAlpha = 1;
      if (schedule && !cancelled) raf = requestAnimationFrame((n) => frame(n));
    };

    const render = () => {
      layout();
      if (reduce) frame(LOOP * 0.55, false);
    };

    layout();
    if (reduce) frame(LOOP * 0.55, false);
    else raf = requestAnimationFrame((n) => frame(n));

    window.addEventListener("resize", render);

    fetch(GEO_URL)
      .then((r) => r.json())
      .then((topo) => {
        if (cancelled) return;
        land = feature(topo, topo.objects.countries);
        render();
      })
      .catch(() => {
        /* keep the fallback field */
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", render);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    />
  );
}
