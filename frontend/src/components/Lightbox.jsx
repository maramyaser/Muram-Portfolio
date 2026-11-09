import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "../MediaExtras.css";

export default function Lightbox({ images, index, onClose, onChange }) {
  useEffect(() => {
    const keydown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onChange((index + 1) % images.length);
    };
    document.addEventListener("keydown", keydown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", keydown); document.body.style.overflow = previous; };
  }, [index, images.length, onClose, onChange]);
  const item = images[index];
  if (!item) return null;
  return (
    <div className="media-lightbox" role="dialog" aria-modal="true" aria-label={item.caption || "Photo viewer"} onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close image"><X /></button>
      <div className="lightbox-content">
        <img src={item.src} alt={item.caption || "Gallery image"} />
        {item.caption && <p>{item.caption}</p>}
      </div>
      {images.length > 1 && <>
        <button className="lightbox-arrow lightbox-left" aria-label="Previous image" onClick={() => onChange((index - 1 + images.length) % images.length)}><ChevronLeft /></button>
        <button className="lightbox-arrow lightbox-right" aria-label="Next image" onClick={() => onChange((index + 1) % images.length)}><ChevronRight /></button>
        <span className="lightbox-counter">{index + 1} / {images.length}</span>
      </>}
    </div>
  );
}
