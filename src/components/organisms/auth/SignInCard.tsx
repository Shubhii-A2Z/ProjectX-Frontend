import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const SigninCard=()=>{

    const navigate=useNavigate();

    const [ signInForm, setSignInForm]=useState({
        email: '',
        password: ''
    });

    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle> Sign In</CardTitle>
                <CardDescription> Sign In to access your account</CardDescription>
            </CardHeader>

            <CardContent>
                <form className="space-y-3">
                    <Input 
                        disabled={false}
                        placeholder="Work Email"
                        required
                        type="email"
                        value={signInForm.email}
                        onChange={(e)=>setSignInForm({...signInForm, email: e.target.value})}
                    />
                    <Input 
                        disabled={false}
                        placeholder="Password"
                        required
                        type="password"
                        value={signInForm.password}
                        onChange={(e)=>setSignInForm({...signInForm, password: e.target.value})}
                    />

                    <Button className={"w-full"} disabled={false} size={"lg"} type="submit">
                        Log In
                    </Button>
                </form>

                <Separator className={"my-5"} />
                <p
                    className="text-s text-muted-foreground mt-4"
                >
                    Don't have an account ? {' '}
                    <span 
                        className="text-sky-600 hover:underline cursor-pointer" 
                        onClick={()=>navigate('/auth/signup')}
                    >
                        Sign Up
                    </span>
                </p>
            </CardContent>
        </Card>
    );

};