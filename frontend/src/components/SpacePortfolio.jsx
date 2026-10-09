// import { useEffect, useRef, useState, useCallback } from "react";
// import * as THREE from "three";
// import { Rocket, Satellite } from "lucide-react";

// function MeteorMesh() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const size = 128;
//     const renderer = new THREE.WebGLRenderer({
//       canvas,
//       alpha: true,
//       antialias: true,
//     });
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
//     renderer.setSize(size, size, false);
//     renderer.setClearColor(0x000000, 0);

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10);
//     camera.position.z = 3.1;

//     // irregular rocky body: displace an icosahedron's vertices outward at random
//     const geo = new THREE.IcosahedronGeometry(1, 1);
//     const posAttr = geo.attributes.position;
//     for (let i = 0; i < posAttr.count; i++) {
//       const nx = posAttr.getX(i);
//       const ny = posAttr.getY(i);
//       const nz = posAttr.getZ(i);
//       const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
//       const bump = 0.8 + Math.random() * 0.32;
//       posAttr.setXYZ(i, (nx / len) * bump, (ny / len) * bump, (nz / len) * bump);
//     }
//     geo.computeVertexNormals();

//     const mat = new THREE.MeshStandardMaterial({
//       color: 0x8a5a3a,
//       roughness: 0.95,
//       metalness: 0.05,
//       emissive: 0x662200,
//       emissiveIntensity: 0.55,
//       flatShading: true,
//     });
//     const rock = new THREE.Mesh(geo, mat);
//     scene.add(rock);

//     // additive fiery halo, slightly larger, rendered from the inside out
//     const haloGeo = new THREE.IcosahedronGeometry(1.4, 1);
//     const haloMat = new THREE.MeshBasicMaterial({
//       color: 0xff8a3d,
//       transparent: true,
//       opacity: 0.24,
//       side: THREE.BackSide,
//       blending: THREE.AdditiveBlending,
//       depthWrite: false,
//     });
//     const halo = new THREE.Mesh(haloGeo, haloMat);
//     scene.add(halo);

//     scene.add(new THREE.AmbientLight(0x442211, 0.7));
//     const key = new THREE.PointLight(0xffb066, 2.4, 10);
//     key.position.set(2, 1.4, 2.2);
//     scene.add(key);
//     const fill = new THREE.PointLight(0x6fe6ff, 0.5, 10);
//     fill.position.set(-2, -1, 1.5);
//     scene.add(fill);

//     let raf;
//     const animate = () => {
//       rock.rotation.x += 0.02;
//       rock.rotation.y += 0.028;
//       rock.rotation.z += 0.006;
//       halo.rotation.x -= 0.006;
//       halo.rotation.y += 0.01;
//       renderer.render(scene, camera);
//       raf = requestAnimationFrame(animate);
//     };
//     animate();

//     return () => {
//       cancelAnimationFrame(raf);
//       geo.dispose();
//       mat.dispose();
//       haloGeo.dispose();
//       haloMat.dispose();
//       renderer.dispose();
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{ width: "100%", height: "100%", display: "block" }}
//     />
//   );
// }

// /**
//  * SpacePortfolio
//  * Intro-only wrapper. Renders a space console with a meteor launch that
//  * cracks open a pair of 3D blast doors, revealing whatever page content
//  * is passed in as `children` (your real site: Navbar, Hero, About, etc).
//  *
//  * Usage:
//  *   <SpacePortfolio>
//  *     <Navbar />
//  *     <main>...</main>
//  *   </SpacePortfolio>
//  */
// export default function SpacePortfolio({ children }) {
//   const [phase, setPhase] = useState("idle");
//   const reducedMotion = useRef(false);
//   const canvasRef = useRef(null);
//   const mouseRef = useRef({ x: 0.5, y: 0.5 });
//   const timers = useRef([]);

//   useEffect(() => {
//     reducedMotion.current = window.matchMedia(
//       "(prefers-reduced-motion: reduce)"
//     ).matches;
//   }, []);

//   useEffect(() => {
//     return () => timers.current.forEach(clearTimeout);
//   }, []);

