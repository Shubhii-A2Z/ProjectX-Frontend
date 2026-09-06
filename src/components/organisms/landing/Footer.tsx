import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 md:grid-cols-4">

          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                R
              </div>

              <span className="font-bold">
                Relay
              </span>
            </div>

            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              A modern workspace built to keep teams connected.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">
              Product
            </h3>

            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>Features</p>
              <p>Channels</p>
              <p>Workspaces</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">
              Company
            </h3>

            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>About</p>
              <p>Contact</p>
              <p>Careers</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">
              Resources
            </h3>

            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>Documentation</p>
              <p>Help Center</p>
              <p>Community</p>
            </div>
          </div>

        </div>

        <Separator className="my-8" />

        <p className="text-sm text-muted-foreground">
          © 2026 Relay. All rights reserved.
        </p>

      </div>
    </footer>
  );
};