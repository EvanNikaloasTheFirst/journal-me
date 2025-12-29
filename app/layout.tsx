import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import ThemeToggle from "./components/UserInterface/DarkModeToggle";



export const metadata: Metadata = {
  title: "LifeOS",
  description: "A messy, honest notebook for habits, goals, and reflection",
  icons: {
    icon: "/icon.png",          // standard favicon
    shortcut:  "/icon.png",    // legacy support
    apple: "/icon.png",         // iOS home screen
  },
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
{/* <div className="relative ">
  <ThemeToggle />
</div> */}

              {children}
            </main>
                    <p className=" text-white text-[12px] text-center">Created By: <a href="https://www.instagram.com/ev.codes">@ev.codes</a></p>

          </div>
        </Providers>
      </body>
    </html>
  );
}
