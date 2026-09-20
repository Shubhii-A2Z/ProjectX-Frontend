import {
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="border-t">

      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-12 md:grid-cols-4">

          {/* Brand */}
          <div>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex cursor-pointer items-center gap-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
                R
              </div>

              <span className="font-bold">
                Relay
              </span>
            </button>

            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
              A modern workspace built to keep teams connected,
              organized and focused.
            </p>

          </div>

          {/* Product */}
          <div>

            <h3 className="text-sm font-semibold">
              Product
            </h3>

            <div className="mt-4 space-y-3 text-sm text-muted-foreground">

              <a
                href="#features"
                className="block transition-colors hover:text-foreground"
              >
                Features
              </a>

              <a
                href="#collaboration"
                className="block transition-colors hover:text-foreground"
              >
                Collaboration
              </a>

              <button
                type="button"
                onClick={() => navigate("/pricing")}
                className="block cursor-pointer transition-colors hover:text-foreground"
              >
                Pricing
              </button>

            </div>

          </div>

          {/* Company */}
          <div>

            <h3 className="text-sm font-semibold">
              Company
            </h3>

            <div className="mt-4 space-y-3 text-sm text-muted-foreground">

              <a
                href="#about"
                className="block transition-colors hover:text-foreground"
              >
                About Relay
              </a>

              <span className="block">
                Contact
              </span>

              <span className="block">
                Careers
              </span>

            </div>

          </div>

          {/* Resources */}
          <div>

            <h3 className="text-sm font-semibold">
              Resources
            </h3>

            <div className="mt-4 space-y-3 text-sm text-muted-foreground">

              <span className="flex items-center gap-1">
                Documentation
                <ArrowUpRight className="h-3 w-3" />
              </span>

              <span className="flex items-center gap-1">
                Help Center
                <ArrowUpRight className="h-3 w-3" />
              </span>

              <span className="flex items-center gap-1">
                Community
                <ArrowUpRight className="h-3 w-3" />
              </span>

            </div>

          </div>

        </div>

        <Separator className="my-10" />

        <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">

          <p>
            © 2026 Relay. All rights reserved.
          </p>

          <p>
            Built for teams.
          </p>

        </div>

      </div>
    </footer>
  );
};