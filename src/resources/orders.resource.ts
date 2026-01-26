import type { HttpClient } from "../client/HttpClient";
import type { GetListPedidosQueryParameters, GetListPedidosResponse, MagaluAPIGetPedidoResponse } from "../types/orders.types";

export class OrdersResource {
    constructor(private http: HttpClient) { }

    async getPedidoByOrder(orderId: string): Promise<MagaluAPIGetPedidoResponse> {
        return this.http.get<MagaluAPIGetPedidoResponse>(`/seller/v1/orders/${orderId}`);
    }

    async getListPedidos(queryParameters: GetListPedidosQueryParameters = {}): Promise<GetListPedidosResponse> {
        const queryParams = new URLSearchParams();
        for (const [key, value] of Object.entries(queryParameters)) {
            if (value !== undefined) {
                queryParams.append(key, String(value));
            }
        }

        const queryString = queryParams.toString();
        return this.http.get<GetListPedidosResponse>(`/seller/v1/orders?${queryString}`);
    }
}