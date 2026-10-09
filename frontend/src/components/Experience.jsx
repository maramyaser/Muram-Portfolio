import { useReveal } from "../hooks/useReveal";
import "../Experience.css";
import SpaceBackground from "../components/SpaceBackground";


const JOURNEY = [
    {
        id: 1,
        type: "experience",
        period: "2026",
        title: "Best Women speaker",
        organization: "INES Ruhengeri",
        description:
            "Contributed to a production web application, built features end-to-end, and worked with a small team on planning and code review.",
        position: "node-1",
    },

    {
        id: 2,
        type: "certificate",
        period: "2026",
        title: "Full Stack Machine Learning t",
        organization: "Udemy",
        description:
            "Certificate focused on Django REST Framework, Reac",
        position: "node-2",
    },

    {
        id: 3,
        type: "experience",
        period: "2024 — Present",
        title: "Freelance Full-Stack Developer",
        organization: "Self-employed",
        description:
            "Designed and developed web applications, handling frontend development, backend APIs, databases, and deployment.",
        position: "node-3",
    },

    {
        id: 4,
        type: "certificate",
        period: "2026",
        title: "Bridge programe",
        organization: "Carnegir Mellon University Africa",
        description:
            "completion of bridge program certificate.",
        position: "node-4",
    },

    {
        id: 5,
        type: "experience",
        period: "2026 — Present",
        title: "Software Engineering Student",
        organization: "INES Ruhengeri",
        description:
            "Coursework and personal projects spanning software development, artificial intelligence, databases, and systems fundamentals.",
        position: "node-5",
    },

    {
        id: 6,
        type: "certificate",
        period: "2024",
        title: "Programming & Software Development",
        organization: "Certification Provider",
        description:
            "Certificate demonstrating practical programming and software development knowledge.",
        position: "node-6",
    },
];


function JourneyNode({ item, index }) {
    const [ref, isVisible] = useReveal({
        threshold: 0.2,
    });

    return (
        <article
            ref={ref}
            className={`
                journey-node
                ${item.position}
                ${item.type}
                reveal-up
                ${isVisible ? "in-view" : ""}
            `}
            style={{
                "--stagger": index,
            }}
        >

            <div className="journey-star">
                <span>✦</span>
            </div>


            <div className="journey-card">

                <div className="journey-card-top">

                    <span className="journey-type">
                        {item.type === "experience"
                            ? "EXPERIENCE"
                            : "CERTIFICATION"}
                    </span>

                    <span className="journey-period">
                        {item.period}
                    </span>

                </div>


                <h3>
                    {item.title}
                </h3>


                <span className="journey-organization">
                    {item.organization}
                </span>


                <p>
                    {item.description}
                </p>

            </div>

        </article>
    );
}


function Experience() {

    const [titleRef, titleVisible] = useReveal();


    return (
        <section
            id="experience"
            className="section-experience"
        >
            
            <SpaceBackground />
            <span className="star star1">✦</span>
            <span className="star star2">✦</span>
            <span className="star star3">✦</span>
            <span className="star star4">✦</span>
            <span className="star star5">✦</span>

            {/* Background stars */}

            <span className="space-star space-star-1">
                ✦
            </span>

            <span className="space-star space-star-2">
                ·
            </span>

            <span className="space-star space-star-3">
                ✦
            </span>

            <span className="space-star space-star-4">
                ·
            </span>

            <span className="space-star space-star-5">
                ✦
            </span>


            {/* Header */}

            <div
                ref={titleRef}
                className={`
                    section-title
                    reveal-up
                    ${titleVisible ? "in-view" : ""}
                `}
            >

                <p>
                    MY JOURNEY
                </p>

                <h2>
                    Experience & Certifications
                </h2>

                <span className="journey-subtitle">
                    A constellation of the things I've learned,
                    built, and achieved.
                </span>

            </div>


            {/* Constellation */}

            <div className="journey-space">
                {/* Connecting constellation lines */}

                <div className="constellation-line line-1"></div>
                <div className="constellation-line line-2"></div>
                <div className="constellation-line line-3"></div>
                <div className="constellation-line line-4"></div>
                <div className="constellation-line line-5"></div>


                {JOURNEY.map((item, index) => (
                    <JourneyNode
                        key={item.id}
                        item={item}
                        index={index}
                    />
                ))}

            </div>

        </section>
    );
}


export default Experience;