import { useEffect, useState } from "react";
import { Images, ArrowUpRight, Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY } from "../data/gallery";
import "../MediaExtras.css";

// Gallery supports both pictures and videos from public/media/gallery/.
// Example entries in src/data/gallery.js:
// { id: "event-photo", src: "/media/gallery/event.jpg", caption: "Program photo", category: "Programs" },
// { id: "event-video", src: "/media/gallery/event.mp4", type: "video", caption: "Program highlights", category: "Programs" },
// Local MP4/WebM/OGG video files are automatically detected from their extensions.
function isVideo(item) {
  return item?.type === "video" || item?.media_type === "video" ||
    /\.(mp4|webm|ogg)(?:[?#].*)?$/i.test(item?.src || "");
}

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const categories = ["All", ...new Set(GALLERY.map(item => item.category || "Moments"))];
  const visible = GALLERY.filter(item => filter === "All" || (item.category || "Moments") === filter);
  const current = selected === null ? null : visible[selected];

  useEffect(() => {
    if (selected === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = event => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowLeft") setSelected(i => (i - 1 + visible.length) % visible.length);
      if (event.key === "ArrowRight") setSelected(i => (i + 1) % visible.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selected, visible.length]);

  return (
    <section id="gallery" className="gallery-section">
      <div className="gallery-heading">
        <span>BEYOND THE CODE</span>
        <h2>Moments in My Orbit<span className="orange-period">.</span></h2>
        <p>A visual journal of programs, communities, challenges, and the moments in between.</p>
      </div>

      {GALLERY.length ? (
        <>
          <div className="gallery-filters" role="group" aria-label="Filter gallery">
            {categories.map(category => (
              <button
                type="button"
                key={category}
                className={filter === category ? "active" : ""}
                onClick={() => { setFilter(category); setSelected(null); }}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {visible.map((item, index) => (
              <button
                type="button"
                key={item.id || `${item.src}-${index}`}
                className="gallery-photo"
                onClick={() => setSelected(index)}
                aria-label={`Open ${item.caption || (isVideo(item) ? "video" : "photo")}`}
              >
                {isVideo(item) ? (
                  <>
                    <video
                      src={item.src}
                      poster={item.poster || undefined}
                      preload="metadata"
                      muted
                      playsInline
                      aria-hidden="true"
                      style={{ display: "block", width: "100%", aspectRatio: "4 / 3", objectFit: "cover", pointerEvents: "none" }}
                    />
                    <span aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 54, height: 54, display: "grid", placeItems: "center", borderRadius: "50%", color: "white", background: "rgba(0,0,0,.64)", border: "1px solid rgba(255,255,255,.35)" }}>
                      <Play size={25} fill="currentColor" />
                    </span>
                  </>
                ) : (
                  <img src={item.src} alt={item.caption || "Gallery moment"} loading="lazy" />
                )}
                <div className="gallery-overlay">
                  <span>{item.caption || (isVideo(item) ? "Watch video" : "View photo")}</span>
                  {isVideo(item) ? <Play size={20} /> : <ArrowUpRight size={20} />}
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="gallery-empty">
          <Images size={42} />
          <h3>More moments coming soon</h3>
          <p>Photos and videos from programs, events and everyday adventures will live here.</p>
        </div>
      )}

      {current && (
        <div
          className="media-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.caption || "Gallery viewer"}
          onMouseDown={event => { if (event.target === event.currentTarget) setSelected(null); }}
        >
          <button type="button" className="lightbox-close" onClick={() => setSelected(null)} aria-label="Close viewer"><X /></button>
          <div className="lightbox-content" style={{ width: "100%" }}>
            {isVideo(current) ? (
              <video
                key={current.id || current.src}
                src={current.src}
                poster={current.poster || undefined}
                controls
                autoPlay
                playsInline
                style={{ width: "100%", maxWidth: "1000px", maxHeight: "calc(100vh - 160px)", objectFit: "contain", borderRadius: 12 }}
              >
                Your browser does not support HTML5 video.
              </video>
            ) : (
              <img src={current.src} alt={current.caption || "Gallery photo"} />
            )}
            {current.caption && <p>{current.caption}</p>}
          </div>
          {visible.length > 1 && (
            <>
              <button type="button" className="lightbox-arrow lightbox-left" aria-label="Previous item" onClick={() => setSelected(i => (i - 1 + visible.length) % visible.length)}><ChevronLeft /></button>
              <button type="button" className="lightbox-arrow lightbox-right" aria-label="Next item" onClick={() => setSelected(i => (i + 1) % visible.length)}><ChevronRight /></button>
              <span className="lightbox-counter">{selected + 1} / {visible.length}</span>
            </>
          )}
        </div>
      )}
    </section>
  );
}
