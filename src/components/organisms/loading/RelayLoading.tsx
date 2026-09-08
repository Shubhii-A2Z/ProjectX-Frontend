import {
  Bot,
  FileText,
  Hash,
  MessageSquare,
  Users,
} from "lucide-react";

const items = [
  {
    icon: FileText,
    label: "Docs",
  },
  {
    icon: MessageSquare,
    label: "Chat",
  },
  {
    icon: Users,
    label: "Teams",
  },
  {
    icon: Hash,
    label: "Channels",
  },
  {
    icon: Bot,
    label: "AI",
  },
];

export const RelayLoading = () => {
  /*
   * Duplicate the items so the animation can loop
   * seamlessly.
   */
  const loadingItems = [...items, ...items];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
     
      {/* Moving icons viewport */}
      <div
        className="
          relative
          w-[360px]
          overflow-hidden
          rounded-2xl
          border
          bg-background
          py-4
          shadow-sm
          sm:w-[480px]
        "
      >
        {/* Left fade */}
        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-10
            h-full
            w-16
            bg-gradient-to-r
            from-background
            to-transparent
          "
        />

        {/* Right fade */}
        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            z-10
            h-full
            w-16
            bg-gradient-to-l
            from-background
            to-transparent
          "
        />

        {/* Moving track */}
        <div className="relay-loading-track flex w-max items-center gap-5">
          {loadingItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={`${item.label}-${index}`}
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  bg-muted/30
                  text-muted-foreground
                "
              >
                <Icon className="h-6 w-6" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Loading text */}
      <p className="mt-6 text-sm text-muted-foreground">
        Bringing everything together...
      </p>
    </div>
  );
};