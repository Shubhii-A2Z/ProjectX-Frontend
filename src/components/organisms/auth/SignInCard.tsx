import {
    ArrowRight,
    Eye,
    EyeOff,
    ShieldCheck,
    TriangleAlert,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface SigninForm {
    email: string;
    password: string;
}

interface SigninCardProps {
    isPending: boolean;
    isSuccess: boolean;
    signinForm: SigninForm;
    setSigninForm: React.Dispatch<React.SetStateAction<SigninForm>>;
    validationError: Error | null;
    OnSigninFormSubmit: (
        event: React.FormEvent<HTMLFormElement>
    ) => void;
    onNavigateToSignup: () => void;
}

export const SigninCard = ({
    isPending,
    isSuccess,
    signinForm,
    setSigninForm,
    validationError,
    OnSigninFormSubmit,
    onNavigateToSignup,
}: SigninCardProps) => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleGoogleLogin = () => {
        const backendUrl = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000";
        window.location.href = `${backendUrl}/api/v1/oauth/google`;
    };

    return (
        <Card className="w-full max-w-[440px] overflow-hidden border border-slate-200/80 bg-white/88 shadow-[0_30px_80px_-30px_rgba(99,102,241,0.45)] backdrop-blur-xl">
            <CardHeader className="space-y-5 pb-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-500 text-lg font-bold text-white shadow-lg shadow-violet-400/30">
                    R
                </div>

                <div className="space-y-2">
                    <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-700">
                        secure access
                    </div>
                    <CardTitle className="text-3xl font-semibold tracking-[-0.06em] text-slate-950">
                        Welcome back
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-600">
                        Sign in to continue to your Relay workspace
                    </CardDescription>
                </div>

                {validationError && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-left text-sm text-red-700">
                        <TriangleAlert className="size-4 shrink-0" />
                        <p>{validationError.message}</p>
                    </div>
                )}

                {isSuccess && (
                    <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-left text-sm text-emerald-700">
                        <ShieldCheck className="size-4 shrink-0" />
                        <p>Successfully signed in. Redirecting...</p>
                    </div>
                )}
            </CardHeader>

            <CardContent className="space-y-6 px-6 pb-6">
                <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="h-12 w-full gap-3 rounded-xl border-slate-200 bg-white text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                    disabled={isPending}
                    onClick={handleGoogleLogin}
                >
                    <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="#4285F4" d="M21.35 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.23a4.46 4.46 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.2Z" />
                        <path fill="#34A853" d="M12 21.75c2.63 0 4.84-.87 6.45-2.35l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.28v2.52A9.75 9.75 0 0 0 12 21.75Z" />
                        <path fill="#FBBC05" d="M6.53 13.85A5.86 5.86 0 0 1 6.23 12c0-.64.11-1.26.3-1.85V7.63H3.28A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.03 4.37l3.25-2.52Z" />
                        <path fill="#EA4335" d="M12 6.12c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.21 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.72 5.38l3.25 2.52C7.3 7.84 9.46 6.12 12 6.12Z" />
                    </svg>
                    Continue with Google
                </Button>

                <div className="relative">
                    <Separator />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[10px] font-medium uppercase tracking-[0.22em] text-slate-500">
                        Or continue with email
                    </span>
                </div>

                <form className="space-y-4" onSubmit={OnSigninFormSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-slate-700">
                            Work email
                        </label>

                        <Input
                            id="email"
                            disabled={isPending}
                            placeholder="you@company.com"
                            required
                            type="email"
                            autoComplete="email"
                            value={signinForm.email}
                            onChange={(event) =>
                                setSigninForm({
                                    ...signinForm,
                                    email: event.target.value,
                                })
                            }
                            className="h-12 rounded-xl border-slate-200 bg-slate-50/80 text-sm shadow-sm transition-all focus-visible:border-violet-300 focus-visible:ring-violet-200"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="text-sm font-medium text-slate-700">
                                Password
                            </label>

                            <button
                                type="button"
                                className="text-xs font-medium text-violet-700 transition-colors hover:text-violet-800 hover:underline"
                                onClick={() => navigate("/auth/forgot-password")}
                            >
                                Forgot password?
                            </button>
                        </div>

                        <div className="relative">
                            <Input
                                id="password"
                                disabled={isPending}
                                placeholder="Enter your password"
                                required
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                value={signinForm.password}
                                onChange={(event) =>
                                    setSigninForm({
                                        ...signinForm,
                                        password: event.target.value,
                                    })
                                }
                                className="h-12 rounded-xl border-slate-200 bg-slate-50/80 pr-11 text-sm shadow-sm transition-all focus-visible:border-violet-300 focus-visible:ring-violet-200"
                            />

                            <button
                                type="button"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                                onClick={() => setShowPassword((previous) => !previous)}
                            >
                                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                        </div>
                    </div>

                    <Button
                        className="h-12 w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 hover:from-violet-500 hover:to-indigo-500"
                        disabled={isPending}
                        size="lg"
                        type="submit"
                    >
                        {isPending ? (
                            "Signing in..."
                        ) : (
                            <>
                                Sign in
                                <ArrowRight className="ml-2 size-4" />
                            </>
                        )}
                    </Button>
                </form>

                <div className="text-center text-sm text-slate-600">
                    Don&apos;t have an account?{" "}
                    <button
                        type="button"
                        className="font-semibold text-violet-700 transition-colors hover:text-violet-800 hover:underline"
                        onClick={onNavigateToSignup}
                    >
                        Create an account
                    </button>
                </div>
            </CardContent>
        </Card>
    );
};
