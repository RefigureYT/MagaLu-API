export type ISODateTimeString = string;
export type DateStringYYYYMMDD = string; /** "YYYY-MM-DD" */

export type MagaluSeller = {
    id: string,
    name: string
}

export type MagaluMeta = {
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
    }
}

export type MagaluRequestResponse<T> = {
    meta: MagaluMeta,
    results: Array<T>
}

export type MagaluAmounts = {
    commission?: {
        /** Moeda utilizada nas transações */
        currency?: string;

        /** Normalizador de valor para a moeda */
        normalizer?: number;

        /** Valor total em centavos */
        total?: number;

        /** Indica o tipo de comissão */
        type?: string;
    };

    /** Moeda utilizada nas transações */
    currency?: string;

    discount?: {
        /** Moeda utilizada nas transações */
        currency?: string;

        /** Normalizador de valor para a moeda */
        normalizer?: number;

        /** Valor de coparticipação do marketplace para uma promoção */
        shared?: number;

        /** Valor total em centavos */
        total?: number;
    };

    exchange_rate?: {
        /** Moeda utilizada nas transações */
        currency?: string;

        /** Identificador da moeda de troca */
        external_id?: string,

        /** Valor utilizado para normalizar */
        normalizer?: number,

        /** Valor da moeda de troca */
        value?: number
    };

    freight?: {
        /** Moeda utilizada nas transações */
        currency?: string;

        /** Normalizador de valor para a moeda */
        normalizer?: number;

        /** Valor de coparticipação do marketplace para a tarifa de frete */
        shared?: number;

        /** Valor total em centavos */
        total?: number;
    };

    /** Normalizador de valor para a moeda */
    normalizer?: number;

    tax?: {
        /** Moeda utilizada nas transações */
        currency?: string;

        /** Indica a descrição do tipo de taxa */
        description?: string;

        /** Normalizador de valor para a moeda */
        normalizer?: number;

        /** Valor total em centavos */
        total?: number;

        /** Informa o tipo de taxa */
        type?: string;
    };

    /** Valor total em centavos */
    total?: number
}

export type MagaluChannel = {
    extras?: {
        /** nome do canal de vendas que se deseja operar */
        alias?: "Magazine Luiza" | (string & {});
    };

    /** Identificador do canal de vendas que se deseja operar */
    id: string;

    marketplace: {
        /** Documento do canal de vendas que se deseja operar */
        document: string;
    };
}

export type MagaluCustomer = {
    /** Data de nascimento */
    birth_date: DateStringYYYYMMDD;

    /** Tipo de documento do cliente */
    customer_type: "cnpj" | "cpf",

    /** Número do documento */
    document_number: string,

    /** Email do cliente */
    email?: string,

    /** Nome do cliente */
    name: string,
    phones?: Array<MagaluPhone>
}

export type MagaluEvent = {
    /** Data do evento */
    event_date?: ISODateTimeString,

    /** Identificador externo do item na plataforma */
    event_external_id?: number
}

export type MagaluReturns = {
    /** Identificador externo. */
    external_id: string,

    /** Url de rastreio. */
    tracking_url?: string,

    /** Data da devolução do pacote. */
    date: ISODateTimeString,

    /** Protocolo de troca ou cancelamento do pedido | Possible values: <= 50 characters */
    protocol?: string,

    /** Status do protocolo de troca ou cancelamento do pedido | Possible values: <= 20 characters*/
    status?: "open" | "waiting" | "failure" | "closed",

    /** Motivo do protocolo */
    reason?: "Cancelamento a pedido do cliente",

    /** Nem a documentação consta... ;-; */
    extras?: {}
}

export type MagaluForeignAmounts = MagaluAmounts;

export type MagaluInvoice = {
    /** Data de emissão */
    issued_at?: ISODateTimeString,

    /**
     * Chave da nota
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
     */
    key?: string,

    status?: {
        /** Descrição do Status da Nota Fiscal */
        description?: string;

        /** Identificador do Status da Nota Fiscal */
        id?: "approved" | string,

        /** Mensagem do Status da Nota Fiscal */
        message?: string,

        /** Data da mudança do Status da Nota Fiscal */
        status_date?: ISODateTimeString;
    }
}

export type MagaluAtributes = {
    name?: string,
    value?: string
}

export type MagaluDimensionsMeasurements = {
    unit?: string,
    value?: number
}

export type MagaluDimensions = {
    height?: MagaluDimensionsMeasurements;
    length?: MagaluDimensionsMeasurements;
    weight: MagaluDimensionsMeasurements;
    width?: MagaluDimensionsMeasurements;
}

export type MagaluImage = {
    url: string
}

