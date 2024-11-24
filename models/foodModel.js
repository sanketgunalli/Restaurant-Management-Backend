const mongoose = require('mongoose');

//schema
const foodSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Food title is required']
    },
    description:{
        type:String,
        required:[true,'food description is required']
    },
    price:{
        type:Number,
        required:[true,'food price is required']
    },
    imageUrl:{
        type:String,
        default:'https://media.istockphoto.com/id/1038356020/vector/restaurant-icon.jpg?s=612x612&w=0&k=20&c=Tk_v3JuJA4lz_8ZRJi78xS4p75Idqt97uEtYJciVtFI='
    },
    foodTags:{
        type:String,
    },
    category:{
        type:String,
    },
    code:{
        type:String,
    },
    isAvailable:{
        type:Boolean,
        default:true,
    },
    resturant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Resturant'
    },
    rating:{
        type:Number,
        default:5,
        min:1,
        max:5
    },
    ratingCount:{
        type:String
    }
},
{timestamps:true});

module.exports = mongoose.model("Food", foodSchema);