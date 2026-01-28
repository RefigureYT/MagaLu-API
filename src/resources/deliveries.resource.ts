import type { HttpClient } from "../client/HttpClient";
import type { GetDeliveryByLabelResponse, InvoicesQueryParameters, InvoicesResourceResponse } from "../types/deliveries.types";

export class DeliveriesResource {
    constructor(private readonly http: HttpClient) { }

    getDeliveryByLabel(labelId: string, limit = 1, offset = 0): Promise<GetDeliveryByLabelResponse> {
        const qs = new URLSearchParams({
            tag_code: labelId,
            _limit: String(limit),
            _offset: String(offset)
        });

        const url = `/seller/v1/deliveries?${qs.toString()}`;
        return this.http.get<GetDeliveryByLabelResponse>(url);
    }

    getInvoiceByOrder(obj: InvoicesQueryParameters): Promise<InvoicesResourceResponse> {
        const { orderId, ...query } = obj;

        const qs = new URLSearchParams();
        for (const [key, value] of Object.entries(query)) {
            if (value !== undefined) {
                qs.append(key, String(value));
            }
        }

        const queryString = qs.toString();
        const url =
            queryString.length > 0
                ? `/seller/v1/deliveries/${orderId}/invoices?${queryString}`
                : `/seller/v1/deliveries/${orderId}/invoices`;

        return this.http.get<InvoicesResourceResponse>(url);
    }
}