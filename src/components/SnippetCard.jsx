import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import java from "react-syntax-highlighter/dist/esm/languages/prism/java";
import cpp from "react-syntax-highlighter/dist/esm/languages/prism/cpp";
import c from "react-syntax-highlighter/dist/esm/languages/prism/c";
import csharp from "react-syntax-highlighter/dist/esm/languages/prism/csharp";
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import docker from "react-syntax-highlighter/dist/esm/languages/prism/docker";
import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import go from "react-syntax-highlighter/dist/esm/languages/prism/go";
import rust from "react-syntax-highlighter/dist/esm/languages/prism/rust";
import ruby from "react-syntax-highlighter/dist/esm/languages/prism/ruby";
import php from "react-syntax-highlighter/dist/esm/languages/prism/php";
import kotlin from "react-syntax-highlighter/dist/esm/languages/prism/kotlin";
import swift from "react-syntax-highlighter/dist/esm/languages/prism/swift";
import { getSubjectColor } from "../data/subjects";
import { detectLanguage } from "../utils/detectLanguage";

SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("markup", markup);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("c", c);
SyntaxHighlighter.registerLanguage("csharp", csharp);
SyntaxHighlighter.registerLanguage("sql", sql);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("docker", docker);
SyntaxHighlighter.registerLanguage("yaml", yaml);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("go", go);
SyntaxHighlighter.registerLanguage("rust", rust);
SyntaxHighlighter.registerLanguage("ruby", ruby);
SyntaxHighlighter.registerLanguage("php", php);
SyntaxHighlighter.registerLanguage("kotlin", kotlin);
SyntaxHighlighter.registerLanguage("swift", swift);

export default function SnippetCard({ snippet, isBookmarked, onToggleBookmark, onEdit, onDelete, user }) {
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const col = getSubjectColor(snippet.subject);
  const hasOutput = snippet.output || snippet.outputImage;
  const isOwner = user && snippet.authorId === user.uid;
  const lang = detectLanguage(snippet.subject);

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

  function handleEditClick(e) {
    e.stopPropagation();
    onEdit(snippet);
  }

  function handleDeleteClick(e) {
    e.stopPropagation();
    if (!confirmDelete) { setConfirmDelete(true); return; }
    onDelete(snippet.id);
    toast.success("Note deleted", { style: { background: "#151b13", color: "#C8FF3D", border: "1px solid #232b20" } });
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
          {snippet.subject}
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
          <div className="flex items-center gap-3">
            {lang !== "text" && (
              <span className="text-[10px] text-[#5a6354] uppercase tracking-wide">{lang}</span>
            )}
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
        </div>
        <SyntaxHighlighter
          language={lang}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "0.75rem",
            background: "transparent",
            fontSize: "12px",
            lineHeight: 1.6,
          }}
          codeTagProps={{ style: { fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)" } }}
          wrapLongLines={false}
          className="code-scroll"
        >
          {snippet.code}
        </SyntaxHighlighter>
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

        <div className="flex items-center gap-3">
          {isOwner && (
            <>
              <button onClick={handleEditClick} title="Edit note" className="text-[#5a6354] hover:text-[#C8FF3D] transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={handleDeleteClick}
                title={confirmDelete ? "Click again to confirm" : "Delete note"}
                className={`transition-colors ${confirmDelete ? "text-red-400" : "text-[#5a6354] hover:text-red-400"}`}
              >
                {confirmDelete ? (
                  <span className="text-[10.5px] font-medium px-1.5">Confirm?</span>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
              </button>
            </>
          )}
          <button onClick={handleBookmark} className="text-[#5a6354] hover:text-[#C8FF3D] transition-colors">
            <svg className="w-4 h-4" fill={isBookmarked ? "#C8FF3D" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