//   const ignite = useCallback(() => {
//     setPhase((p) => {
//       if (p !== "idle") return p;
//       if (reducedMotion.current) return "revealed";
//       timers.current.push(setTimeout(() => setPhase("impact"), 1050));
//       timers.current.push(setTimeout(() => setPhase("sealed"), 1500));
//       timers.current.push(setTimeout(() => setPhase("opening"), 2500));
//       timers.current.push(setTimeout(() => setPhase("revealed"), 3650));
//       return "flying";
//     });
//   }, []);

//   useEffect(() => {
//     const onKey = (e) => {
//       if ((e.key === "Enter" || e.key === " ") && phase === "idle") {
//         ignite();
//       }
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [phase, ignite]);

//   // starfield
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     let raf;
//     let w, h;
//     let stars = [];
//     const layers = [
//       { count: 90, speed: 0.05, size: [0.4, 1.1], alpha: [0.25, 0.55] },
//       { count: 55, speed: 0.12, size: [0.8, 1.6], alpha: [0.4, 0.75] },
//       { count: 30, speed: 0.22, size: [1.2, 2.1], alpha: [0.6, 1] },
//     ];
//     function resize() {
//       const dpr = Math.min(window.devicePixelRatio || 1, 2);
//       w = canvas.width = canvas.offsetWidth * dpr;
//       h = canvas.height = canvas.offsetHeight * dpr;
//     }
//     function init() {
//       resize();
//       stars = [];
//       layers.forEach((layer, li) => {
//         for (let i = 0; i < layer.count; i++) {
//           stars.push({
//             x: Math.random() * w,
//             y: Math.random() * h,
//             r:
//               (layer.size[0] +
//                 Math.random() * (layer.size[1] - layer.size[0])) *
//               (window.devicePixelRatio || 1),
//             a: layer.alpha[0] + Math.random() * (layer.alpha[1] - layer.alpha[0]),
//             speed: layer.speed * (window.devicePixelRatio || 1),
//             layer: li,
//             phase: Math.random() * Math.PI * 2,
//           });
//         }
//       });
//     }
//     function draw(t) {
//       ctx.clearRect(0, 0, w, h);
//       const mx = (mouseRef.current.x - 0.5) * 40;
//       const my = (mouseRef.current.y - 0.5) * 24;
//       for (const s of stars) {
//         if (!reducedMotion.current) {
//           s.x -= s.speed;
//           if (s.x < -6) s.x = w + 6;
//         }
//         const twinkle = reducedMotion.current
//           ? s.a
//           : s.a * (0.7 + 0.3 * Math.sin(t / 900 + s.phase));
//         const parallax = (s.layer + 1) * 3;
//         ctx.beginPath();
//         ctx.fillStyle = `rgba(233,238,255,${twinkle})`;
//         ctx.arc(
//           s.x + mx * parallax * 0.06,
//           s.y + my * parallax * 0.06,
//           s.r,
//           0,
//           Math.PI * 2
//         );
//         ctx.fill();
//       }
//       raf = requestAnimationFrame(draw);
//     }
//     init();
//     raf = requestAnimationFrame(draw);
//     const onResize = () => init();
//     window.addEventListener("resize", onResize);
//     return () => {
//       cancelAnimationFrame(raf);
//       window.removeEventListener("resize", onResize);
//     };
//   }, []);

//   useEffect(() => {
//     const onMove = (e) => {
//       mouseRef.current = {
//         x: e.clientX / window.innerWidth,
//         y: e.clientY / window.innerHeight,
//       };
//     };
//     window.addEventListener("mousemove", onMove);
//     return () => window.removeEventListener("mousemove", onMove);
//   }, []);

//   const showIntro = phase === "idle" || phase === "flying" || phase === "impact";
//   const showDoors = phase === "sealed" || phase === "opening";
//   const revealed = phase === "revealed";

//   return (
//     <div className={`sp ${phase === "impact" ? "sp--shake" : ""}`}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');

//         .sp {
//           --void: #05060b;
//           --hull: #0c1220;
//           --hull-2: #131c30;
//           --amber: #ff9d4d;
//           --amber-2: #ffc98a;
//           --cyan: #6fe6ff;
//           --star: #eef1ff;
//           --muted: #8896b8;
//           --font-display: 'Space Grotesk', sans-serif;
//           --font-body: 'Inter', sans-serif;
//           --font-mono: 'IBM Plex Mono', monospace;

