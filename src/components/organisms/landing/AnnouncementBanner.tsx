import { ArrowRight } from "lucide-react";

import relayAiLogo from "@/assets/relay-ai-logo.png";

export const AnnouncementBanner = () => {
  return (
    <section className="relative w-full border-b border-border/40 bg-muted/20 py-5 cursor-pointer">
      {/* Soft background glow */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-r
          from-blue-500/[0.03]
          via-purple-500/[0.05]
          to-pink-500/[0.03]
        "
      />

      {/* Announcement */}
      <div className="relative flex w-full justify-center px-4">
        <div className="group relative rounded-full">
          {/* Soft ambient hover glow (tightly contained around the pill) */}
          <div
            className="
              pointer-events-none
              absolute
              -inset-1
              rounded-full
              bg-gradient-to-r
              from-blue-500
              via-purple-500
              to-pink-500
              opacity-0
              blur-md
              transition-opacity
              duration-300
              group-hover:opacity-50
            "
          />

          {/* Border container with overflow-hidden to prevent color bleed */}
          <div
            className="
              relative
              flex
              items-center
              justify-center
              overflow-hidden
              rounded-full
              p-[1.5px]
            "
          >
            {/* Default static border */}
            <div
              className="
                absolute
                inset-0
                rounded-full
                bg-gradient-to-r
                from-blue-500/40
                via-purple-500/40
                to-pink-500/40
                transition-opacity
                duration-300
                group-hover:opacity-0
              "
            />

            {/* Spinning conic gradient (clipped strictly to the 1.5px padding border) */}
            <div
              className="
                absolute
                inset-[-300%]
                bg-[conic-gradient(from_0deg,#60a5fa,#a855f7,#ec4899,#60a5fa)]
                opacity-0
                transition-opacity
                duration-300
                group-hover:opacity-100
                group-hover:animate-[spin_2.5s_linear_infinite]
              "
            />

            {/* Inner content (covers everything except the 1.5px padding) */}
            <div
              className="
                relative
                z-10
                flex
                h-[48px]
                items-center
                rounded-full
                bg-background
                pl-3
                pr-2
              "
            >
              {/* Logo */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                <img
                  src={relayAiLogo}
                  alt="RelayAI"
                  className="h-8 w-8 object-contain"
                />
              </div>

              {/* RelayAI */}
              <div className="ml-3 whitespace-nowrap">
                <span className="text-[16px] font-bold tracking-tight text-foreground">
                  Relay
                </span>

                <span
                  className="
                    bg-gradient-to-r
                    from-blue-500
                    via-purple-500
                    to-pink-500
                    bg-clip-text
                    text-[16px]
                    font-bold
                    tracking-tight
                    text-transparent
                  "
                >
                  AI
                </span>
              </div>

              {/* Divider */}
              <div className="mx-3 h-6 w-px bg-border" />

              {/* Coming Soon */}
              <span
                className="
                  whitespace-nowrap
                  rounded-full
                  bg-gradient-to-r
                  from-purple-50
                  to-blue-50
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  text-purple-600
                  dark:from-purple-950/40
                  dark:to-blue-950/40
                "
              >
                Coming Soon In 2.0
              </span>

              {/* Arrow */}
              <ArrowRight
                className="
                  ml-2
                  h-4
                  w-4
                  shrink-0
                  text-muted-foreground
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};