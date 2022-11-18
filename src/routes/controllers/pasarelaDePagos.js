const express = require("express");
const router = express.Router();

const PaymentController = require("./PaymentController");
const PaymentService = require("../services/PaymentService");

const PaymentInstance = new PaymentController(new PaymentService());

router.post("/payment", function (req, res, next) {
  const data = req.body;
  PaymentInstance.getPaymentLink(data,req, res);
});

router.post("/subscription", function (req, res, next) {
  PaymentInstance.getSubscriptionLink(req, res);
});

router.get("/payment/perro", function (req, res, next) {
 console.log('hola');
});

module.exports = router;

/*
const body = {
  payer_email:"test_user_dishjdi@testuser.com",
  items: [
    {
      title: "Dummy Title",
      description: "Dummy description",
      picture_url: "http://www.myapp.com/myimage.jpg",
      category_id: "category123",
      quantity: 1,
      unit_price: 10,
      currency_id: "ARS"
    }
  ],
};
*/
