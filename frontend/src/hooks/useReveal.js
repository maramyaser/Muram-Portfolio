import { useEffect, useRef, useState } from "react";

/**
 * useReveal
 * Adds an "in-view" class the first time an element scrolls into the
 * viewport, using IntersectionObserver (no extra dependencies).
 *
 * Usage:
 *   const [ref, isVisible] = useReveal();
 *   <div ref={ref} className={`fade-up ${isVisible ? "in-view" : ""}`}>
 */
export function useReveal(options = {}) {
    const { threshold = 0.18, rootMargin = "0px 0px -60px 0px", once = true } = options;
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        // Respect reduced-motion users: show immediately, skip animation.
        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReduced) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) observer.unobserve(node);
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold, rootMargin, once]);

    return [ref, isVisible];
}

export default useReveal;