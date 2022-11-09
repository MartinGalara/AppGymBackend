const { Router } = require("express");
const bcrypt = require('bcrypt');
const { User } = require('../../db.js')
const jwt = require('jsonwebtoken')

const router = Router();

router.post('/', async (req,res) => {

    const { email , password} = req.body;

    const user = await User.findOne({ where: { email: email } });

    const passwordCorrect = email === null
    ? false
    : await bcrypt.compare(password, user.password)

    if (!(email && passwordCorrect)){
        res.status(401).json({
            error: "Correo o contraseña invalida"
        })
    }

    const userForToken = {
        id: user.id,
        email: user.email,
    }

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 7})

    res.send({
        email: user.email,
        token
    })
})

module.exports = router;

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

