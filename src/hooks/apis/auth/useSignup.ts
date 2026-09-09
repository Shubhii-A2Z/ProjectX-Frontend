import { useMutation } from '@tanstack/react-query';

import type { Auth } from '@/apis/auth/auth.interface';
import { AuthImpl } from '@/apis/auth/impl/auth';
import { toast } from '@/components/ui/toast';
import type { SignUpData } from '@/dtos/SignUpDataDTO';

const auth: Auth=new AuthImpl();
    
export const useSignup=()=>{
    const {
        isPending,
        isSuccess,
        error,
        mutateAsync: signUpMutation
    } = useMutation({
        mutationFn: (data: SignUpData) =>
            auth.signUpRequest(data),

        onSuccess: (data) => {
            console.log('Successfully Signed up', data);
            toast.add({
                title: 'Successfully Signed Up',
                description: 'You will be redirected to login page in few seconds',
                type: 'success'
            });
        },

        onError: (error) => {
            console.log('Failed to Sign Up', error);
            toast.add({
                title: 'Failed to Sign Up',
                type: 'error',
                priority: 'high'
            });
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        signUpMutation
    };
};
