const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const { creatCatController, getAllCatController, updateCatController, deleteCatController } = require('../controllers/categoryController');



const router = express.Router();

//routes
//create category
router.post('/create', authMiddleware, creatCatController);

//get all CAT
router.get('/getAll', getAllCatController );

//update CAT
router.put('/update/:id', authMiddleware, updateCatController);

//delete CAT
router.delete('/delete/:id', authMiddleware, deleteCatController );

module.exports = router;