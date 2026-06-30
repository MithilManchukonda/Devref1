import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const loginGoogle = () => signInWithPopup(auth, googleProvider);
  const loginEmail = (email, pass) => signInWithEmailAndPassword(auth, email, pass);
  const signupEmail = (email, pass) => createUserWithEmailAndPassword(auth, email, pass);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, loading, loginGoogle, loginEmail, signupEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
