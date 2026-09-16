const SPAIN = "SPAIN";

function createCard(id, asset, countries) {
  return Object.freeze({ id, asset, countries: Object.freeze(countries) });
}

function createCountryCards(country, directory, filenames) {
  return filenames.map((filename) => {
    const id = filename.replace("image-", "").replace(".webp", "");
    return createCard(id, `real/${directory}/${filename}`, [country, country, country, country]);
  });
}

const matchingCards = createCountryCards(SPAIN, "spain", [
  "image-f-esp-esp-esp-esp-1.webp",
  "image-f-esp-esp-esp-esp-2.webp",
  "image-f-esp-esp-esp-esp-3.webp",
  "image-f-esp-esp-esp-esp-4.webp",
  "image-m-esp-esp-esp-esp-1.webp",
  "image-m-esp-esp-esp-esp-2.webp",
  "image-m-esp-esp-esp-esp-3.webp",
  "image-m-esp-esp-esp-esp-4.webp",
  "image-m-esp-esp-esp-esp-6.webp",
  "image-m-esp-esp-esp-esp-7.webp",
]);

const nonMatchingCards = createCountryCards("JAPAN", "japan", [
  "image-f-jpn-jpn-jpn-jpn-1.webp",
  "image-f-jpn-jpn-jpn-jpn-2.webp",
  "image-f-jpn-jpn-jpn-jpn-3.webp",
  "image-f-jpn-jpn-jpn-jpn-4.webp",
  "image-f-jpn-jpn-jpn-jpn-5.webp",
  "image-m-jpn-jpn-jpn-jpn-1.webp",
  "image-m-jpn-jpn-jpn-jpn-2.webp",
  "image-m-jpn-jpn-jpn-jpn-3.webp",
  "image-m-jpn-jpn-jpn-jpn-4.webp",
  "image-m-jpn-jpn-jpn-jpn-5.webp",
]);

export const spainCandidateCards = Object.freeze([...matchingCards, ...nonMatchingCards]);

export function isSpainMatch(card) {
  return card.countries.every((country) => country === SPAIN);
}

function shuffle(cards, random) {
  const shuffled = [...cards];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

export function createSpainRound(random = Math.random) {
  const matching = spainCandidateCards.filter(isSpainMatch);
  const nonMatching = spainCandidateCards.filter((card) => !isSpainMatch(card));
  const matchingCount = random() < 0.5 ? 2 : 3;
  const nonMatchingCount = 5 - matchingCount;
  return shuffle([
    ...shuffle(matching, random).slice(0, matchingCount),
    ...shuffle(nonMatching, random).slice(0, nonMatchingCount),
  ], random);
}

export function scoreSpainRound(cards, answers) {
  const correct = cards.reduce((count, card, index) => {
    return count + Number(isSpainMatch(card) === answers[index]);
  }, 0);
  return Math.round((correct / cards.length) * 100);
}
