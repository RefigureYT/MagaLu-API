import type { MagaluBaseUrl, RefreshTokenFn } from "../types/config";
export interface HttpClientConfig {
    baseUrl: MagaluBaseUrl;
    accessToken: string;
    refreshTokenFn?: RefreshTokenFn;
    maxConsecutiveRefreshFails?: number;
}
export declare class HttpClient {
    private baseUrl;
    private accessToken;
    private refreshTokenFn?;
    private maxConsecutiveRefreshFails;
    private refreshInFlight;
    constructor(config: HttpClientConfig);
    private buildUrl;
    private readErrorText;
    private refreshTokenOrThrow;
    private doFetch;
    private requestJson;
    get<T>(path: string): Promise<T>;
    post<T>(path: string, body: any): Promise<T>;
}
//# sourceMappingURL=HttpClient.d.ts.map