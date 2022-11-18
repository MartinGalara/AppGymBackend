const express = require("express");
const router = express.Router();
const userExtractor = require('../middleware/userExtractor.js');

const PaymentController = require("./PaymentController");
const PaymentService = require("../services/PaymentService");

const PaymentInstance = new PaymentController(new PaymentService());

const { Item, Sale, Product } = require('../../db.js')

router.post("/payment", userExtractor, async function (req, res, next) {

  const {id} = req.body;

  const data = req.body;

  const items = data.items;

  const sinStock = [];

  for( let i=0; i< items.length ; i++){
    const product = await Product.findOne({where:{title:items[i].title}})
    if(items[i].quantity > product.quantity) sinStock.push(`Producto ${product.title} sin stock.`)
  }

  if(sinStock.length !==0) return res.status(400).send(sinStock)
  
  PaymentInstance.getPaymentLink(data, id ,req, res);

});

router.put("/payment", userExtractor, async function (req, res, next) {

  const { payed , purchaseId , paymentMethod} = req.body;

  if( !payed || ! purchaseId || !paymentMethod) res.status(400).send("Falta info")

  const sale = await Sale.findOne({
    where:{
    purchaseId: purchaseId
     },
     include:{
      model: Item
     }
})

  await sale.update({
    approved: payed,
    paymentMethod,
  })

  const items = sale.items

  for( let i=0; i< items.length ; i++){
    const product = await Product.findOne({where:{title:items[i].title}})
    const quantity = product.quantity
    await product.update({quantity: quantity-items[i].quantity})
  }

  return res.json(sale)

});

router.post("/subscription", function (req, res, next) {
  PaymentInstance.getSubscriptionLink(req, res);
});

module.exports = router;
