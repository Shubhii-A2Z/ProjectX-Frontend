import { SignupCard } from "@/components/organisms/auth/signup.card";

export const Auth=()=>{
    return (
        <div 
            className="h-[100vh] flex items-center justify-center bg-projectX"
        >
            <div className="md:h-auto md:w-[420px]">
                <SignupCard />
            </div>
        </div>
    );
};