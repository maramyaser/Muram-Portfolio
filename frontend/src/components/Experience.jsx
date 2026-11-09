import { useReveal } from "../hooks/useReveal";
import "../Experience.css";
import SpaceBackground from "../components/SpaceBackground";


import { JOURNEY } from "../data/experience";
import Lightbox from "./Lightbox";
import { useState } from "react";

function JourneyNode({ item, index, openImages }) {
    const [ref, isVisible] = useReveal({
        threshold: 0.2,
    });

    return (
        <article
            ref={ref}
            className={`
                journey-node
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
                {item.images?.length > 0 && <button type="button" className="certificate-view-btn" onClick={() => openImages(item.images.map((src, i) => ({src, caption: `${item.title} — ${i + 1}`})))}>View {item.type === "certificate" ? "certificate" : "photos"} ↗</button>}

            </div>

        </article>
    );
}


function Experience() {
    const [selectedImages, setSelectedImages] = useState(null);
    const [imageIndex, setImageIndex] = useState(0);

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
                {JOURNEY.map((item, index) => (
                    <JourneyNode
                        key={item.id}
                        item={item}
                        index={index}
                        openImages={(images) => { setSelectedImages(images); setImageIndex(0); }}
                    />
                ))}

            </div>
            {selectedImages && <Lightbox images={selectedImages} index={imageIndex} onChange={setImageIndex} onClose={() => setSelectedImages(null)} />}
        </section>
    );
}


export default Experience;