import { MagaluAPI } from "../index";

let refreshCallCount = 0;

// 👉 coloque aqui o token CORRETO para o teste
const TOKEN_CORRETO = "eyJraWQiOiI25SQNf1oPTBbLdldQHoClU9geYVjDAZhoN81x7knbDZ8XUi2fWJpHurlpUIbWko_1mcLHs4ntjRfVSxILP9maIk6N1kDDiMG7qnUxDInC4YPby-fmxGcV8N58";

export const refreshTokenFn = () => {
    refreshCallCount++;

    if (refreshCallCount < 3) {
        console.log(`[TEST] Refresh #${refreshCallCount}: retornando TOKEN ERRADO`);
        return "TOKEN_ERRADO_DE_TESTE";
    }

    console.log(`[TEST] Refresh #${refreshCallCount}: retornando TOKEN CORRETO`);
    return TOKEN_CORRETO;
};

const magaluJF = new MagaluAPI({
    baseUrl: "https://api.magalu.com",
    accessToken: "TOKEN_ERRADO_DE_TESTE",
    maxConsecutiveRefreshFails: 4,
    refreshTokenFn
});

const listPedidos = await magaluJF.orders.getListPedidos({
    _limit: 100,
    _offset: 0,
    _sort: "purchased_at:desc"
});
console.log(listPedidos.results.length);
console.log(listPedidos.results[0]);

const firstResult = listPedidos.results[0];
if (firstResult) {
    const invocePedido = await magaluJF.deliveries.getInvoiceByOrder({ orderId: '1504270096391668' });
    console.log('invoice:', invocePedido);
    const firstDelivery = firstResult.deliveries[0];
    if (firstDelivery) {
        const firstItem = firstDelivery.items[0];
        if (firstItem) {
            console.log('Produto:', firstItem.info.name);
        }
    }
}