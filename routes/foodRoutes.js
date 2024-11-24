const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodController");
const adminMiddleware = require('../middleware/adminMiddleware');


const router = express.Router();

//routes
//create food
router.post('/create', authMiddleware, createFoodController);

//get all foods
router.get('/getAll', getAllFoodsController);

//get single food
router.get('/get/:id', getSingleFoodController);

//get food by resturant
router.get('/getByResturant/:id', getFoodByResturantController);

//update food
router.put('/update/:id', authMiddleware, updateFoodController );

//delete food
router.delete('/delete/:id', authMiddleware, deleteFoodController);

//place order
router.post('/placeorder', authMiddleware, placeOrderController);

//order status
router.post('/orderStatus/:id', authMiddleware,adminMiddleware, orderStatusController );

module.exports = router;