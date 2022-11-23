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

  /*async createSubscription(info) {
    const url = "https://api.mercadopago.com/preapproval";
    const body = info;

  
    // const body = {
    //   reason: "Suscripción de ejemplo",
    //   auto_recurring: {
    //     frequency: 1,
    //     frequency_type: "months",
    //     transaction_amount: 10,
    //     currency_id: "ARS"
    //   },
    //   back_url: "https://google.com.ar",
    //   payer_email: "test_user_46945293@testuser.com"
    // };
    // console.log(body);

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return subscription.data;
  }*/
}

module.exports = PaymentService;
