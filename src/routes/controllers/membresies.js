const {Router} = require('express')
const { getMembresies } = require('./Utils.js');
const Membresy = require('../../db.js')

const router = Router();


router.get('/', async (req, res) => {
    try {
        let allMembresies = await getMembresies();
        allMembresies.length?
        res.status(200).send(allMembresies):
        res.status(404).send('Membresies not found');
    } catch (error) {
        res.status(404).send(error.message);
    }
})


// router.post('/', async (req, res) => {
//     try {
//         let { name, cost, expiration } = req.body;
//         if (!name || !cost || !expiration) {
//             return res.status(400).json('Missing inputs')
//         } else {
//             let newMembresy = await Membresy.create({
//                 name,
//                 cost,
//                 expiration,
//             });
//             res.status(200).json(newMembresy);
//         }
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// })

module.exports = router;
