import { TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const SigninCard=({
    isPending,
    isSuccess,
    signinForm, 
    setSigninForm,
    validationError,
    OnSigninFormSubmit
}: {signinForm: any, 
    setSigninForm: any, 
    validationError: any, 
    OnSigninFormSubmit: any,
    isPending: any,
    isSuccess: any,
}
)=>{

    const navigate=useNavigate();

    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle> Sign In</CardTitle>
                <CardDescription> Sign In to access your account</CardDescription>
                {validationError && (
                    <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                        <TriangleAlert className="size-5" />
                        <p>{validationError.message}</p>
                    </div>
                )}
                {isSuccess && (
                    <div className="bg-primary/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-primary mb-2">
                        <p>Successfully signed in. Redirecting to home page...</p>
                    </div>
                )}
            </CardHeader>

            <CardContent>
                <form className="space-y-3" onSubmit={OnSigninFormSubmit}>
                    <Input 
                        disabled={isPending}
                        placeholder="Work Email"
                        required
                        type="email"
                        value={signinForm.email}
                        onChange={(e)=>setSigninForm({...signinForm, email: e.target.value})}
                    />
                    <Input 
                        disabled={isPending}
                        placeholder="Password"
                        required
                        type="password"
                        value={signinForm.password}
                        onChange={(e)=>setSigninForm({...signinForm, password: e.target.value})}
                    />

                    <Button className={"w-full"} disabled={isPending} size={"lg"} type="submit">
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