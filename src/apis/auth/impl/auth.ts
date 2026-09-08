import axiosConfig from "@/config/axios.config";
import type { SignUpData } from "@/dtos/SignUpDataDTO";

import type { Auth } from "../auth.interface";

export class AuthImpl implements Auth{

    async signUpRequest(data: SignUpData): Promise<any> {
        const response=await axiosConfig.post('/api/v1/users/signup',
            data
        );
        return response.data;
    }

    async signInRequest(email: string, password: string): Promise<any> {
        const response=await axiosConfig.post('/api/v1/users/signin',{
            email,
            password,
        });
        return response.data;
    }

}