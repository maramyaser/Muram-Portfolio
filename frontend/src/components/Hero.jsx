import profileImage from "../assets/profile.png";

function Hero() {
    return (
        <section id="home" className="hero">
            <div className="hero-content">

                <p className="hero-small">
                    Hello! 👋
                </p>

                <h1>
                    I'm Muram,
                </h1>

                <h2>
                    Software Engineer
                </h2>

                <div className="hero-image-wrapper">

                    <p className="hero-description">
                        I build modern web applications, AI-powered
                        solutions, and technology that solves
                        real-world problems.
                    </p>

                    <div className="hero-image">
                        <div className="image-circle"></div>
                        <img
                            src={profileImage}
                            alt="Muram"
                        />
                    </div>

                    <div className="hero-stats">
                        <div className="stars">★★★★★</div>
                        <strong>10 Years</strong>
                        <span>Experience</span>
                    </div>

                    <div className="hero-buttons">
                        <a href="#projects" className="primary-button">
                            View Projects
                        </a>

                        <a href="/cv.pdf" className="secondary-button">
                            Download CV
                        </a>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default Hero;