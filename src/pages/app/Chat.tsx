export const Chat = () => {
    return (
        <div className="flex h-full min-h-0 flex-col">

            {/* Chat header */}
            <header className="flex h-14 shrink-0 items-center border-b px-6">
                <div>
                    <h1 className="text-sm font-semibold">
                        General
                    </h1>

                    <p className="text-xs text-muted-foreground">
                        General discussion
                    </p>
                </div>
            </header>

            {/* Messages */}
            <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                    <h2 className="text-lg font-semibold">
                        Welcome to General
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Start a conversation with your team.
                    </p>
                </div>
            </div>

            {/* Message input */}
            <div className="border-t p-4">
                <div className="rounded-xl border bg-background p-3">
                    <input
                        type="text"
                        placeholder="Message #general..."
                        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                </div>
            </div>

        </div>
    );
};