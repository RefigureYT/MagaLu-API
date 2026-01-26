export class HttpClient {
    baseUrl;
    accessToken;
    constructor(config) {
        this.baseUrl = config.baseUrl;
        this.accessToken = config.accessToken;
    }
    async get(path) {
        const url = `${this.baseUrl}${path}`;
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
        return (await resp.json());
    }
    async post(path, body) {
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
        return (await resp.json());
    }
}
