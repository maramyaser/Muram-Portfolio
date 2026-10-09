import { useReveal } from "../hooks/useReveal";


const SKILLS = [
    { title: "Software", subtitle: "Engineering" },
    { title: "AI & ML", subtitle: "Development" },
    { title: "Full Stack", subtitle: "Development" },
];

function About() {
    const [titleRef, titleVisible] = useReveal();
    const [textRef, textVisible] = useReveal();
    const [cardRef, cardVisible] = useReveal();

    return (
        <section id="about" className="section-about">
            
            <span className="star star1">✦</span>
            <span className="star star2">✦</span>
            <span className="star star3">✦</span>
            <span className="star star4">✦</span>
            <span className="star star5">✦</span>
            <div
                className={`section-title reveal-up ${titleVisible ? "in-view" : ""}`}
                ref={titleRef}
            >
                <p>GET TO KNOW ME</p>
                <h2>About Me</h2>
            </div>

            <div className="about-content">
                <div
                    className={`reveal-left ${textVisible ? "in-view" : ""}`}
                    ref={textRef}
                >
                    <h3>Building technology with purpose.</h3>

                    <p>
                        I am a Software Engineering student passionate
                        about software development, artificial
                        intelligence, and creating solutions that
                        make a real impact.
                    </p>

                    <p>
                        I enjoy turning ideas into practical applications,
                        from web platforms to AI-powered projects and
                        innovative technologies.
                    </p>
                </div>

                <div
                    className={`about-card reveal-right ${cardVisible ? "in-view" : ""}`}
                    ref={cardRef}
                >
                    {SKILLS.map((skill, index) => (
                        <div
                            key={skill.title}
                            className="about-card-item"
                            style={{ "--stagger": index }}
                        >
                            <strong>{skill.title}</strong>
                            <span>{skill.subtitle}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default About;