const mongoose = require('mongoose');

//schema
const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'category title is required'],
    },
    imageUrl: {
        type:String,
        default:
            "https://media.istockphoto.com/id/1038356020/vector/restaurant-icon.jpg?s=612x612&w=0&k=20&c=Tk_v3JuJA4lz_8ZRJi78xS4p75Idqt97uEtYJciVtFI="
    }
},
{timestamps:true});

module.exports = mongoose.model("Category", categorySchema);