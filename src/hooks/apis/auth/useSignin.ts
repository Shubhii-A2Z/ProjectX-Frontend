import { useMutation } from '@tanstack/react-query';

import type { Auth } from '@/apis/auth/auth.interface';
import { AuthImpl } from '@/apis/auth/impl/auth';
import { toast } from '@/components/ui/toast';
import type { SignInData } from '@/dtos/SignInDataDTO';

const auth: Auth=new AuthImpl();
    
export const useSignin=()=>{
    const {
        isPending,
        isSuccess,
        error,
        mutateAsync: signInMutation
    } = useMutation({
        mutationFn: (data: SignInData) =>
            auth.signInRequest(data),

        onSuccess: (data) => {
            console.log('Successfully Signed In', data);
            toast.add({
                title: 'Successfully Signed In',
                description: 'You will be redirected to home page in few seconds',
                type: 'success'
            });
        },

        onError: (error) => {
            console.log('Failed to Sign In', error);
            toast.add({
                title: 'Failed to Sign In',
                type: 'error',
                priority: 'high'
            });
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        signInMutation
    };
};
