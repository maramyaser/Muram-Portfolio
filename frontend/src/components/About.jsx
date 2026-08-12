function About() {
    return (
        <section id="about" className="section about">
            <div className="section-title">
                <p>GET TO KNOW ME</p>
                <h2>About Me</h2>
            </div>

            <div className="about-content">
                <div>
                    <h3>Building technology with purpose.</h3>

                    <p>
                        I am a Software Engineering student passionate about
                        software development, artificial intelligence, and
                        creating solutions that make a real impact.
                    </p>

                    <p>
                        I enjoy turning ideas into practical applications,
                        from web platforms to AI-powered projects and
                        innovative technologies.
                    </p>
                </div>

                <div className="about-card">
                    <div>
                        <strong>Software</strong>
                        <span>Engineering</span>
                    </div>

                    <div>
                        <strong>AI & ML</strong>
                        <span>Development</span>
                    </div>

                    <div>
                        <strong>Full Stack</strong>
                        <span>Development</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;