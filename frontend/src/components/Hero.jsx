import { useEffect, useRef, useState } from "react";
import profileImage from "../assets/profile.png";
import { useReveal } from "../hooks/useReveal";

const ROLES = ["Software Engineer", "AI & ML Enthusiast", "Full Stack Developer"];

function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [typedText, setTypedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const wrapperRef = useRef(null);
    const profileRef = useRef(null);

    // Counts 0 -> data-target once the stats block scrolls into view.
    const [statsRef, statsVisible] = useReveal({ threshold: 0.6 });
    const [displayedYears, setDisplayedYears] = useState(0);
    const [displayedProjects, setDisplayedProjects] = useState(0);
    const yearsTarget = 2;
    const projectsTarget = 5;

    // ---- Typewriter effect cycling through ROLES ----
    useEffect(() => {
        const current = ROLES[roleIndex];
        const speed = isDeleting ? 40 : 80;
        const pauseAtFull = 1600;
        const pauseAtEmpty = 300;

        if (!isDeleting && typedText === current) {
            const t = setTimeout(() => setIsDeleting(true), pauseAtFull);
            return () => clearTimeout(t);
        }

        if (isDeleting && typedText === "") {
            const t = setTimeout(() => {
                setIsDeleting(false);
                setRoleIndex((i) => (i + 1) % ROLES.length);
            }, pauseAtEmpty);
            return () => clearTimeout(t);
        }

        const t = setTimeout(() => {
            setTypedText((prev) =>
                isDeleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
            );
        }, speed);

        return () => clearTimeout(t);
    }, [typedText, isDeleting, roleIndex]);

    // ---- Count 0 up to yearsTarget once the stats are visible ----
    useEffect(() => {
        if (!statsVisible) return;

        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefersReduced) {
            setDisplayedYears(yearsTarget);
            return;
        }

        const durationMs = 900;
        const start = performance.now();

        let frame;
        const tick = (now) => {
            const progress = Math.min((now - start) / durationMs, 1);
            setDisplayedYears(Math.round(progress * yearsTarget));
            if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(frame);
    }, [statsVisible]);

    useEffect(() => {
        if (!statsVisible) return;

        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefersReduced) {
            setDisplayedProjects(projectsTarget);
            return;
        }

        const durationMs = 900;
        const start = performance.now();

        let frame;
        const tick = (now) => {
            const progress = Math.min((now - start) / durationMs, 1);
            setDisplayedProjects(Math.round(progress * projectsTarget));
            if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(frame);
    }, [statsVisible]);
    

    // ---- Subtle parallax on the profile image, following the pointer ----
    useEffect(() => {
        const wrapper = wrapperRef.current;
        const profile = profileRef.current;
        if (!wrapper || !profile) return;

        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefersReduced) return;

        const handleMove = (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            profile.style.transform = `translate(-50%, 0) translate(${x * 14}px, ${y * 10}px)`;
        };

        const reset = () => {
            profile.style.transform = `translate(-50%, 0)`;
        };

        wrapper.addEventListener("mousemove", handleMove);
        wrapper.addEventListener("mouseleave", reset);
        return () => {
            wrapper.removeEventListener("mousemove", handleMove);
            wrapper.removeEventListener("mouseleave", reset);
        };
    }, []);

    // ---- Magnetic pull toward the cursor for the two hero buttons ----
    useEffect(() => {
        const buttons = document.querySelectorAll(".magnetic-button");
        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefersReduced) return;

        const handlers = [];

        buttons.forEach((btn) => {
            const move = (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.25}px, ${y * 0.4}px)`;
            };
            const leave = () => {
                btn.style.transform = "translate(0, 0)";
            };
            btn.addEventListener("mousemove", move);
            btn.addEventListener("mouseleave", leave);
            handlers.push({ btn, move, leave });
        });

        return () => {
            handlers.forEach(({ btn, move, leave }) => {
                btn.removeEventListener("mousemove", move);
                btn.removeEventListener("mouseleave", leave);
            });
        };
    }, []);

    return (
        <section id="home" className="hero">
            <div className="hero-glow hero-glow-a" aria-hidden="true"></div>
            <div className="hero-glow hero-glow-b" aria-hidden="true"></div>

            <span className="star star1">✦</span>
            <span className="star star2">✦</span>
            <span className="star star3">✦</span>
            <span className="star star4">✦</span>
            <span className="star star5">✦</span>

            <div className="hero-content">

                <h1 className="hero-fade-in hero-fade-in-delay-1">
                    I'm <span>Muram</span>,
                </h1>

                <h2 className="hero-fade-in hero-fade-in-delay-2">
                    <span className="typewriter">
                        {typedText}
                        <span className="typewriter-cursor" aria-hidden="true">|</span>
                    </span>
                </h2>

                <div
                    className="hero-image-wrapper hero-fade-in hero-fade-in-delay-3"
                    ref={wrapperRef}
                >
                    <p className="hero-description">
                        I build modern web applications, AI-powered
                        solutions, and technology that solves
                        real-world problems.
                    </p>

                    <div className="image-circle"></div>

                    <img
                        src={profileImage}
                        alt="Muram"
                        className="hero-profile"
                        ref={profileRef}
                    />

                    <div className="hero-stats" ref={statsRef}>
                        <div className="stars">★★★★★</div>
                        <strong className="counting-number">{displayedYears}+ Years</strong>
                        <span>Experience</span>

                        <div className="stars">★★★★★</div>
                        <strong className="counting-number">{displayedProjects}+ Projects</strong>
                        <span>Completed</span>

                        <div className="stars">★★★★★</div>
                        <strong className="counting-number">HultPrize Finalist</strong>
                        <span>Completed</span>




                    </div>

                    <div className="hero-buttons">
                        <a href="#projects" className="primary-button magnetic-button">
                            <span>View Projects</span>
                        </a>

                        <a href="/cv.pdf" className="secondary-button magnetic-button">
                            <span>Download CV</span>
                        </a>
                    </div>
                </div>

                <a href="#about" className="scroll-cue" aria-label="Scroll to About section">
                    <span className="scroll-cue-dot"></span>
                </a>
            </div>
        </section>
    );
}

export default Hero;