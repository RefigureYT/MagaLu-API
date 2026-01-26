export class DeliveriesResource {
    http;
    constructor(http) {
        this.http = http;
    }
    getDeliveryByLabel(labelId, limit = 1, offset = 0) {
        return this.http.get(`/seller/v1/deliveries?_limit=${limit}&_offset=${offset}&tag_code=${labelId}`);
    }
}
