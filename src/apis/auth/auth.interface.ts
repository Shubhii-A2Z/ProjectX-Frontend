import type { SignUpData } from "@/dtos/SignUpDataDTO";

export interface Auth{
    signUpRequest(data: SignUpData): Promise<any>;
    signInRequest(email: string, password: string): Promise<any>;
}