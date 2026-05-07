/** Animated hero background — grid + drifting particles + connection lines */
const HeroBg = () => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf, w, h, dpr;
    const particles = [];
    const N = 60;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < N; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.4,
        hue: Math.random() < 0.15 ? "lime" : "teal",
      });
    }

    let mouse = { x: w / 2, y: h / 2 };
    const onMove = (e) => {
      const rect = c.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // mouse parallax pull
        const dxm = mouse.x - p.x, dym = mouse.y - p.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < 180) {
          p.x += (dxm / dm) * 0.15;
          p.y += (dym / dm) * 0.15;
        }

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.hypot(dx, dy);
          if (d < 130) {
            const a = (1 - d / 130) * 0.18;
            ctx.strokeStyle = `rgba(34,224,242,${a})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      // Particles
      for (const p of particles) {
        const color = p.hue === "lime" ? "#B5F02A" : "#22E0F2";
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};
window.HeroBg = HeroBg;
