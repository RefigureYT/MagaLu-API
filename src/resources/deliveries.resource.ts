import type { HttpClient } from "../client/HttpClient";
import type { GetDeliveryByLabelResponse } from "../types/deliveries.types";

export class DeliveriesResource {
    constructor(private http: HttpClient) { }

    getDeliveryByLabel(labelId: string, limit = 1, offset = 0) {
        return this.http.get<GetDeliveryByLabelResponse>(`/seller/v1/deliveries?_limit=${limit}&_offset=${offset}&tag_code=${labelId}`);
    }
}