# Magalu API (TypeScript/JavaScript SDK)

[![npm](https://img.shields.io/npm/v/%40refigure%2Fmagalu-api.svg)](https://www.npmjs.com/package/@refigure/magalu-api)
[![npm downloads](https://img.shields.io/npm/dm/%40refigure%2Fmagalu-api.svg)](https://www.npmjs.com/package/@refigure/magalu-api)
[![license](https://img.shields.io/npm/l/%40refigure%2Fmagalu-api.svg)](https://www.npmjs.com/package/@refigure/magalu-api)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen.svg)](https://nodejs.org/)
[![Bun](https://img.shields.io/badge/Bun-supported-black.svg)](https://bun.sh/)
[![wakatime](https://wakatime.com/badge/user/db4a2800-e564-4201-9406-b98e170a6764/project/3e54d01a-890a-40e1-ae5f-9de6c3969200.svg)](https://wakatime.com/)

Uma **SDK minimalista e tipada** para consumir a **API de Seller da Magazine Luiza (Magalu)** usando **Fetch nativo**, com arquitetura em **POO**, recursos organizados por domínio (`orders`, `deliveries`) e **tipagens prontas** para TypeScript.

> **Créditos:** desenvolvido por **Kelvin Kauan Melo Mattos**.  
> MIT License © 2026 Kelvin Mattos

---

## ✨ O que essa lib entrega

- ✅ **POO**: um client principal (`MagaluAPI`) com recursos separados por domínio
- ✅ **Fetch nativo** (sem axios): funciona muito bem com **Bun** e **Node**
- ✅ **Tipagens completas** para respostas e parâmetros (TypeScript)
- ✅ **Endpoints prontos**
  - `orders.getPedidoByOrder(orderId)`
  - `orders.getListPedidos(query)`
  - `deliveries.getDeliveryByLabel(labelId, limit?, offset?)`
- ✅ Tratamento básico de erro: lança `Error` com status HTTP + payload de erro (texto)

---

## 📦 Instalação

### Bun
```bash
bun add @refigure/magalu-api
```

### Node (npm / pnpm / yarn)
```bash
npm i @refigure/magalu-api
# ou
pnpm add @refigure/magalu-api
# ou
yarn add @refigure/magalu-api
```

> **Obs.:** a lib é publicada como **ESM** (`"type": "module"`).  
> Se você usa CommonJS, veja a seção **CommonJS (require)**.

---

## ✅ Requisitos

- **Bun**: qualquer versão moderna
- **Node.js**: recomendado **Node 18+** (por causa do `fetch` global)
- **TypeScript**: (opcional) recomendado **TS 5+**

---

## 🚀 Quickstart (TypeScript)

```ts
import { MagaluAPI } from "@refigure/magalu-api";

const magalu = new MagaluAPI({
  baseUrl: "https://api.magalu.com",
  accessToken: process.env.MAGALU_ACCESS_TOKEN as string,
});

const pedidos = await magalu.orders.getListPedidos({
  _limit: 20,
  _offset: 0,
  _sort: "purchased_at:desc",
});

console.log("Qtd pedidos:", pedidos.results.length);
console.log("Primeiro pedido:", pedidos.results[0]);
```

---

## 🚀 Quickstart (JavaScript)

### Node ESM (`"type": "module"`)
```js
import { MagaluAPI } from "@refigure/magalu-api";

const magalu = new MagaluAPI({
  baseUrl: "https://api.magalu.com",
  accessToken: process.env.MAGALU_ACCESS_TOKEN,
});

const pedidos = await magalu.orders.getListPedidos({
  _limit: 20,
  _sort: "purchased_at:desc",
});

console.log(pedidos.results.length);
```

### CommonJS (`require`)
Como o pacote é ESM, use **import dinâmico**:

```js
const { MagaluAPI } = await import("@refigure/magalu-api");

const magalu = new MagaluAPI({
  baseUrl: "https://api.magalu.com",
  accessToken: process.env.MAGALU_ACCESS_TOKEN,
});
```

---

## ⚙️ Configuração (`MagaluConfig`)

A lib precisa de:

- `baseUrl`: base da API
- `accessToken`: Bearer token do Seller Magalu

Exemplo:

```ts
import type { MagaluConfig } from "@refigure/magalu-api";

const config: MagaluConfig = {
  baseUrl: "https://api.magalu.com",
  accessToken: "SEU_TOKEN_AQUI",
};
```

### Base URLs suportadas

```ts
export type MagaluBaseUrl =
  | "https://api.magalu.com"
  | "https://api-sandbox.magalu.com"
  | "https://services.magalu.com";
```

> ✅ Produção: `https://api.magalu.com`  
> 🧪 Sandbox: `https://api-sandbox.magalu.com`  
> 🔧 Serviços extras: `https://services.magalu.com`

---

## 📚 Recursos disponíveis

A lib expõe uma instância principal com os módulos:

```ts
const api = new MagaluAPI({ baseUrl, accessToken });

api.orders;      // OrdersResource
api.deliveries;  // DeliveriesResource
```

---

# 🧾 Orders (Pedidos)

## 1) Listar pedidos (`getListPedidos`)

```ts
const pedidos = await api.orders.getListPedidos({
  status: "approved",
  _limit: 50,
  _offset: 0,
  _sort: "purchased_at:desc",
});

console.log(pedidos.meta.page);
console.log(pedidos.results);
```

### Parâmetros suportados

```ts
type GetListPedidosQueryParameters = {
  status?: "new" | "approved" | "cancelled" | "finished";
  purchased_at__gte?: string; // ISO 8601
  purchased_at__lte?: string; // ISO 8601
  updated_at__gte?: string;   // ISO 8601
  updated_at__lte?: string;   // ISO 8601
  code?: string;
  _offset?: number;
  _limit?: number;
  _sort?: "purchased_at:asc" | "purchased_at:desc";
};
```

### Paginação

Use `_offset` e `_limit`. A API retorna:

```ts
pedidos.meta.page.count;
pedidos.meta.page.limit;
pedidos.meta.page.offset;
pedidos.meta.links.next; // query da próxima página
```

---

## 2) Buscar pedido por ID (`getPedidoByOrder`)

```ts
const pedido = await api.orders.getPedidoByOrder("ORDER_ID_AQUI");

console.log(pedido.code);
console.log(pedido.customer.name);
console.log(pedido.deliveries);
```

---

# 📦 Deliveries (Entregas)

## 1) Buscar entrega pela etiqueta (`getDeliveryByLabel`)

Esse endpoint consulta entregas filtrando pelo **código de etiqueta** (`tag_code`).

```ts
const delivery = await api.deliveries.getDeliveryByLabel("ETIQUETA_AQUI", 1, 0);

console.log(delivery.results.length);
console.log(delivery.results[0]);
```

### Assinatura

```ts
getDeliveryByLabel(labelId: string, limit = 1, offset = 0)
```

Ele monta a query:

```
/seller/v1/deliveries?_limit={limit}&_offset={offset}&tag_code={labelId}
```

---

## 🧠 Tipagens (TypeScript)

Além do `MagaluAPI`, a lib exporta os principais tipos:

```ts
import type {
  GetListPedidosResponse,
  GetListPedidosQueryParameters,
  MagaluAPIGetPedidoResponse,
  GetDeliveryByLabelResponse,
  MagaluDeliveryStatus,
  MagaluSeller,
} from "@refigure/magalu-api";
```

---

## ❗ Tratamento de erros

A lib usa `fetch()` e, se o status não for `2xx`, ela lança um `Error`:

- inclui o método
- inclui a URL final
- inclui status HTTP
- inclui o corpo de erro (texto), quando disponível

Exemplo recomendado:

```ts
try {
  const pedidos = await api.orders.getListPedidos({ _limit: 20 });
  console.log(pedidos.results.length);
} catch (err) {
  console.error("Falha ao consultar Magalu:", err);
}
```

---

## 💰 Sobre valores e normalizer

Em vários pontos da API (ex.: pagamentos), a Magalu trabalha com:

- `normalizer` (geralmente `100`)
- `amount`/`total` em número inteiro

Exemplo:

- `amount: 2698`
- `normalizer: 100`
- valor real: `2698 / 100 = 26.98` (R$ 26,98)

---

## 🔐 Segurança do accessToken

- Nunca commite `accessToken` no repositório
- Use `.env` / secrets do deploy (GitHub Actions, Railway, Render, etc.)
- Em produção, injete via `process.env`

Exemplo:

```bash
MAGALU_ACCESS_TOKEN="..."
```

---

## 🧩 Exemplos de uso (mesma ideia do `src/examples/basic.ts`)

A ideia é:

1. buscar pedidos
2. pegar o primeiro
3. pegar a primeira entrega
4. pegar o primeiro item

```ts
const list = await api.orders.getListPedidos({
  _limit: 100,
  _offset: 0,
  _sort: "purchased_at:desc",
});

const first = list.results[0];
const firstDelivery = first?.deliveries?.[0];
const firstItem = firstDelivery?.items?.[0];

if (firstItem) {
  console.log("Produto:", firstItem.info.name);
}
```

---

## 🧪 Funciona com Bun?

Sim ✅

Bun já tem `fetch()` nativo e roda ESM muito bem:

```bash
bun run index.ts
```

---

## 🛠️ Roadmap (ideias)

A base está pronta para evoluir fácil:

- [ ] retries com backoff
- [ ] interceptors (log / trace)
- [ ] endpoints de logística adicionais
- [ ] suporte a POST/PUT/PATCH específicos da API

---

## 📄 Licença

MIT License © 2026 Kelvin Mattos

---

## 👤 Autor

**Kelvin Kauan Melo Mattos**  
Feito com foco em automação e integração de marketplaces usando TypeScript + Bun.
