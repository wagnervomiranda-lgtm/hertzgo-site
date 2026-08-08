/** Logo (HertzGo) — real brand asset + ® mark */
const Logo = ({ size = 30 }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "flex-start",
      lineHeight: 1,
      gap: 2,
    }}
  >
    <img
      src="/assets/logo-hertzgo.jpeg"
      alt="HertzGo"
      style={{
        height: size,
        width: "auto",
        display: "block",
        mixBlendMode: "screen", // black bg drops out on dark backgrounds
        filter: "contrast(1.05)",
      }}
    />
    <span
      aria-hidden="true"
      style={{
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        fontWeight: 600,
        fontSize: Math.max(9, Math.round(size * 0.36)),
        color: "var(--teal-glow, #22E0F2)",
        marginTop: Math.max(2, Math.round(size * 0.08)),
        marginLeft: 2,
        letterSpacing: 0,
        userSelect: "none",
      }}
    >
      ®
    </span>
  </span>
);
window.Logo = Logo;
