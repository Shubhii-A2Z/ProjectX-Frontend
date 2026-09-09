import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSignup } from "@/hooks/apis/auth/useSignup";

import { RelayLoading } from "../loading/RelayLoading";
import { SignupCard } from "./SignUpCard";

export const SignUpContainer=()=>{

    const navigate=useNavigate();

    const [signupForm, setSignupForm]=useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    });

    const [validationError, setValidationError] = useState<{ message: string } | null>(null);
    const [showLoading, setShowLoading] = useState(false);

    const { isPending, isSuccess, signUpMutation } = useSignup();
    
    async function OnSignupFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!signupForm.email || !signupForm.password || !signupForm.confirmPassword || !signupForm.username) {
            setValidationError({ message: 'All fields are required' });
            return;
        }
        if (signupForm.username.length < 3) {
            setValidationError({ message: 'Username should be at least 3 characters long' });
            return;
        }
        if (signupForm.password.length < 6) {
            setValidationError({ message: 'Password should be at least 6 characters long' });
            return;
        }
        if (signupForm.password !== signupForm.confirmPassword) {
            setValidationError({ message: 'Passwords do not match' });
            return;
        }

        setValidationError(null);

        try {
            await signUpMutation({
                username: signupForm.username,
                email: signupForm.email,
                password: signupForm.password
            });
        } catch (error: any) {
            const errorMsg =
                error.response?.data?.message ||
                error.response?.data?.mssg ||
                'Failed to sign up. Please try again.';
            setValidationError({ message: errorMsg });
        }
    }

    useEffect(() => {
        if (isSuccess) {
            // Show success banner on card for 3 seconds, then show loading screen
            const loadingTimer = setTimeout(() => {
                setShowLoading(true);
            }, 3000);

            // After 4 seconds of loading (3s + 4s = 7s total), redirect to login
            const redirectTimer = setTimeout(() => {
                navigate('/auth/login');
            }, 7000);

            return () => {
                clearTimeout(loadingTimer);
                clearTimeout(redirectTimer);
            };
        }
    }, [isSuccess, navigate]);

    if (showLoading) {
        return <RelayLoading />;
    }

    return (
        <SignupCard
            isPending={isPending || isSuccess}
            isSuccess={isSuccess}
            signupForm={signupForm} 
            setSignupForm={setSignupForm} 
            validationError={validationError}
            OnSignupFormSubmit={OnSignupFormSubmit}
        />
    );

};