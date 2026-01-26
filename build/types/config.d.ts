export type MagaluBaseUrl = "https://api.magalu.com" /** ✅ Produção (Marketplace) */ | "https://api-sandbox.magalu.com" /** 🧪 Sandbox / Homologação */ | "https://services.magalu.com"; /** 🔧 Complementar (serviços auxiliares do ecossistema Magalu) */
export type MagaluConfig = {
    baseUrl: MagaluBaseUrl;
    accessToken: string;
};
//# sourceMappingURL=config.d.ts.map