//           position: relative;
//           width: 100%;
//           font-family: var(--font-body);
//           color: var(--star);
//         }
//         .sp *, .sp *::before, .sp *::after { box-sizing: border-box; }
//         .sp button { font-family: inherit; cursor: pointer; }
//         .sp ::selection { background: var(--amber); color: var(--void); }

//         .sp :focus-visible {
//           outline: 2px solid var(--cyan);
//           outline-offset: 3px;
//           border-radius: 3px;
//         }

//         @keyframes sp-shake {
//           0%, 100% { transform: translate(0,0); }
//           20% { transform: translate(-6px, 2px); }
//           40% { transform: translate(5px, -3px); }
//           60% { transform: translate(-4px, -2px); }
//           80% { transform: translate(3px, 3px); }
//         }
//         .sp--shake { animation: sp-shake 0.5s ease-in-out; }

//         /* ---------- intro overlay (unmounts once revealed) ---------- */
//         .sp-intro-stage {
//           position: fixed;
//           inset: 0;
//           z-index: 9999;
//           background: radial-gradient(ellipse at 50% -10%, #10182c 0%, var(--void) 55%, var(--void) 100%);
//           overflow: hidden;
//         }

//         .sp-canvas {
//           position: absolute;
//           inset: 0;
//           width: 100%;
//           height: 100%;
//           z-index: 0;
//           pointer-events: none;
//         }
//         .sp-nebula {
//           position: absolute;
//           inset: 0;
//           z-index: 0;
//           pointer-events: none;
//           overflow: hidden;
//         }
//         .sp-nebula span {
//           position: absolute;
//           border-radius: 50%;
//           filter: blur(70px);
//           opacity: 0.35;
//           mix-blend-mode: screen;
//         }
//         .sp-nebula span:nth-child(1) {
//           width: 46vw; height: 46vw; left: -12vw; top: -8vw;
//           background: radial-gradient(circle, #3a2d7a 0%, transparent 70%);
//           animation: sp-drift1 26s ease-in-out infinite alternate;
//         }
//         .sp-nebula span:nth-child(2) {
//           width: 38vw; height: 38vw; right: -10vw; top: 10vw;
//           background: radial-gradient(circle, #7a3d2d 0%, transparent 70%);
//           animation: sp-drift2 32s ease-in-out infinite alternate;
//         }
//         .sp-nebula span:nth-child(3) {
//           width: 30vw; height: 30vw; left: 30vw; bottom: -12vw;
//           background: radial-gradient(circle, #1f3d6e 0%, transparent 70%);
//           animation: sp-drift1 22s ease-in-out infinite alternate-reverse;
//         }
//         @keyframes sp-drift1 { from { transform: translate(0,0); } to { transform: translate(4vw, 3vw); } }
//         @keyframes sp-drift2 { from { transform: translate(0,0); } to { transform: translate(-3vw, -4vw); } }

//         /* ---------- console ---------- */
//         .sp-intro {
//           position: absolute;
//           inset: 0;
//           z-index: 20;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           text-align: center;
//           padding: 24px;
//           opacity: 1;
//           transition: opacity 0.35s ease;
//         }
//         .sp-intro.sp-fading { opacity: 0; }

//         .sp-hud-corner {
//           position: absolute;
//           width: 44px;
//           height: 44px;
//           border-color: rgba(111, 230, 255, 0.45);
//           border-style: solid;
//           border-width: 0;
//         }
//         .sp-hud-corner.tl { top: 28px; left: 28px; border-top-width: 1.5px; border-left-width: 1.5px; }
//         .sp-hud-corner.tr { top: 28px; right: 28px; border-top-width: 1.5px; border-right-width: 1.5px; }
//         .sp-hud-corner.bl { bottom: 28px; left: 28px; border-bottom-width: 1.5px; border-left-width: 1.5px; }
//         .sp-hud-corner.br { bottom: 28px; right: 28px; border-bottom-width: 1.5px; border-right-width: 1.5px; }

//         .sp-hud-tag {
//           position: absolute;
//           top: 40px;
//           left: 50%;
//           transform: translateX(-50%);
//           font-family: var(--font-mono);
//           font-size: 11px;
//           letter-spacing: 0.18em;
//           color: var(--muted);
//         }
//         .sp-hud-tag b { color: var(--amber); font-weight: 500; }

