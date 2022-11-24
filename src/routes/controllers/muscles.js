const { Router } = require('express');
const { Muscle, Excercise } = require('../../db.js')
const userExtractor = require('../middleware/userExtractor.js');

const router = Router();

router.get('/', userExtractor, async (req, res) => {
    const allMuscles = await Muscle.findAll();
    try {
        allMuscles.length?
        res.status(200).send(allMuscles):
        res.status(400).send('Muscles not found')
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/', userExtractor, async (req, res) => {
    
    const { name } = req.body;

    try {

        const newMuscle = await Muscle.create({
            name: name,
        })
    
        return res.status(200).json(newMuscle)
        
    } catch (error) {
        return res.status(400).send(error.message)
    }

})

router.patch('/', userExtractor, async (req, res) => {
    
    const { name, newName } = req.body;

    try {

        const muscle = await Muscle.findOne({
            where:{name:name}
        })

        muscle.update({name:newName})
    
        return res.status(200).json(muscle)
        
    } catch (error) {
        return res.status(400).send(error.message)
    }

})

router.delete('/', userExtractor, async (req, res) => {
    
    const { name , newIds } = req.body;

    try {

        const muscleToDelete = await Muscle.findOne({
            where:{name:name}
        })

        const excercise = await Excercise.findAll({where:{muscleId: muscleToDelete.id}})

        if(newIds && newIds.length !== 0){

            for(i=0;i<excercise.length;i++){
                await excercise[i].update({muscleId:newIds[i]})
            }
            muscleToDelete.destroy()
            return res.status(200).send("Musculo eliminado")

        }

        if(excercise.length === 0)  {
            muscleToDelete.destroy()
            return res.status(200).send("Musculo eliminado")
        }else{
            return res.status(400).json(excercise)
        }
        
    } catch (error) {
        return res.status(400).send(error.message)
    }

})

module.exports = router;