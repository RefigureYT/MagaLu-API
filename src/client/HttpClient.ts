import type { MagaluBaseUrl } from "../types/config";

export interface HttpClientConfig {
    baseUrl: MagaluBaseUrl;
    accessToken: string;
}

export class HttpClient {
    private baseUrl: MagaluBaseUrl;
    private accessToken: string;

    constructor(config: HttpClientConfig) {
        this.baseUrl = config.baseUrl;
        this.accessToken = config.accessToken;
    }

    async get<T>(path: string): Promise<T> {
        const url = `${this.baseUrl}${path}`

        const resp = await fetch(url, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "authorization": `Bearer ${this.accessToken}`
            }
        });

        if (!resp.ok) {
            const text = await resp.text().catch(() => "");
            throw new Error(`HTTP GET ${url} failed with status ${resp.status}: ${text}`);
        }

        return (await resp.json()) as T;
    }

    async post<T>(path: string, body: any): Promise<T> {
        const url = `${this.baseUrl}${path}`;

        const resp = await fetch(url, {
            method: "POST",
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "authorization": `Bearer ${this.accessToken}`
            },
            body: JSON.stringify(body)
        });

        if (!resp.ok) {
            const text = await resp.text().catch(() => "");
            throw new Error(`HTTP POST ${url} failed with status ${resp.status}: ${text}`);
        }

        return (await resp.json()) as T;
    }
}