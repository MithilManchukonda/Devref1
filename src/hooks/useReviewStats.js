import { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getNextReviewDate } from "../utils/spacedRepetition";

export function useReviewStats(user) {
  const [reviewStats, setReviewStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setReviewStats({}); setLoading(false); return; }
    const ref = doc(db, "reviewStats", user.uid);
    const unsub = onSnapshot(ref, (snap) => {
      setReviewStats(snap.exists() ? snap.data().stats || {} : {});
      setLoading(false);
    });
    return unsub;
  }, [user]);

  async function recordReview(snippetId, result) {
    if (!user) return;
    const ref = doc(db, "reviewStats", user.uid);
    const currentBox = reviewStats[snippetId]?.box ?? 0;
    const { box, nextReview } = getNextReviewDate(currentBox, result);

    const updated = {
      ...reviewStats,
      [snippetId]: { box, nextReview, lastResult: result, lastReviewed: Date.now() },
    };
    setReviewStats(updated); // optimistic update for instant UI feedback

    try {
      const snap = await getDoc(ref);
      const existing = snap.exists() ? snap.data().stats || {} : {};
      await setDoc(ref, { stats: { ...existing, [snippetId]: updated[snippetId] } });
    } catch {
      // Firestore write failed silently — local state already reflects the review,
      // next snapshot sync will reconcile.
    }
  }

  return { reviewStats, recordReview, loading };
}
