const express = require('express');
const { Router } = require("express");

const PaymentController = require("../controllers/PaymentsController");
const router = require('./Login');
const PaymentService = require("./Services/PaymentsService");

const PaymentInstance = new PaymentController(new PaymentService());

router.get('/', function(req,res,next){
    return res.json({
        "/payment":"generates a payment link",
        "/suscription":"generates a subscription link"
    });
});

//estas 2 deberian ser post

//el req del body tiene que traer los datos de mi producto y viajan a PaymentServices a la parte de items

router.get("/payment", function (req,res,next){
    PaymentInstance.getPaymentLink(req,res);
});

router.get("/suscription", function (req,res,next){
    PaymentInstance.getSubscriptionLink(req,res);
});

module.exports = router;