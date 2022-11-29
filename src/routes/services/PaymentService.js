const axios = require("axios");

class PaymentService {
  async createPayment(info) {
    const body = info;
    const url = "https://api.mercadopago.com/checkout/preferences";

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });
    return payment.data;
  }

}

module.exports = PaymentService;
