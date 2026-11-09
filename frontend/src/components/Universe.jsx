import { useEffect, useState } from "react";
import { X, Rocket, ArrowUpRight } from "lucide-react";
import "../Universe.css";

const WORLDS = [
  { id: "projects", name: "The Lab", subtitle: "Things I've built", icon: "✦", cls: "world-projects" },
  { id: "experience", name: "Milestones", subtitle: "How I've grown", icon: "✧", cls: "world-experience" },
  { id: "gallery", name: "Memories", subtitle: "Beyond the code", icon: "✺", cls: "world-gallery" },
  { id: "skills", name: "Toolbox", subtitle: "What I use", icon: "◇", cls: "world-skills" },
];
export default function Universe() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = e => {
      if (e.key === "Escape") setOpen(false);
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen(v => !v); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => { if (!open) return; const before = document.body.style.overflow; document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = before; }; }, [open]);
  const travel = id => { setOpen(false); requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })); };
  return <>
    <button className="universe-launch" onClick={() => setOpen(true)} type="button"><Rocket size={18}/> Explore my universe <span aria-hidden="true">↗</span></button>
    {open && <div className="universe-backdrop" role="dialog" aria-modal="true" aria-label="Explore my portfolio universe" onMouseDown={e => { if(e.target === e.currentTarget) setOpen(false); }}>
      <div className="universe-sky" aria-hidden="true"/>
      <button className="universe-close" onClick={() => setOpen(false)} aria-label="Close universe"><X size={24}/></button>
      <div className="universe-intro"><span>WELCOME ABOARD · MURAM'S UNIVERSE</span><h2>Choose your destination<span>.</span></h2><p>Every orbit tells part of my story. Pick a world to explore.</p></div>
      <div className="universe-system"><div className="universe-orbit orbit-one"/><div className="universe-orbit orbit-two"/><div className="universe-sun"><span>M</span></div>
        {WORLDS.map(w => <button key={w.id} className={`universe-world ${w.cls}`} onClick={() => travel(w.id)}><span className="world-icon">{w.icon}</span><strong>{w.name}</strong><small>{w.subtitle}</small><ArrowUpRight size={14}/></button>)}
      </div>
      <p className="universe-hint">CLICK A WORLD TO TRAVEL · ESC TO EXIT</p>
    </div>}
  </>;
}
