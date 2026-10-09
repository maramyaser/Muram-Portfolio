import { useRef } from "react";

/**
 * useTilt
 * Subtle 3D tilt + glare-position tracking on mouse move, reset on leave.
 * Pure CSS-var driven so it plays nicely with any stylesheet.
 */
export function useTilt(strength = 10) {
    const ref = useRef(null);

    const onMouseMove = (e) => {
        const node = ref.current;
        if (!node) return;

        const rect = node.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotateX = (0.5 - y) * strength;
        const rotateY = (x - 0.5) * strength;

        node.style.setProperty("--rotate-x", `${rotateX}deg`);
        node.style.setProperty("--rotate-y", `${rotateY}deg`);
        node.style.setProperty("--glare-x", `${x * 100}%`);
        node.style.setProperty("--glare-y", `${y * 100}%`);
    };

    const onMouseLeave = () => {
        const node = ref.current;
        if (!node) return;
        node.style.setProperty("--rotate-x", `0deg`);
        node.style.setProperty("--rotate-y", `0deg`);
    };

    return { ref, onMouseMove, onMouseLeave };
}

export default useTilt;