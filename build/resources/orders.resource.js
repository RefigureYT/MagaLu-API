export class OrdersResource {
    http;
    constructor(http) {
        this.http = http;
    }
    getPedidoByOrder(orderId) {
        return this.http.get(`/seller/v1/orders/${orderId}`);
    }
    getListPedidos(queryParameters = {}) {
        const queryParams = new URLSearchParams();
        for (const [key, value] of Object.entries(queryParameters)) {
            if (value !== undefined) {
                queryParams.append(key, String(value));
            }
        }
        const queryString = queryParams.toString();
        const url = queryString.length > 0
            ? `/seller/v1/orders?${queryString}`
            : `/seller/v1/orders`;
        return this.http.get(url);
    }
}
