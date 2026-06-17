import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { LANGUAGES } from "../data/snippets";

const MAX_IMAGE_MB = 0.6; // Firestore documents cap at 1MB; base64 adds ~33% overhead

export default function AddNoteModal({ open, onClose, onAdd, user }) {
  const [lang, setLang] = useState("Python");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [outputImage, setOutputImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  function resetForm() {
    setTitle(""); setDesc(""); setCode(""); setOutput(""); setOutputImage(null);
  }

  function handleFile(file) {
    if (!file || !file.type.startsWith("image/")) { toast.error("Please choose an image file"); return; }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) { toast.error(`Image must be under ${MAX_IMAGE_MB}MB`); return; }
    const reader = new FileReader();
    reader.onload = () => setOutputImage(reader.result);
    reader.readAsDataURL(file);
  }

  function handlePaste(e) {
    const item = Array.from(e.clipboardData?.items || []).find((i) => i.type.startsWith("image/"));
    if (item) handleFile(item.getAsFile());
  }

  async function handleSave() {
    if (!user) { toast.error("Sign in to add notes"); return; }
    if (!title.trim() || !code.trim()) { toast.error("Title and code are required"); return; }
    setSaving(true);
    try {
      await onAdd({
        lang,
        title: title.trim(),
        desc: desc.trim(),
        code,
        output: output.trim(),
        outputImage: outputImage || null,
      });
      toast.success("Note added!", { style: { background: "#151b13", color: "#C8FF3D", border: "1px solid #232b20" } });
      resetForm();
      onClose();
    } catch {
      toast.error("Failed to save note");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={onClose}
          onPaste={handlePaste}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#11160f] border border-[#232b20] rounded-2xl p-6 max-h-[88vh] overflow-y-auto code-scroll"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-semibold text-lg text-white">Add a cheat sheet note</h2>
              <button onClick={onClose} className="text-[#5a6354] hover:text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="text-[12px] text-[#a8b39e] block mb-1.5">Language / Topic</label>
                <select value={lang} onChange={(e) => setLang(e.target.value)}
                  className="w-full bg-[#0d120b] border border-[#232b20] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C8FF3D]/50">
                  {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[12px] text-[#a8b39e] block mb-1.5">Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. List comprehension"
                  className="w-full bg-[#0d120b] border border-[#232b20] rounded-lg px-3 py-2 text-sm text-white placeholder:text-[#5a6354] focus:outline-none focus:border-[#C8FF3D]/50" />
              </div>
              <div>
                <label className="text-[12px] text-[#a8b39e] block mb-1.5">Description</label>
                <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="What does this do?"
                  className="w-full bg-[#0d120b] border border-[#232b20] rounded-lg px-3 py-2 text-sm text-white placeholder:text-[#5a6354] focus:outline-none focus:border-[#C8FF3D]/50" />
              </div>
              <div>
                <label className="text-[12px] text-[#a8b39e] block mb-1.5">Code snippet</label>
                <textarea value={code} onChange={(e) => setCode(e.target.value)} rows={5} placeholder="paste your code here"
                  className="w-full bg-[#0d120b] border border-[#232b20] rounded-lg px-3 py-2 text-sm font-mono text-white placeholder:text-[#5a6354] focus:outline-none focus:border-[#C8FF3D]/50 resize-none" />
              </div>

              <div>
                <label className="text-[12px] text-[#a8b39e] block mb-1.5">Expected output <span className="text-[#5a6354]">(text, optional)</span></label>
                <textarea value={output} onChange={(e) => setOutput(e.target.value)} rows={2} placeholder="what does this print/return?"
                  className="w-full bg-[#0d120b] border border-[#232b20] rounded-lg px-3 py-2 text-sm font-mono text-white placeholder:text-[#5a6354] focus:outline-none focus:border-[#C8FF3D]/50 resize-none" />
              </div>

              <div>
                <label className="text-[12px] text-[#a8b39e] block mb-1.5">Output screenshot <span className="text-[#5a6354]">(optional)</span></label>
                {outputImage ? (
                  <div className="relative">
                    <img src={outputImage} alt="Output preview" className="w-full rounded-lg border border-[#232b20] max-h-44 object-contain bg-[#0d120b]" />
                    <button
                      onClick={() => setOutputImage(null)}
                      className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-black"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border border-dashed border-[#232b20] rounded-lg py-4 text-[12px] text-[#5a6354] hover:border-[#C8FF3D]/40 hover:text-[#C8FF3D]/80 transition-colors flex flex-col items-center gap-1"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 8.25L12 3.75 7.5 8.25M12 3.75v12" />
                    </svg>
                    Click to upload, or paste a screenshot (Ctrl+V)
                  </button>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0])} />
                {!outputImage && <p className="text-[10.5px] text-[#5a6354] mt-1">Max size ~600KB — a cropped screenshot works best</p>}
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button onClick={onClose} className="px-4 py-2 text-sm text-[#a8b39e] border border-[#232b20] rounded-lg hover:text-white transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving} className="btn-neon px-4 py-2 text-sm rounded-lg disabled:opacity-50">
                {saving ? "Saving..." : "Save note"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
