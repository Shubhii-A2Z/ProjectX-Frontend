import { ArrowRight } from "lucide-react";

import relayAiLogo from "@/assets/relay-ai-logo.png";

export const AnnouncementBanner = () => {
  return (
    <section className="relative w-full border-b border-border/40 bg-muted/20 py-2.5">
      {/* Subtle background atmosphere */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-r
          from-blue-500/[0.02]
          via-purple-500/[0.04]
          to-pink-500/[0.02]
        "
      />

      {/* Announcement */}
      <div className="relative flex w-full justify-center px-4">
        <div className="group relative cursor-pointer rounded-full">
          
          {/* Hover glow */}
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
              group-hover:opacity-40
            "
          />

          {/* Border wrapper */}
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
            {/* Static border */}
            <div
              className="
                absolute
                inset-0
                rounded-full
                bg-gradient-to-r
                from-blue-500/35
                via-purple-500/35
                to-pink-500/35
                transition-opacity
                duration-300
                group-hover:opacity-0
              "
            />

            {/* Animated border */}
            <div
              className="
                absolute
                inset-[-300%]
                bg-[conic-gradient(from_0deg,#60a5fa,#a855f7,#ec4899,#60a5fa)]
                opacity-0
                transition-opacity
                duration-300
                group-hover:opacity-100
                group-hover:animate-[spin_3.5s_linear_infinite]
              "
            />

            {/* Content */}
            <div
              className="
                relative
                z-10
                flex
                h-[40px]
                items-center
                rounded-full
                bg-background
                pl-2.5
                pr-3
              "
            >
              {/* Logo */}
              <div className="flex h-7 w-7 shrink-0 items-center justify-center">
                <img
                  src={relayAiLogo}
                  alt="RelayAI"
                  className="h-7 w-7 object-contain"
                />
              </div>

              {/* Product name */}
              <div className="ml-2.5 whitespace-nowrap">
                <span className="text-sm font-bold tracking-tight text-foreground">
                  Relay
                </span>

                <span
                  className="
                    bg-gradient-to-r
                    from-blue-500
                    via-purple-500
                    to-pink-500
                    bg-clip-text
                    text-sm
                    font-bold
                    tracking-tight
                    text-transparent
                  "
                >
                  AI
                </span>
              </div>

              {/* Divider */}
              <div className="mx-2.5 h-5 w-px bg-border" />

              {/* Announcement */}
              <span className="whitespace-nowrap text-xs font-medium text-muted-foreground">
                Coming in Relay 2.0
              </span>

              {/* Arrow */}
              <ArrowRight
                className="
                  ml-2
                  h-3.5
                  w-3.5
                  shrink-0
                  text-muted-foreground
                  transition-all
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:text-foreground
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};