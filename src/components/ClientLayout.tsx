"use client";
import type { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ScrollProgress";
import { BackToTop } from "./BackToTop";
import { CookieConsent } from "./CookieConsent";

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <BackToTop />
      <CookieConsent />
    </ThemeProvider>
  );
}
