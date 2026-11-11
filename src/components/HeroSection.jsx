import { WEDDING_DATA } from "../data/weddingData";
import { GoldDivider } from "./FloralFlourish";

export default function HeroSection() {
  return (
    <section id="hero" className="hero-editorial">
      <div className="hero-frame hero-floral-frame">
        <img
          className="hero-floral-bg"
          src="assets/hero-floral.jpg"
          alt=""
          aria-hidden="true"
        />
        <div className="hero-inner-card">
          <p className="hero-invite-lead" data-fade="">
            <span>Together With Our Families</span>
            <span>Request The Honour Of Your Presence</span>
            <span>At The Wedding Celebration Of</span>
          </p>

          <div className="hero-names-center">
            <h1 className="hero-couple-names" data-fade="">
              <span className="name-line">{WEDDING_DATA.couple.brideName}</span>
              <span className="hero-heart-flourish" aria-hidden="true">
                <svg viewBox="0 0 140 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 13C24 13 38 11 54 11"
                    stroke="#9C7842"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                  />
                  <path
                    d="M86 11C102 11 116 13 136 13"
                    stroke="#9C7842"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                  />
                  <path
                    d="M70 18.5C70 18.5 62 13.4 62 8.8C62 6.4 63.9 4.5 66.2 4.5C67.7 4.5 69.1 5.3 70 6.6C70.9 5.3 72.3 4.5 73.8 4.5C76.1 4.5 78 6.4 78 8.8C78 13.4 70 18.5 70 18.5Z"
                    stroke="#9C7842"
                    strokeWidth="1.2"
                    fill="rgba(212,175,55,0.12)"
                  />
                </svg>
              </span>
              <span className="name-line">{WEDDING_DATA.couple.groomName}</span>
            </h1>

            <GoldDivider />
          </div>
        </div>
      </div>

      <div className="scroll-cue">
        <span>Scroll</span>
        <span className="line"></span>
      </div>
    </section>
  );
}
