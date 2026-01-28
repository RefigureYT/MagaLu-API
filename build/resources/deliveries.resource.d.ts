import type { HttpClient } from "../client/HttpClient";
import type { GetDeliveryByLabelResponse, InvoicesQueryParameters, InvoicesResourceResponse } from "../types/deliveries.types";
export declare class DeliveriesResource {
    private readonly http;
    constructor(http: HttpClient);
    getDeliveryByLabel(labelId: string, limit?: number, offset?: number): Promise<GetDeliveryByLabelResponse>;
    getInvoiceByOrder(obj: InvoicesQueryParameters): Promise<InvoicesResourceResponse>;
}
//# sourceMappingURL=deliveries.resource.d.ts.map