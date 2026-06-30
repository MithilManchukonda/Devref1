// A simplified SM-2 spaced-repetition algorithm (the same family used by Anki).
// Each snippet gets review stats stored in Firestore under reviewStats.{userId}:
//   { box: 0-5, nextReview: timestamp, lastResult: 'easy'|'hard'|'again' }
//
// Box 0 = brand new / never reviewed.
// Higher box = you've recalled it correctly more times → reviewed less often.

const BOX_INTERVALS_DAYS = [0, 1, 3, 7, 14, 30]; // index = box number

export function getNextReviewDate(currentBox, result) {
  let newBox = currentBox;
  if (result === "easy") newBox = Math.min(currentBox + 1, BOX_INTERVALS_DAYS.length - 1);
  else if (result === "hard") newBox = currentBox; // stay, review again soon
  else if (result === "again") newBox = 0; // reset to the start

  const days = BOX_INTERVALS_DAYS[newBox];
  const next = new Date();
  next.setDate(next.getDate() + days);

  return { box: newBox, nextReview: next.getTime() };
}

// Picks which snippets are "due" for review right now:
// never-reviewed notes first, then overdue notes, weakest (lowest box) first.
export function getDueSnippets(snippets, reviewStats) {
  const now = Date.now();
  return snippets
    .map((s) => {
      const stats = reviewStats[s.id];
      const isDue = !stats || stats.nextReview <= now;
      const box = stats?.box ?? 0;
      return { snippet: s, isDue, box };
    })
    .filter((x) => x.isDue)
    .sort((a, b) => a.box - b.box)
    .map((x) => x.snippet);
}

export function getBoxLabel(box) {
  const labels = ["New", "Learning", "Familiar", "Good", "Strong", "Mastered"];
  return labels[box] ?? "New";
}
