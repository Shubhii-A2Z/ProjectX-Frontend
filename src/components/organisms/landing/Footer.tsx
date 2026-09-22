import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Separator } from "@/components/ui/separator";

import { LANDING_CONFIG } from "./landing.data";

export const Footer = () => {
    const navigate = useNavigate();
    const { footer } = LANDING_CONFIG;

    const handleLinkClick = (
        route?: string,
        anchor?: string,
    ) => {
        if (route) {
            navigate(route);
            return;
        }

        if (anchor) {
            document
                .getElementById(anchor)
                ?.scrollIntoView({
                    behavior: "smooth",
                });
        }
    };

    return (
        <footer className="border-t bg-muted/20">
            <div className="mx-auto max-w-7xl px-6 py-14">
                <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
                                {footer.logoInitial}
                            </div>

                            <span className="font-semibold">
                                {footer.brandName}
                            </span>
                        </div>

                        <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
                            {footer.description}
                        </p>
                    </div>

                    {footer.columns.map((column) => (
                        <div key={column.title}>
                            <h3 className="text-sm font-semibold">
                                {column.title}
                            </h3>

                            <div className="mt-4 space-y-3">
                                {column.links.map((link) => (
                                    <button
                                        key={link.label}
                                        type="button"
                                        onClick={() =>
                                            handleLinkClick(
                                                link.route,
                                                link.anchor,
                                            )
                                        }
                                        className="group flex items-center gap-1 text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {link.label}

                                        {link.external && (
                                            <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <Separator className="my-10" />

                <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <span>{footer.copyright}</span>

                    <span>{footer.tagline}</span>
                </div>
            </div>
        </footer>
    );
};