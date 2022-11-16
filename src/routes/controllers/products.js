const { Router } = require('express');
const { getAllProducts,filterProducts } = require('./Utils');
const userExtractor = require('../middleware/userExtractor.js');
const {Product} = require('../../db.js');

const router = Router();

router.get('/', async (req, res) => {
    const products = await getAllProducts();
    try {
        
        res.status(200).send(products);
        //res.status(400).send('Muscles not found')
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/filter', userExtractor, async (req, res) => {

    const { id , filters } = req.body;

    let productData;
    let finalfilter;

        try {
            productData = await Product.findAll()
            finalfilter = filterProducts(productData,filters)
            res.status(200).send(finalfilter)
        } catch (error) {
            res.status(400).send(error.message)
        }
})



module.exports = router;