import { useEffect, useState } from "react";
import {
  collection, addDoc, onSnapshot, query, orderBy,
  doc, updateDoc, arrayUnion, arrayRemove, serverTimestamp, setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { SEED_SNIPPETS } from "../data/snippets";

export function useSnippets(user) {
  const [userSnippets, setUserSnippets] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "snippets"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setUserSnippets(snap.docs.map((d) => ({ id: d.id, ...d.data(), isUser: true })));
        setLoading(false);
      },
      () => setLoading(false)
    );
    return unsub;
  }, []);

  useEffect(() => {
    if (!user) { setBookmarks([]); return; }
    const unsub = onSnapshot(doc(db, "users", user.uid), (snap) => {
      setBookmarks(snap.exists() ? snap.data().bookmarks || [] : []);
    });
    return unsub;
  }, [user]);

  const allSnippets = [
    ...SEED_SNIPPETS.map((s, i) => ({ id: `seed-${i}`, ...s, isUser: false })),
    ...userSnippets,
  ];

  async function addSnippet(snippet) {
    await addDoc(collection(db, "snippets"), {
      ...snippet,
      authorId: user?.uid || "anonymous",
      authorEmail: user?.email || "anonymous",
      createdAt: serverTimestamp(),
    });
  }

  async function toggleBookmark(snippetId) {
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    const isBookmarked = bookmarks.includes(snippetId);
    try {
      await updateDoc(ref, { bookmarks: isBookmarked ? arrayRemove(snippetId) : arrayUnion(snippetId) });
    } catch {
      await setDoc(ref, { bookmarks: [snippetId] });
    }
  }

  return { allSnippets, loading, addSnippet, bookmarks, toggleBookmark };
}
