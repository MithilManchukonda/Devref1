import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

export default function AuthModal({ open, onClose }) {
  const { loginGoogle, loginEmail, signupEmail } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleGoogle() {
    setBusy(true);
    try {
      await loginGoogle();
      toast.success("Welcome to DevRef!");
      onClose();
    } catch {
      toast.error("Google sign-in failed");
    } finally { setBusy(false); }
  }

  async function handleEmail(e) {
    e.preventDefault();
    if (!email || !password) return;
    setBusy(true);
    try {
      if (mode === "login") await loginEmail(email, password);
      else await signupEmail(email, password);
      toast.success(mode === "login" ? "Welcome back!" : "Account created!");
      onClose();
    } catch (err) {
      toast.error(err.message?.replace("Firebase: ", "") || "Authentication failed");
    } finally { setBusy(false); }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-[#11160f] border border-[#232b20] rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-md bg-[#C8FF3D] flex items-center justify-center font-bold text-[#0a0e0a] text-xs">{"</>"}</div>
              <span className="font-display font-semibold text-white">DevRef</span>
            </div>
            <h2 className="font-display text-lg text-white mt-3 mb-1">{mode === "login" ? "Welcome back" : "Create your account"}</h2>
            <p className="text-[13px] text-[#a8b39e] mb-5">{mode === "login" ? "Sign in to save and bookmark your notes" : "Join to build your own cheat sheet"}</p>

            <button onClick={handleGoogle} disabled={busy}
              className="w-full flex items-center justify-center gap-2 border border-[#232b20] rounded-lg py-2.5 text-sm text-white hover:border-[#3a4534] transition-colors mb-4 disabled:opacity-50">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="h-px bg-[#232b20] flex-1" /><span className="text-[11px] text-[#5a6354]">or</span><div className="h-px bg-[#232b20] flex-1" />
            </div>

            <form onSubmit={handleEmail} className="space-y-3">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                className="w-full bg-[#0d120b] border border-[#232b20] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#5a6354] focus:outline-none focus:border-[#C8FF3D]/50" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
                className="w-full bg-[#0d120b] border border-[#232b20] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#5a6354] focus:outline-none focus:border-[#C8FF3D]/50" />
              <button type="submit" disabled={busy} className="btn-neon w-full rounded-lg py-2.5 text-sm disabled:opacity-50">
                {busy ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
              </button>
            </form>

            <p className="text-center text-[12.5px] text-[#a8b39e] mt-4">
              {mode === "login" ? "New here?" : "Already have an account?"}{" "}
              <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-[#C8FF3D] hover:underline">
                {mode === "login" ? "Create account" : "Sign in"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
