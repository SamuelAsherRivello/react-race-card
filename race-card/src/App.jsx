import { useEffect, useRef, useState } from "react";
import versionText from "../../version.txt?raw";
import { createSpainRound, scoreSpainRound } from "./spain-round.js";

const repositoryUrl = "https://github.com/SamuelAsherRivello/react-race-card";
const uiMarginPixels = 20;
const swipeThresholdPixels = 60;
const navigationItems = [
  { label: "Button 1", icon: String.fromCodePoint(0x25c9) },
  { label: "Button 2", icon: String.fromCodePoint(0x25c7) },
  { label: "Button 3", icon: String.fromCodePoint(0x2606) },
  { label: "Button 4", icon: String.fromCodePoint(0x263a) },
];

function GitHubMark() {
  return (
    <svg className="github_mark" aria-hidden="true" viewBox="0 0 16 16" width="22" height="22">
      <path d="M8 0C3.58 0 0 3.64 0 8.13c0 3.59 2.29 6.64 5.47 7.71.4.08.55-.18.55-.4 0-.2-.01-.86-.01-1.56-2.01.38-2.53-.5-2.69-.96-.09-.24-.48-.96-.82-1.15-.28-.15-.68-.53-.01-.54.63-.01 1.08.59 1.23.83.72 1.23 1.87.88 2.33.67.07-.53.28-.88.51-1.08-1.78-.21-3.64-.91-3.64-4.04 0-.89.31-1.62.82-2.19-.08-.2-.36-1.04.08-2.16 0 0 .67-.22 2.2.84A7.5 7.5 0 0 1 8 3.82c.68 0 1.36.09 2 .28 1.53-1.06 2.2-.84 2.2-.84.44 1.12.16 1.96.08 2.16.51.57.82 1.29.82 2.19 0 3.14-1.87 3.83-3.65 4.04.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .22.15.48.55.4A8.02 8.02 0 0 0 16 8.13C16 3.64 12.42 0 8 0Z" />
    </svg>
  );
}

