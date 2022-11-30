const { Router } = require('express');
const { getPagination,getPagingData} = require('./Utils');
const userExtractor = require('../middleware/userExtractor.js');
const { Product ,Sale, Item} = require('../../db.js');
const { Op, Sequelize } = require("sequelize");

const router = Router();

router.get('/:id', userExtractor, async (req, res) => {
    const { id } = req.params;
    try {
        const productSelected = await Product.findByPk(id);
        !productSelected ?
        res.status(400).send("El ID del producto no fue encontrado") :
        res.status(200).send(productSelected)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

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

    const { filters } = req.body;
    
    const page = parseInt(req.query.page, 10)
    const size = parseInt(req.query.size, 10)

        try {

            const { limit, offset } = getPagination(page, size);
            const productData = await Product.findAndCountAll({where:
                {category:filters.category?filters.category:{[Op.not]:'cloudinary'},

                unit_price:(filters.max&&filters.min)?{[Op.between]:[filters.min, filters.max]}:filters.max?{[Op.lte]:filters.max}:filters.min?{[Op.gte]:filters.min}:{[Op.not]:"cloudinary"}},
                offset: offset, limit: limit}

                
                );
             
            const finalres = getPagingData(productData, page, limit);

            res.status(200).send(finalres)
        } catch (error) {
            res.status(400).send(error.message)
        }
})

router.delete('/:id', userExtractor, async (req, res) => {
    try {
        const { id } = req.params;
        const productToDelete = await Product.findByPk(id);
        if (productToDelete) {
            await productToDelete.destroy()
            res.status(200).send(`El producto de id ${id} fue borrado con éxito`)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/', userExtractor, async (req, res) => {

    const { title , unit_price , stock , category , description , imgUrl} = req.body;

    if(!title || !unit_price || !stock) return res.status(400).send("Faltan datos")

    try {

        const newProduct = await Product.create({
            title,
            unit_price,
            stock,
            category,
            description,
            imgUrl
        })

        return res.status(200).json(newProduct)
       
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.put('/:id', userExtractor, async (req, res) => {

    const { id } = req.params 

    const changes = {}

    for (const property in req.body) {
        if(property !== "id" && property !== "userRole" && property !== "userName") changes[property] = req.body[property]
      }
    
    try {

        const product = await Product.findByPk(id)
    
        await product.update(changes)
    
        return res.status(200).json(product)
       
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/admdashboard/monthsales', userExtractor, async (req, res) => {

    const { id , filters } = req.body;

        try {

            const productData = await Sale.findAll({
                where:{year:filters.year,approved:true},
                attributes: ['month', [Sequelize.fn('SUM', Sequelize.col('totalCost')), 'sum']],
                group: ['month']
              });

            console.log(productData);
            res.status(200).send(productData)
        } catch (error) {
            res.status(400).send(error.message)
        }
})

router.post('/admdashboard/monthproducts', userExtractor, async (req, res) => {

    const { filters } = req.body;

        try {

            const productData = await Sale.findAll({
                where:{year:filters.year},
                include:{
                    model: Item
                }
              });

        let setOfProducts = {
            1:{},
            2:{},
            3:{},
            4:{},
            5:{},
            6:{},
            7:{},
            8:{},
            9:{},
            10:{},
            11:{},
            12:{},
        }

        productData.map( p => {
            const mes = p.month;
            p.items.map(i => {
                if(setOfProducts[mes].hasOwnProperty(i.title)) {
                    const title = i.title
                    const total = setOfProducts[mes][title]
                    setOfProducts[mes][title] = total + i.quantity
                }else{
                    const title = i.title
                    setOfProducts[mes][title] = i.quantity
                }
            })
           
        })

        return res.status(200).send(setOfProducts)
        } catch (error) {
        res.status(400).send(error.message)
        }
})



module.exports = router;