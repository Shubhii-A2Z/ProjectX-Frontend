import {
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex cursor-pointer items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground shadow-sm">
            R
          </div>

          <span className="text-xl font-bold tracking-tight">
            Relay
          </span>
        </button>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">

          <a
            href="#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </a>

          <a
            href="#collaboration"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Collaboration
          </a>

          <a
            href="#about"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </a>

          <button
            type="button"
            onClick={() => navigate("/pricing")}
            className="group flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>Pricing</span>

            <span
              className="
                flex items-center gap-1
                rounded-full
                border border-primary/30
                bg-primary/5
                px-2 py-0.5
                text-[10px]
                font-medium
                text-primary
                transition-all duration-300
                group-hover:border-primary/70
                group-hover:bg-primary/10
                group-hover:shadow-[0_0_12px_rgba(99,102,241,0.45)]
              "
            >
              <Sparkles className="h-2.5 w-2.5" />
              Coming Soon
            </span>
          </button>

        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">

          <Button
            variant="ghost"
            className="hidden sm:inline-flex"
            onClick={() => navigate("/auth/login")}
          >
            Log in
          </Button>

          <Button onClick={() => navigate("/auth/signup")}>
            Get started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

        </div>
      </div>
    </header>
  );
};