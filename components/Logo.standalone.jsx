/** Logo (HertzGo) — uses the real brand asset */
const Logo = ({ size = 30 }) => (
  <img
    src={window.__resources.logo}
    alt="HertzGo"
    style={{
      height: size,
      width: "auto",
      display: "block",
      mixBlendMode: "screen", // black bg drops out on dark backgrounds
      filter: "contrast(1.05)",
    }}
  />
);
window.Logo = Logo;
