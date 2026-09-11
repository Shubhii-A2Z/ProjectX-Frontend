import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSignin } from "@/hooks/apis/auth/useSignin";

import { RelayLoading } from "../loading/RelayLoading";
import { SigninCard } from "./SignInCard";

export const SignInContainer=()=>{

    const navigate=useNavigate();

    const [signinForm, setSigninForm]=useState({
        email: '',
        password: ''
    });

    const [validationError, setValidationError] = useState<{ message: string } | null>(null);
    const [showLoading, setShowLoading] = useState(false);

    const { isPending, isSuccess, signInMutation } = useSignin();
    
    async function OnSigninFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!signinForm.email || !signinForm.password) {
            setValidationError({ message: 'All fields are required' });
            return;
        }

        setValidationError(null);

        try {
            await signInMutation({
                email: signinForm.email,
                password: signinForm.password
            });
        } catch (error: any) {
            const errorMsg =
                error.response?.data?.message ||
                error.response?.data?.mssg ||
                'Failed to sign in. Please try again.';
            setValidationError({ message: errorMsg });
        }
    }

    useEffect(() => {
        if (isSuccess) {
            // Show success banner on card for 3 seconds, then show loading screen
            const loadingTimer = setTimeout(() => {
                setShowLoading(true);
            }, 3000);

            // After 4 seconds of loading (3s + 4s = 7s total), redirect to home page
            const redirectTimer = setTimeout(() => {
                navigate('/app');
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
        <SigninCard
            isPending={isPending || isSuccess}
            isSuccess={isSuccess}
            signinForm={signinForm} 
            setSigninForm={setSigninForm} 
            validationError={validationError}
            OnSigninFormSubmit={OnSigninFormSubmit}
        />
    );

};