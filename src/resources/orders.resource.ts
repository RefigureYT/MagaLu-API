import type { HttpClient } from "../client/HttpClient";
import type { GetListPedidosQueryParameters, GetListPedidosResponse, MagaluAPIGetPedidoResponse } from "../types/orders.types";

export class OrdersResource {
    constructor(private readonly http: HttpClient) { }

    getPedidoByOrder(orderId: string): Promise<MagaluAPIGetPedidoResponse> {
        return this.http.get<MagaluAPIGetPedidoResponse>(`/seller/v1/orders/${orderId}`);
    }

    getListPedidos(queryParameters: GetListPedidosQueryParameters = {}): Promise<GetListPedidosResponse> {
        const queryParams = new URLSearchParams();
        for (const [key, value] of Object.entries(queryParameters)) {
            if (value !== undefined) {
                queryParams.append(key, String(value));
            }
        }

        const queryString = queryParams.toString();
        const url =
            queryString.length > 0
                ? `/seller/v1/orders?${queryString}`
                : `/seller/v1/orders`;

        return this.http.get<GetListPedidosResponse>(url);
    }
}