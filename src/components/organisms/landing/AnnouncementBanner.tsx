import {
    ArrowRight,
    Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

import relayAiLogo from "@/assets/relay-ai-logo.png";

import { LANDING_CONFIG } from "./landing.data";

export const AnnouncementBanner = () => {
    const navigate = useNavigate();

    const { announcement } =
        LANDING_CONFIG;

    return (
        <div className="relative px-4 pt-4">
            <motion.button
                type="button"
                onClick={() =>
                    navigate(announcement.route)
                }
                initial={{
                    opacity: 0,
                    y: -10,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.5,
                }}
                whileHover={{
                    y: -1,
                }}
                className="group relative mx-auto flex w-fit items-center gap-3 overflow-hidden rounded-full border border-border/60 bg-background/75 px-3 py-2 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
            >
                {/* animated glow */}
                <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="absolute -inset-[150%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_250deg,hsl(var(--primary)/0.4)_290deg,hsl(280_90%_65%/0.35)_320deg,transparent_360deg)]" />
                </span>

                {/* inner surface */}
                <span className="relative flex items-center gap-2 rounded-full bg-background/90 px-2 py-1">
                    <img
                        src={relayAiLogo}
                        alt={announcement.product}
                        className="h-5 w-5 object-contain"
                    />

                    <span className="font-medium">
                        {announcement.product}
                    </span>
                </span>

                <span className="hidden text-muted-foreground sm:inline">
                    {announcement.label}
                </span>

                <Sparkles className="h-3.5 w-3.5 text-primary" />

                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
        </div>
    );
};