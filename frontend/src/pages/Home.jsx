import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";


function Home() {
    return (
            <main>
                <Navbar />
                <Hero />
                <About />
                <Projects />
                <Experience />
                <Skills />
                <Contact />
                <Footer />
            </main>
        
    );
}

export default Home;