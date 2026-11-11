import { useEffect, useState } from "react";
import { getInviteMode } from "./data/weddingData";
import HeroSection from "./components/HeroSection.jsx";
import ScratchReveal from "./components/ScratchReveal.jsx";
import FamiliesSection from "./components/FamiliesSection.jsx";
import SpecialNoteSection from "./components/SpecialNoteSection.jsx";
import EventsSection from "./components/EventsSection.jsx";
import RsvpSection from "./components/RsvpSection.jsx";

export default function Page() {
  const [inviteMode, setInviteMode] = useState(() => getInviteMode());

  useEffect(() => {
    const syncMode = () => setInviteMode(getInviteMode());
    window.addEventListener("hashchange", syncMode);
    window.addEventListener("popstate", syncMode);
    return () => {
      window.removeEventListener("hashchange", syncMode);
      window.removeEventListener("popstate", syncMode);
    };
  }, []);

  return (
    <>
      <div id="opening">
        <video id="opening-video" playsInline preload="auto" muted>
          <source src="opening-ashish.mp4" type="video/mp4" />
        </video>
        <div id="tap-hint">
          <div className="tap-ring">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4L20 12L6 20V4Z" fill="rgba(212,175,55,0.92)"></path>
            </svg>
          </div>
          <span className="tap-label">Tap to Open</span>
        </div>
      </div>

      <div id="petal-layer"></div>

      <button id="music-control" aria-label="Mute or unmute music">
        <svg
          className="disc"
          id="discIcon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="9" stroke="#D4AF37" strokeWidth="1.3"></circle>
          <circle cx="12" cy="12" r="2.4" fill="#D4AF37"></circle>
          <line
            className="mute-slash"
            x1="4.5"
            y1="19.5"
            x2="19.5"
            y2="4.5"
            stroke="#B76E79"
            strokeWidth="1.6"
            strokeLinecap="round"
          ></line>
        </svg>
      </button>

      <div id="yt-audio-host" className="yt-audio-host" aria-hidden="true">
        <div id="yt-player"></div>
      </div>

      <main id="site">
        <HeroSection />
        <ScratchReveal />
        <FamiliesSection />
        <SpecialNoteSection />
        <EventsSection key={`events-${inviteMode}`} inviteMode={inviteMode} />
        <RsvpSection key={`rsvp-${inviteMode}`} inviteMode={inviteMode} />
      </main>

      <footer id="footer" className="banner-section">
        <img
          className="banner-img"
          src="assets/footer.jpg"
          alt="Be our guest — Thank you from Isha & Ashish and families"
        />
      </footer>
    </>
  );
}
