export const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";
// export const APP_ENV = process.env.APP_ENV ?? "dev";
// export const API_BASE_URL =
//   process.env.API_BASE_URL ?? "https://dev.api.monapp.com";

if (!GEMINI_API_KEY) {
  console.warn(
    "\u26A0\uFE0F Clé GEMINI_API_KEY manquante. Certaines fonctionnalités pourraient être désactivées."
  );
}
