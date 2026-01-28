

import type { ISODateTimeString, MagaluDeliveryStatus, MagaluProvider, MagaluRequestResponse, MagaluSeller } from "./global";
import type {
    MagaluAPIGetPedidoDeliveryItem,
    MagaluAPIGetPedidoDeliveryShipping,
    MagaluAPIGetPedidoPaymentAmount
} from "./orders.types";

export type GetDeliveryByLabelResponseMeta = {
    page: {
        limit: number,
        offset: number,
        count: number,
        max_limit: number
    },
    links: {
        next: string,
        self: string
    }
}

export type GetDeliveryByLabelOrder = {
    code: string,
    channel: MagaluProvider
}

export type GetDeliveryByLabelResponseResult = {
    code: string,
    id: string,
    seller: MagaluSeller,
    status: MagaluDeliveryStatus,
    amounts: MagaluAPIGetPedidoPaymentAmount,
    items: Array<MagaluAPIGetPedidoDeliveryItem>,
    shipping: MagaluAPIGetPedidoDeliveryShipping,
    order: GetDeliveryByLabelOrder,
    purchased_at: ISODateTimeString
}

export type GetDeliveryByLabelResponse = {
    meta: GetDeliveryByLabelResponseMeta,
    results: Array<GetDeliveryByLabelResponseResult>;
}

export type InvoicesResourceResponse = MagaluRequestResponse<{
    /** Data de emissão da nota fiscal */
    issued_at: ISODateTimeString;

    /**
     * Chave da nota fiscal
     * Em ordem de aparição, confira abaixo o que os números da chave significam:
     * - 2 primeiros dígitos com o cUF, ou código da Unidade Federativa da empresa que está emitindo a NFe;
     * - 4 dígitos AAMM, representando o ano e o mês de emissão do documento;
     * - 14 dígitos com o número do Cadastro Nacional de Pessoa Jurídica, ou seja, o CNPJ da empresa emissora;
     * - 2 dígitos com o mod, ou modelo da NFe;
     * - 3 dígitos com a série da nota fiscal;
     * - 9 dígitos com o nNF, ou número da nota fiscal eletrônica;
     * - 1 dígito com o tpEmis, informando o tipo de emissão do documento;
     * - 8 dígitos com o cNF, que é o código numérico da chave de acesso da nota;
     * - 1 dígito com o cDV, que é o Dígito Verificador da chave de acesso.
     * Possible values: <= 44 characters
     * Example: 35230968422419000175550040000490061048949750
     */
    key: string;

    /** Status da nota fiscal. 
     * - approved - nota fiscal aprovada 
     * - validating - nota fiscal em validação 
     * - invalid - nota fiscal inválida 
     **/
    status: "approved" | "validating" | "invalid";

    /** Conteúdo do XML */
    xml: string;
}>;

export type InvoicesQueryParameters = {
    /** ID da entrega na plataforma */
    orderId: string;

    /** 
     * @description Número de entidades a serem puladas
     * @default 0
     */
    _offset?: number;

    /**
     * @description Número de entidades retornadas
     * @default 20
     */
    _limit?: number;

    /** 
     * @description Lista de campos utilizados na ordenação
     * @example created_at:asc
     * @example created_at:desc
     */
    _sort?: string;
}