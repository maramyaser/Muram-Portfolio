import { Link } from "react";
import { ArrowLeft, Moon, Sparkles } from "lucide-react";
import "../NotFound.css";

export default function NotFound() {
    return (
        <main className="not-found">
            <div className="not-found-stars" aria-hidden="true">
                <Sparkles className="star star-one" />
                <Sparkles className="star star-two" />
                <Sparkles className="star star-three" />
            </div>

            <div className="not-found-content">
                <Moon className="not-found-moon" aria-hidden="true" />

                <p className="not-found-label">
                    OOPS! WRONG UNIVERSE
                </p>

                <h1>
                    4<span>0</span>4
                </h1>

                <h2>You've wandered into the void.</h2>

                <p className="not-found-description">
                    This page doesn't exist, or it may have moved
                    to another corner of the internet.
                </p>

                <a className="not-found-home" href="/">
                    <ArrowLeft size={18} />
                    Take me home
                </a>

                <p className="not-found-footer">
                    <span>Muram.exe</span> · Lost in space, not in code.
                </p>
            </div>
        </main>
    );
}