//         .sp-console { max-width: 640px; }
//         .sp-eyebrow {
//           font-family: var(--font-mono);
//           font-size: 12px;
//           letter-spacing: 0.22em;
//           color: var(--cyan);
//           margin: 0 0 18px;
//         }
//         .sp-title {
//           font-family: var(--font-display);
//           font-weight: 700;
//           font-size: clamp(2.2rem, 7vw, 4.2rem);
//           line-height: 1.05;
//           margin: 0 0 16px;
//           letter-spacing: -0.01em;
//         }
//         .sp-title span { color: var(--amber); }
//         .sp-tagline {
//           font-size: clamp(0.95rem, 2vw, 1.1rem);
//           color: var(--muted);
//           max-width: 480px;
//           margin: 0 auto 34px;
//           line-height: 1.6;
//         }
//         .sp-ignite {
//           position: relative;
//           font-family: var(--font-mono);
//           font-size: 13px;
//           letter-spacing: 0.16em;
//           color: var(--void);
//           background: linear-gradient(180deg, var(--amber-2), var(--amber));
//           border: none;
//           padding: 15px 34px;
//           border-radius: 4px;
//           font-weight: 600;
//           box-shadow: 0 0 0 1px rgba(255,157,77,0.4), 0 10px 30px -10px rgba(255,157,77,0.6);
//           transition: transform 0.2s ease, box-shadow 0.2s ease;
//         }
//         .sp-ignite:hover { transform: translateY(-2px); box-shadow: 0 0 0 1px rgba(255,157,77,0.6), 0 14px 34px -8px rgba(255,157,77,0.75); }
//         .sp-ignite:active { transform: translateY(0); }
//         .sp-ignite:disabled { opacity: 0.5; pointer-events: none; }
//         .sp-hint { margin-top: 16px; font-family: var(--font-mono); font-size: 11px; color: var(--muted); letter-spacing: 0.08em; }

//         /* ---------- meteor ---------- */
//         .sp-meteor {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           width: 68px;
//           height: 68px;
//           z-index: 25;
//           filter: drop-shadow(0 0 16px rgba(255,157,77,0.6)) drop-shadow(0 0 42px rgba(255,82,102,0.3));
//           animation: sp-meteor-fly 1.05s cubic-bezier(0.3,0.55,0.35,1) forwards;
//         }
//         .sp-meteor::after {
//           content: '';
//           position: absolute;
//           top: 50%;
//           right: 92%;
//           width: 220px;
//           height: 10px;
//           transform: translateY(-50%) rotate(0deg);
//           background: linear-gradient(90deg, transparent, rgba(255,157,77,0.05), rgba(255,157,77,0.35), rgba(255,220,160,0.85));
//           border-radius: 50%;
//           filter: blur(2px);
//         }
//         @keyframes sp-meteor-fly {
//           0% { transform: translate3d(42vw,-34vh,0) rotate(35deg) scale(0.4); opacity: 1; }
//           82% { transform: translate3d(0,0,0) rotate(35deg) scale(1.5); opacity: 1; }
//           100% { transform: translate3d(0,0,0) rotate(35deg) scale(1.85); opacity: 0; }
//         }

//         .sp-flash {
//           position: absolute;
//           inset: 0;
//           z-index: 26;
//           background: radial-gradient(circle at 50% 50%, #fff 0%, var(--amber-2) 18%, var(--amber) 38%, transparent 70%);
//           animation: sp-flash-burst 0.6s ease-out forwards;
//         }
//         @keyframes sp-flash-burst {
//           0% { opacity: 0; transform: scale(0.2); }
//           25% { opacity: 1; }
//           100% { opacity: 0; transform: scale(2.6); }
//         }

//         /* ---------- blast doors ---------- */
//         .sp-doors {
//           position: absolute;
//           inset: 0;
//           z-index: 40;
//           perspective: 1700px;
//         }
//         .sp-door {
//           position: absolute;
//           top: 0;
//           bottom: 0;
//           width: 50%;
//           background:
//             repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0 2px, transparent 2px 34px),
//             linear-gradient(180deg, var(--hull-2), var(--hull) 60%, #080b14);
//           transition: transform 1.05s cubic-bezier(0.65,0,0.35,1);
//           animation: sp-door-seal 0.2s ease-out;
//         }
//         @keyframes sp-door-seal {
//           from { opacity: 0; transform: scale(1.02); }
//           to { opacity: 1; }
//         }
//         .sp-door.left { left: 0; transform-origin: left center; border-right: 1px solid rgba(255,157,77,0.25); }
//         .sp-door.right { right: 0; transform-origin: right center; border-left: 1px solid rgba(255,157,77,0.25); }
//         .sp-doors.sp-doors--open .sp-door.left { transform: rotateY(-112deg); }
//         .sp-doors.sp-doors--open .sp-door.right { transform: rotateY(112deg); }

