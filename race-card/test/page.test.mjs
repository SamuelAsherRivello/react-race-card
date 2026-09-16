import { access, readFile } from "node:fs/promises";
import test from "node:test";
import viteConfig from "../../vite.config.js";
import {
  createSpainRound,
  isSpainMatch,
  scoreSpainRound,
  spainCandidateCards,
} from "../src/spain-round.js";

const appRoot = new URL("../", import.meta.url);

test("uses the Race Card application root", () => {
  if (viteConfig.root !== "race-card") {
    throw new Error("Vite must use the race-card application directory as its root.");
  }
  if (viteConfig.base !== "/react-race-card/") {
    throw new Error("The GitHub Pages build must use the react-race-card repository path.");
  }
});

test("defines an approved real-image Spain and Japan card pool", () => {
  if (spainCandidateCards.length !== 20) {
    throw new Error("The Spain candidate pool must contain 20 cards.");
  }

  const matchingCards = spainCandidateCards.filter(isSpainMatch);
  if (matchingCards.length !== 10) {
    throw new Error("The candidate pool must contain 10 all-SPAIN cards.");
  }

  const japanCards = spainCandidateCards.filter((card) => card.countries.every((country) => country === "JAPAN"));
  if (japanCards.length !== 10) {
    throw new Error("The candidate pool must contain 10 all-JAPAN cards.");
  }

  for (const card of spainCandidateCards) {
    if (card.countries.length !== 4 || card.countries.some((country) => country !== country.toUpperCase())) {
      throw new Error("Every card must have four uppercase country values.");
    }
    if (!/^real\/(spain|japan)\/image-[fm]-(esp|jpn)-\2-\2-\2-\d+\.webp$/.test(card.asset)) {
      throw new Error("Every card must use an approved real Spain or Japan image path.");
    }
    if (/(mock|usa|germany)/.test(card.asset)) {
      throw new Error("The candidate pool must exclude mock and misfiled image folders.");
    }
  }
});

test("deals five cards with a fair two-or-three Spain split and no duplicates", () => {
  for (let index = 0; index < 20; index += 1) {
    const round = createSpainRound();
    if (round.length !== 5 || new Set(round.map((card) => card.id)).size !== 5) {
      throw new Error("Every round must contain 5 distinct cards.");
    }
    if (![2, 3].includes(round.filter(isSpainMatch).length)) {
      throw new Error("Every round must contain either two or three Spain matches.");
    }
  }
});

test("scores a round only from supplied country tags and includes only approved real assets", async () => {
  const round = createSpainRound(() => 0.42);
  const correctAnswers = round.map(isSpainMatch);
  if (scoreSpainRound(round, correctAnswers) !== 100) {
    throw new Error("Correct tag-derived answers must score 100%.");
  }
  if (scoreSpainRound(round, round.map(() => true)) !== round.filter(isSpainMatch).length * 20) {
    throw new Error("An all-Spanish answer set must reflect the round's two-or-three Spain split.");
  }
  for (const card of spainCandidateCards) {
    await access(new URL(`../public/images/${card.asset}`, import.meta.url));
  }
});

