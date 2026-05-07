/** Brasília station map — info floating over background map image, no side card */
const STATIONS = [
  { id: "parkway",  name: "Park Way",              region: "Park Way · DF",     x: 48, y: 62, hub: true, dc: 80,  ac: 11, plugs: 3, note: "Hub principal · Usina solar" },
  { id: "costa",    name: "Costa Atacadão",         region: "Águas Claras · DF", x: 36, y: 50,             dc: 120, ac: 22, plugs: 3, note: "Águas Claras" },
  { id: "auto",     name: "Cidade do Automóvel",    region: "SIA · DF",          x: 42, y: 38,             dc: 60,  ac: 11, plugs: 2, note: "SIA" },
  { id: "mamute",   name: "Lava Jato do Mamute",    region: "Octogonal · DF",    x: 56, y: 32,             dc: 30,  ac: 0,  plugs: 1, note: "Octogonal" },
  { id: "madeiro",  name: "Madeiro & Gerônimo",     region: "SIA · DF",          x: 64, y: 48,             dc: 60,  ac: 0,  plugs: 1, note: "SIA" },
];

const MapSection = () => {
  const [active, setActive] = React.useState("parkway");

  return (
    <section className="network network-bare" id="rede">
      <div className="orb orb-1"></div>
      <div className="wrap">
        <div className="section-head reveal">
          <div className="s-label">02 / Rede</div>
          <h2 className="t-display">Brasília inteira <span style={{color:"var(--teal-glow)"}}>conectada</span>.</h2>
          <p>Cinco eletropostos DC operando em pontos estratégicos do DF. Mais estações em expansão para 2026, conectando Plano Piloto, Águas Claras e cidades-satélite.</p>
        </div>

        <div className="map-bare reveal">
          {/* Connections SVG layered over the background map image */}
          <svg className="map-bare-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="connStroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22E0F2" stopOpacity="0.55"/>
                <stop offset="100%" stopColor="#03A4BD" stopOpacity="0.25"/>
              </linearGradient>
            </defs>

            {/* Connecting lines between stations */}
            {STATIONS.map((s, i) =>
              STATIONS.slice(i + 1).map((t, j) => (
                <line key={`${s.id}-${t.id}`} x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                  stroke="url(#connStroke)" strokeWidth="0.18" strokeDasharray="0.6 0.8"/>
              ))
            )}

            {/* Subtle major roads */}
            <path d="M 30 28 L 70 78" stroke="rgba(255,255,255,0.05)" strokeWidth="0.25"/>
            <path d="M 25 55 L 75 50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.25"/>

            {/* Region labels */}
            <text x="48" y="20" fontFamily="JetBrains Mono, monospace" fontSize="2" fill="#5A6E8A" letterSpacing="0.3">PLANO PILOTO</text>
            <text x="22" y="50" fontFamily="JetBrains Mono, monospace" fontSize="1.8" fill="#5A6E8A" letterSpacing="0.3">ÁGUAS CLARAS</text>
            <text x="70" y="85" fontFamily="JetBrains Mono, monospace" fontSize="1.8" fill="#5A6E8A" letterSpacing="0.3">PARK WAY</text>
          </svg>

          {/* Pins */}
          {STATIONS.map((s) => (
            <button key={s.id}
              className={`map-pin ${s.hub ? "hub" : ""} ${active === s.id ? "active" : ""}`}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              onClick={() => setActive(s.id)}
              aria-label={s.name}>
              <span className="map-label">{s.name}</span>
            </button>
          ))}

          {/* Floating info — top right */}
          <div className="map-bare-coords">
            <div>BRASÍLIA · DF</div>
            <div>15°47′S 47°52′W</div>
            <div className="live">● LIVE NETWORK</div>
          </div>

          {/* Floating legend — bottom left */}
          <div className="map-bare-legend">
            <div className="item"><span className="swatch" style={{background:"#B5F02A"}}></span>Hub solar</div>
            <div className="item"><span className="swatch" style={{background:"#22E0F2"}}></span>Estação DC</div>
          </div>

          {/* Floating stats — bottom right */}
          <div className="map-bare-stats">
            <div className="mbs-row">
              <span className="mbs-num">5</span>
              <span className="mbs-lbl">estações<br/>ativas</span>
            </div>
            <div className="mbs-row">
              <span className="mbs-num" style={{color:"var(--teal-glow)"}}>30→120</span>
              <span className="mbs-lbl">kW DC<br/>disponíveis</span>
            </div>
            <div className="mbs-row">
              <span className="mbs-num" style={{color:"var(--lime)"}}>+15</span>
              <span className="mbs-lbl">novas em<br/>2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
window.MapSection = MapSection;
