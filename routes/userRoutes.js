const express = require('express');
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

//routes
//get  user || get
router.get('/getUser', authMiddleware, getUserController);

//update profile
router.put('/updateUser', authMiddleware, updateUserController);

//password update
router.post('updatePassword', authMiddleware, updatePasswordController);

//password reset
router.post('/resetpassword', authMiddleware, resetPasswordController);

//delete user
router.post('/deleteUser/:id', authMiddleware, deleteProfileController );


module.exports = router;