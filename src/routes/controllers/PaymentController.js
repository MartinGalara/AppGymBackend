const { createSale } = require("./Utils.js")
const {SubscriptionSale} = require("./../../db.js")

class PaymentController {
    constructor(subscriptionService) {
      this.subscriptionService = subscriptionService;
    }
  
    async getPaymentLink(data,id,req, res) {
      try {
        const payment = await this.subscriptionService.createPayment(data);

        await createSale(payment,id);
  
        return res.json(payment);
      } catch (error) {
        console.log(error);
  
        return res
          .status(500)
          .json({ error: true, msg: "Failed to create payment" });
      }
    }
  
    async getSubscriptionLink(data,id,req, res) {
      
      try {
       
        const subscription = await this.subscriptionService.createPayment(data);
        
        await SubscriptionSale.create({
          purchaseId:subscription.id,
          userId: id,
          totalCost:data.items[0].unit_price,
          name:data.items[0].title,
          daysToAdd:data.items[0].quantity,
      })

        return res.json(subscription);
      } catch (error) {
        console.log(error);
  
        return res
          .status(500)
          .json({ error: true, msg: "Failed to create subscription" });
      }
    }
  }
  
  module.exports = PaymentController;
  