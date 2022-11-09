const { Router } = require("express");
const bcrypt = require('bcrypt');
const User = require('../../models/User.js')
const jwt = require('jsonwebtoken')

const router = Router();

router.post('/', async (req,res) => {
    const { name , password} = req.body;

    const user = await User.findOne({name})

    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password)

    if (!(user && passwordCorrect)){
        res.status(401).json({
            error: "Nombre de usuario o contraseña invalida"
        })
    }

    const userForToken = {
        id: user._id,
        name: user.name,
    }

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 7})

    res.send({
        name: user.name,
        token
    })
})


//para chequear si el token es de un usuario en los otros endpoints, como middleware UserExtractor (final del video en slack)
/*let token = null;

const authorization = request.get('authorization')
if(authorization && authorization.toLowerCase().startsWith('bearer')){
    token = authorization.substring(7);
}

const decodedToken = jwt.verify(token, process.env.SECRET)

if(!token || !decodedToken.id){
    return res.status(401).json({ error: 'Token invalido o faltante'})
}
*/

module.export = router;