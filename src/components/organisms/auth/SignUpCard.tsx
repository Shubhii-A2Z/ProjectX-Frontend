import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const SignupCard=()=>{

    const navigate=useNavigate();

    const [signupForm, setSignupForm]=useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    });
    
    const [showPassword, setShowPassword] = useState(false);
    
    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Sign up to create your account</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-3">
                    <Input 
                        placeholder="Username"
                        required
                        onChange={(e)=>setSignupForm({...signupForm, username: e.target.value})}
                        value={signupForm.username}
                        type="text"
                        disabled={false}
                    />
                    <Input 
                        placeholder="Email"
                        required
                        onChange={(e)=>setSignupForm({...signupForm, email: e.target.value})}
                        value={signupForm.email}
                        type="email"
                        disabled={false}
                    />
                    <div className="relative">
                        <Input 
                            placeholder="Password"
                            required
                            onChange={(e)=>setSignupForm({...signupForm, password: e.target.value})}
                            value={signupForm.password}
                            type={showPassword ? "text" : "password"}
                            disabled={false}
                        />
                        <button
                            type="button"
                            onClick={()=>setShowPassword((prev)=>(!prev))}
                            className={"absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ): (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                    <Input 
                        placeholder="Confirm Password"
                        required
                        onChange={(e)=>setSignupForm({...signupForm, confirmPassword: e.target.value})}
                        value={signupForm.confirmPassword}
                        type="password"
                        disabled={false}
                    />
                    <Button
                        disabled={false}
                        size={"lg"}
                        type="submit"
                        className={"w-full"}
                    >
                        Sign up with Email
                    </Button>
                </form>

                <Separator className={"my-5"}/>

                <p
                    className="text-s text-muted-foreground mt-4"
                >
                    Already have an account ? {' '}
                    <span 
                        className="text-sky-600 hover:underline cursor-pointer" 
                        onClick={()=>navigate('/auth/login')}
                    >
                        Sign In
                    </span>
                </p>
            </CardContent>
        </Card>
    );

};