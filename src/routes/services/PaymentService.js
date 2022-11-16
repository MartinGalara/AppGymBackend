const axios = require("axios");

class PaymentService {
  async createPayment(info) {
    const body = info;
    const url = "https://api.mercadopago.com/checkout/preferences";

    // const body = {
    //   payer_email:"test_user_dishjdi@testuser.com",
    //   items: [
    //     {
    //       title: "Dummy Title",
    //       description: "Dummy description",
    //       picture_url: "http://www.myapp.com/myimage.jpg",
    //       category_id: "category123",
    //       quantity: 1,
    //       unit_price: 10,
    //       currency_id: "ARS"
    //     },
    //     {
    //       title: "pol y su computadora Title",
    //       description: "Dummy description",
    //       picture_url: "http://www.myapp.com/myimage.jpg",
    //       category_id: "category123",
    //       quantity: 1,
    //       unit_price: 10,
    //       currency_id: "ARS"
    //     }
    //   ],
    // };


    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });
    console.log(payment.data);
    return payment.data;
  }

  async createSubscription() {
    const url = "https://api.mercadopago.com/preapproval";

    const body = {
      reason: "Suscripción de ejemplo",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10,
        currency_id: "ARS"
      },
      back_url: "https://google.com.ar",
      payer_email: "test_user_46945293@testuser.com"
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return subscription.data;
  }
}

module.exports = PaymentService;