export function App() {
  const [phase, setPhase] = useState("ready");
  const [cards, setCards] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const pointerStart = useRef(null);
  const versionNumber = versionText.trim().replace(/^version=/, "").replace(/^v/, "");
  const currentCard = cards[cardIndex];
  const nextCard = cards[cardIndex + 1];
  const score = phase === "result" ? scoreSpainRound(cards, answers) : 0;

  useEffect(() => {
    const uiLayer = document.getElementById("ui_layer");
    const portraitFrame = document.getElementById("portrait_frame");
    const syncUiMargin = () => {
      if (!uiLayer || !portraitFrame) return;
      uiLayer.style.setProperty("--ui-margin-x", `${(uiMarginPixels / portraitFrame.clientWidth) * 100}%`);
      uiLayer.style.setProperty("--ui-margin-y", `${(uiMarginPixels / portraitFrame.clientHeight) * 100}%`);
    };
    syncUiMargin();
    window.addEventListener("resize", syncUiMargin);
    return () => window.removeEventListener("resize", syncUiMargin);
  }, []);

  const startRound = () => {
    setCards(createSpainRound());
    setAnswers([]);
    setCardIndex(0);
    setDragOffset(0);
    setIsExiting(false);
    setPhase("playing");
  };

  const submitAnswer = (answer) => {
    if (phase !== "playing" || !currentCard) return;
    const nextAnswers = [...answers, answer];
    setAnswers(nextAnswers);
    if (cardIndex === cards.length - 1) {
      setPhase("result");
    } else {
      setCardIndex((index) => index + 1);
    }
  };

  const onPointerDown = (event) => {
    if (isExiting) return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
    setIsDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!pointerStart.current || isExiting) return;
    setDragOffset(event.clientX - pointerStart.current.x);
  };

  const exitWithAnswer = (answer) => {
    if (phase !== "playing" || !currentCard || isExiting) return;
    pointerStart.current = null;
    setIsDragging(false);
    setIsExiting(true);
    setDragOffset(answer ? 560 : -560);
    window.setTimeout(() => {
      submitAnswer(answer);
      setDragOffset(0);
      setIsExiting(false);
    }, 180);
  };

  const onPointerUp = (event) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    setIsDragging(false);
    if (!start) return;
    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) < swipeThresholdPixels || Math.abs(deltaX) <= Math.abs(deltaY)) {
      setDragOffset(0);
      return;
    }
    exitWithAnswer(deltaX > 0);
  };

  const stopCardDrag = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <main className="game_shell" aria-live="polite">
        {phase === "playing" && (
          <header className="game_header">
            <div className="card_progress header_progress" aria-label={`Card ${cardIndex + 1} of ${cards.length}`}>{cards.map((card, index) => <span className={index <= cardIndex ? "active" : ""} key={card.id} />)}</div>
          </header>
        )}

        {phase === "ready" && (
          <section className="start_panel">
            <section className="start_dialog" role="dialog" aria-labelledby="round_title">
              <header className="dialog_titlebar">
                <h1 id="round_title">Round 1</h1>
              </header>
              <div className="dialog_body">
                <p>Swipe right for Spain.</p>
              </div>
              <div className="dialog_actions">
                <button className="primary_button" type="button" onClick={startRound}>Start</button>
              </div>
            </section>
          </section>
        )}

        {phase === "playing" && currentCard && (
          <section className="round_content">
            <div className="card_stack">
              {nextCard && (
                <article className="image_card image_card_back" aria-hidden="true">
                  <img src={`${import.meta.env.BASE_URL}images/${nextCard.asset}`} alt="" draggable="false" />
                </article>
              )}
              <article className={`image_card image_card_front ${isDragging ? "dragging" : ""}`} key={currentCard.id} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} style={{ transform: `translateX(${dragOffset}px) rotate(${dragOffset / 24}deg)` }}>
                <img src={`${import.meta.env.BASE_URL}images/${currentCard.asset}`} alt="Portrait card for the Spain round" draggable="false" />
                <div className="card_action_bar" aria-label="Card actions">
                  <button className="card_action_button card_action_reject" type="button" aria-label="Not Spain" onPointerDown={stopCardDrag} onPointerMove={stopCardDrag} onPointerUp={stopCardDrag} onClick={() => exitWithAnswer(false)}>&times;</button>
                  <button className="card_action_button card_action_accept" type="button" aria-label="Spanish" onPointerDown={stopCardDrag} onPointerMove={stopCardDrag} onPointerUp={stopCardDrag} onClick={() => exitWithAnswer(true)}>&#10003;</button>
                </div>
              </article>
            </div>
          </section>
        )}

        {phase === "result" && (
          <section className="result_panel">
            <section className="start_dialog" role="dialog" aria-labelledby="round_complete_title">
              <header className="dialog_titlebar">
                <h1 id="round_complete_title">Round Complete</h1>
              </header>
              <div className="dialog_body">
                <p>You got {score}% correct.</p>
              </div>
              <div className="dialog_actions">
                <button className="primary_button" type="button" onClick={startRound}>Play Again</button>
              </div>
            </section>
          </section>
        )}

        <nav className="bottom_nav" aria-label="Primary navigation">
          {navigationItems.map(({ label, icon }, index) => (
            <button className={`nav_button ${index === 0 ? "active" : ""}`} type="button" key={label}>
              <span className="nav_icon" aria-hidden="true">{icon}</span>
              <span className="nav_label">{label}</span>
            </button>
          ))}
        </nav>
      </main>

      <div className="corner corner_top_right"><a href={repositoryUrl} target="_blank" rel="noopener noreferrer" aria-label="View the repository on GitHub" tabIndex={-1}><GitHubMark /></a></div>
      <div className="corner corner_bottom_right"><span id="version" className="corner_body">v{versionNumber}</span></div>
    </>
  );
}
