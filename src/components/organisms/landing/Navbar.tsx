import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const navigate=useNavigate();
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            R
          </div>

          <span className="text-xl font-bold tracking-tight">
            Relay
          </span>
        </div>

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
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="hidden sm:inline-flex"
          >
            <span
              className="cursor-pointer"
              onClick={()=>navigate('/auth/login')}
            >
              Log in
            </span>
          </Button>

          <Button>
            Get started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};