import type { HttpClient } from "../client/HttpClient";
import type { GetDeliveryByLabelResponse } from "../types/deliveries.types";
export declare class DeliveriesResource {
    private http;
    constructor(http: HttpClient);
    getDeliveryByLabel(labelId: string, limit?: number, offset?: number): Promise<GetDeliveryByLabelResponse>;
}
//# sourceMappingURL=deliveries.resource.d.ts.map