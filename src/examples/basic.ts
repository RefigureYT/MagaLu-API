import { MagaluAPI } from "../index";

const magaluJF = new MagaluAPI({
    baseUrl: "https://api.magalu.com",
    accessToken: "preencha_aqui_com_seu_access_token"
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
    const firstDelivery = firstResult.deliveries[0];
    if (firstDelivery) {
        const firstItem = firstDelivery.items[0];
        if (firstItem) {
            console.log('Produto:', firstItem.info.name);
        }
    }
}