test("defines the Spain round controls and result flow", async () => {
  const app = await readFile(new URL("src/App.jsx", appRoot), "utf8");
  for (const requiredText of [
    "Round 1",
    "Swipe right for Spain.",
    ">Start</button>",
    "Round Complete",
    "You got {score}% correct.",
    "Play Again",
    "onPointerDown",
    "onPointerMove",
    "onPointerUp",
    "nextCard",
    "card_stack",
    "image_card_back",
    "image_card_front",
    "card_action_bar",
    "card_action_button",
    'aria-label="Not Spain"',
    'aria-label="Spanish"',
    "exitWithAnswer",
    "onClick={() => exitWithAnswer(false)}",
    "onClick={() => exitWithAnswer(true)}",
    "Button 1",
    "Button 4",
    "bottom_nav",
    "nav_icon",
    "nav_label",
    "start_dialog",
    "dialog_titlebar",
    "dialog_body",
    "dialog_actions",
    "images/${nextCard.asset}",
    "images/${currentCard.asset}",
    "Portrait card for the Spain round",
  ]) {
    if (!app.includes(requiredText)) {
      throw new Error(`The Spain round UI must include ${requiredText}.`);
    }
  }
  for (const removedText of ["READY TO PLAY", "Does the image match Spain?", "Ten tagged images.", "Spanish Ã¢â€ â€™", "COUNTRY THEME", "Spain Round", "MAKE YOUR CALL", "Match the round theme?", "Swipe the card left or right", "Play Spain Again"]) {
    if (app.includes(removedText)) {
      throw new Error(`The initial screen must not include ${removedText}.`);
    }
  }
  if (!app.includes('{phase === "playing" && (')) {
    throw new Error("The country and round header must be hidden on the ready screen.");
  }
  for (const removedText of ["images/mock/", "Temporary country-theme artwork"]) {
    if (app.includes(removedText)) {
      throw new Error(`The real-image round must not include ${removedText}.`);
    }
  }
  if (!app.includes("of ${cards.length}")) {
    throw new Error("The progress label must use the current five-card round length.");
  }
  const styles = await readFile(new URL("src/style.css", appRoot), "utf8");
  if (!styles.includes("grid-template-columns: repeat(2, 1fr)")) {
    throw new Error("The start dialog must reserve two equal action slots.");
  }
  if (!styles.includes(".nav_button { display: flex") || !styles.includes("flex-direction: column")) {
    throw new Error("Bottom navigation items must stack an icon over their label.");
  }
  if (!styles.includes(".card_stack { display: grid") || !styles.includes("grid-area: 1 / 1")) {
    throw new Error("Front and back cards must share the same stack layout.");
  }
  if (!styles.includes(".image_card_back { z-index: 1") || !styles.includes(".image_card_front { z-index: 2")) {
    throw new Error("The front card must sit above the back card by z-depth.");
  }
  if (!styles.includes(".image_card::after") || !styles.includes("inset: auto 0 0") || !styles.includes("height: 34%") || !styles.includes("linear-gradient(to top")) {
    throw new Error("The image card must include a full-width dark bottom fade.");
  }
  if (!styles.includes("border: 1px solid #000") || !styles.includes("box-sizing: border-box")) {
    throw new Error("The image card must keep a 1px black rounded border on all sides.");
  }
  if (!styles.includes("#portrait_frame {") || !styles.includes("overflow: hidden")) {
    throw new Error("The portrait app frame must clip dragged-card overflow.");
  }
  if (!styles.includes(".card_action_bar") || !styles.includes(".card_action_button")) {
    throw new Error("Image cards must provide the overlaid X and checkmark action bar.");
  }
  if (!styles.includes(".card_action_reject") || !styles.includes("transform: scale(1.1)") || !styles.includes(".card_action_accept") || !styles.includes("transform: scale(.9)") || !styles.includes("color: #2fd66f")) {
    throw new Error("Image card action buttons must use the tuned reject and green accept styling.");
  }
});

