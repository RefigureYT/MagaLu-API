export class OrdersResource {
    http;
    constructor(http) {
        this.http = http;
    }
    async getPedidoByOrder(orderId) {
        return this.http.get(`/seller/v1/orders/${orderId}`);
    }
    async getListPedidos(queryParameters = {}) {
        const queryParams = new URLSearchParams();
        for (const [key, value] of Object.entries(queryParameters)) {
            if (value !== undefined) {
                queryParams.append(key, String(value));
            }
        }
        const queryString = queryParams.toString();
        return this.http.get(`/seller/v1/orders?${queryString}`);
    }
}
