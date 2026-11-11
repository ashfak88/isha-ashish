import { WEDDING_DATA } from "../data/weddingData";
import { GoldDivider } from "./FloralFlourish";

function EventIcon({ id }) {
  if (id === "mehandi") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 21C12 21 5 16.2 5 10C5 5.8 8.2 3 12 3C15.8 3 19 5.8 19 10C19 16.2 12 21 12 21Z"
          stroke="#D4AF37"
          strokeWidth="1.3"
        />
        <path
          d="M12 7V16M9 11.5C10.5 11.5 11.5 10.5 12 9C12.5 10.5 13.5 11.5 15 11.5"
          stroke="#B76E79"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (id === "haldi") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" stroke="#D4AF37" strokeWidth="1.3" />
        <path
          d="M12 2.5V5M12 19V21.5M2.5 12H5M19 12H21.5M5.3 5.3L7.1 7.1M16.9 16.9L18.7 18.7M18.7 5.3L16.9 7.1M7.1 16.9L5.3 18.7"
          stroke="#D4AF37"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9.2" cy="12.5" r="5" stroke="#D4AF37" strokeWidth="1.3" />
      <circle cx="14.8" cy="12.5" r="5" stroke="#B76E79" strokeWidth="1.3" />
      <path d="M12 4.5L13.2 6.5H10.8L12 4.5Z" stroke="#D4AF37" strokeWidth="1.2" />
    </svg>
  );
}

export default function EventsSection() {
  return (
    <section className="section section-tinted" id="events">
      <div className="container">
        <div className="section-head" data-fade="">
          <div className="eyebrow">Join Us For</div>
          <h2 className="section-title">Wedding Celebrations</h2>
          <GoldDivider />
        </div>

        <div className="events-grid">
          {WEDDING_DATA.events.map((ev) => (
            <article
              key={ev.id}
              className={`detail-card event-card ${ev.id === "wedding" ? "event-featured" : ""}`}
              data-fade=""
            >
              <div className="detail-icon">
                <EventIcon id={ev.id} />
              </div>
              <div className="detail-label">{ev.day}</div>
              <h3 className="event-name">{ev.name}</h3>

              <div className="event-datetime">
                <span className="event-date">{ev.date}</span>
                <span className="event-time">{ev.time}</span>
              </div>

              <div className="event-divider" />

              <div className="event-venue-block">
                <div className="event-venue-name">{ev.venue}</div>
                <p className="event-venue-address">{ev.address}</p>
              </div>

              <a
                className="gold-btn event-map-btn"
                href={ev.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>View Location</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

