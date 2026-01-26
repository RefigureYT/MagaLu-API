import type { DateStringYYYYMMDD, ISODateTimeString, MagaluAmounts, MagaluChannel, MagaluCustomer, MagaluForeignAmounts, MagaluHandlingTime, MagaluPickupDetails, MagaluProvider, MagaluShippingDeadline, MagaluDeliverySummary, MagaluSeller, MagaluExtras, MagaluDeliveryStatus } from "../index";
export type MagaluAPIGetPedidoChanel = {
    id: string;
    marketplace: {
        document: string;
    };
    extras: {
        alias: "Magazine Luiza" | (string & {});
    };
};
/**
 * Precisa validar, se o customer_type for cpf então o document_number deve ter 11 dígitos,
 * se for cnpj então deve ter 14 dígitos.
 */
export type MagaluAPIGetPedidoCustomer = {
    birth_date: DateStringYYYYMMDD;
    customer_type: "cpf" | "cnpj";
    name: string;
    document_number: string; /** CPF = 11 dígitos && CNPJ = 14 dígitos */
};
export type MagaluAPIGetPedidoPayment = {
    gateway: {
        document: string;
    };
    description: string;
    extras: Record<string, any>;
    installments: number;
    method: string;
    method_brand: string;
    type: string;
    brand: string;
    authorization_code: string;
    integration_type: string;
    currency: string;
    normalizer: number;
    amount: number;
};
export type MagaluAPIGetPedidoPaymentAmount = {
    currency: string;
    normalizer: number;
    total: number;
    discount: {
        currency: string;
        normalizer: number;
        total: number;
    };
    freight: {
        currency: string;
        normalizer: number;
        total: number;
    };
    tax: {
        currency: string;
        normalizer: number;
        total: number;
    };
    commission?: {
        currency: string;
        normalizer: number;
        total: number;
        type: string;
    };
};
export type MagaluAPIGetPedidoDeliveryItemInfoImage = {
    url: string;
};
export type MagaluAPIGetPedidoDeliveryItemInfo = {
    sku: string;
    id: string;
    brand: string;
    name: string;
    images: MagaluAPIGetPedidoDeliveryItemInfoImage[];
    attributes: any[];
    extras: Record<string, any>;
};
export type MagaluAPIGetPedidoDeliveryItem = {
    sequencial: number;
    amounts: MagaluAPIGetPedidoPaymentAmount;
    info: MagaluAPIGetPedidoDeliveryItemInfo;
    unit_price: {
        currency: string;
        normalizer: number;
        value: number;
    };
    measure_unit: string;
    quantity: number;
};
export type MagaluAPIGetPedidoDeliveryShippingRecipient = {
    customer_type: string;
    document_number: string;
    name: string;
    address: {
        zipcode: string;
        street: string;
        number: string;
        district: string;
        city: string;
        state: string;
        country: string;
        complement: string;
        reference: string;
    };
};
export type Address = {
    zipcode: string;
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    country: string;
    complement: string;
    reference: string;
};
export type MagaluAPIGetPedidoDeliveryShipping = {
    recipient: MagaluAPIGetPedidoDeliveryShippingRecipient;
    pickup_details: MagaluPickupDetails;
    handling_time: MagaluHandlingTime;
    deadline: MagaluShippingDeadline;
    provider: MagaluProvider;
    tracking_url: string;
    tracking: {
        url: string;
    };
    shipped_at: ISODateTimeString | undefined;
};
export type MagaluAPIGetPedidoDelivery = {
    code: string;
    id: string;
    seller: MagaluSeller;
    status: MagaluDeliveryStatus;
    amounts: MagaluAPIGetPedidoPaymentAmount;
    items: Array<MagaluAPIGetPedidoDeliveryItem>;
    shipping: MagaluAPIGetPedidoDeliveryShipping;
    returns: [];
};
export interface MagaluAPIGetPedidoResponse {
    created_at: ISODateTimeString;
    approved_at: ISODateTimeString | undefined;
    purchased_at: ISODateTimeString;
    updated_at: ISODateTimeString;
    id: string;
    status: "new" | "approved";
    code: string;
    channel: MagaluAPIGetPedidoChanel;
    customer: MagaluAPIGetPedidoCustomer;
    payments: Array<MagaluOrderPayment>;
    amounts: MagaluAPIGetPedidoPaymentAmount;
    deliveries: Array<MagaluAPIGetPedidoDelivery>;
}
export type GetListPedidosQueryParameters = {
    /**
     * Status do pedido, pode ser os seguintes valores: - new: pedido criado, - approved: pagamento aprovado, - cancelled: cancelamento total, todas entregas canceladas - finished: pedido finalizado, podendo haver entregas com cancelamento parcial
     */
    status?: "new" | "approved" | "cancelled" | "finished";
    /** Filtra entregas a partir da data informada (ex.: '2021-06-18T03:05:54+00:00') */
    purchased_at__gte?: ISODateTimeString;
    /** Filtra entregas a partir da data informada (ex.: '2021-06-18T03:05:54+00:00') */
    purchased_at__lte?: ISODateTimeString;
    /** Filtra atualização de pedidos a partir da data informada (ex.: '2021-06-18T03:05:54+00:00') */
    updated_at__gte?: ISODateTimeString;
    /** Filtra atualização de pedidos a partir da data informada (ex.: '2021-06-18T03:05:54+00:00') */
    updated_at__lte?: ISODateTimeString;
    /** Código do pedido na plataforma */
    code?: string;
    /** Posição de registro de referência, a partir dele serão retornados os próximos N registros. | DEFAULT = 0 */
    _offset?: number;
    /** Determina a quantidade de registros a serem retornados. | DEFAULT = 20 */
    _limit?: number;
    /** Ordenação, sendo permitido os seguintes valores: purchased_at:asc, purchased_at:desc. */
    _sort?: "purchased_at:asc" | "purchased_at:desc";
};
export type MetaResponse = {
    links: {
        /** Query para próxima página (string) */
        next?: string;
        /** Query para página anterior (string) */
        previous?: string;
        /** Query para página atual (string) */
        self: string;
    };
    page: {
        /** Total de itens retornados (integer) */
        count: number;
        /** Quantidade de itens requeridos (integer) */
        limit: number;
        /** Máximo de itens a serem retornados (integer) */
        max_limit: number;
        /** Quantidade de itens a serem ignorados (integer) */
        offset: number;
    };
};
export type GetListPedidosResponseResult = {
    amounts?: MagaluAmounts;
    approved_at?: ISODateTimeString;
    channel?: MagaluChannel;
    code?: string;
    created_at?: ISODateTimeString;
    customer: MagaluCustomer;
    deliveries: Array<MagaluDeliverySummary>;
    foreign_amounts: MagaluForeignAmounts;
    /** Identificador do pedido na plataforma */
    id: string;
    payments: Array<MagaluOrderPayment>;
    /** Data da pagamento */
    purchased_at: ISODateTimeString;
    /** Status do pedido:
     * - new: pedido criado;
     * - approved: pagamento aprovado (este status também vai trazer pedidos com status de invoiced (nota fiscal gerada),
     *             shipped (enviado) e delivered (entregue),
     *             pois o pagamento,
     *             em todas estas situações/status do pedido já foi aprovado;
     * - cancelled: cancelamento total, todas entregas canceladas;
     * - finished: pedido finalizado, podendo haver entregas com cancelamento parcial
     * */
    status: "new" | "approved" | "cancelled" | "finished";
    /** Data de atualização */
    updated_at: ISODateTimeString;
};
export type GetListPedidosResponse = {
    meta: MetaResponse;
    results: Array<GetListPedidosResponseResult>;
};
/**
 * Representa um pagamento associado a um pedido na API de Orders da Magalu.
 *
 * Observações:
 * - Em geral, `amount` vem como inteiro usando `normalizer` (ex.: 2698 com normalizer 100 = R$ 26,98)
 * - Para Pix, normalmente `method`, `brand`, `type` e `method_brand` aparecem como "pix"
 */
