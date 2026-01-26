import type { MagaluBaseUrl } from "../types/config";
export interface HttpClientConfig {
    baseUrl: MagaluBaseUrl;
    accessToken: string;
}
export declare class HttpClient {
    private baseUrl;
    private accessToken;
    constructor(config: HttpClientConfig);
    get<T>(path: string): Promise<T>;
    post<T>(path: string, body: any): Promise<T>;
}
//# sourceMappingURL=HttpClient.d.ts.map