const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken");

//register
const registerController = async(req,res)=>{
    try {
        const {userName,email,password,phone,address, answer} = req.body
        //validation
        if(!userName || !email || !password || !address || !phone || !answer){
            return res.status(500).send({
                success:false,
                message:"please provide all fields",
            });
        }
        //check user
        const existing = await userModel.findOne({email})
        if(existing){
            return res.status(500).send({
                success:false,
                message:"Email already Registered please login",
            });
        }
        //hashing
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        //create new user
        const user = await userModel.create({userName, email, password: hashedPassword, address, phone, answer})
        res.status(201).send({
            success:true,
            message:"successfully Registered",
            user
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in register API",
            error
        })
    }
};

//login
const loginController = async (req,res) => {
    try{
        const {email,password} = req.body
        //validation
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:'Please provide Email or password',
            })
        }
        //user check
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found',
            });
        }
        //check user password | compare password
        const ismatch = await bcrypt.compare(password, user.password);
        if(!ismatch) {
            return res.status(500).send({
                success:false,
                message:"Invalid Credentials",
            });
        }
        //token
        const token = JWT.sign({id:user._id}, process.env.JWt_SECRET, {
            expiresIn:'7d',
        });
        user.password = undefined;
        res.status(200).send({
            success:true,
            message:'Login successfully',
            token,
            user
        })

    } catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in login API',
            error,
        })
    }
}


module.exports = { registerController, loginController };