const { Router } = require('express');
const { Category, Routine } = require('../../db.js')
const userExtractor = require('../middleware/userExtractor.js');

const router = Router();

router.get('/', userExtractor, async (req, res) => {
   
    try {

        const allCategories = await Category.findAll();

        allCategories.length? res.status(200).json(allCategories)
        : res.status(404).send("No se encontraron categorias")

    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/', userExtractor, async (req, res) => {
    
    const { name } = req.body;

    try {

        const newCategory = await Category.create({
            name: name,
        })
    
        return res.status(200).json(newCategory)
        
    } catch (error) {
        return res.status(400).send(error.message)
    }

})

router.patch('/', userExtractor, async (req, res) => {
    
    const { name, newName } = req.body;

    if(!name || !newName) return res.status(400).send("Faltan datos")

    try {

        const category = await Category.findOne({
            where:{name:name} 
        })

        await category.update({name:newName})
    
        return res.status(200).json(category)
        
    } catch (error) {
        return res.status(400).send(error.message)
    }

})

router.delete('/', userExtractor, async (req, res) => {
    
    const { name , newIds } = req.body;

    try {

        const categoryToDelete = await Category.findOne({
            where:{name:name}
        })

        const category = await Routine.findAll({where:{categoryId: categoryToDelete.id}})

        if(newIds && newIds.length !== 0){

            for(i=0;i<category.length;i++){
                await category[i].update({categoryId:newIds[i]})
            }
            categoryToDelete.destroy()
            return res.status(200).send("Categoria eliminada")

        }

        if(category.length === 0)  {
            categoryToDelete.destroy()
            return res.status(200).send("Categoria eliminada")
        }else{
            return res.status(400).json(category)
        }
        
    } catch (error) {
        return res.status(400).send(error.message)
    }

})

module.exports = router;