import { useEffect, useState } from "react";

/**
 * A thin gradient bar fixed to the top of the viewport that fills as
 * the user scrolls down the page. Drop <ScrollProgress /> once near
 * the top of App.jsx, outside your other sections.
 */
function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setProgress(pct);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className="scroll-progress"
            style={{ width: `${progress}%` }}
            aria-hidden="true"
        />
    );
}

export default ScrollProgress;