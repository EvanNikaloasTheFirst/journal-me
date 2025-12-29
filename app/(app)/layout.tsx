

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        min-h-screen
        bg-[#fff]
        text-neutral-800
        font-handwriting
        text-[12px]
        tracking-wide
      
      "
    >
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
  );
}
