import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Gallery from "../components/Gallery";
import Universe from "../components/Universe";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";


function Home() {
    return (
            <main>
                <Navbar />
                <Hero />
                <Universe />
                <About />
                <Projects />
                <Experience />
                <Gallery />
                <Skills />
                <Contact />
                <Footer />
            </main>
        
    );
}

export default Home;