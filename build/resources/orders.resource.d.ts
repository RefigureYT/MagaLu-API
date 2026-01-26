import type { HttpClient } from "../client/HttpClient";
import type { GetListPedidosQueryParameters, GetListPedidosResponse, MagaluAPIGetPedidoResponse } from "../types/orders.types";
export declare class OrdersResource {
    private http;
    constructor(http: HttpClient);
    getPedidoByOrder(orderId: string): Promise<MagaluAPIGetPedidoResponse>;
    getListPedidos(queryParameters?: GetListPedidosQueryParameters): Promise<GetListPedidosResponse>;
}
//# sourceMappingURL=orders.resource.d.ts.map