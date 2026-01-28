import { DeliveriesResource } from "../resources/deliveries.resource";
import { OrdersResource } from "../resources/orders.resource";
import { HttpClient } from "./HttpClient";

import type { MagaluConfig } from "../types/config";

export class MagaluAPI {
    private readonly http: HttpClient;

    public readonly orders: OrdersResource;
    public readonly deliveries: DeliveriesResource;

    constructor(config: MagaluConfig) {
        this.http = new HttpClient(config);
        this.orders = new OrdersResource(this.http);
        this.deliveries = new DeliveriesResource(this.http);
    }
}