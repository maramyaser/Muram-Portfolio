import { useEffect, useState } from "react";
import api from "../services/api";
import { useReveal } from "../hooks/useReveal";
import { useTilt } from "../hooks/useTilt";
import "../Projects.css";

function MediaViewer({ project, media }) {
    const [mediaIndex, setMediaIndex] = useState(0);
    const hasMedia = media.length > 0;
    const current = hasMedia ? media[mediaIndex] : null;

    const prevMedia = (e) => {
        e.stopPropagation();
        setMediaIndex((i) => (i - 1 + media.length) % media.length);
    };

    const nextMedia = (e) => {
        e.stopPropagation();
        setMediaIndex((i) => (i + 1) % media.length);
    };

    const goToMedia = (i, e) => {
        e.stopPropagation();
        setMediaIndex(i);
    };

    return (
        <div className="project-media">
            {hasMedia ? (
                current.media_type === "video" ? (
                    <video
                        key={current.id}
                        src={current.file}
                        controls
                        playsInline
                        preload="metadata"
                    />
                ) : (
                    <img
                        key={current.id}
                        src={current.file}
                        alt={current.caption || `${project.title} preview`}
                    />
                )
            ) : (
                <div className="project-media-placeholder" aria-hidden="true">
                    {project.title?.charAt(0) || "?"}
                </div>
            )}

            {media.length > 1 && (
                <>
                    <button
                        type="button"
                        className="media-nav-btn media-nav-prev"
                        onClick={prevMedia}
                        aria-label="Previous media"
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        className="media-nav-btn media-nav-next"
                        onClick={nextMedia}
                        aria-label="Next media"
                    >
                        ›
                    </button>

                    <div className="media-dots">
                        {media.map((m, i) => (
                            <button
                                type="button"
                                key={m.id}
                                className={`media-dot ${i === mediaIndex ? "active" : ""}`}
                                onClick={(e) => goToMedia(i, e)}
                                aria-label={`Show media ${i + 1} of ${media.length}`}
                            />
                        ))}
                    </div>
                </>
            )}

            {current?.caption && <span className="media-caption">{current.caption}</span>}
        </div>
    );
}

function ProjectCard({ project, index, featured, stagger }) {
    const [revealRef, isVisible] = useReveal({ threshold: 0.15 });
    const { ref: tiltRef, onMouseMove, onMouseLeave } = useTilt(featured ? 3 : 6);

    const setRefs = (node) => {
        revealRef.current = node;
        tiltRef.current = node;
    };

    const media = project.media || [];

    return (
        <div
            className={`project-box tilt-card reveal-up ${isVisible ? "in-view" : ""} ${
                featured ? "featured" : ""
            }`}
            style={{ "--stagger": stagger }}
            ref={setRefs}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        >
            <div className="tilt-card-glare" aria-hidden="true"></div>

            <MediaViewer project={project} media={media} />

            <div className="project-body">
                {featured && <span className="featured-badge">Featured Project</span>}

                <div className="project-number">
                    {String(index + 1).padStart(2, "0")}
                </div>

                <div className="project-info">
                    <h3>{project.title}</h3>
                    <span>{project.technologies}</span>
                </div>

                <p className="project-description">{project.description}</p>

                <a
                    href="#"
                    className="project-arrow"
                    aria-label={`More information about ${project.title}`}
                >
                    →
                </a>
            </div>
        </div>
    );
}

function ProjectSkeleton({ featured }) {
    return (
        <div
            className={`project-box project-box-skeleton ${featured ? "featured" : ""}`}
            aria-hidden="true"
        >
            <div className="skeleton-block skeleton-media"></div>
            <div className="project-body">
                <div className="skeleton-block skeleton-title"></div>
                <div className="skeleton-block skeleton-text"></div>
                <div className="skeleton-block skeleton-text short"></div>
            </div>
        </div>
    );
}

function Projects() {
    const [projects, setProjects] = useState([]);
    const [status, setStatus] = useState("loading"); // loading | success | error
    const [headerRef, headerVisible] = useReveal();

    useEffect(() => {
        api
            .get("projects/")
            .then((response) => {
                setProjects(response.data);
                setStatus("success");
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
                setStatus("error");
            });
    }, []);

    return (
        <section id="projects" className="projects-section">
            <span className="star star1">✦</span>
            <span className="star star2">✦</span>
            <span className="star star3">✦</span>
            <span className="star star4">✦</span>
            <span className="star star5">✦</span>
            <div
                className={`projects-header reveal-up ${headerVisible ? "in-view" : ""}`}
                ref={headerRef}
            >
                <p>MY WORK</p>
                <h2>Selected Projects</h2>
            </div>

            {status === "loading" && (
                <div className="projects-list">
                    <ProjectSkeleton featured />
                    <ProjectSkeleton />
                    <ProjectSkeleton />
                </div>
            )}

            {status === "error" && (
                <p className="projects-empty">
                    Couldn't load projects right now — please check back shortly.
                </p>
            )}

            {status === "success" && projects.length === 0 && (
                <p className="projects-empty">
                    New projects are on the way — check back soon.
                </p>
            )}

            {status === "success" && projects.length > 0 && (
                <div className="projects-list">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            featured={index === 0}
                            stagger={index === 0 ? 0 : (index - 1) % 2}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default Projects;