import { useCallback, useEffect, useRef, useState } from "react";
import { WEDDING_DATA } from "../data/weddingData";
import { FloralSprig, GoldDivider } from "./FloralFlourish";

function getRemaining(targetMs) {
  const diff = Math.max(0, targetMs - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
  };
}

export default function ScratchReveal() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawingRef = useRef(false);
  const strokeCountRef = useRef(0);
  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);

  const targetMs = new Date(WEDDING_DATA.weddingDateISO).getTime();
  const [timeLeft, setTimeLeft] = useState(() => getRemaining(targetMs));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getRemaining(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const pad = (n) => String(n).padStart(2, "0");

  const paintFoil = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const width = Math.max(280, Math.round(rect.width));
    const height = Math.max(220, Math.round(rect.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#DFC27D");
    grad.addColorStop(0.32, "#C9A14A");
    grad.addColorStop(0.55, "#F2DFAC");
    grad.addColorStop(0.8, "#B88C38");
    grad.addColorStop(1, "#D6B25E");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
    ctx.lineWidth = 1;
    for (let i = -height; i < width + height; i += 14) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + height * 0.45, height);
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(252, 250, 246, 0.55)";
    ctx.lineWidth = 1.2;
    ctx.strokeRect(12, 12, width - 24, height - 24);

    ctx.fillStyle = "rgba(43, 43, 43, 0.82)";
    ctx.textAlign = "center";
    ctx.font = "500 11px Poppins, sans-serif";
    ctx.fillText("SAVE THE DATE", width / 2, height / 2 - 22);

    ctx.font = "600 26px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText("Scratch to Reveal", width / 2, height / 2 + 10);

    ctx.font = "400 11px Poppins, sans-serif";
    ctx.fillStyle = "rgba(43, 43, 43, 0.72)";
    ctx.fillText("Rub gently with your finger or cursor", width / 2, height / 2 + 36);
  }, []);

  useEffect(() => {
    setRevealed(false);
    setProgress(0);
    strokeCountRef.current = 0;
    paintFoil();

    const onResize = () => {
      if (!revealed) paintFoil();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [paintFoil]);

  const computeClearedRatio = () => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    const step = 16 * 4;
    let total = 0;
    for (let i = 3; i < data.length; i += step) {
      total++;
      if (data[i] < 128) transparent++;
    }
    return total ? transparent / total : 0;
  };

  const scratchAt = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const dpr = canvas.width / rect.width;
    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    strokeCountRef.current += 1;
    if (strokeCountRef.current % 5 === 0) {
      const ratio = computeClearedRatio();
      const pct = Math.min(100, Math.round((ratio / 0.45) * 100));
      setProgress(pct);
      if (ratio >= 0.42) {
        setRevealed(true);
        setProgress(100);
      }
    }
  };

  const handlePointerDown = (e) => {
    if (revealed) return;
    isDrawingRef.current = true;
    if (e.currentTarget.setPointerCapture) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Ignore if pointer capture isn't supported
      }
    }
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e) => {
    if (!isDrawingRef.current || revealed) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
  };

  const handleReset = () => {
    setRevealed(false);
    setProgress(0);
    strokeCountRef.current = 0;
    requestAnimationFrame(() => paintFoil());
  };

  return (
    <section className="section paper-texture" id="scratch-reveal">
      <div className="container">
        <div className="section-head" data-fade="">
          <FloralSprig className="floral-sprig-sm" />
          <div className="eyebrow">A Little Surprise</div>
          <h2 className="section-title">Reveal Our Wedding Date</h2>
          <GoldDivider />
        </div>

        <div className="scratch-wrapper" data-fade="">
          <div
            ref={containerRef}
            className={`scratch-card ${revealed ? "is-revealed" : ""}`}
          >
            <div className="scratch-underneath">
              <div className="scratch-monogram">{WEDDING_DATA.couple.monogram}</div>
              <div className="scratch-eyebrow">Save the Date</div>
              <div className="scratch-date">11 December 2026</div>
              <div className="scratch-meta">Friday • 8:00 PM Onwards</div>
              <div className="scratch-venue">
                The Eastern Address, Shahdara, Delhi
              </div>
              <div className="scratch-couple">
                {WEDDING_DATA.couple.brideFirst} &amp; {WEDDING_DATA.couple.groomFirst} •{" "}
                <span className="hashtag-inline">{WEDDING_DATA.hashtag}</span>
              </div>
            </div>

            <canvas
              ref={canvasRef}
              className={`scratch-canvas ${revealed ? "fade-away" : ""}`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              aria-label="Scratch off gold foil to reveal wedding date"
            />
          </div>

          <div className="scratch-footer">
            {!revealed ? (
              <>
                <span className="scratch-hint">
                  {progress > 0 ? `Revealing... ${progress}%` : "Scratch the golden seal above"}
                </span>
                <button
                  type="button"
                  className="scratch-action-link"
                  onClick={() => {
                    setRevealed(true);
                    setProgress(100);
                  }}
                >
                  Tap to Reveal
                </button>
              </>
            ) : (
              <>
                <span className="scratch-hint revealed-msg">
                  We can&apos;t wait to celebrate with you!
                </span>
                <button
                  type="button"
                  className="scratch-action-link"
                  onClick={handleReset}
                >
                  Scratch Again
                </button>
              </>
            )}
          </div>

          <div className="scratch-countdown-box">
            <div className="scratch-countdown-label">Counting Down To Forever</div>
            <div className="hero-countdown">
              <div className="hc-unit">
                <div className="hc-num" id="hc-days">
                  {timeLeft.days}
                </div>
                <div className="hc-label">Days</div>
              </div>
              <div className="hc-sep">:</div>
              <div className="hc-unit">
                <div className="hc-num" id="hc-hours">
                  {pad(timeLeft.hours)}
                </div>
                <div className="hc-label">Hours</div>
              </div>
              <div className="hc-sep">:</div>
              <div className="hc-unit">
                <div className="hc-num" id="hc-mins">
                  {pad(timeLeft.mins)}
                </div>
                <div className="hc-label">Mins</div>
              </div>
              <div className="hc-sep">:</div>
              <div className="hc-unit">
                <div className="hc-num" id="hc-secs">
                  {pad(timeLeft.secs)}
                </div>
                <div className="hc-label">Secs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
