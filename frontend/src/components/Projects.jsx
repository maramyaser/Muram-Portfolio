import { useEffect, useState } from "react";
import api from "../services/api";

function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get("projects/")
            .then((response) => {
                setProjects(response.data);
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
            });
    }, []);

    return (
        <section>
            <h2>My Projects</h2>

            {projects.map((project) => (
                <div key={project.id}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <p>{project.technologies}</p>
                </div>
            ))}
        </section>
    );
}

export default Projects;