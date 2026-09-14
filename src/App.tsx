import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";

import { AppShell } from "./components/organisms/app/AppShell";
import { SignInContainer } from "./components/organisms/auth/SignInContainer";
import { SignUpContainer } from "./components/organisms/auth/SignUpContainer";
import { Toaster } from "./components/ui/toast";
import { Agent } from "./pages/app/Agent";
import { Chat } from "./pages/app/Chat";
import { Settings } from "./pages/app/Settings";
import { Auth } from "./pages/auth/Auth";
import { Home } from "./pages/home/Home";
import { NotFound } from "./pages/notFound/NotFound";
import { Payment } from "./pages/payment/Payments";
import { Pricing } from "./pages/pricing/Pricing";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes>

                {/* Public */}
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/auth/signup"
                    element={
                        <Auth>
                            <SignUpContainer />
                        </Auth>
                    }
                />
                <Route
                    path="/auth/login"
                    element={
                        <Auth>
                            <SignInContainer />
                        </Auth>
                    }
                />
                <Route
                    path="/pricing"
                    element={<Pricing />}
                />

                {/* Relay App */}
                <Route
                    path="/app"
                    element={<AppShell />}
                >
                    <Route
                        index
                        element={<Chat />}
                    />
                    <Route
                        path="chat"
                        element={<Chat />}
                    />
                    <Route
                        path="agents"
                        element={<Agent />}
                    />
                    <Route
                        path="settings"
                        element={<Settings />}
                    />
                </Route>

                <Route
                    path="/makePayment"
                    element={<Payment />}
                />

                {/* 404 */}
                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Routes>

            <Toaster />
        </QueryClientProvider>
    );
}

export default App;