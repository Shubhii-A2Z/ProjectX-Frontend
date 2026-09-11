import { Settings as SettingsIcon } from "lucide-react";

export const Settings = () => {
    return (
        <div className="flex h-full flex-col">

            <header className="flex h-14 items-center border-b px-6">
                <div className="flex items-center gap-2">
                    <SettingsIcon className="size-4 text-muted-foreground" />

                    <h1 className="text-sm font-semibold">
                        Settings
                    </h1>
                </div>
            </header>

            <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                    <SettingsIcon className="mx-auto size-8 text-muted-foreground" />

                    <h2 className="mt-4 text-lg font-semibold">
                        Relay Settings
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Settings will be available here.
                    </p>
                </div>
            </div>

        </div>
    );
};