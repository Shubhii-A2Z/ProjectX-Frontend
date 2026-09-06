import { useMutation } from '@tanstack/react-query';

import type { Auth } from '@/apis/auth/auth.interface';
import { AuthImpl } from '@/apis/auth/impl/auth';
import type { SignUpData } from '@/dtos/SignUpDataDTO';

const auth: Auth=new AuthImpl();
    
export const useSignup=()=>{
    const {
        isPending,
        isSuccess,
        error,
        mutate: signUpMutation
    } = useMutation({
        mutationFn: (data: SignUpData) =>
            auth.signUpRequest(data),

        onSuccess: (data) => {
            console.log('Successfully Signed up', data);
        },

        onError: (error) => {
            console.log('Failed to Sign Up', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        signUpMutation
    };
};
