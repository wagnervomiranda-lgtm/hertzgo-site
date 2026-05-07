/** Photo gallery — floating marquee, no captions */
const Gallery = () => {
  // Absolute paths from site root — work regardless of base URL on Vercel
  const photos = [
    "/assets/photos/station-01.jpeg",
    "/assets/photos/station-08.jpeg",
    "/assets/photos/station-render.jpeg",
    "/assets/photos/station-04.jpeg",
    "/assets/photos/station-07.jpeg",
    "/assets/photos/station-05.jpeg",
    "/assets/photos/station-06.jpeg",
  ];
  const handleErr = (e) => {
    // If absolute path fails (e.g. local file:// preview), retry with relative
    const img = e.currentTarget;
    if (img.src.includes("/assets/") && !img.dataset.retried) {
      img.dataset.retried = "1";
      img.src = img.src.replace(/^.*\/assets\//, "assets/");
    }
  };
  return (
    <section className="gallery" id="gallery">
      <div className="wrap">
        <div className="float-head reveal">
          <div className="s-label">// na rua</div>
          <h2 className="t-display">Eletropostos <span style={{color:"var(--lime)"}}>operando</span> agora.</h2>
          <p>Estações construídas, ligadas e atendendo motoristas todos os dias em Brasília.</p>
        </div>
      </div>
      <div className="gallery-marquee reveal">
        <div className="gallery-track">
          {[...photos, ...photos].map((src, i) => (
            <figure key={i} className="g-card">
              <img src={src} alt="Eletroposto HertzGo" loading="lazy" onError={handleErr}/>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
window.Gallery = Gallery;

/** HertzGo App — driver app for charging + geolocation */
const HertzGoApp = () => {
  const features = [
    { num: "01", title: "Mapa em tempo real", desc: "Encontre eletropostos HertzGo próximos. Veja status de cada plug ao vivo — disponível, em uso, ou indisponível." },
    { num: "02", title: "Cobrança no app",    desc: "Pague pelo aplicativo. Sem fila no caixa, sem cartão de crédito na maquininha — autorize, recarregue, pronto." },
    { num: "03", title: "Histórico & faixa",  desc: "Acompanhe sessões, kWh consumidos, gasto mensal e a faixa atual do seu programa de fidelidade." },
    { num: "04", title: "Notificações",       desc: "Avisamos quando seu carro termina a recarga, quando há descontos na sua faixa e novidades da rede." },
  ];
  return (
    <section className="float-section app-float" id="app">
      <div className="float-bg" style={{backgroundImage:"url('/assets/photos/station-render.jpeg')"}}></div>
      <div className="float-scrim"></div>
      <div className="wrap">
        <div className="float-head reveal">
          <div className="s-label">// app oficial</div>
          <h2 className="t-display">App <span style={{color:"var(--teal-glow)"}}>HertzGo</span>:<br/>cobrança + geolocalização.</h2>
          <p>Aplicativo nativo iOS e Android. Encontre estações da rede HertzGo, acompanhe disponibilidade ao vivo e pague sua recarga direto pelo celular.</p>
        </div>

        <div className="app-stage reveal">
          <div className="app-phone-col">
            <div className="app-phone">
              <div className="apf-notch"></div>
              <div className="apf-screen">
                <div className="apf-status t-mono"><span>9:41</span><span>● 5G</span></div>
                <div className="apf-greet">Olá, motorista</div>
                <div className="apf-sub">3 estações próximas</div>

                <div className="apf-map">
                  <div className="apf-map-grid"></div>
                  <div className="apf-pin p1"><span className="pp"></span></div>
                  <div className="apf-pin p2"><span className="pp"></span></div>
                  <div className="apf-pin p3 hub"><span className="pp"></span><span className="pl">Park Way · 80kW</span></div>
                </div>

                <div className="apf-card">
                  <div className="apf-card-row">
                    <span className="apf-card-name">Park Way</span>
                    <span className="apf-card-status">● Livre</span>
                  </div>
                  <div className="apf-card-meta">DC 80kW · CCS · 1.2km</div>
                  <div className="apf-card-bar"><div className="apf-card-fill"></div></div>
                  <button className="apf-card-btn">RESERVAR PLUG</button>
                </div>

                <div className="apf-tabs">
                  <span className="apf-tab active">Mapa</span>
                  <span className="apf-tab">Sessões</span>
                  <span className="apf-tab">Carteira</span>
                  <span className="apf-tab">Perfil</span>
                </div>
              </div>
            </div>
          </div>

          <div className="app-info-col">
            {features.map((f, i) => (
              <div key={i} className="app-feat reveal" style={{transitionDelay:`${i*70}ms`}}>
                <div className="af-num t-mono">{f.num}</div>
                <div>
                  <div className="af-title">{f.title}</div>
                  <div className="af-desc">{f.desc}</div>
                </div>
              </div>
            ))}

            <div className="app-stores reveal">
              <a href="https://apps.apple.com/br/app/hertzgo/id6758301121" target="_blank" rel="noopener" className="store-btn">
                <svg width="20" height="22" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                <div className="sb-stack">
                  <span className="sb-small">Baixar na</span>
                  <span className="sb-big">App Store</span>
                </div>
              </a>
              <a href="https://play.google.com/store/apps/details?id=br.com.hertzgo.app" target="_blank" rel="noopener" className="store-btn">
                <svg width="20" height="22" viewBox="0 0 512 512" fill="currentColor"><path d="M325.3 234.3 104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                <div className="sb-stack">
                  <span className="sb-small">Disponível no</span>
                  <span className="sb-big">Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
window.HertzGoApp = HertzGoApp;

/** Vision — gestão app (operadores) */
const Vision = () => {
  const [tab, setTab] = React.useState(0);
  const screens = [
    { src: "/assets/vision/dashboard-01.png", title: "Status da Rede", desc: "Faturamento, energia, sessões e disponibilidade em tempo real — Move + Spott unificados." },
    { src: "/assets/vision/dashboard-03.png", title: "Histórico Anual", desc: "Faturamento mensal por estação, crescimento total, disponibilidade média anual." },
    { src: "/assets/vision/dashboard-02.png", title: "IA & Horário de Pico", desc: "Heatmap de pico, insights automáticos por IA e detecção de oportunidades." },
  ];
  const cur = screens[tab];
  const handleVisionErr = (e) => {
    const img = e.currentTarget;
    if (img.src.includes("/assets/") && !img.dataset.retried) {
      img.dataset.retried = "1";
      img.src = img.src.replace(/^.*\/assets\//, "assets/");
    }
  };

  return (
    <section className="float-section vision-float" id="vision">
      <div className="float-bg" style={{backgroundImage:"url('/assets/photos/station-render.jpeg')"}}></div>
      <div className="float-scrim deep"></div>
      <div className="wrap">
        <div className="float-head reveal">
          <div className="s-label">05 / Vision</div>
          <h2 className="t-display"><span style={{color:"var(--teal-glow)"}}>Vision</span>: o cérebro da rede.</h2>
          <p>Plataforma proprietária de gestão de eletropostos. Integra Move, Spott e qualquer protocolo OCPP. Consolida faturamento, energia e ocupação em um único painel — com IA que detecta padrões e prevê pico.</p>
        </div>

        <div className="vision-stage reveal">
          <div className="vision-tabs">
            {screens.map((s, i) => (
              <button key={i} className={`v-tab ${tab === i ? "active" : ""}`} onClick={() => setTab(i)}>
                <span className="v-tab-num t-mono">0{i + 1}</span>
                <span className="v-tab-title">{s.title}</span>
              </button>
            ))}
          </div>

          <div className="vision-screen">
            <div className="v-chrome">
              <span className="v-dot r"></span>
              <span className="v-dot y"></span>
              <span className="v-dot g"></span>
              <span className="v-url t-mono">vision.hertzgo.com.br · {cur.title}</span>
              <span className="v-live t-mono"><span className="dot"></span>LIVE</span>
            </div>
            <div className="v-image"><img src={cur.src} alt={cur.title} key={tab} onError={handleVisionErr} /></div>
          </div>
        </div>

        <div className="vision-features-stack reveal">
          {[
            { num: "01", title: "Painel unificado",  desc: "Move + Spott + OCPP. Tudo num lugar." },
            { num: "02", title: "Live ticker",       desc: "Receita e energia atualizando ao vivo." },
            { num: "03", title: "IA preditiva",      desc: "Antecipa pico e sugere campanhas." },
            { num: "04", title: "White-label",       desc: "Replicável para outras redes parceiras." },
          ].map((f, i) => (
            <div key={i} className="vf-row">
              <div className="vf-num t-mono">{f.num}</div>
              <div className="vf-title">{f.title}</div>
              <div className="vf-desc">{f.desc}</div>
            </div>
          ))}
        </div>

        <div className="vision-cta reveal">
          <div>
            <div className="t-eyebrow" style={{marginBottom:"10px"}}>// licenciamento</div>
            <h3 className="t-title" style={{fontSize:"clamp(24px,3vw,38px)",marginBottom:"10px"}}>Quer Vision na sua rede?</h3>
            <p style={{color:"#BCCEE6",fontSize:"14.5px",maxWidth:"54ch"}}>O Vision é replicável. Operadoras, postos e franquias podem licenciar a plataforma e ter o mesmo nível de gestão da HertzGo.</p>
          </div>
          <a className="btn btn-primary" href="https://wa.me/17547039131" target="_blank" rel="noopener">
            Falar com a equipe
            <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
};
window.Vision = Vision;

/** Course — Como abrir um eletroposto · sem preço, info solta */
const Course = () => (
  <section className="float-section course-float" id="curso">
    <div className="float-bg" style={{backgroundImage:"url('/assets/photos/station-render.jpeg')"}}></div>
    <div className="float-scrim deep"></div>
    <div className="wrap">
      <div className="float-head reveal">
        <div className="s-label">06 / Academia</div>
        <h2 className="t-display">Aprenda a montar seu <span style={{color:"var(--lime)"}}>eletroposto</span>.</h2>
        <p>Curso completo da HertzGo: do projeto elétrico ao ROI. Quem opera a maior rede solar DC do DF te ensina a abrir, operar e escalar um eletroposto rentável.</p>
      </div>

      <div className="modules-stack">
        {[
          ["01","Estudo de viabilidade","Análise de localização, demanda projetada, ticket médio e payback realista."],
          ["02","Projeto elétrico & solar","Dimensionamento da entrada, transformador, painel, geração própria."],
          ["03","Equipamentos & fornecedores","DC 30/60/80/120 kW + AC. Comparativo, especificações, garantias."],
          ["04","Plataforma & cobrança","Move, Spott, OCPP. Como integrar, precificar e operar."],
          ["05","Operação & manutenção","Suporte ao motorista, telemetria, gestão de falhas, SLA."],
          ["06","Escala & franquia","Como replicar, captar parceiros e construir uma rede regional."],
        ].map(([n,t,d], i) => (
          <div key={n} className="mod-row reveal" style={{transitionDelay:`${i*50}ms`}}>
            <div className="mr-num t-mono">{n}</div>
            <div className="mr-body">
              <div className="mr-title">{t}</div>
              <div className="mr-desc">{d}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="course-cta reveal">
        <div>
          <div className="t-eyebrow" style={{marginBottom:"10px"}}>// turma 2026 · inscrições abertas</div>
          <h3 className="t-title" style={{fontSize:"clamp(28px,3.5vw,44px)",marginBottom:"12px"}}>HertzGo Academy</h3>
          <p style={{color:"#BCCEE6",fontSize:"15px",maxWidth:"52ch",lineHeight:1.55}}>
            6 módulos · 24h de conteúdo · planilhas de viabilidade · templates · mentoria mensal · visita técnica ao Park Way (DF).
          </p>
        </div>
        <a className="btn btn-lime" href="https://wa.me/17547039131" target="_blank" rel="noopener">
          Quero me inscrever
          <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
    </div>
  </section>
);
window.Course = Course;
