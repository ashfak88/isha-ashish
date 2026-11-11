import { useState } from "react";
import { getEventsForMode, WEDDING_DATA } from "../data/weddingData";
import { FloralSprig, GoldDivider } from "./FloralFlourish";

export default function RsvpSection({ inviteMode = "all" }) {
  const visibleEvents = getEventsForMode(inviteMode);

  const [name, setName] = useState("");
  const [guests, setGuests] = useState("2");
  const [attending, setAttending] = useState("yes");
  const [selectedEvents, setSelectedEvents] = useState(() =>
    Object.fromEntries(visibleEvents.map((ev) => [ev.id, true]))
  );
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(() => {
    try {
      const saved = localStorage.getItem(`isha_ashish_rsvp_${inviteMode}`);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const toggleEvent = (id) => {
    setSelectedEvents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const buildWhatsAppUrl = (entry) => {
    const primary = WEDDING_DATA.contacts[0].whatsapp;
    const eventsList =
      entry.attending === "yes"
        ? visibleEvents
            .filter((ev) => entry.events?.[ev.id] ?? true)
            .map((ev) => ev.name)
            .join(", ") || visibleEvents.map((ev) => ev.name).join(", ")
        : "Unable to attend";

    const text = [
      `Namaste Wadhwa & Sachdeva Family!`,
      `RSVP for Isha & Ashish's Wedding (${WEDDING_DATA.hashtag}):`,
      `Name: ${entry.name}`,
      `Status: ${entry.attending === "yes" ? "Joyfully Attending" : "Regretfully Unable to Attend"}`,
      entry.attending === "yes" ? `Guests: ${entry.guests}` : null,
      entry.attending === "yes" ? `Events: ${eventsList}` : null,
      entry.message ? `Message: ${entry.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    return `https://wa.me/${primary}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    const payload = {
      name: trimmed,
      guests,
      attending,
      events: selectedEvents,
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(`isha_ashish_rsvp_${inviteMode}`, JSON.stringify(payload));
    } catch {
      // ignore storage errors
    }
    setSubmitted(payload);
  };

  const handleResetRsvp = () => {
    setSubmitted(null);
    try {
      localStorage.removeItem(`isha_ashish_rsvp_${inviteMode}`);
    } catch {
      // ignore
    }
  };

  return (
    <section className="section paper-texture" id="rsvp">
      <div className="container">
        <div className="section-head" data-fade="">
          <FloralSprig className="floral-sprig-sm" />
          <div className="eyebrow">Kindly Respond • {WEDDING_DATA.hashtag}</div>
          <h2 className="section-title">RSVP</h2>
          <GoldDivider />
          <p className="rsvp-subtitle">
            Hosted with love by <strong>{WEDDING_DATA.families.rsvpName}</strong>
          </p>
        </div>

        <div className="rsvp-wrap" data-fade="">
          {submitted ? (
            <div className="rsvp-confirmed">
              <div className="rsvp-check" aria-hidden="true">
                ♥
              </div>
              <h3 className="rsvp-confirmed-title">
                Thank You, {submitted.name}!
              </h3>
              <p className="rsvp-confirmed-text">
                {submitted.attending === "yes"
                  ? `We have noted your confirmation for ${submitted.guests} ${
                      Number(submitted.guests) === 1 ? "guest" : "guests"
                    }. We look forward to celebrating with you!`
                  : "Thank you for letting us know. You will be warmly missed at the celebrations."}
              </p>

              <div className="rsvp-actions">
                <a
                  className="gold-btn"
                  href={buildWhatsAppUrl(submitted)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Share RSVP on WhatsApp</span>
                </a>
                <button
                  type="button"
                  className="scratch-action-link"
                  onClick={handleResetRsvp}
                >
                  Update Response
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="rsvp-name">Your Full Name *</label>
                <input
                  id="rsvp-name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-row">
                <label>Will You Be Joining Us?</label>
                <div className="attend-toggle">
                  <button
                    type="button"
                    className={attending === "yes" ? "active" : ""}
                    onClick={() => setAttending("yes")}
                  >
                    Joyfully Accepts
                  </button>
                  <button
                    type="button"
                    className={attending === "no" ? "active" : ""}
                    onClick={() => setAttending("no")}
                  >
                    Regretfully Declines
                  </button>
                </div>
              </div>

              {attending === "yes" && (
                <>
                  <div className="form-row">
                    <label htmlFor="rsvp-guests">Number of Guests</label>
                    <select
                      id="rsvp-guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5+">5+ Guests (Family)</option>
                    </select>
                  </div>

                  {visibleEvents.length > 1 && (
                    <div className="form-row">
                      <label>Events Attending</label>
                      <div className="rsvp-events-checks">
                        {visibleEvents.map((ev) => (
                          <label key={ev.id} className="rsvp-check-pill">
                            <input
                              type="checkbox"
                              checked={!!selectedEvents[ev.id]}
                              onChange={() => toggleEvent(ev.id)}
                            />
                            <span>
                              {ev.name} ({ev.date.replace(" December 2026", " Dec")} • {ev.time})
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="form-row">
                <label htmlFor="rsvp-message">Blessings &amp; Note for the Couple</label>
                <textarea
                  id="rsvp-message"
                  placeholder="Write your warm wishes for Isha & Ashish..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="rsvp-actions">
                <button type="submit" className="gold-btn">
                  <span>Confirm RSVP</span>
                </button>
              </div>
            </form>
          )}

          <div className="rsvp-contact-box">
            <div className="rsvp-contact-heading">
              For Any Assistance, Please Contact
            </div>
            <div className="rsvp-contact-host">{WEDDING_DATA.families.rsvpName}</div>
            <div className="rsvp-phones">
              {WEDDING_DATA.contacts.map((c) => (
                <div key={c.display} className="rsvp-phone-pill">
                  <a href={`tel:${c.tel}`} className="phone-num-link">
                    {c.display}
                  </a>
                  <span className="phone-sep" aria-hidden="true">•</span>
                  <a
                    href={`https://wa.me/${c.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="phone-wa-link"
                  >
                    WhatsApp
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
