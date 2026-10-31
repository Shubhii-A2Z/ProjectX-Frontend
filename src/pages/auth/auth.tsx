import { Check, ShieldCheck, Sparkles } from "lucide-react";

export const Auth = ({ children }: { children: any }) => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#0f172a] px-4 py-8 sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.25),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.22),transparent_30%)]" />
            <div className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-violet-500/25 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />

            <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
                <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="hidden rounded-[30px] border border-white/10 bg-slate-950/60 p-8 text-white shadow-[0_35px_90px_-20px_rgba(15,23,42,0.75)] backdrop-blur-xl lg:flex lg:flex-col lg:justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium tracking-[0.2em] text-slate-200 uppercase">
                                <Sparkles className="h-3.5 w-3.5 text-violet-300" />
                                Relay
                            </div>

                            <h1 className="mt-8 max-w-md text-4xl font-semibold tracking-[-0.06em] text-white">
                                Work smarter, together.
                            </h1>

                            <p className="mt-4 max-w-md text-base leading-7 text-slate-300">
                                Keep your projects, team updates, and decisions in one secure workspace built for modern collaboration.
                            </p>

                            <ul className="mt-8 space-y-4">
                                {[
                                    "Unlimited task tracking and team visibility",
                                    "Secure collaboration with enterprise-grade controls",
                                    "Fast onboarding for teams and customer-facing projects",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-slate-200">
                                        <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                                            <Check className="h-3 w-3" />
                                        </span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                                        Trusted by
                                    </p>
                                    <p className="mt-2 text-2xl font-semibold text-white">2,000+ teams</p>
                                </div>
                                <div className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-sm font-medium text-emerald-300">
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                    4.9/5
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};