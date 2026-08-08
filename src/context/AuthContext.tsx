"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as fbSignOut,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider, ADMIN_EMAILS } from "@/lib/firebase";
import type { StudentProfile } from "@/types";

interface AuthContextValue {
  user: User | null;
  profile: StudentProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      setUser(fbUser);
      if (fbUser) {
        const ref = doc(db, "students", fbUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProfile(snap.data() as StudentProfile);
        } else {
          // First-time Google sign-in -> create a Pending Verification profile.
          const isAdmin = ADMIN_EMAILS.includes(
            (fbUser.email || "").toLowerCase()
          );
          const newProfile: StudentProfile = {
            uid: fbUser.uid,
            name: fbUser.displayName || "Student",
            email: fbUser.email || "",
            photoURL: fbUser.photoURL || "",
            role: isAdmin ? "admin" : "student",
            status: isAdmin ? "approved" : "pending",
            className: "",
            createdAt: Date.now(),
          };
          await setDoc(ref, { ...newProfile, createdAt: serverTimestamp() });
          setProfile(newProfile);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const signOut = async () => {
    await fbSignOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