export type MagaluOrderPayment = {
    /**
     * Identificação do gateway/entidade processadora do pagamento.
     * Ex.: CNPJ do gateway ("13.884.775/0001-19")
     */
    gateway: {
        document: string;
    };
    /**
     * Descrição do meio de pagamento.
     * Ex.: "Pix", "Cartão de crédito"
     */
    description: string;
    /**
     * Campos adicionais opcionais retornados pela API (pode vir vazio `{}`).
     */
    extras: MagaluExtras;
    /**
     * Número de parcelas.
     * Ex.: 1
     */
    installments: number;
    /**
     * Método de pagamento (texto padronizado pela API).
     * Ex.: "pix"
     */
    method: string;
    /**
     * Variante/identificador do método.
     * Ex.: "pix"
     */
    method_brand: string;
    /**
     * Tipo do pagamento.
     * Ex.: "pix"
     */
    type: string;
    /**
     * Marca do pagamento.
     * Ex.: "pix"
     */
    brand: string;
    /**
     * Código de autorização/identificador da transação.
     * Ex.: "E00360305202601161517cd69ad020e5"
     */
    authorization_code: string;
    /**
     * Tipo de integração do pagamento.
     * Ex.: "POS"
     */
    integration_type: string;
    /**
     * Moeda utilizada.
     * Ex.: "BRL"
     */
    currency: string;
    /**
     * Normalizador monetário.
     * Ex.: 100 (significa que os valores estão em centavos)
     */
    normalizer: number;
    /**
     * Valor total pago (em formato inteiro) usando o `normalizer`.
     * Ex.: 2698 com normalizer 100 = R$ 26,98
     */
    amount: number;
};
//# sourceMappingURL=orders.types.d.ts.map