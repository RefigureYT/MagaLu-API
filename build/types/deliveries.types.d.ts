import type { ISODateTimeString, MagaluDeliveryStatus, MagaluProvider, MagaluSeller } from "./global";
import type { MagaluAPIGetPedidoDeliveryItem, MagaluAPIGetPedidoDeliveryShipping, MagaluAPIGetPedidoPaymentAmount } from "./orders.types";
export type GetDeliveryByLabelResponseMeta = {
    page: {
        limit: number;
        offset: number;
        count: number;
        max_limit: number;
    };
    links: {
        next: string;
        self: string;
    };
};
export type GetDeliveryByLabelOrder = {
    code: string;
    channel: MagaluProvider;
};
export type GetDeliveryByLabelResponseResult = {
    code: string;
    id: string;
    seller: MagaluSeller;
    status: MagaluDeliveryStatus;
    amounts: MagaluAPIGetPedidoPaymentAmount;
    items: Array<MagaluAPIGetPedidoDeliveryItem>;
    shipping: MagaluAPIGetPedidoDeliveryShipping;
    order: GetDeliveryByLabelOrder;
    purchased_at: ISODateTimeString;
};
export type GetDeliveryByLabelResponse = {
    meta: GetDeliveryByLabelResponseMeta;
    results: Array<GetDeliveryByLabelResponseResult>;
};
//# sourceMappingURL=deliveries.types.d.ts.map