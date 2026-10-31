import { useEffect, useState } from "react";

const loadingText = ["Loading", "Preparing", "Syncing"];

export const RelayLoading = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((previous) => (previous + 1) % loadingText.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#070b14]/90 backdrop-blur-[2px]">
      <div className="relative flex flex-col items-center justify-center">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#8b5cf6_0%,#6366f1_40%,#38bdf8_100%)] shadow-[0_18px_40px_-16px_rgba(99,102,241,0.9)]">
          <div className="absolute inset-0 animate-ping rounded-2xl bg-violet-400/20" />
          <span className="relative text-2xl font-black text-white">R</span>
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm text-slate-300">
          <span className="tracking-[0.18em] uppercase text-slate-400">
            {loadingText[currentIndex]}
          </span>
          <span className="flex gap-1">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  dot === currentIndex ? "bg-violet-400 scale-125" : "bg-slate-600"
                }`}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};