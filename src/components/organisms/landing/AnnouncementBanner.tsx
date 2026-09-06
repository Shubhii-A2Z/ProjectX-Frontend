import { ArrowRight } from "lucide-react";

import relayAiLogo from "@/assets/relay-ai-logo.png";

export const AnnouncementBanner = () => {
  return (
    <section className="relative w-full border-b border-border/40 bg-muted/20 py-5">
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

      {/* Announcement pill */}
      <div className="relative flex w-full justify-center px-4">
        <div
          className="
            inline-flex
            rounded-full
            bg-gradient-to-r
            from-blue-400
            via-purple-400
            to-pink-400
            p-[1.5px]
            shadow-[0_0_20px_rgba(139,92,246,0.08)]
          "
        >
          <div
            className="
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
              Coming Soon
            </span>

            {/* Arrow */}
            <ArrowRight
              className="
                ml-2
                h-4
                w-4
                shrink-0
                text-muted-foreground
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
};