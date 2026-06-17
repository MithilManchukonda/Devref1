import { useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { useSnippets } from "./hooks/useSnippets";
import Navbar from "./components/Navbar";
import LanguageFilter from "./components/LanguageFilter";
import SnippetCard from "./components/SnippetCard";
import AddNoteModal from "./components/AddNoteModal";
import AuthModal from "./components/AuthModal";
import { LANGUAGES } from "./data/snippets";

function Dashboard() {
  const { user, logout } = useAuth();
  const { allSnippets, addSnippet, bookmarks, toggleBookmark } = useSnippets(user);
  const [search, setSearch] = useState("");
  const [activeLang, setActiveLang] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const counts = useMemo(() => {
    const c = { All: allSnippets.length };
    LANGUAGES.forEach((l) => { c[l] = allSnippets.filter((s) => s.lang === l).length; });
    return c;
  }, [allSnippets]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return allSnippets.filter((s) => {
      const matchLang = activeLang === "All" || s.lang === activeLang;
      const matchQ = !q || s.title.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q) || s.code.toLowerCase().includes(q);
      return matchLang && matchQ;
    });
  }, [allSnippets, search, activeLang]);

  return (
    <div className="min-h-screen">
      <Toaster position="bottom-right" />
      <Navbar
        search={search} setSearch={setSearch}
        user={user} onLogout={logout}
        onAddClick={() => (user ? setModalOpen(true) : setAuthOpen(true))}
        onAuthClick={() => setAuthOpen(true)}
      />

      <main className="max-w-6xl mx-auto px-5 py-6">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-semibold text-white mb-1">
            Your <span className="text-[#C8FF3D]">syntax</span> reference
          </h1>
          <p className="text-[13.5px] text-[#a8b39e]">{allSnippets.length} snippets across {LANGUAGES.length} languages and tools</p>
        </div>

        <div className="mb-5">
          <LanguageFilter active={activeLang} setActive={setActiveLang} counts={counts} />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#5a6354] text-sm">No snippets found. Try a different search or add your own.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((snippet) => (
              <SnippetCard
                key={snippet.id}
                snippet={snippet}
                user={user}
                isBookmarked={bookmarks.includes(snippet.id)}
                onToggleBookmark={toggleBookmark}
              />
            ))}
          </div>
        )}
      </main>

      <AddNoteModal open={modalOpen} onClose={() => setModalOpen(false)} onAdd={addSnippet} user={user} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
}
