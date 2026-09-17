import { Eye, EyeOff, TriangleAlert } from "lucide-react";
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
}

export const SignupCard = ({
    signupForm,
    setSignupForm,
    validationError,
    OnSignupFormSubmit,
    isPending,
    isSuccess,
}: SignupCardProps) => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleGoogleSignup = () => {
        const backendUrl = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000";
        window.location.href = `${backendUrl}/api/v1/oauth/google`;
    };

    return (
        <Card className="w-full border-border/60 bg-background/95 shadow-xl backdrop-blur-sm">
            <CardHeader className="space-y-3 pb-6">
                {/* Relay Logo */}
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground shadow-sm">
                    R
                </div>

                <div>
                    <CardTitle className="text-2xl font-semibold tracking-tight">
                        Create your Relay account
                    </CardTitle>

                    <CardDescription className="mt-2">
                        Join Relay and start collaborating with your team.
                    </CardDescription>
                </div>

                {/* Error */}
                {validationError && (
                    <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
                        <TriangleAlert className="h-4 w-4 shrink-0" />

                        <p>{validationError.message}</p>
                    </div>
                )}

                {/* Success */}
                {isSuccess && (
                    <div className="rounded-lg border border-primary/20 bg-primary/10 p-3 text-sm text-primary">
                        Successfully signed up. Redirecting to login page...
                    </div>
                )}
            </CardHeader>

            <CardContent>
                {/* Google Signup */}
                <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="w-full gap-3 border-border/70 hover:bg-muted/50"
                    disabled={isPending}
                    onClick={handleGoogleSignup}
                >
                    <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            fill="#4285F4"
                            d="M21.35 12.27c0-.68-.06-1.34-.17-1.97H12v3.73h5.23a4.47 4.47 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.13Z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.93-3.31.93-2.54 0-4.7-1.72-5.47-4.03H3.28v2.52A9.75 9.75 0 0 0 12 21.5Z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M6.53 13.6a5.86 5.86 0 0 1 0-3.2V7.88H3.28a9.5 9.5 0 0 0 0 8.24l3.25-2.52Z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 6.37c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.4 14.63 2.5 12 2.5a9.75 9.75 0 0 0-8.72 5.38l3.25 2.52C7.3 8.09 9.46 6.37 12 6.37Z"
                        />
                    </svg>

                    Continue with Google
                </Button>

                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                    <Separator className="flex-1" />

                    <span className="text-xs font-medium text-muted-foreground">
                        OR
                    </span>

                    <Separator className="flex-1" />
                </div>

                {/* Email Signup */}
                <form
                    className="space-y-4"
                    onSubmit={OnSignupFormSubmit}
                >
                    {/* Username */}
                    <div className="space-y-1.5">
                        <label
                            htmlFor="username"
                            className="text-sm font-medium"
                        >
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
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label
                            htmlFor="signup-email"
                            className="text-sm font-medium"
                        >
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
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <label
                            htmlFor="signup-password"
                            className="text-sm font-medium"
                        >
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
                                className="pr-10"
                                onChange={(event) =>
                                    setSignupForm({
                                        ...signupForm,
                                        password: event.target.value,
                                    })
                                }
                            />

                            <button
                                type="button"
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                                onClick={() =>
                                    setShowPassword((previous) => !previous)
                                }
                                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1.5">
                        <label
                            htmlFor="confirm-password"
                            className="text-sm font-medium"
                        >
                            Confirm password
                        </label>

                        <div className="relative">
                            <Input
                                id="confirm-password"
                                placeholder="Re-enter your password"
                                required
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                value={signupForm.confirmPassword}
                                disabled={isPending}
                                className="pr-10"
                                onChange={(event) =>
                                    setSignupForm({
                                        ...signupForm,
                                        confirmPassword:
                                            event.target.value,
                                    })
                                }
                            />

                            <button
                                type="button"
                                aria-label={
                                    showConfirmPassword
                                        ? "Hide confirm password"
                                        : "Show confirm password"
                                }
                                onClick={() =>
                                    setShowConfirmPassword(
                                        (previous) => !previous
                                    )
                                }
                                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <Button
                        disabled={isPending}
                        size="lg"
                        type="submit"
                        className="w-full"
                    >
                        {isPending ? "Creating account..." : "Create account"}
                    </Button>
                </form>

                {/* Login */}
                <div className="relative my-6">
                    <Separator />
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <button
                        type="button"
                        className="font-medium text-primary hover:underline"
                        onClick={() => navigate("/auth/login")}
                    >
                        Sign in
                    </button>
                </p>
            </CardContent>
        </Card>
    );
};