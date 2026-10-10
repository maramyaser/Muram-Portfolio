import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ScrollProgress from "./components/ScrollProgress";

function App() {
    const path = window.location.pathname;

    const isHomePage = path === "/" || path === "/index.html";

    if (!isHomePage) {
        return <NotFound />;
    }

    return (
        <>
            <ScrollProgress />
            <Home />
        </>
    );
}

export default App;
