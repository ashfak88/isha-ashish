export function FloralSprig({ className = "" }) {
  return (
    <div className={`floral-sprig-wrap ${className}`} aria-hidden="true">
      <img
        src="assets/floral-cluster.jpg"
        alt=""
        className="floral-sprig-img"
        loading="lazy"
      />
    </div>
  );
}

export function GoldDivider() {
  return (
    <div className="ornament-divider" aria-hidden="true">
      <svg viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 12H72" stroke="#D4AF37" strokeWidth="0.9" strokeOpacity="0.65" />
        <path d="M108 12H170" stroke="#D4AF37" strokeWidth="0.9" strokeOpacity="0.65" />
        <path
          d="M90 4C92.5 8 96 10 96 12C96 14 92.5 16 90 20C87.5 16 84 14 84 12C84 10 87.5 8 90 4Z"
          stroke="#D4AF37"
          strokeWidth="1.1"
          fill="rgba(212,175,55,0.18)"
        />
        <circle cx="77" cy="12" r="1.8" fill="#B76E79" fillOpacity="0.7" />
        <circle cx="103" cy="12" r="1.8" fill="#B76E79" fillOpacity="0.7" />
      </svg>
    </div>
  );
}

export function CornerBotanical({ className = "" }) {
  return (
    <svg
      className={`corner-botanical ${className}`}
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 162C18 118 42 74 86 42C112 23 142 14 166 12"
        stroke="#D4AF37"
        strokeWidth="1.1"
        strokeOpacity="0.55"
        strokeLinecap="round"
      />
      <path
        d="M28 134C46 124 62 110 72 92"
        stroke="#D4AF37"
        strokeWidth="0.9"
        strokeOpacity="0.45"
        strokeLinecap="round"
      />
      <path
        d="M52 84C38 72 34 52 44 38C58 46 66 64 52 84Z"
        fill="rgba(183,110,121,0.14)"
        stroke="#B76E79"
        strokeWidth="0.9"
        strokeOpacity="0.55"
      />
      <path
        d="M94 54C84 38 88 20 104 14C112 28 110 44 94 54Z"
        fill="rgba(212,175,55,0.14)"
        stroke="#D4AF37"
        strokeWidth="0.9"
        strokeOpacity="0.6"
      />
      <path
        d="M72 98C90 92 108 96 118 110C100 116 82 112 72 98Z"
        fill="rgba(183,110,121,0.12)"
        stroke="#B76E79"
        strokeWidth="0.9"
        strokeOpacity="0.5"
      />
      <circle cx="42" cy="112" r="10" fill="rgba(183,110,121,0.12)" stroke="#B76E79" strokeWidth="0.8" />
      <circle cx="42" cy="112" r="4" fill="rgba(212,175,55,0.45)" />
      <circle cx="126" cy="30" r="6" fill="rgba(212,175,55,0.18)" stroke="#D4AF37" strokeWidth="0.8" />
      <circle cx="24" cy="148" r="3" fill="#D4AF37" fillOpacity="0.5" />
    </svg>
  );
}
