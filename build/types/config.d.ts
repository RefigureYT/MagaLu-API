export type MagaluBaseUrl = "https://api.magalu.com" /** ✅ Produção (Marketplace) */ | "https://api-sandbox.magalu.com" /** 🧪 Sandbox / Homologação */ | "https://services.magalu.com"; /** 🔧 Complementar (serviços auxiliares do ecossistema Magalu) */
export type RefreshTokenFn = () => Promise<string> | string;
export type MagaluConfig = {
    baseUrl: MagaluBaseUrl;
    accessToken: string;
    /**
    * Função opcional para obter/renovar um access token.
    * Será chamada automaticamente quando uma request retornar 401/403.
    */
    refreshTokenFn?: RefreshTokenFn;
    /**
     * Quantas falhas consecutivas de refresh podem ocorrer antes de encerrar.
     * Default: 4 (ou seja, falhou 4x seguidas => throw).
     */
    maxConsecutiveRefreshFails?: number;
};
//# sourceMappingURL=config.d.ts.map