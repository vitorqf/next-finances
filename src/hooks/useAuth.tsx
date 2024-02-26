"use client";

import { User } from "@/models/User";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  loading: true,
  user: null,
  setUser: () => {
    console.error("setUser function was not provided");
  },
  logout: () => {
    console.error("logout function was not provided");
  },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = getCookie("@app:user");
    if (user) {
      setUser(JSON.parse(user));
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const parsedUser = JSON.stringify(user);
      setCookie("@app:user", parsedUser);
      setLoading(false);
    }
  }, [user]);

  const logout = useCallback(() => {
    setUser(null);
    setCookie("@app:user", null);
    setLoading(false);
    router.push("/entrar");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
