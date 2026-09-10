import axiosConfig from "@/config/axios.config";

export const createOrderRequest=async (token: any, amount: any)=>{
    const response=await axiosConfig.post('/api/v1/payments/order',{
        amount
    },{
        headers:{
            'x-access-token': token
        }
    });
    return response?.data?.data;
};