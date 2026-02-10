import type { MagaluBaseUrl, RefreshTokenFn } from "../types/config";

export interface HttpClientConfig {
    baseUrl: MagaluBaseUrl;
    accessToken: string;
    refreshTokenFn?: RefreshTokenFn;
    maxConsecutiveRefreshFails?: number;
}

export class HttpClient {
    private baseUrl: MagaluBaseUrl;
    private accessToken: string;

    private refreshTokenFn?: RefreshTokenFn;
    private maxConsecutiveRefreshFails: number;

    // trava global para evitar refresh concorrente
    private refreshInFlight: Promise<void> | null = null;

    constructor(config: HttpClientConfig) {
        this.baseUrl = config.baseUrl;
        this.accessToken = config.accessToken;
        if (config.refreshTokenFn) this.refreshTokenFn = config.refreshTokenFn;
        this.maxConsecutiveRefreshFails = config.maxConsecutiveRefreshFails ?? 4;
    }

    private buildUrl(path: string) {
        return `${this.baseUrl}${path}`;
    }

    private async readErrorText(resp: Response) {
        return await resp.text().catch(() => "");
    }

    private async refreshTokenOrThrow() {
        if (!this.refreshTokenFn) {
            throw new Error("Access token inválido/expirado e refreshTokenFn não foi fornecida.");
        }

        if (!this.refreshInFlight) {
            this.refreshInFlight = (async () => {
                const token = await this.refreshTokenFn!();
                if (!token || typeof token !== "string") {
                    throw new Error("refreshTokenFn retornou um token inválido/vazio.");
                }
                this.accessToken = token;
            })().finally(() => {
                this.refreshInFlight = null;
            });
        }

        await this.refreshInFlight;
    }

    private async doFetch(path: string, init: RequestInit): Promise<Response> {
        const url = this.buildUrl(path);

        const headers = new Headers(init.headers);
        headers.set("accept", "application/json");
        headers.set("authorization", `Bearer ${this.accessToken}`);

        return await fetch(url, { ...init, headers });
    }

    private async requestJson<T>(path: string, init: RequestInit): Promise<T> {
        let attempt = 0;

        while (true) {
            const resp = await this.doFetch(path, init);

            if (resp.ok) {
                return (await resp.json()) as T;
            }

            // só tenta retry se for auth error
            if (resp.status !== 401 && resp.status !== 403) {
                const text = await this.readErrorText(resp);
                throw new Error(
                    `HTTP ${init.method ?? "GET"} ${this.buildUrl(path)} failed with status ${resp.status}: ${text}`
                );
            }

            attempt++;

            if (attempt >= this.maxConsecutiveRefreshFails) {
                const text = await this.readErrorText(resp);
                throw new Error(
                    `Falha de autenticação após ${attempt} tentativas. Último erro: ${text}`
                );
            }

            // tenta refresh e repete a MESMA request
            await this.refreshTokenOrThrow();
        }
    }

    async get<T>(path: string): Promise<T> {
        return await this.requestJson<T>(path, { method: "GET" });
    }

    async post<T>(path: string, body: any): Promise<T> {
        return await this.requestJson<T>(path, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body),
        });
    }
}
