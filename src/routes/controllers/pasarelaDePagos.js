const express = require("express");
const router = express.Router();
const userExtractor = require('../middleware/userExtractor.js');

const PaymentController = require("./PaymentController");
const PaymentService = require("../services/PaymentService");

const PaymentInstance = new PaymentController(new PaymentService());

const { Item, Sale, Product , SubscriptionSale } = require('../../db.js')
const { addDaysToUser, sendEmail} = require("./Utils.js")

router.post("/payment", userExtractor, async function (req, res, next) {

  const {id} = req.body;

  const data = req.body;

  const items = data.items;

  const sinStock = [];

  for( let i=0; i< items.length ; i++){
    const product = await Product.findOne({where:{title:items[i].title}})
    if(items[i].quantity > product.stock) sinStock.push(`Producto ${product.title} sin stock.`)
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
    year:new Date(sale.updatedAt).getFullYear(),
    month:new Date(sale.updatedAt).getMonth()+1,
  })

  const items = sale.items

  for( let i=0; i< items.length ; i++){
    const product = await Product.findOne({where:{title:items[i].title}})
    const stock = product.stock
    await product.update({stock: stock-items[i].quantity})
  }

  await sendEmail(sale,req.body)

  return res.json(sale)

});

router.post("/subscription",userExtractor, async function (req, res, next) {

  const data = req.body;

  const {id} = req.body;

  PaymentInstance.getSubscriptionLink(data,id,req, res);
});

router.put("/subscription", userExtractor, async function (req, res, next) {

  const { payed , purchaseId , paymentMethod, id} = req.body;

  if( !payed || ! purchaseId || !paymentMethod) res.status(400).send("Falta info")

  const subscription = await SubscriptionSale.findOne({
    where:{
    purchaseId: purchaseId
     }
})

  await subscription.update({
    approved: payed,
    paymentMethod,
    year:new Date(subscription.updatedAt).getFullYear(),
    month:new Date(subscription.updatedAt).getMonth()+1,
  })

  addDaysToUser(id,subscription.daysToAdd)

  await sendEmail(subscription,req.body)

  return res.json(subscription)

});

module.exports = router;
