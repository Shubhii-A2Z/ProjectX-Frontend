import { ArrowLeft, CreditCard, IndianRupee, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCreateOrder } from "@/hooks/apis/payment/useCreateOrder";

export const Payment = () => {
    const navigate = useNavigate();

    const [amount, setAmount] = useState("");

    const handlePayment = () => {
        const parsedAmount = Number(amount);

        if (!parsedAmount || parsedAmount <= 0) {
            return;
        }

        // Razorpay/payment logic will go here
        console.log("Payment amount:", parsedAmount);
    };

    const isValidAmount =
        Number(amount) > 0 && amount.trim() !== "";

    const {createOrderMutation, isPending, isSuccess}=useCreateOrder();

    async function handleFormSubmit(e: any) {
        e.preventDefault();
        await createOrderMutation(amount);
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">
                {/* Back button */}
                <Button
                    variant="ghost"
                    className="mb-4 gap-2"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>

                <Card className="overflow-hidden shadow-lg">
                    <CardHeader className="space-y-4 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                            <CreditCard className="h-7 w-7 text-primary" />
                        </div>

                        <div>
                            <CardTitle className="text-2xl">
                                Make a Payment
                            </CardTitle>

                            <CardDescription className="mt-2">
                                Enter the amount you want to pay
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <form onSubmit={handleFormSubmit}>
                    <CardContent className="space-y-6">
                        {/* Amount input */}
                        <div className="space-y-2">
                            <label
                                htmlFor="amount"
                                className="text-sm font-medium"
                            >
                                Amount
                            </label>

                            <div className="relative">
                                <IndianRupee className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    id="amount"
                                    type="number"
                                    min="1"
                                    placeholder="Enter amount"
                                    value={amount}
                                    onChange={(event) =>
                                        setAmount(event.target.value)
                                    }
                                    className="h-12 pl-10 text-lg"
                                />
                            </div>
                        </div>

                        {/* Payment summary */}
                        {isValidAmount && (
                            <div className="rounded-xl bg-muted/50 p-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Amount to pay
                                    </span>

                                    <span className="text-lg font-semibold">
                                        ₹{Number(amount).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        )}

                        <Separator />

                        {/* Security information */}
                        <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-green-500/10 p-2">
                                <ShieldCheck className="h-5 w-5 text-green-600" />
                            </div>

                            <div>
                                <p className="text-sm font-medium">
                                    Secure Payment
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    Your payment will be securely processed
                                    through our payment gateway.
                                </p>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter>
                        <Button
                            className="h-12 w-full text-base cursor-pointer"
                            disabled={!isValidAmount}
                            onClick={handlePayment}
                        >
                            <CreditCard className="mr-2 h-5 w-5" />
                            Pay ₹
                            {isValidAmount
                                ? Number(amount).toFixed(2)
                                : "0.00"}
                        </Button>
                    </CardFooter>
                    </form>
                </Card>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                    You will be redirected to the secure payment checkout.
                </p>
            </div>
        </div>
    );
};