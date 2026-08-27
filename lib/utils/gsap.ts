import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Reveal animations are built with gsap.from(), which parks the element at
  // opacity 0 until its trigger fires. If a trigger is created before webfonts
  // and remote images have settled, its measured start/end positions are stale
  // and it can fail to fire at all — leaving whole sections invisible.
  // Refreshing once everything has loaded recomputes every trigger against the
  // final layout.
  const refresh = () => ScrollTrigger.refresh();

  window.addEventListener("load", refresh);
  if (document.fonts?.ready) document.fonts.ready.then(refresh);
  // Catch late-loading remote imagery that shifts layout after `load`.
  setTimeout(refresh, 1200);
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Scroll reveal that can never leave content invisible.
 *
 * gsap.from() applies its start state immediately, so if the ScrollTrigger
 * fails to fire — stale measurements, a trigger already scrolled past on load,
 * a torn-down context — the element stays at opacity 0 forever. fromTo() with
 * immediateRender:false leaves the element in its natural painted state until
 * the trigger actually runs, so the worst case is "no animation" rather than
 * "no content".
 *
 * @param {gsap.TweenTarget} targets Elements or selector to reveal.
 * @param {object} [options] Tween and trigger overrides.
 * @return {gsap.core.Tween | undefined} The tween, if one was created.
 */
export const revealOnScroll = (
  targets: gsap.TweenTarget,
  options: {
    y?: number;
    scale?: number;
    duration?: number;
    stagger?: number | gsap.StaggerVars;
    ease?: string;
    trigger?: gsap.DOMTarget;
    start?: string;
  } = {}
) => {
  if (prefersReducedMotion()) return undefined;

  const {
    y = 30,
    scale = 1,
    duration = 0.6,
    stagger = 0,
    ease = "power3.out",
    trigger,
    start = "top 85%",
  } = options;

  return gsap.fromTo(
    targets,
    { y, opacity: 0, scale },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration,
      stagger,
      ease,
      immediateRender: false,
      scrollTrigger: { trigger: trigger ?? (targets as gsap.DOMTarget), start },
    }
  );
};

export { gsap, ScrollTrigger };
