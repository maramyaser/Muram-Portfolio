import "../Footer.css";
import SpaceBackground from "../components/SpaceBackground";



function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <SpaceBackground />
            

            <div className="footer-glow footer-glow-one"></div>
            <div className="footer-glow footer-glow-two"></div>

            <div className="footer-inner">

                {/* Top section */}
                <div className="footer-top">

                    <div className="footer-intro">
        

                        <h2>
                            Let's build something
                            <span> meaningful.</span>
                        </h2>

                        <p>
                            I'm Currently interested in new ideas,
                            interesting projects, and opportunities
                            to create technology that makes a difference.
                        </p>

                        <a
                            href="maramy636@email.com"
                            className="footer-email"
                        >
                            maramy636@email.com
                            <span>↗</span>
                        </a>
                    </div>


                    {/* Navigation */}
                    <div className="footer-navigation">

                        <div className="footer-column">
                            <span className="footer-column-title">
                                EXPLORE
                            </span>

                            <a href="#home">Home</a>
                            <a href="#about">About</a>
                            <a href="#projects">Projects</a>
                            <a href="#experience">Experience</a>
                            <a href="#contact">Contact</a>
                        </div>


                        <div className="footer-column">
                            <span className="footer-column-title">
                                SOCIAL
                            </span>

                            <a
                                href="https://github.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>

                            <a
                                href="https://www.linkedin.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn
                            </a>

                            
                        </div>

                    </div>

                </div>


                {/* Bottom section */}
                <div className="footer-bottom">

                    <div className="footer-logo">
                        <span className="footer-logo-mark">
                            S
                        </span>

                        <span>
                            Software Engineer
                        </span>
                    </div>

                    <p>
                        © {currentYear} designed with love.
                    </p>

                    <a
                        href="#home"
                        className="back-to-top"
                        aria-label="Back to top"
                    >
                        ↑
                    </a>

                </div>

            </div>

        </footer>
    );
}

export default Footer;