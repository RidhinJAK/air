"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
type Theme = "dark" | "light";
const Ctx = createContext<{ theme: Theme; toggle: () => void }>({ theme: "dark", toggle: () => {} });
export const useTheme = () => useContext(Ctx);
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); const s = localStorage.getItem("aq-t") as Theme | null; if (s) setTheme(s); }, []);
  useEffect(() => { if (!ready) return; document.documentElement.classList.remove("dark","light"); document.documentElement.classList.add(theme); localStorage.setItem("aq-t", theme); }, [theme, ready]);
  return <Ctx.Provider value={{ theme, toggle: () => setTheme(t => t === "dark" ? "light" : "dark") }}>{children}</Ctx.Provider>;
}
