import { useEffect, useState } from "react";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeHref, setActiveHref] = useState("#home");

    const links = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Experience", href: "#experience" },
        { name: "Contact", href: "#contact" },
    ];

    // Shrink navbar when scrolling
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Detect active section
    useEffect(() => {
        const sections = links
            .map((link) => document.querySelector(link.href))
            .filter(Boolean);

        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio - a.intersectionRatio
                    )[0];

                if (visible) {
                    setActiveHref(`#${visible.target.id}`);
                }
            },
            {
                rootMargin: "-40% 0px -50% 0px",
                threshold: [0, 0.25, 0.5, 0.75, 1],
            }
        );

        sections.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    // Close menu when clicking a link
    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>

            {/* Logo */}
            <a href="#home" className="logo">
                Portfolio
            </a>

            {/* Hamburger Menu Button */}
            <button
                className={`menu-button ${menuOpen ? "open" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Navigation Menu */}
            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                {links.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className={
                            activeHref === link.href
                                ? "active"
                                : ""
                        }
                        onClick={handleLinkClick}
                    >
                        {link.name}
                    </a>
                ))}
            </div>

        </nav>
    );
}

export default Navbar;