export type MagaluInfo = {
    attributes?: Array<MagaluAtributes>,

    /** Descrição do item na plataforma */
    description: string,


    dimensions: MagaluDimensions,
    extras: {
        /** Informação de categoria do item */
        categories: string
    };

    /** Identificador do item na plataforma */
    id: string;

    /** Imagem do produto na plataforma */
    images: Array<MagaluImage>;

    /** Nome do item na plataforma */
    name: string;

    /** Código utilizado para identificar o item */
    sku: string;

    /** Marca do item na plataforma */
    brand: string
}

export type MagaluUnitPrice = {
    /** Tipo de moeda */
    currency: "BRL" | string;

    /** Normalizador de valor para a moeda */
    normalizer: number;

    /** Valor em centavos */
    value: number;
}

export type MagaluItems = {
    amounts: MagaluAmounts;
    foreign_amounts: MagaluForeignAmounts;
    info: MagaluInfo;

    /** Unidade de medida */
    measure_unit: "PC" | "KG" | "G";

    /** Quantidade do item */
    quantity: number;

    /** Sequencial do item */
    sequencial: number;

    unit_price: MagaluUnitPrice;
}

export type MagaluShippingDeadline = {
    /** Data limite para entrega do pacote no formato ISO 8601 (YYYY-MM-DD) */
    limit_date: DateStringYYYYMMDD;

    /** Unidade de medida temporal utilizada no campo value */
    precision: "days" | string;

    /** Prazo para entrega expresso na unidade definida pelo campo precision */
    value: number;

    /** Indica se o prazo considera apenas dias úteis. Quando false, inclui feriados e finais de semana no cálculo */
    workday: boolean
}

/**
 * Endereço no padrão Magalu.
 *
 * ⚠️ Observação:
 * - Em endpoints de listagem, `complement` e `reference` podem não vir.
 * - Em endpoints detalhados, eles geralmente aparecem.
 */
export type MagaluAddress = {
    /** Código postal */
    zipcode: string;

    /** Nome da rua */
    street: string;

    /** Número do endereço (pode vir "s/n") */
    number: string;

    /** Nome do bairro */
    district: string;

    /** Nome da cidade */
    city: string;

    /** Sigla do estado */
    state: string;

    /** Nome do país */
    country: string;

    /** Complemento do endereço (pode não existir em listagens) */
    complement?: string;

    /** Ponto de referência (pode não existir em listagens) */
    reference?: string;
};
export type MagaluStore = {
    /** Numero de referência */
    document: string;

    /** Local armazenado */
    name?: string;
}

export type MagaluShippingDropDetails = {
    address: MagaluAddress;
    store: MagaluStore;
}

export type MagaluPickupDetails = MagaluShippingDropDetails

export type MagaluHandlingTime = {
    /** Data limite para preparação e postagem do pacote no formato ISO 8601 (YYYY-MM-DD). O valor retornado pelo endpoint está em UTC (GMT+0). */
    limit_date: DateStringYYYYMMDD;

    /** Unidade de medida temporal utilizada no campo value */
    precision: string;

    /** Prazo para preparação e postagem do pacote expresso na unidade definida pelo campo precision */
    value: number;

    /** Indica se o prazo considera apenas dias úteis. Quando false, inclui feriados e finais de semana no cálculo */
    workday: boolean;
}

export type MagaluExtras = Record<string, any>;

export type MagaluProvider = {
    /** Descrição da entrega pelo parceiro */
    description: string;
    extras: MagaluExtras;

    /** Identificador do fornecedor */
    id: string;

    /** nome do fornecedor */
    name: string;
}

export type MagaluPhone = {
    /** Código da área */
    area_code: string;

    /** Código do país */
    country_code: string;

    /** Número de telefone */
    number: string;

    /** Tipo de telefone (ex: mobile|comercial|residential) */
    type: "mobile" | "comercial" | "residential" | string;
}

/**
 * Representa um destinatário (recipient) de entrega.
 *
 * ⚠️ Observação:
 * - `email` e `phones` não são garantidos em todos os endpoints.
 */
export type MagaluRecipient = {
    /** Tipo de cliente. Pessoa física ou jurídica */
    customer_type: "cpf" | "cnpj" | (string & {});

    /** Documento do destinatário */
    document_number: string;

    /** Nome do destinatário */
    name: string;

    /** Endereço detalhado */
    address: MagaluAddress;

    /** Email do destinatário (nem sempre vem) */
    email?: string;

    /** Lista de telefones (nem sempre vem) */
    phones?: Array<MagaluPhone>;
};

/**
 * Informações de rastreio.
 *
 * ⚠️ Observação:
 * - Em alguns retornos vem somente `{ url }`
 * - Em outros pode vir também `code`
 */
export type MagaluTracking = {
    /** URL de rastreio */
    url: string;

    /** Código de envio (opcional) */
    code?: string;
};

/**
 * Shipping resumido (mais comum em listagens).
 *
 * Campos adicionais podem ou não aparecer dependendo do endpoint/nível do payload.
 */
export type MagaluShippingSummary = MagaluShippingBase &
    Partial<{
        /** Detalhes de coleta (quando existe) */
        pickup_details: MagaluPickupDetails;

        /** Detalhes de drop (quando existe) */
        drop_details: MagaluShippingDropDetails;

        /** Data de postagem (nem sempre vem) */
        posting_date: ISODateTimeString;

        /** Data de envio (nem sempre vem) */
        shipped_at: ISODateTimeString;

        /** URL de rastreio (nem sempre vem) */
        tracking_url: string;

        /** Informações de rastreio (nem sempre vem) */
        tracking: MagaluTracking | { url: string };
    }>;

/**
 * Shipping detalhado (quando o endpoint retorna o pacote completo).
 *
 * Aqui você pode “forçar” os campos que só existem no detalhado.
 */
export type MagaluShippingDetailed = MagaluShippingBase & {
    pickup_details: MagaluPickupDetails;
    drop_details: MagaluShippingDropDetails;
    posting_date: ISODateTimeString;
    tracking_url: string;
    tracking: MagaluTracking;

    /** Pode existir ou não dependendo do endpoint */
    shipped_at?: ISODateTimeString;
};

/**
 * Status possível de entrega.
 *
 * ⚠️ Dica:
 * - Eu deixo `(string & {})` no final pra não quebrar se a API adicionar um novo status.
 */
export type MagaluDeliveryStatus =
    | "new"
    | "approved"
    | "invoiced"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "frozen"
    | (string & {});

/**
 * Info resumida de item dentro de entregas (listagem normalmente vem assim).
 */
export type MagaluItemInfoSummary = {
    sku: string;
    id: string;
    name: string;
    brand: string;
    images: Array<MagaluImage>;
    attributes: any[];
    extras: Record<string, any>;
};

/**
 * Item resumido dentro de uma entrega.
 *
 * ⚠️ Observação:
 * - Em alguns endpoints o objeto `amounts` do item traz `taxes: []`.
 * - Pra não quebrar, aceitamos `taxes?`.
 */
export type MagaluDeliveryItemSummary = {
    sequencial: number;
    amounts: MagaluAmounts & { taxes?: any[] };
    info: MagaluItemInfoSummary;

    /** Unidade de medida (ex.: "g") */
    measure_unit: string;

    /** Preço unitário */
    unit_price: MagaluUnitPrice;

    /** Quantidade do item */
    quantity: number;
};

/**
 * Entrega resumida (ideal para listagens).
 * Serve tanto pro endpoint de Orders quanto para o endpoint de Deliveries (quando vêm no mesmo shape).
 */
export type MagaluDeliverySummary = {
    code: string;
    id: string;
    seller: MagaluSeller;
    status: MagaluDeliveryStatus;

    /** Alguns endpoints trazem, outros não */
    amounts?: MagaluAmounts;

    /** Itens da entrega */
    items: Array<MagaluDeliveryItemSummary>;

    /** Dados de envio */
    shipping: MagaluShippingSummary;

    /** Em muitos retornos vem como [] */
    returns: any[];
};

/**
 * Entrega detalhada (quando o endpoint retorna o “pacote completo”).
 * Use quando você realmente estiver consumindo endpoints que trazem eventos, invoices, foreign_amounts etc.
 */
export type MagaluDeliveryDetailed = MagaluDeliverySummary & {
    purchased_at?: ISODateTimeString;
    foreign_amounts?: MagaluForeignAmounts;
    invoices?: Array<MagaluInvoice>;
    events?: Array<MagaluEvent>;
    returns?: Array<MagaluReturns>;

    /** No detalhado, shipping costuma vir completo */
    shipping: MagaluShippingDetailed;
};

/**
 * Base do shipping (o que costuma existir em praticamente todos os endpoints).
 */
export type MagaluShippingBase = {
    /** Destinatário */
    recipient: MagaluRecipient;

    /** Informações do fornecedor/logística */
    provider: MagaluProvider;

    /** Tempo de preparação / manuseio */
    handling_time: MagaluHandlingTime;

    /** Prazo de entrega */
    deadline: MagaluShippingDeadline;
};

export type MagaluGateway = {
    /** Documento do gateway de pagamento */
    document: string;
}

export type MagaluAcquirer = {
    /** Nome do adquirente */
    name: string;

    /** Documento do adquirente */
    document: string;
}