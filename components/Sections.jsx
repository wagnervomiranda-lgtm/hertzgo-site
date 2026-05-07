/** Counter that animates from 0 to target on view */
const useInView = (ref, threshold = 0.2) => {
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return vis;
};

const Counter = ({ to, duration = 1800, fmt = (v) => v.toLocaleString("pt-BR") }) => {
  const ref = React.useRef(null);
  const vis = useInView(ref);
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!vis) return;
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    let raf;
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setVal(Math.floor(ease(t) * to));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [vis, to, duration]);
  return <span ref={ref}>{fmt(val)}</span>;
};
window.Counter = Counter;

/** Hero */
const Hero = () => (
  <section className="hero" id="top">
    <div className="hero-bg">
      <div className="hero-photo"></div>
      <HeroBg />
    </div>
    <div className="wrap hero-inner">
      <div className="hero-eyebrow t-mono" style={{fontSize:"11px",letterSpacing:"0.18em",color:"var(--teal-glow)",textTransform:"uppercase"}}>
        <span className="dot"></span>
        <span>Rede DC ativa em Brasília</span>
      </div>
      <h1 className="t-display">
        Recarga rápida <span className="accent">DC</span> para veículos <span className="lime">elétricos</span>.
      </h1>
      <p className="lead">
        Rede inteligente de eletropostos em Brasília, alimentada por <strong style={{color:"var(--ink)"}}>usina solar própria</strong>.
        Carregadores de <strong style={{color:"var(--teal-glow)"}}>30 a 120 kW DC</strong> + AC 11/22 kW. Compatível com toda a frota elétrica do mercado.
      </p>
      <div className="hero-actions">
        <a className="btn btn-primary" href="#app">
          Baixe o App
          <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
        <a className="btn btn-wa" href="https://wa.me/17547039131" target="_blank" rel="noopener">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488"/>
          </svg>
          Seja um Parceiro
        </a>
      </div>
      <div className="hero-meta">
        <div className="item"><span style={{color:"var(--teal-glow)"}}>●</span> <span className="v">5</span> estações</div>
        <div className="sep"></div>
        <div className="item"><span style={{color:"var(--lime)"}}>◆</span> <span className="v">30→120</span> kW</div>
        <div className="sep"></div>
        <div className="item"><span style={{color:"var(--teal-glow)"}}>↗</span> <span className="v">3.500+</span> usuários</div>
        <div className="sep"></div>
        <div className="item t-mono">solar · CO₂ neutro</div>
      </div>
    </div>
    <div className="hero-scroll">
      <span>SCROLL</span>
      <span className="line"></span>
    </div>
  </section>
);
window.Hero = Hero;

