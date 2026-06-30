import { useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { useSnippets } from "./hooks/useSnippets";
import Navbar from "./components/Navbar";
import SubjectFilter from "./components/SubjectFilter";
import SnippetCard from "./components/SnippetCard";
import NoteModal from "./components/NoteModal";
import AuthModal from "./components/AuthModal";

function Dashboard() {
  const { user, logout } = useAuth();
  const { snippets, subjects, addSnippet, updateSnippet, deleteSnippet, bookmarks, toggleBookmark } = useSnippets(user);
  const [search, setSearch] = useState("");
  const [activeSubject, setActiveSubject] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);

  const counts = useMemo(() => {
    const c = { All: snippets.length };
    subjects.forEach((s) => { c[s] = snippets.filter((sn) => sn.subject === s).length; });
    return c;
  }, [snippets, subjects]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return snippets.filter((s) => {
      const matchSubject = activeSubject === "All" || s.subject === activeSubject;
      const matchQ = !q || s.title.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q) || s.code.toLowerCase().includes(q);
      return matchSubject && matchQ;
    });
  }, [snippets, search, activeSubject]);

  function openAddModal() {
    if (!user) { setAuthOpen(true); return; }
    setEditingSnippet(null);
    setModalOpen(true);
  }

  function openEditModal(snippet) {
    setEditingSnippet(snippet);
    setModalOpen(true);
  }

  async function handleSave(data) {
    if (editingSnippet) {
      await updateSnippet(editingSnippet.id, data);
    } else {
      await addSnippet(data);
    }
  }

  return (
    <div className="min-h-screen">
      <Toaster position="bottom-right" />
      <Navbar
        search={search} setSearch={setSearch}
        user={user} onLogout={logout}
        onAddClick={openAddModal}
        onAuthClick={() => setAuthOpen(true)}
      />

      <main className="max-w-6xl mx-auto px-5 py-6">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-semibold text-white mb-1">
            Your <span className="text-[#C8FF3D]">syntax</span> reference
          </h1>
          <p className="text-[13.5px] text-[#a8b39e]">
            {snippets.length === 0
              ? "No notes yet — add your first one to get started"
              : `${snippets.length} note${snippets.length === 1 ? "" : "s"} across ${subjects.length} subject${subjects.length === 1 ? "" : "s"}`}
          </p>
        </div>

        {subjects.length > 0 && (
          <div className="mb-5">
            <SubjectFilter subjects={subjects} active={activeSubject} setActive={setActiveSubject} counts={counts} />
          </div>
        )}

        {snippets.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-[#232b20] rounded-2xl">
            <p className="text-[#a8b39e] text-sm mb-4">Your cheat sheet is empty. Build your own reference library — any subject, any language.</p>
            <button onClick={openAddModal} className="btn-neon rounded-lg px-4 py-2 text-sm">
              + Add your first note
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#5a6354] text-sm">No notes found. Try a different search or subject.</p>
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
                onEdit={openEditModal}
                onDelete={deleteSnippet}
              />
            ))}
          </div>
        )}
      </main>

      <NoteModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditingSnippet(null); }}
        onSave={handleSave}
        user={user}
        subjects={subjects}
        editingSnippet={editingSnippet}
      />
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
