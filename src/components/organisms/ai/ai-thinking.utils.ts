export const waitWithAbort = (
    duration: number,
    signal?: AbortSignal
): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (signal?.aborted) {
            reject(
                new DOMException(
                    "Request aborted",
                    "AbortError"
                )
            );

            return;
        }

        const timeout = window.setTimeout(() => {
            cleanup();
            resolve();
        }, duration);

        const handleAbort = () => {
            window.clearTimeout(timeout);
            cleanup();

            reject(
                new DOMException(
                    "Request aborted",
                    "AbortError"
                )
            );
        };

        const cleanup = () => {
            signal?.removeEventListener(
                "abort",
                handleAbort
            );
        };

        signal?.addEventListener(
            "abort",
            handleAbort,
            { once: true }
        );
    });
};