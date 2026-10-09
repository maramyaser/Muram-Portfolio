import { useReveal } from "../hooks/useReveal";
import "../Contact.css";

// Swap these for your real links.
const SOCIALS = [
    { name: "GitHub", href: "https://github.com/maramyaser" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/muram-yaser-157326322" },
    { name: "Email", href: "maramy636@gmail.com" },
];

function Contact() {
    const [ref, isVisible] = useReveal({ threshold: 0.3 });

    return (
        <section id="contact" className="section-contact">
            <span className="star star1">✦</span>
            <span className="star star2">✦</span>
            <span className="star star3">✦</span>
            <span className="star star4">✦</span>
            <span className="star star5">✦</span>
            <div
                className={`contact-box reveal-up ${isVisible ? "in-view" : ""}`}
                ref={ref}
            >
                <p className="section-title-eyebrow">LET'S CONNECT</p>
                <h2>Have a project in mind?</h2>
                <p className="contact-copy">
                    I'm always open to discussing new opportunities,
                    collaborations, or just talking about software and AI.
                </p>

                <a href="mailto:you@example.com" className="contact-cta magnetic-button">
                    <span>Say Hello</span>
                </a>

                <div className="contact-socials">
                    {SOCIALS.map((social) => (
                        <a
                            key={social.name}
                            href={social.href}
                            target={social.href.startsWith("http") ? "_blank" : undefined}
                            rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                        >
                            {social.name}
                        </a>
                    ))}
                </div>
            </div>

            <footer className="footer-note">
                <span>© {new Date().getFullYear()} Muram. Built with React.</span>
            </footer>
        </section>
    );
}

export default Contact;