import { Eye, EyeOff, TriangleAlert } from "lucide-react";
import { useState } from "react";

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

interface SignupForm {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface SignupCardProps {
    signupForm: SignupForm;
    setSignupForm: React.Dispatch<React.SetStateAction<SignupForm>>;
    validationError: Error | null;
    OnSignupFormSubmit: (
        event: React.FormEvent<HTMLFormElement>
    ) => void;
    isPending: boolean;
    isSuccess: boolean;
    onNavigateToLogin: () => void;
}

export const SignupCard = ({
    signupForm,
    setSignupForm,
    validationError,
    OnSignupFormSubmit,
    isPending,
    isSuccess,
    onNavigateToLogin,
}: SignupCardProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleGoogleSignup = () => {
        const backendUrl = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000";
        window.location.href = `${backendUrl}/api/v1/oauth/google`;
    };

    return (
        <Card className="w-full max-w-[440px] overflow-hidden border border-slate-200/80 bg-white/88 shadow-[0_30px_80px_-30px_rgba(59,130,246,0.35)] backdrop-blur-xl">
            <CardHeader className="space-y-5 pb-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-sky-500 text-lg font-bold text-white shadow-lg shadow-violet-400/25">
                    R
                </div>

                <div className="space-y-2">
                    <div className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-700">
                        start free
                    </div>
                    <CardTitle className="text-3xl font-semibold tracking-[-0.06em] text-slate-950">
                        Create your account
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-600">
                        Join Relay and start collaborating with your team.
                    </CardDescription>
                </div>

                {validationError && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-left text-sm text-red-700">
                        <TriangleAlert className="h-4 w-4 shrink-0" />
                        <p>{validationError.message}</p>
                    </div>
                )}

                {isSuccess && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                        Successfully signed up. Redirecting to login page...
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
                    onClick={handleGoogleSignup}
                >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="#4285F4" d="M21.35 12.27c0-.68-.06-1.34-.17-1.97H12v3.73h5.23a4.47 4.47 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.13Z" />
                        <path fill="#34A853" d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.93-3.31.93-2.54 0-4.7-1.72-5.47-4.03H3.28v2.52A9.75 9.75 0 0 0 12 21.5Z" />
                        <path fill="#FBBC05" d="M6.53 13.6a5.86 5.86 0 0 1 0-3.2V7.88H3.28a9.5 9.5 0 0 0 0 8.24l3.25-2.52Z" />
                        <path fill="#EA4335" d="M12 6.37c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.4 14.63 2.5 12 2.5a9.75 9.75 0 0 0-8.72 5.38l3.25 2.52C7.3 8.09 9.46 6.37 12 6.37Z" />
                    </svg>
                    Continue with Google
                </Button>

                <div className="relative">
                    <Separator />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[10px] font-medium uppercase tracking-[0.22em] text-slate-500">
                        Or sign up with email
                    </span>
                </div>

                <form className="space-y-4" onSubmit={OnSignupFormSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="username" className="text-sm font-medium text-slate-700">
                            Username
                        </label>

                        <Input
                            id="username"
                            placeholder="john_doe"
                            required
                            type="text"
                            value={signupForm.username}
                            disabled={isPending}
                            onChange={(event) =>
                                setSignupForm({
                                    ...signupForm,
                                    username: event.target.value,
                                })
                            }
                            className="h-12 rounded-xl border-slate-200 bg-slate-50/80 text-sm shadow-sm transition-all focus-visible:border-violet-300 focus-visible:ring-violet-200"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="signup-email" className="text-sm font-medium text-slate-700">
                            Work email
                        </label>

                        <Input
                            id="signup-email"
                            placeholder="you@company.com"
                            required
                            type="email"
                            value={signupForm.email}
                            disabled={isPending}
                            onChange={(event) =>
                                setSignupForm({
                                    ...signupForm,
                                    email: event.target.value,
                                })
                            }
                            className="h-12 rounded-xl border-slate-200 bg-slate-50/80 text-sm shadow-sm transition-all focus-visible:border-violet-300 focus-visible:ring-violet-200"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="signup-password" className="text-sm font-medium text-slate-700">
                            Password
                        </label>

                        <div className="relative">
                            <Input
                                id="signup-password"
                                placeholder="Create a strong password"
                                required
                                type={showPassword ? "text" : "password"}
                                value={signupForm.password}
                                disabled={isPending}
                                onChange={(event) =>
                                    setSignupForm({
                                        ...signupForm,
                                        password: event.target.value,
                                    })
                                }
                                className="h-12 rounded-xl border-slate-200 bg-slate-50/80 pr-11 text-sm shadow-sm transition-all focus-visible:border-violet-300 focus-visible:ring-violet-200"
                            />

                            <button
                                type="button"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                onClick={() => setShowPassword((previous) => !previous)}
                                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="confirm-password" className="text-sm font-medium text-slate-700">
                            Confirm password
                        </label>

                        <div className="relative">
                            <Input
                                id="confirm-password"
                                placeholder="Re-enter your password"
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                value={signupForm.confirmPassword}
                                disabled={isPending}
                                onChange={(event) =>
                                    setSignupForm({
                                        ...signupForm,
                                        confirmPassword: event.target.value,
                                    })
                                }
                                className="h-12 rounded-xl border-slate-200 bg-slate-50/80 pr-11 text-sm shadow-sm transition-all focus-visible:border-violet-300 focus-visible:ring-violet-200"
                            />

                            <button
                                type="button"
                                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                onClick={() => setShowConfirmPassword((previous) => !previous)}
                                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                            >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <Button
                        disabled={isPending}
                        size="lg"
                        type="submit"
                        className="h-12 w-full rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-500 text-white shadow-lg shadow-violet-500/25 hover:from-violet-500 hover:via-indigo-500 hover:to-sky-500"
                    >
                        {isPending ? "Creating account..." : "Create account"}
                    </Button>
                </form>

                <div className="relative">
                    <Separator />
                </div>

                <p className="text-center text-sm text-slate-600">
                    Already have an account?{" "}
                    <button
                        type="button"
                        className="font-semibold text-violet-700 transition-colors hover:text-violet-800 hover:underline"
                        onClick={onNavigateToLogin}
                    >
                        Sign in
                    </button>
                </p>
            </CardContent>
        </Card>
    );
};