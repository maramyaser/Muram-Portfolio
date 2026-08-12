import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";

function Home() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <About />
                <Projects />
            </main>
        </>
    );
}

export default Home;