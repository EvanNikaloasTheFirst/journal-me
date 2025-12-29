import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Pen & Paper",
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
        className="

       
          bg-[#fff]
          text-neutral-800
          antialiased
          font-handwriting
          text-[12px]
          tracking-wide
        "
      >
        {/* ✅ NextAuth Provider */}
        <Providers>
          <div className="px-4 py-8">
            <main
              className="
                relative
                mt-[30px]
                bg-[url('/linedpaper.png')]
                bg-[size:24px_24px]
                w-[90vw]
                mx-auto
                min-h-screen
                border-2 border-black/40
                rounded-md
              "
            >
              {/* Notebook holes */}
              <div className="absolute left-2 top-6 bottom-6 flex flex-col justify-between">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full border border-black/40"
                  />
                ))}
              </div>

              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
