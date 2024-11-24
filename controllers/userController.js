const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// get user info
const getUserController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User Not found'
            })
        }
        //hide password
        user.password = undefined
        //resp
        res.status(200).send({
            success:true,
            message:'User get Successfully',
            user
        });
    } catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in get User API',
            error
        })
    }
};

//update user
const updateUserController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found'
            })
        }
        //update
        const {userName, address, phone} = req.body;
        if(userName) user.userName = userName
        if(address) user.address = address
        if(phone) user.phone = phone
        //save user
        await user.save()
        res.status(200).send({
            success:true,
            message:'USer updates successfully',
        });
    } catch(error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Update user API',
            error
        });
    };
};

//Update user password
const updatePasswordController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found'
            })
        }
        //get data from user
        const {oldPassword, newPassword} = req.body
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success:false,
                message:'Please provide old or new password'
            })
        }
        //check user password | compare password
        const ismatch = await bcrypt.compare(oldPassword, user.password);
        if(!ismatch) {
            return res.status(500).send({
                success:false,
                message:"Invalid old Password",
            });
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword
        await user.save()
        res.status(200).send({
            success:true,
            message:"Password updated"
        })
    } catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in password update API',
            error
        })
    }
}

//reset password
const resetPasswordController = async () => {
    try {
        const {email, newPassword, answer} =req.body
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success:false,
                message:'Please provide all fields'
            })
        }
        const user = await userModel.findOne({email,answer})
        if(!user){
            returnres.status(500).send({
                success:false,
                message:'User not found or invalid answer'
            })
        }
        //hashing
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword
        await user.save()
        res.status(200).send({
            success:true,
            message:"Password reset Successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in password reset API',
            error
        })
    }
}

//delete account profile
const deleteProfileController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:'Your account has been deleted'
        })
    } catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in delete profile API',
            error
        })
    }
};

module.exports = {getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteProfileController };