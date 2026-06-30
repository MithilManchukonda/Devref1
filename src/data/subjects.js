// No pre-built content — every snippet comes from the user.
// Subjects are now fully dynamic: built from whatever languages users have actually added.

const PALETTE = [
  { bg: "bg-blue-500/10",   text: "text-blue-400",   border: "border-blue-500/30",   dot: "#60A5FA" },
  { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/30", dot: "#FB923C" },
  { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30", dot: "#C084FC" },
  { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/30", dot: "#FACC15" },
  { bg: "bg-cyan-500/10",   text: "text-cyan-400",   border: "border-cyan-500/30",   dot: "#22D3EE" },
  { bg: "bg-red-500/10",    text: "text-red-400",    border: "border-red-500/30",    dot: "#F87171" },
  { bg: "bg-pink-500/10",   text: "text-pink-400",   border: "border-pink-500/30",   dot: "#F472B6" },
  { bg: "bg-green-500/10",  text: "text-green-400",  border: "border-green-500/30",  dot: "#4ADE80" },
  { bg: "bg-amber-500/10",  text: "text-amber-400",  border: "border-amber-500/30",  dot: "#FBBF24" },
  { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/30", dot: "#818CF8" },
  { bg: "bg-teal-500/10",   text: "text-teal-400",   border: "border-teal-500/30",   dot: "#2DD4BF" },
  { bg: "bg-rose-500/10",   text: "text-rose-400",   border: "border-rose-500/30",   dot: "#FB7185" },
];

// Deterministic color per subject name, so the same subject always gets the same color
// even across sessions/devices (no need to store color separately in Firestore).
export function getSubjectColor(name) {
  if (!name) return PALETTE[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return PALETTE[hash % PALETTE.length];
}
