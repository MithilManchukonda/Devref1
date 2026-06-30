import { useEffect, useMemo, useState } from "react";
import {
  collection, addDoc, onSnapshot, query, orderBy,
  doc, updateDoc, deleteDoc, arrayUnion, arrayRemove, serverTimestamp, setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export function useSnippets(user) {
  const [snippets, setSnippets] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "snippets"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setSnippets(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
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

  // Subjects are derived from real data — whatever users have actually typed in, capitalized as-is.
  const subjects = useMemo(() => {
    const set = new Set();
    snippets.forEach((s) => s.subject && set.add(s.subject));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [snippets]);

  async function addSnippet(snippet) {
    await addDoc(collection(db, "snippets"), {
      ...snippet,
      authorId: user?.uid || "anonymous",
      authorEmail: user?.email || "anonymous",
      createdAt: serverTimestamp(),
    });
  }

  async function updateSnippet(id, updates) {
    await updateDoc(doc(db, "snippets", id), updates);
  }

  async function deleteSnippet(id) {
    await deleteDoc(doc(db, "snippets", id));
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

  return { snippets, subjects, loading, addSnippet, updateSnippet, deleteSnippet, bookmarks, toggleBookmark };
}
