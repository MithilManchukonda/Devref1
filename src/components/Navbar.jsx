import { motion } from "framer-motion";

export default function Navbar({ search, setSearch, user, onLogout, onAddClick, onAuthClick }) {
  return (
    <header className="sticky top-0 z-30 glass-panel border-b border-[#232b20]">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center gap-4">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-md bg-[#C8FF3D] flex items-center justify-center font-display font-bold text-[#0a0e0a] text-sm">
            {"</>"}
          </div>
          <span className="font-display font-semibold text-[15px] tracking-tight text-white hidden sm:block">
            Dev<span className="text-[#C8FF3D]">Ref</span>
          </span>
        </div>

        <div className="flex-1 relative max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6354]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search syntax, concepts, code..."
            className="w-full bg-[#0d120b] border border-[#232b20] rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-[#5a6354] focus:outline-none focus:border-[#C8FF3D]/50 focus:ring-1 focus:ring-[#C8FF3D]/20 transition-all"
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onAddClick}
          className="btn-neon rounded-lg px-3.5 py-2 text-sm flex items-center gap-1.5 shrink-0"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">Add Note</span>
        </motion.button>

        {user ? (
          <button
            onClick={onLogout}
            title={user.email}
            className="w-9 h-9 rounded-full bg-[#1a2216] border border-[#232b20] flex items-center justify-center text-xs font-medium text-[#C8FF3D] shrink-0 hover:border-[#C8FF3D]/40 transition-colors"
          >
            {(user.email || "U")[0].toUpperCase()}
          </button>
        ) : (
          <button
            onClick={onAuthClick}
            className="text-sm text-[#e8ede4] border border-[#232b20] rounded-lg px-3.5 py-2 hover:border-[#C8FF3D]/40 hover:text-[#C8FF3D] transition-colors shrink-0"
          >
            Sign in
          </button>
        )}
      </div>
    </header>
  );
}
