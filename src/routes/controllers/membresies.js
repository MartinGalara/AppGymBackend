const {Router} = require('express')
const { getMembresies } = require('./Utils.js');
const Membresy = require('../../db.js')

const router = Router();


router.get('/', async (req, res) => {
    let allMem = await getMembresies();
    // allMem.length ?
        res.status(200).send(allMem) 
        // :
        // res.status(404).send('Membresies not found');
})

module.exports = router;


// router.get('/', async (req,res) => {
// try {
//     const allMembresy = await Membresy.findAll({attributes: ["name", "cost"]});
//     res.status(200).send(allMembresy)
// } catch (error) {
//     res.status(404).send(error.message);
// }
// });
