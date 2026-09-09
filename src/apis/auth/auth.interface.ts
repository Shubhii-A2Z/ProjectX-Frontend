import type { SignInData } from "@/dtos/SignInDataDTO";
import type { SignUpData } from "@/dtos/SignUpDataDTO";

export interface Auth{
    signUpRequest(data: SignUpData): Promise<any>;
    signInRequest(data: SignInData): Promise<any>;
}