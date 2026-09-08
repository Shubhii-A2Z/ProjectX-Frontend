import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSignup } from "@/hooks/apis/auth/use.signup";

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

    const [validationError, setValidationError]=useState(null);

    const {isPending, isSuccess, signUpMutation}=useSignup();
    
    async function OnSignupFormSubmit(e) {
        e.preventDefault();

        if(!signupForm.email || !signupForm.password || !signupForm.confirmPassword || !signupForm.username){
            setValidationError({message: 'All fields are required'});
            return;
        }
        if(signupForm.password!==signupForm.confirmPassword){
            setValidationError({message: 'Passwords do not match'});
            return;
        }

        setValidationError(null);

        await signUpMutation({
            username: signupForm.username,
            email: signupForm.email,
            password: signupForm.password
        });
    }

    useEffect(()=>{
        if(isSuccess){
            setTimeout(()=>{
                navigate('/auth/login');
            }, 6000);
        }
    }, [isSuccess, navigate]);

    if(isSuccess){
        return <RelayLoading/>;
    }

    return (
        <SignupCard
            isPending={isPending}
            isSuccess={isSuccess}
            signupForm={signupForm} 
            setSignupForm={setSignupForm} 
            validationError={validationError}
            OnSignupFormSubmit={OnSignupFormSubmit}
        />
    );

};