/** Stats — floating numbers over fixed parallax background */
const Stats = () => (
  <section className="float-section stats-float" id="numeros">
    <div className="float-bg" style={{backgroundImage:"url('/assets/photos/station-01.jpeg')"}}></div>
    <div className="float-scrim"></div>
    <div className="wrap">
      <div className="float-head reveal">
        <div className="s-label">01 / Performance</div>
        <h2 className="t-display">Números que <span style={{color:"var(--lime)"}}>movem</span>.</h2>
      </div>

      <div className="stats-stack">
        {[
          { num: "01", label: "Usuários ativos",   value: 3500,  unit: "+",   desc: "Motoristas elétricos na nossa rede" },
          { num: "02", label: "Energia entregue",  value: 72965, unit: "kWh", desc: "Total acumulado · solar · CO₂ neutro", lime: true },
          { num: "03", label: "Sessões realizadas", value: 14820, unit: "",  desc: "Recargas concluídas na rede" },
          { num: "04", label: "Estações ativas",   value: 5,     unit: "",    desc: "Em operação no Distrito Federal" },
        ].map((s, i) => (
          <div key={i} className={`stat-row reveal ${s.lime ? "lime" : ""}`} style={{transitionDelay:`${i*70}ms`}}>
            <div className="sr-num t-mono">{s.num}</div>
            <div className="sr-label t-mono">{s.label}</div>
            <div className="sr-value">
              {s.prefix || ""}<Counter to={s.value} />
              {s.unit && <span className="sr-unit">{s.unit}</span>}
            </div>
            <div className="sr-desc">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
window.Stats = Stats;

/** Tech — floating spec list, no cards */
const Tech = () => {
  const chargers = [
    { kw: 11,  type: "AC", time: "6–8h",     plug: "Tipo 2",            tone: "" },
    { kw: 22,  type: "AC", time: "3–4h",     plug: "Tipo 2 trifásico",  tone: "" },
    { kw: 30,  type: "DC", time: "60–90min", plug: "CCS Combo 2",       tone: "teal" },
    { kw: 60,  type: "DC", time: "35–55min", plug: "CCS Combo 2",       tone: "teal" },
    { kw: 80,  type: "DC", time: "30–45min", plug: "CCS Combo 2",       tone: "teal-glow" },
    { kw: 120, type: "DC", time: "20–30min", plug: "CCS Combo 2",       tone: "lime", flag: "TOP" },
  ];
  return (
    <section className="float-section tech-float" id="tecnologia">
      <div className="float-bg" style={{backgroundImage:"url('/assets/photos/station-04.jpeg')"}}></div>
      <div className="float-scrim deep"></div>
      <div className="wrap">
        <div className="float-head reveal">
          <div className="s-label">03 / Tecnologia</div>
          <h2 className="t-display">Linha completa <span style={{color:"var(--teal-glow)"}}>30 → 120 kW</span>.</h2>
          <p>Da recarga residencial AC ao DC ultrarrápido. Hardware industrial OCPP-compliant, monitorado 24/7 pelo painel Vision.</p>
        </div>

        <div className="charger-stack">
          {chargers.map((c, i) => (
            <div key={i} className={`ch-row reveal ${c.tone}`} style={{transitionDelay:`${i*60}ms`}}>
              <div className="ch-type t-mono">{c.type}</div>
              <div className="ch-kw">
                <span className="ch-num">{c.kw}</span>
                <span className="ch-unit">kW</span>
              </div>
              <div className="ch-bar"><div className="ch-bar-fill" style={{width:`${Math.min((c.kw/120)*100,100)}%`}}></div></div>
              <div className="ch-time t-mono">{c.time}</div>
              <div className="ch-plug">{c.plug}</div>
              {c.flag && <div className="ch-flag t-mono">{c.flag}</div>}
            </div>
          ))}
        </div>

        <div className="tech-meta reveal">
          <div className="tm-block">
            <div className="t-eyebrow">Plugues compatíveis</div>
            <div className="tm-tags">
              <span className="tm-tag">CCS Combo 2 · DC</span>
              <span className="tm-tag">Tipo 2 · AC</span>
            </div>
          </div>
          <div className="tm-block">
            <div className="t-eyebrow">Frota compatível</div>
            <div className="tm-tags">
              {["BYD","Tesla","Volvo","Volkswagen","Hyundai","Kia","GWM","Renault","Nissan","+ outras"].map(b => (
                <span key={b} className="tm-tag muted">{b}</span>
              ))}
            </div>
          </div>
          <div className="tm-block">
            <div className="t-eyebrow">Operação</div>
            <div className="tm-line">Monitoramento <span className="hi">24/7</span></div>
            <div className="tm-line">Energia <span className="hi-lime">100% solar</span></div>
            <div className="tm-line">SLA suporte <span className="hi">0800</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};
window.Tech = Tech;

/** Differentials — floating headlines with thin underlines, no cards */
const Diffs = () => {
  const items = [
    { num: "01", title: "Usina solar própria", desc: "Geramos a energia que você consome — usina fotovoltaica dedicada ao abastecimento da rede.", hi: "100% solar", lime: true },
    { num: "02", title: "App nativo iOS / Android", desc: "Encontre estações, geolocalize plugues livres, pague pelo app e acompanhe a recarga em tempo real.", hi: "HertzGo App" },
    { num: "03", title: "Preço competitivo, sem assinatura", desc: "Tarifa transparente. Pague apenas o que consumir, em qualquer estação da rede HertzGo.", hi: "Sem mensalidade" },
    { num: "04", title: "Rede em expansão", desc: "Cinco estações ativas, novas chegando em 2026. Mapeando os corredores DF → Goiás → Minas.", hi: "+15 em 2026" },
  ];
  return (
    <section className="float-section diffs-float" id="diferenciais">
      <div className="float-bg" style={{backgroundImage:"url('/assets/photos/station-08.jpeg')"}}></div>
      <div className="float-scrim"></div>
      <div className="wrap">
        <div className="float-head reveal">
          <div className="s-label">04 / Diferenciais</div>
          <h2 className="t-display">Por que <span style={{color:"var(--teal-glow)"}}>HertzGo</span>.</h2>
        </div>

        <div className="diffs-stack">
          {items.map((d, i) => (
            <div key={i} className={`diff-row reveal ${d.lime ? "lime" : ""}`} style={{transitionDelay:`${i*80}ms`}}>
              <div className="dr-num t-mono">{d.num}</div>
              <div className="dr-body">
                <h3 className="dr-title">{d.title}</h3>
                <p className="dr-desc">{d.desc}</p>
              </div>
              <div className="dr-hi t-mono">{d.hi}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
window.Diffs = Diffs;

/** CTA strip — minimal floating */
const CTA = () => (
  <section className="cta-float">
    <div className="wrap">
      <div className="cta-stack reveal">
        <div className="t-eyebrow" style={{marginBottom:"18px"}}>// junte-se à rede</div>
        <h2 className="t-display" style={{fontSize:"clamp(40px,6.5vw,88px)",marginBottom:"28px"}}>
          Pronto para <span style={{color:"var(--teal-glow)"}}>acelerar</span><br/>em energia limpa?
        </h2>
        <p style={{fontSize:"18px",color:"#BCCEE6",maxWidth:"58ch",marginBottom:"36px",lineHeight:1.5}}>
          Baixe o app HertzGo, encontre a estação mais próxima e recarregue com a confiança de quem opera a maior rede solar DC do DF.
        </p>
        <div className="cta-actions">
          <a className="btn btn-lime" href="#app">
            Baixar o App HertzGo
            <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
          <a className="btn btn-wa" href="https://wa.me/17547039131" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488"/>
            </svg>
            Falar com a equipe
          </a>
        </div>
      </div>
    </div>
  </section>
);
window.CTA = CTA;

const Footer = () => (
  <footer>
    <div className="wrap">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="nav-logo"><Logo size={32} /></div>
          <p>Rede de eletropostos DC com energia solar própria. Brasília, Distrito Federal — em expansão para o centro-oeste.</p>
        </div>
        <div className="footer-col">
          <h4>Navegação</h4>
          <ul>
            <li><a href="#numeros">Números</a></li>
            <li><a href="#rede">Rede</a></li>
            <li><a href="#tecnologia">Tecnologia</a></li>
            <li><a href="#app">App HertzGo</a></li>
            <li><a href="#fidelidade">Fidelidade</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contato</h4>
          <ul>
            <li><a href="tel:+5561998037361">(61) 99803-7361</a></li>
            <li><a href="mailto:contato@hertzgo.com.br">contato@hertzgo.com.br</a></li>
            <li><a href="https://wa.me/17547039131" target="_blank" rel="noopener">Seja um parceiro</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Social</h4>
          <div className="socials">
            <a href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="18" cy="6" r="1" fill="currentColor"/></svg></a>
            <a href="#" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 10-4 0v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
            <a href="#" aria-label="WhatsApp"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.5.1-.2 0-.3 0-.5s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.9 4.3 1.8.7 2.5.8 3.4.7.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.6-.4z M12 2C6.5 2 2 6.5 2 12c0 1.7.4 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg></a>
            <a href="#" aria-label="X"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
          </div>
          <div style={{marginTop:"20px"}}>
            <h4>Suporte</h4>
            <ul><li style={{color:"#BCCEE6",fontSize:"13px",fontFamily:"JetBrains Mono, monospace"}}>0800 · 24/7</li></ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 HERTZGO · BRASÍLIA / DF</div>
        <div>POWERED BY SOLAR ☀ · CARBON NEUTRAL</div>
      </div>
    </div>
  </footer>
);
window.Footer = Footer;
