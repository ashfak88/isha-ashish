import { WEDDING_DATA } from "../data/weddingData";
import { GoldDivider } from "./FloralFlourish";

export default function FamiliesSection() {
  const { families, couple, side } = WEDDING_DATA;

  return (
    <section className="section section-tinted" id="families">
      <div className="container">
        <div className="section-head" data-fade="">
          <div className="eyebrow">Shubh Vivah • {side}</div>
          <h2 className="section-title">With Blessings &amp; Families</h2>
          <GoldDivider />
        </div>

        <div className="family-blessings-card" data-fade="">
          <div className="family-blessing-top">
            <span className="family-role">{families.grandparentsLabel}</span>
            <h3 className="family-names-large">{families.grandparents}</h3>
          </div>

          <div className="family-grid">
            <div className="family-col">
              <div className="family-badge">Bride’s Side • Hosts</div>
              <div className="family-role">{families.brideParentsLabel}</div>
              <div className="family-names">{families.brideParents}</div>
              <p className="family-sub">
                Cordially invite you to celebrate the wedding of their daughter{" "}
                <span>{couple.brideName}</span>
              </p>
            </div>

            <div className="family-divider-vert" aria-hidden="true">
              <span>♥</span>
            </div>

            <div className="family-col">
              <div className="family-badge">Groom’s Side</div>
              <div className="family-role">{families.groomParentsLabel}</div>
              <div className="family-names">{families.groomParents}</div>
              <p className="family-sub">
                Parents of <span>{couple.groomName}</span>
              </p>
            </div>
          </div>

          <div className="family-rsvp-strip">
            <span className="family-role">With Warm Regards &amp; Best Compliments</span>
            <div className="family-rsvp-names">{families.rsvpName}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
