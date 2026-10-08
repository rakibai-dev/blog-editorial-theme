import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "The Editorial — Ideas worth keeping",
  description: "A placeholder editorial blog built with Next.js."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <footer className="site-footer">
          <div className="container footer-inner">
            <span>THE EDITORIAL</span>
            <span>Independent ideas · 2026</span>
          </div>
        </footer>
      </body>
    </html>
  );
}