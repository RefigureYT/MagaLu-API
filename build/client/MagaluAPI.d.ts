import { DeliveriesResource } from "../resources/deliveries.resource";
import { OrdersResource } from "../resources/orders.resource";
import type { MagaluConfig } from "../types/config";
export declare class MagaluAPI {
    private readonly http;
    readonly orders: OrdersResource;
    readonly deliveries: DeliveriesResource;
    constructor(config: MagaluConfig);
}
//# sourceMappingURL=MagaluAPI.d.ts.map