"use client";

import { useEffect } from "react";

/**
 * Fades elements in as they enter the viewport.
 *
 * Deliberately hides nothing until it knows the observer will run: markup renders
 * visible, and only elements still below the fold get hidden. A 4s safety timer
 * reveals everything regardless, so screenshots, PDF export and a stalled observer
 * can never leave a section blank.
 */
export function useReveal(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const show = (el: HTMLElement) => {
      el.style.removeProperty("opacity");
      el.style.removeProperty("transform");
      el.style.removeProperty("transition");
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          show(e.target as HTMLElement);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    const hidden: HTMLElement[] = [];
    Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).forEach((el, i) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
      const delay = (i % 3) * 70;
      el.style.transition = `opacity 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms`;
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      hidden.push(el);
      io.observe(el);
    });

    const timer = window.setTimeout(() => {
      hidden.forEach(show);
      io.disconnect();
    }, 4000);

    return () => {
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, [enabled]);
}
