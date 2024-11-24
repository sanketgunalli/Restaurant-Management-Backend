const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const { createResturantController, getAllResturantController, getResturantByIdController, deleteResturantController } = require('../controllers/resturantController');


const router = express.Router();

//routes
//create resturant  ||POST
router.post('/create', authMiddleware, createResturantController);

//get all resturants ||GET
router.get('/getAll', getAllResturantController);

//GET RESTURANT BY ID || GET
router.get('/get/:id', getResturantByIdController);

//delete resturant 
router.post('/delete/:id', authMiddleware, deleteResturantController );

module.exports = router;