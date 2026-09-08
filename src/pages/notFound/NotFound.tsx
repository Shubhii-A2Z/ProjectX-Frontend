import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const NotFound = () => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 px-4">
            <Card className="w-full max-w-lg text-center shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        404 Not Found
                    </CardTitle>

                    <p className="text-gray-600">
                        The page you are looking for does not exist.
                    </p>
                </CardHeader>

                <CardContent />
            </Card>
        </div>
    );
};