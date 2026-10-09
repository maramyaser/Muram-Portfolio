import { useEffect, useRef } from "react";


export default function SpaceBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let w, h;
    let stars = [];
    const layers = [
      { count: 90, speed: 0.05, size: [0.4, 1.1], alpha: [0.25, 0.55] },
      { count: 55, speed: 0.12, size: [0.8, 1.6], alpha: [0.4, 0.75] },
      { count: 30, speed: 0.22, size: [1.2, 2.1], alpha: [0.6, 1] },
    ];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = canvas.offsetWidth * dpr;
      h = canvas.height = canvas.offsetHeight * dpr;
    }

    function init() {
      resize();
      stars = [];
      layers.forEach((layer, li) => {
        for (let i = 0; i < layer.count; i++) {
          stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r:
              (layer.size[0] +
                Math.random() * (layer.size[1] - layer.size[0])) *
              (window.devicePixelRatio || 1),
            a: layer.alpha[0] + Math.random() * (layer.alpha[1] - layer.alpha[0]),
            speed: layer.speed * (window.devicePixelRatio || 1),
            layer: li,
            phase: Math.random() * Math.PI * 2,
          });
        }
      });
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      const mx = (mouseRef.current.x - 0.5) * 40;
      const my = (mouseRef.current.y - 0.5) * 24;
      for (const s of stars) {
        if (!reducedMotion.current) {
          s.x -= s.speed;
          if (s.x < -6) s.x = w + 6;
        }
        const twinkle = reducedMotion.current
          ? s.a
          : s.a * (0.7 + 0.3 * Math.sin(t / 900 + s.phase));
        const parallax = (s.layer + 1) * 3;
        ctx.beginPath();
        ctx.fillStyle = `rgba(233,238,255,${twinkle})`;
        ctx.arc(
          s.x + mx * parallax * 0.06,
          s.y + my * parallax * 0.06,
          s.r,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    init();
    raf = requestAnimationFrame(draw);
    const onResize = () => init();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="sbg">
      <style>{`
        .sbg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: radial-gradient(ellipse at 50% -10%, #10182c 0%, #05060b 55%, #05060b 100%);
          overflow: hidden;
        }
        .sbg-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .sbg-nebula {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .sbg-nebula span {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.35;
          mix-blend-mode: screen;
        }
        .sbg-nebula span:nth-child(1) {
          width: 46vw; height: 46vw; left: -12vw; top: -8vw;
          background: radial-gradient(circle, #3a2d7a 0%, transparent 70%);
          animation: sbg-drift1 26s ease-in-out infinite alternate;
        }
        .sbg-nebula span:nth-child(2) {
          width: 38vw; height: 38vw; right: -10vw; top: 10vw;
          background: radial-gradient(circle, #7a3d2d 0%, transparent 70%);
          animation: sbg-drift2 32s ease-in-out infinite alternate;
        }
        .sbg-nebula span:nth-child(3) {
          width: 30vw; height: 30vw; left: 30vw; bottom: -12vw;
          background: radial-gradient(circle, #1f3d6e 0%, transparent 70%);
          animation: sbg-drift1 22s ease-in-out infinite alternate-reverse;
        }
        @keyframes sbg-drift1 { from { transform: translate(0,0); } to { transform: translate(4vw, 3vw); } }
        @keyframes sbg-drift2 { from { transform: translate(0,0); } to { transform: translate(-3vw, -4vw); } }

        @media (prefers-reduced-motion: reduce) {
          .sbg * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>
      <canvas ref={canvasRef} className="sbg-canvas" />
      <div className="sbg-nebula" aria-hidden="true">
        <span /><span /><span />
      </div>
    </div>
  );
}