//         .sp-door-stripes {
//           position: absolute;
//           top: 0; bottom: 0;
//           width: 14px;
//           background: repeating-linear-gradient(-45deg, var(--amber) 0 8px, #1b1206 8px 16px);
//           opacity: 0.85;
//         }
//         .sp-door.left .sp-door-stripes { right: 0; }
//         .sp-door.right .sp-door-stripes { left: 0; }

//         .sp-door-emblem {
//           position: absolute;
//           top: 50%;
//           transform: translateY(-50%);
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 10px;
//           color: var(--muted);
//         }
//         .sp-door.left .sp-door-emblem { right: 46px; align-items: flex-end; }
//         .sp-door.right .sp-door-emblem { left: 46px; align-items: flex-start; }
//         .sp-door-emblem span {
//           font-family: var(--font-mono);
//           font-size: 11px;
//           letter-spacing: 0.15em;
//         }
//         .sp-door-rivets {
//           position: absolute;
//           inset: 26px;
//           background-image: radial-gradient(circle, rgba(255,255,255,0.08) 1.5px, transparent 1.6px);
//           background-size: 46px 46px;
//           opacity: 0.5;
//         }

//         /* ---------- revealed content wrapper ---------- */
//         .sp-content {
//           position: relative;
//           z-index: 1;
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .sp * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
//         }
//       `}</style>

//       {showIntro && (
//         <div className="sp-intro-stage">
//           <canvas ref={canvasRef} className="sp-canvas" />
//           <div className="sp-nebula" aria-hidden="true">
//             <span /><span /><span />
//           </div>
//           <div className={`sp-intro ${phase === "impact" ? "sp-fading" : ""}`}>
//             <div className="sp-hud-corner tl" />
//             <div className="sp-hud-corner tr" />
//             <div className="sp-hud-corner bl" />
//             <div className="sp-hud-corner br" />
//             <div className="sp-hud-tag">
//               SECTOR 7 · DEEP SPACE · HULL INTEGRITY <b>100%</b>
//             </div>
//             <div className="sp-console">
//               <p className="sp-eyebrow">PORTFOLIO.SYS // BOOT SEQUENCE</p>
//               <h1 className="sp-title">
//                 ENTER <span>ORBIT</span>
//               </h1>
//               <p className="sp-tagline">
//                 Launch a meteor to breach the hull and reveal what's inside.
//               </p>
//               <button className="sp-ignite" onClick={ignite} disabled={phase !== "idle"}>
//                 {phase === "idle" ? "IGNITE" : "STANDBY..."}
//               </button>
//               <p className="sp-hint">or press enter</p>
//             </div>
//           </div>
//           {phase === "flying" && (
//             <div className="sp-meteor">
//               <MeteorMesh />
//             </div>
//           )}
//           {phase === "impact" && <div className="sp-flash" />}
//         </div>
//       )}

//       {showDoors && (
//         <div className={`sp-doors ${phase === "opening" ? "sp-doors--open" : ""}`}>
//           <div className="sp-door left">
//             <div className="sp-door-rivets" />
//             <div className="sp-door-stripes" />
//             <div className="sp-door-emblem">
//               <Rocket size={22} />
//               <span>{phase === "sealed" ? "SECURING HULL BREACH" : "ACCESS GRANTED"}</span>
//             </div>
//           </div>
//           <div className="sp-door right">
//             <div className="sp-door-rivets" />
//             <div className="sp-door-stripes" />
//             <div className="sp-door-emblem">
//               <Satellite size={22} />
//               <span>{phase === "sealed" ? "STAND BY" : "WELCOME ABOARD"}</span>
//             </div>
//           </div>
//         </div>
//       )}

//       {revealed && <div className="sp-content">{children}</div>}
//     </div>
//   );
// }