import { WEDDING_DATA } from "../data/weddingData";
import { CornerBotanical, FloralSprig, GoldDivider } from "./FloralFlourish";

export default function SpecialNoteSection() {
  const { specialNote, hashtag } = WEDDING_DATA;

  return (
    <section className="section paper-texture" id="special-note">
      <div className="container">
        <div className="special-note-card" data-fade="">
          <CornerBotanical className="cb-tl small" />
          <CornerBotanical className="cb-br small" />

          <FloralSprig className="floral-sprig-sm" />
          <div className="eyebrow">A Special Invitation</div>
          <GoldDivider />

          <blockquote className="special-note-quote">
            “{specialNote.message}”
          </blockquote>

          <div className="special-note-signoff">
            <span>{specialNote.signOff}</span>
            <strong>{specialNote.authors}</strong>
            <div className="section-hashtag">{hashtag}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
