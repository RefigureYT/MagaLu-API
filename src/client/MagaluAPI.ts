import { DeliveriesResource } from "../resources/deliveries.resource";
import { OrdersResource } from "../resources/orders.resource";
import type { MagaluConfig } from "../types/config";
import { HttpClient } from "./HttpClient";

export class MagaluAPI {
    private http: HttpClient;

    public orders: OrdersResource;
    public deliveries: DeliveriesResource;

    constructor(config: MagaluConfig) {
        this.http = new HttpClient(config);
        this.orders = new OrdersResource(this.http);
        this.deliveries = new DeliveriesResource(this.http);
    }
}