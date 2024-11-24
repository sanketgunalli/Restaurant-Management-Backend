const mongoose = require('mongoose')

//schema
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true, 'user name is required']
    },
    email:{
        type:String,
        required:[true, 'user name is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'password is required']
    },
    address:{
        type:Array,
    },
    phone:{
        type:String,
        required:[true, 'phone is required']
    },
    usertype:{
        type:String,
        required:[true, 'user type is required'],
        default:'client',
        enum:['client', 'admin', 'vendor', 'driver']
    },
    profile:{
        type:String,
        default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
    },
    answer:{
        type:String,
        required:[true,'answer is required']
    }
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);