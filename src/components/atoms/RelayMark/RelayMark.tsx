import type { SVGProps } from "react";

/**
 * Futuristic Relay brand mark.
 * Reusable across the app rail, loading screens, and AI UI.
 */
export const RelayMark = ({
    className,
    ...props
}: SVGProps<SVGSVGElement>) => (
    <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        fill="none"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <defs>
            <linearGradient
                id="relay-mark-gradient"
                x1="7"
                y1="6"
                x2="41"
                y2="43"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#67E8F9" />
                <stop offset="0.52" stopColor="#818CF8" />
                <stop offset="1" stopColor="#C084FC" />
            </linearGradient>

            <linearGradient
                id="relay-mark-core"
                x1="13"
                y1="12"
                x2="36"
                y2="37"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#FFFFFF" />
                <stop offset="1" stopColor="#C4B5FD" />
            </linearGradient>
        </defs>

        {/* Outer glow */}
        <path
            d="M24 3.5 28.8 16l12.7 4.8-12.7 4.8L24 38.5l-4.8-12.9L6.5 20.8 19.2 16 24 3.5Z"
            fill="url(#relay-mark-gradient)"
            opacity=".2"
        />

        {/* Main Relay symbol */}
        <path
            d="M24 5.5 29.3 18.7 42.5 24 29.3 29.3 24 42.5 18.7 29.3 5.5 24 18.7 18.7 24 5.5Z"
            stroke="url(#relay-mark-gradient)"
            strokeWidth="2.4"
            strokeLinejoin="round"
        />

        {/* Inner core */}
        <path
            d="M24 14.5 27.2 21 33.5 24 27.2 27 24 33.5 21 27 14.5 24 21 21 24 14.5Z"
            fill="url(#relay-mark-core)"
        />

        {/* Accent particles */}
        <circle
            cx="36.5"
            cy="10.5"
            r="2.5"
            fill="#67E8F9"
        />

        <circle
            cx="10"
            cy="36.5"
            r="1.8"
            fill="#C084FC"
        />
    </svg>
);