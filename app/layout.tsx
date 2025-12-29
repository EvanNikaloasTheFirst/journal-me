import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "LifeOS",
  description: "A messy, honest notebook for habits, goals, and reflection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body

      >
        {/* ✅ NextAuth Provider */}
        <Providers>
          <div className="px-4 py-8">
            <main
            
            >
          
              {children}
            </main>
          </div>
        </Providers>
        <p className=" text-[12px] text-center">Created By: <a href="https://www.instagram.com/ev.codes">@ev.codes</a></p>
      </body>
    </html>
  );
}
