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
import { Pricing } from "./pages/pricing/Pricing";
// import { Payment } from "./pages/payment/Payments";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes>

                {/* Public Routes */}

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


                {/* Relay Application */}

                <Route
                    path="/app"
                    element={<AppShell />}
                >

                    {/* /app */}
                    <Route
                        index
                        element={<Chat />}
                    />

                    {/* /app/chat */}
                    <Route
                        path="chat"
                        element={<Chat />}
                    />

                    {/* /app/agents */}
                    <Route
                        path="agents"
                        element={<Agent />}
                    />

                    {/* /app/settings */}
                    <Route
                        path="settings"
                        element={<Settings />}
                    />

                </Route>


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