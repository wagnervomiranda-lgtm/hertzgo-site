/** Splash intro — connectivity animation finishing on HertzGo logo */
const Splash = () => {
  const [phase, setPhase] = React.useState("network"); // network -> reveal -> done
  const [hidden, setHidden] = React.useState(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("hg_splash_seen") === "1") return true;
    return false;
  });

  // Generate a network of nodes — must be called BEFORE any early return
  const nodes = React.useMemo(() => {
    const arr = [];
    const cx = 50, cy = 50;
    for (let i = 0; i < 14; i++) {
      const ang = (i / 14) * Math.PI * 2;
      const r = 28 + (i % 3) * 6;
      arr.push({ x: cx + Math.cos(ang) * r, y: cy + Math.sin(ang) * r, d: i * 0.06 });
    }
    return arr;
  }, []);

  React.useEffect(() => {
    if (hidden) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setPhase("reveal"), 1800);
    const t2 = setTimeout(() => setPhase("done"), 3200);
    const t3 = setTimeout(() => {
      setHidden(true);
      document.body.style.overflow = "";
      sessionStorage.setItem("hg_splash_seen", "1");
    }, 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); document.body.style.overflow = ""; };
  }, [hidden]);

  if (hidden) return null;

  return (
    <div className={`splash ${phase}`}>
      <svg className="splash-net" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="nodeG"><stop offset="0%" stopColor="#22E0F2"/><stop offset="100%" stopColor="#22E0F2" stopOpacity="0"/></radialGradient>
        </defs>
        {/* Lines from center to each node */}
        {nodes.map((n, i) => (
          <line key={`l${i}`} x1="50" y1="50" x2={n.x} y2={n.y}
            stroke="#22E0F2" strokeWidth="0.15" strokeOpacity="0.5"
            strokeDasharray="40" strokeDashoffset="40"
            style={{ animation: `splash-line 0.9s ${n.d}s ease-out forwards` }} />
        ))}
        {/* Cross-connections between adjacent ring nodes */}
        {nodes.map((n, i) => {
          const m = nodes[(i + 1) % nodes.length];
          return (
            <line key={`x${i}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y}
              stroke="#22E0F2" strokeWidth="0.1" strokeOpacity="0.3"
              strokeDasharray="20" strokeDashoffset="20"
              style={{ animation: `splash-line 0.7s ${0.6 + i * 0.04}s ease-out forwards` }} />
          );
        })}
        {/* Nodes */}
        {nodes.map((n, i) => (
          <circle key={`n${i}`} cx={n.x} cy={n.y} r="0.5"
            fill="#B5F02A"
            style={{ animation: `splash-node 0.6s ${n.d}s ease-out forwards`, opacity: 0 }} />
        ))}
        {/* Center pulse */}
        <circle cx="50" cy="50" r="1.5" fill="#22E0F2" className="splash-core"/>
      </svg>

      <div className="splash-content">
        <div className="splash-mono">CONECTANDO REDE · BRASÍLIA · DF</div>
        <div className="splash-logo-wrap">
          <img src="/assets/logo-hertzgo.jpeg" alt="HertzGo" className="splash-logo"/>
        </div>
        <div className="splash-tag">RECARGA RÁPIDA · ENERGIA SOLAR</div>
      </div>
    </div>
  );
};
window.Splash = Splash;

/** Fixed pulsing logo — bottom-right corner */
const FixedLogo = () => {
  return (
    <a href="#top" className="fixed-logo" aria-label="Voltar ao topo">
      <span className="fl-pulse"></span>
      <span className="fl-pulse fl-pulse-2"></span>
      <img src="/assets/logo-hertzgo.jpeg" alt="HertzGo"/>
    </a>
  );
};
window.FixedLogo = FixedLogo;

/** Loyalty Program — Bronze / Silver / Golden / Platinum, no prices, floating */
const Loyalty = () => {
  const tiers = [
    { name: "Bronze",   threshold: "150+",  unit: "kWh/mês", color: "bronze",   pct: 25,
      perk: "Tarifa preferencial · faixa de entrada do programa." },
    { name: "Silver",   threshold: "350+",  unit: "kWh/mês", color: "silver",   pct: 50,
      perk: "Desconto progressivo · prioridade em horários de pico." },
    { name: "Golden",   threshold: "550+",  unit: "kWh/mês", color: "golden",   pct: 75,
      perk: "Tarifa reduzida · reservas no app · suporte premium." },
    { name: "Platinum", threshold: "750+",  unit: "kWh/mês", color: "platinum", pct: 100, flag: "TOP",
      perk: "Tarifa máxima · benefícios exclusivos · acesso antecipado a novas estações." },
  ];
  return (
    <section className="float-section loyalty-float" id="fidelidade">
      <div className="float-bg" style={{backgroundImage:"url('/assets/photos/station-05.jpeg')"}}></div>
      <div className="float-scrim deep"></div>
      <div className="wrap">
        <div className="float-head reveal">
          <div className="s-label">// programa de fidelidade</div>
          <h2 className="t-display">Quanto mais você carrega,<br/><span style={{color:"var(--lime)"}}>mais benefícios</span>.</h2>
          <p>Quatro faixas progressivas. Acumule kWh recarregados na rede HertzGo a cada mês e desbloqueie tarifas reduzidas e vantagens exclusivas.</p>
        </div>

        <div className="loyalty-stack reveal">
          {tiers.map((t, i) => (
            <div key={i} className={`loy-row tier-${t.color}`} style={{transitionDelay: `${i * 80}ms`}}>
              {t.flag && <div className="loy-flag t-mono">{t.flag}</div>}
              <div className="loy-tier">
                <span className="loy-medal" aria-hidden="true"></span>
                <span className="loy-name">{t.name}</span>
              </div>
              <div className="loy-thresh">
                <span className="loy-num">{t.threshold}</span>
                <span className="loy-unit t-mono">{t.unit}</span>
              </div>
              <div className="loy-bar">
                <div className="loy-bar-fill" style={{width: `${t.pct}%`}}></div>
              </div>
              <div className="loy-perk">{t.perk}</div>
            </div>
          ))}
        </div>

        <div className="loyalty-meta-stack reveal">
          <div className="lm-row">
            <div className="lm-num t-mono">+</div>
            <div className="lm-title">Recarga grátis a cada 50 sessões</div>
            <div className="lm-desc">Bonificação automática creditada na sua conta.</div>
          </div>
          <div className="lm-row">
            <div className="lm-num t-mono">+</div>
            <div className="lm-title">Faixa atualiza no app, em tempo real</div>
            <div className="lm-desc">Você acompanha o quanto falta para subir de nível.</div>
          </div>
          <div className="lm-row">
            <div className="lm-num t-mono">+</div>
            <div className="lm-title">Reset trimestral, mantém os benefícios</div>
            <div className="lm-desc">Quem chegou Platinum, fica Platinum. Vantagens permanentes.</div>
          </div>
        </div>
      </div>
    </section>
  );
};
window.Loyalty = Loyalty;
