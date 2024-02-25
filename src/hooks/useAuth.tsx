"use client";

import { User } from "@/models/User";
import { getCookie, setCookie } from "cookies-next";
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
}

const AuthContext = createContext<AuthContextProps>({
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

  useEffect(() => {
    const user = getCookie("@app:user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    if (user) {
      const parsedUser = JSON.stringify(user);
      setCookie("@app:user", parsedUser);
    }
  }, [user]);

  const logout = useCallback(() => {
    setUser(null);
    setCookie("@app:user", null);
  }, []);

  return (
    <AuthContext.Provider value={{ user: null, setUser, logout }}>
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
