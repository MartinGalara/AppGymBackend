const { Router } = require('express');
const { User } = require('../../db.js');
const { Op } = require("sequelize");
const { filterUsers } = require('./Utils');
const userExtractor = require('../middleware/userExtractor.js');

const router = Router();

router.get('/', userExtractor, async (req, res) => {
    const { role } = req.query;
    let allUsers;
    try {
        allUsers = await User.findAll();
        if (role){
            let staff = await User.findAll({
                where: ({
                    role:{[Op.iLike]: role}
                })
            })
            staff.length?
            res.status(200).send(staff):
            res.status(404).send('Role not found');
        } else {
            allUsers.length?
            res.status(200).send(allUsers):
            res.status(404).send('Users not found');
        }
    } catch {
        res.status(404).send(error.message);
    }
})

router.get('/filter', userExtractor, async (req, res) => {
    const { filters } =req.body;
    let allUsers;
    let finalFilter;
    try {
        allUsers = await User.findAll();
        finalFilter = filterUsers(allUsers, filters)
        res.status(200).send(finalFilter)
    } catch (error) {
        res.status(404).send(error.message);
    }
})

router.get('/profile', userExtractor, async (req, res) => {
    try {
        const { id } = req.body;
        const selectedUser = await User.findByPk(id)
        
        let userExpDate = new Date(Date.parse(selectedUser.membresyExpDate))
    
        const localDate = new Date();
  
        if(userExpDate < localDate) await selectedUser.update({expiredMembresy: true})
        else await selectedUser.update({expiredMembresy: false})

        res.status(200).send(selectedUser)
    } catch (error) {
        res.status(400).send('User not found')
    }
})

router.patch('/', userExtractor, async (req, res) => {

    const { id , newImage } = req.body;

    if(newImage){

        try {
            const user = await User.findByPk(id)
        
        await user.update({
            imgUrl: newImage
        })
    
        return res.status(200).json(user)
    
        } catch (error) {
            return res.status(404).send(error.message)
        }

    }

    const { idUser , newRole } = req.query;

    if(!idUser || !newRole) return res.status(400).send("Faltan datos");

    try {
        const user = await User.findByPk(idUser)
    
    await user.update({
        role: newRole,
    })

    res.status(200).json(user)

    } catch (error) {
        res.status(404).send("Usuario no encontrado")
    }
    
})

module.exports = router;