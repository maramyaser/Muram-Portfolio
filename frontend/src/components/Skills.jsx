import { useReveal } from "../hooks/useReveal";
import "../Skills.css";

// Edit freely — these are placeholder categories/tags to replace with
// your actual stack.
const SKILL_GROUPS = [
    {
        title: "Languages",
        tags: ["JavaScript", "Python", "TypeScript", "Java", "SQL"],
    },
    {
        title: "Frontend",
        tags: ["React", "HTML/CSS", "Tailwind", "Vite"],
    },
    {
        title: "Backend & AI",
        tags: ["Django", "Node.js", "REST APIs", "TensorFlow", "scikit-learn"],
    },
    {
        title: "Tools & Platforms",
        tags: ["Git", "Docker", "Linux", "Figma", "Postman"],
    },
];

function SkillGroup({ group, index }) {
    const [ref, isVisible] = useReveal({ threshold: 0.2 });

    return (
        <div
            className={`skill-group reveal-up ${isVisible ? "in-view" : ""}`}
            style={{ "--stagger": index }}
            ref={ref}
        >
            <h3>{group.title}</h3>
            <div className="skill-tags">
                {group.tags.map((tag) => (
                    <span key={tag} className="skill-tag">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

function Skills() {
    const [titleRef, titleVisible] = useReveal();

    return (
        <section id="skills" className="section-skills">
            <span className="star star1">✦</span>
            <span className="star star2">✦</span>
            <span className="star star3">✦</span>
            <span className="star star4">✦</span>
            <span className="star star5">✦</span>
            <div
                className={`section-title reveal-up ${titleVisible ? "in-view" : ""}`}
                ref={titleRef}
            >
                <p>MY TOOLKIT</p>
                <h2>Skills</h2>
            </div>

            <div className="skills-grid">
                {SKILL_GROUPS.map((group, index) => (
                    <SkillGroup key={group.title} group={group} index={index} />
                ))}
            </div>
        </section>
    );
}

export default Skills;