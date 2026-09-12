export const ENVIRONMENT =
    import.meta.env.VITE_ENVIRONMENT || "DEV";

export const isDevelopment =
    ENVIRONMENT.toUpperCase() === "DEV";

export const isProduction =
    ENVIRONMENT.toUpperCase() === "PROD";