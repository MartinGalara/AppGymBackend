const { Router } = require("express");
const bcrypt = require('bcrypt');
const { User , Routine , Day, Excercise, Muscle, Product, Membresy, Class } = require('../../db.js')
const jwt = require('jsonwebtoken')
//
const router = Router();

router.post('/', async (req,res) => {

    const { email , password} = req.body;

    const user = await User.findOne({ where: { email: email } });

    const passwordCorrect = email === null
    ? false
    : await bcrypt.compare(password, user.hashPassword)

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
        id: user.id,
        token
    })
})

router.get('/', async (req,res) => {

    const user1 = await User.findByPk(1);
    await user1.addRoutine(1);

    const routine1 = await Routine.findByPk(1);
    await routine1.addDay(1);
    await routine1.addDay(2);

    const day1 = await Day.findByPk(1);
    const day2 = await Day.findByPk(2);

    await day1.addExcercise(1)
    await day1.addExcercise(2)
    await day2.addExcercise(3)
    await day2.addExcercise(4)

    const excercise1 = await Excercise.findByPk(1);
    const excercise2 = await Excercise.findByPk(2);
    const excercise3 = await Excercise.findByPk(3);
    const excercise4 = await Excercise.findByPk(4);

    await excercise1.setMuscle(1)
    await excercise2.setMuscle(2)
    await excercise3.setMuscle(3)
    await excercise4.setMuscle(4)

   /* const todo = await User.findByPk(1,{
        attributes:['name','email','hashPassword','role'],
        include: [{
            model: Routine,
            attributes:['name','createdBy','duration','difficulty','category'],
            include:[{
                model: Day,
                attributes:['dayOfWeek'],
                include:[{
                    model: Excercise,
                    attributes:['name','series','repetitions'],
                    include:[{
                        model: Muscle,
                        attributes:['name'],
                    }]
                }]
            }]
        }]
    })

    res.json(todo)*/

    /*
    Character.hasMany(Ability);
    Ability.belongsTo(Character);
    await ability.setCharacter(codeCharacter);
    */

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

