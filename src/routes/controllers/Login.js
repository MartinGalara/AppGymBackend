const { Router } = require("express");
const bcrypt = require('bcrypt');
const { User } = require('../../db.js')
const jwt = require('jsonwebtoken')
const userExtractor = require('../middleware/userExtractor.js')
//
const router = Router();

router.get('/', userExtractor, async (req,res) => {

   return res.status(200).json({id: req.body.id, userRole: req.body.userRole})

})

//"google-oauth2|104240256115839630283"

router.post('/', async (req,res) => {

    let { email, password, name , imgUrl} = req.body;

    if(!email || !password || !name) return res.status(400).send("Faltan datos")

    if(!imgUrl){
        imgUrl = "https://wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg";
    }

    try {

        const checkingUser = await User.findOne({where: {email:email}})

        const userForToken = {
            id: checkingUser.id,
            userRole: checkingUser.role,
            userName: checkingUser.name,
            userEmail: checkingUser.email
        }
    
        const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 7})
    
        return res.status(200).send({
            token,
            userRole: checkingUser.role
        })

    } catch (error) {

        const date = new Date( Date.now() ).toString()

        const newUser = await User.create({
            email,
            hashPassword : await bcrypt.hash(password,8),
            name,
            imgUrl,
            membresyExpDate: date
        })
    
        const userForToken = {
            id: newUser.id,
            userRole: newUser.role,
            userName: newUser.name,
            userEmail: newUser.email
        }
    
        const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 7})
    
        return res.status(200).send({
            token,
            userRole: newUser.role,
        })
    }

})

module.exports = router;
