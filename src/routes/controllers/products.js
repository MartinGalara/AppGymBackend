const { Router } = require('express');
const { filterProducts } = require('./Utils');
const userExtractor = require('../middleware/userExtractor.js');
const { Product } = require('../../db.js');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        products?
        res.status(400).send('Productos no encontrados'):
        res.status(200).send(products);
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

router.delete('/:id', userExtractor, async (req, res) => {
    try {
        const { id } = req.params;
        const productToDelete = await Product.findByPk(id);
        if (productToDelete) {
            await Product.destroy({
                where: {
                    id: id
                }
            })
            res.status(200).send(`El producto de id ${id} fue borrado con éxito`)
        } else { res.status(400).send('No se encontró el producto requerido') }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;