test("documents the plain safe-area template", async () => {
  const page = await readFile(new URL("index.html", appRoot), "utf8");
  const app = await readFile(new URL("src/App.jsx", appRoot), "utf8");
  const styles = await readFile(new URL("src/style.css", appRoot), "utf8");

  if (!page.includes("<title>Race Card</title>")) {
    throw new Error("The browser title must identify Race Card.");
  }
  if (!app.includes("https://github.com/SamuelAsherRivello/react-race-card")) {
    throw new Error("The upper-right corner must link to the Race Card repository.");
  }
  if (!app.includes('aria-label="View the repository on GitHub"')) {
    throw new Error("The repository link must have an accessible label.");
  }
  if (!page.includes('id="content_layer"')) {
    throw new Error("The page needs a dedicated application content layer.");
  }
  if (!page.includes('id="portrait_frame"')) {
    throw new Error("The application layers must share a portrait frame.");
  }
  if (!page.includes('id="ui_layer"')) {
    throw new Error("The page needs a separate HTML UI layer.");
  }
  if (!page.includes('src="/src/main.jsx"')) {
    throw new Error("The page must load the React application module.");
  }
  if (!app.includes("const uiMarginPixels = 20")) {
    throw new Error("The UI margin must be set from a single 20px target.");
  }
  if (!app.includes("--ui-margin-x") || !app.includes("--ui-margin-y")) {
    throw new Error("The UI margin must use separate percentage values for horizontal and vertical sides.");
  }
  if (!app.includes("portraitFrame.clientWidth") || !app.includes("portraitFrame.clientHeight")) {
    throw new Error("The UI margin percentages must be calculated from the portrait frame dimensions.");
  }
  if (!app.includes('window.addEventListener("resize", syncUiMargin)')) {
    throw new Error("The UI margin percentages must stay current when the viewport resizes.");
  }
  if (!styles.includes("inset: var(--ui-margin-y, 20px) var(--ui-margin-x, 20px)")) {
    throw new Error("The page must apply percentage-based UI margins with a 20px fallback.");
  }
  if (!styles.includes("#portrait_frame {") || !styles.includes("aspect-ratio: 9 / 16;")) {
    throw new Error("The application frame must retain a 9:16 portrait aspect ratio.");
  }
  if (!styles.includes("width: calc(100dvh * 9 / 16);") || !styles.includes("height: 100dvh;")) {
    throw new Error("The portrait frame must use full viewport height and derive width from the 9:16 ratio.");
  }
  if (!styles.includes(".game_shell { height: 100%") || styles.includes(".game_shell { min-height: 100%")) {
    throw new Error("The game shell must have a definite portrait-frame-relative height.");
  }
  if (!styles.includes(".game_header, .bottom_nav { flex: 0 0 auto;")) {
    throw new Error("The header and footer must reserve space in the portrait-frame flex layout.");
  }
  if (!styles.includes(".round_content, .card_stack { min-height: 0;")) {
    throw new Error("The card region must be shrinkable inside the height-bounded portrait frame.");
  }
  if (!styles.includes("left: 50%;") || !styles.includes("top: 50%;")) {
    throw new Error("The portrait frame must stay centered in the viewport.");
  }
  if (!styles.includes(".corner {")) {
    throw new Error("The page must define a reusable corner style.");
  }
  for (const cornerClass of ["corner_top_right", "corner_bottom_right"]) {
    if (!app.includes(`className="corner ${cornerClass}"`)) {
      throw new Error(`The page must include a ${cornerClass} corner instance.`);
    }
  }
  if (app.includes('id="project_title"') || app.includes("Race Card</div>")) {
    throw new Error("The UI layer must not show the upper-left app title.");
  }
  if (!app.includes('id="version"')) {
    throw new Error("The page must show the version footer.");
  }
  if (!app.includes("v{versionNumber}")) {
    throw new Error("The version corner must display versions in v0.0.0 format.");
  }
  if (!styles.includes(".corner_body")) {
    throw new Error("The page must define shared corner body text styles.");
  }
  for (const removedText of ["Settings", "Fullscreen", "fullscreenStorageKey", "requestFullscreen", "exitFullscreen", "settings_option"]) {
    if (app.includes(removedText) || styles.includes(removedText)) {
      throw new Error(`The UI layer must not include ${removedText}.`);
    }
  }
  if (!app.includes("tabIndex={-1}")) {
    throw new Error("The corner UI controls must be removed from the tabbing order.");
  }
  if (page.includes('src="/src/main.js"')) {
    throw new Error("The safe-area template should not load an application module.");
  }
});
