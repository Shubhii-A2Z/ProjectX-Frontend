import { useMutation } from "@tanstack/react-query";

import { createOrderRequest } from "@/apis/payments/inxex";

export const useCreateOrder=()=>{
    // const {auth}=useAuth
    const {mutateAsync: createOrderMutation, error, isSuccess, isPending}=useMutation({
        mutationFn: (amount)=>createOrderRequest(amount, token),
        onSuccess: ()=>{
            console.log('Order created Successfully');
        },
        onError: (error)=>{
            console.log('Error in creating order: ',error);
        }
    });

    return {
        createOrderMutation,
        error,
        isSuccess,
        isPending
    };
};
