import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { LANG_COLORS } from "../data/snippets";

export default function SnippetCard({ snippet, isBookmarked, onToggleBookmark, user }) {
  const [expanded, setExpanded] = useState(false);
  const col = LANG_COLORS[snippet.lang] || LANG_COLORS.JavaScript;
  const hasOutput = snippet.output || snippet.outputImage;

  function handleCopy(e) {
    e.stopPropagation();
    navigator.clipboard.writeText(snippet.code);
    toast.success("Copied to clipboard", {
      style: { background: "#151b13", color: "#C8FF3D", border: "1px solid #232b20" },
      iconTheme: { primary: "#C8FF3D", secondary: "#0a0e0a" },
    });
  }

  function handleBookmark(e) {
    e.stopPropagation();
    if (!user) { toast.error("Sign in to bookmark"); return; }
    onToggleBookmark(snippet.id);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      onClick={() => setExpanded((v) => !v)}
      className={`rounded-xl border bg-[#11160f] p-4 cursor-pointer transition-colors ${
        expanded ? "border-[#C8FF3D]/40" : "border-[#232b20] hover:border-[#3a4534]"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: col.dot }} />
          <h3 className="font-display font-medium text-[14px] text-white truncate">{snippet.title}</h3>
        </div>
        <span className={`shrink-0 text-[11px] px-2 py-0.5 rounded-full border ${col.bg} ${col.text} ${col.border}`}>
          {snippet.lang}
        </span>
      </div>

      <p className="text-[12.5px] text-[#a8b39e] leading-relaxed mb-3">{snippet.desc}</p>

      <div className="relative rounded-lg bg-[#0a0e0a] border border-[#1a2216] overflow-hidden">
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#1a2216]">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ff5f56]/60" />
            <span className="w-2 h-2 rounded-full bg-[#ffbd2e]/60" />
            <span className="w-2 h-2 rounded-full bg-[#27c93f]/60" />
          </div>
          <button
            onClick={handleCopy}
            className="text-[11px] text-[#5a6354] hover:text-[#C8FF3D] flex items-center gap-1 transition-colors"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
            Copy
          </button>
        </div>
        <pre className="p-3 text-[12px] font-mono text-[#d4dccb] overflow-x-auto leading-relaxed code-scroll whitespace-pre">
{snippet.code}
        </pre>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-lg bg-[#C8FF3D]/[0.06] border border-[#C8FF3D]/20 p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <svg className="w-3 h-3 text-[#C8FF3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
                </svg>
                <span className="text-[11px] font-medium text-[#C8FF3D] uppercase tracking-wide">Output</span>
              </div>

              {hasOutput ? (
                <div className="space-y-2.5">
                  {snippet.output && (
                    <pre className="text-[12px] font-mono text-[#d4dccb] whitespace-pre-wrap leading-relaxed">{snippet.output}</pre>
                  )}
                  {snippet.outputImage && (
                    <img
                      src={snippet.outputImage}
                      alt={`Output screenshot for ${snippet.title}`}
                      className="w-full rounded-md border border-[#1a2216]"
                    />
                  )}
                </div>
              ) : (
                <p className="text-[12px] text-[#5a6354]">No expected output provided for this note.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mt-3">
        <span className="text-[11px] text-[#5a6354] flex items-center gap-1">
          <svg className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          {expanded ? "Hide output" : "Show output"}
        </span>
        <button onClick={handleBookmark} className="text-[#5a6354] hover:text-[#C8FF3D] transition-colors">
          <svg className="w-4 h-4" fill={isBookmarked ? "#C8FF3D" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
