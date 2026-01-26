import { DeliveriesResource } from "../resources/deliveries.resource";
import { OrdersResource } from "../resources/orders.resource";
import { HttpClient } from "./HttpClient";
export class MagaluAPI {
    http;
    orders;
    deliveries;
    constructor(config) {
        this.http = new HttpClient(config);
        this.orders = new OrdersResource(this.http);
        this.deliveries = new DeliveriesResource(this.http);
    }
}
