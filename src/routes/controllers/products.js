const { Router } = require('express');
const { filterProducts,getPagination,getPagingData} = require('./Utils');
const userExtractor = require('../middleware/userExtractor.js');
const { Product } = require('../../db.js');

const router = Router();

// router.get('/', async (req, res) => {
//     try {
//         const products = await Product.findAll();
//         res.status(200).send(products);
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// })


router.get('/', async (req, res) => {
    try {

        const page = parseInt(req.query.page, 10)
        const size = parseInt(req.query.size, 10)

        const { limit, offset } = getPagination(page, size);
        const products = await Product.findAndCountAll({offset: offset, limit: limit});
        const finalres = getPagingData(products, page, limit);
        res.status(200).send(finalres);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/filter', userExtractor, async (req, res) => {

    const { id , filters } = req.body;
    
    const page = parseInt(req.query.page, 10)
    const size = parseInt(req.query.size, 10)

    let productData;
    let finalfilter;

        try {

            const { limit, offset } = getPagination(page, size);
            const productData = await Product.findAndCountAll({offset: offset, limit: limit});
            const finalres = getPagingData(productData, page, limit);
            finalfilter = filterProducts(finalres,filters)
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