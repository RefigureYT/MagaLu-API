export class HttpClient {
    baseUrl;
    accessToken;
    refreshTokenFn;
    maxConsecutiveRefreshFails;
    // trava global para evitar refresh concorrente
    refreshInFlight = null;
    constructor(config) {
        this.baseUrl = config.baseUrl;
        this.accessToken = config.accessToken;
        if (config.refreshTokenFn)
            this.refreshTokenFn = config.refreshTokenFn;
        this.maxConsecutiveRefreshFails = config.maxConsecutiveRefreshFails ?? 4;
    }
    buildUrl(path) {
        return `${this.baseUrl}${path}`;
    }
    async readErrorText(resp) {
        return await resp.text().catch(() => "");
    }
    async refreshTokenOrThrow() {
        if (!this.refreshTokenFn) {
            throw new Error("Access token inválido/expirado e refreshTokenFn não foi fornecida.");
        }
        if (!this.refreshInFlight) {
            this.refreshInFlight = (async () => {
                const token = await this.refreshTokenFn();
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
    async doFetch(path, init) {
        const url = this.buildUrl(path);
        const headers = new Headers(init.headers);
        headers.set("accept", "application/json");
        headers.set("authorization", `Bearer ${this.accessToken}`);
        return await fetch(url, { ...init, headers });
    }
    async requestJson(path, init) {
        let attempt = 0;
        while (true) {
            const resp = await this.doFetch(path, init);
            if (resp.ok) {
                return (await resp.json());
            }
            // só tenta retry se for auth error
            if (resp.status !== 401 && resp.status !== 403) {
                const text = await this.readErrorText(resp);
                throw new Error(`HTTP ${init.method ?? "GET"} ${this.buildUrl(path)} failed with status ${resp.status}: ${text}`);
            }
            attempt++;
            if (attempt >= this.maxConsecutiveRefreshFails) {
                const text = await this.readErrorText(resp);
                throw new Error(`Falha de autenticação após ${attempt} tentativas. Último erro: ${text}`);
            }
            // tenta refresh e repete a MESMA request
            await this.refreshTokenOrThrow();
        }
    }
    async get(path) {
        return await this.requestJson(path, { method: "GET" });
    }
    async post(path, body) {
        return await this.requestJson(path, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body),
        });
    }
}
