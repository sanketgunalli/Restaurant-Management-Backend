const resturantModel = require("../models/resturantModel");

//create resturant 
const createResturantController = async (req, res) => {
    try {
        const {title, imageUrl, foods, pickup, time, delivery,isOpen,logoUrl, rating, ratingCount, code, coords } = req.body
        //validation
        if(!title || !coords){
            return res.status(500).send({
                success:false,
                message:'Please provide title and address'
            });
        }
        const newResturant = new resturantModel({title, imageUrl, foods, pickup, time, delivery,isOpen,logoUrl, rating, ratingCount, code, coords})
        await newResturant.save()
        res.status(201).send({
            success:true,
            message:'New Resturant created successfully'
        });
    } catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in creat resturant API',
            error
        });
    }
};

//get all restaurants
const getAllResturantController = async (req, res) => {
    try {
        const resturants = await resturantModel.find({})
        if(!resturants){
            return res.status(404).send({
                success:false,
                message:'No Resturant available'
            })
        }
        res.status(200).send({
            success:true,
            totalCount:resturants.length,
            resturants
        })
    } catch (error){
        console.log(error),
        res.status(500).send({
            success:false,
            message:'Error in get all Resturaant API',
            error
        })

    }
};

//GET RESTURANT BY ID
const getResturantByIdController = async (req, res) => {
    try {
        const resturantId = req.params.id;
        if(!resturantId) {
            return res.status(404).send({
                success:false,
                message:'Please provide resturant ID'
            })
        }
        //find resturant
        const resturant = await resturantModel.findById(resturantId)
        if(!resturant){
            return res.status(404).send({
                success:false,
                message:'no resturant found'
            })
        }
        res.status(200).send({
            success:true,
            resturant
        });
    } catch(error){
        console.log(error),
        res.status(500).send({
            success:false,
            message:'Error in get resturant by id API',
            error
        })
    }
}

//delete resturant
const deleteResturantController = async (req, res) => {
    try {
        const resturantId = req.params.id;
        if(!resturantId){
            return res.status(404).send({
                success:false,
                message:'Please provide resturant ID'
            })
        }
        if(!resturantId){
            return res.status(404).send({
                success:false,
                message:'No resturant found'
            })
        }
        await resturantModel.findByIdAndDelete(resturantId)
        res.status(200).send({
            success:true,
            message:'Resturant delete successfully'
        })
    } catch(error){
        console.log(error),
        res.status(500).send({
            success:false,
            message:'Error in delete resturant API',
            error
        })
    }
}

module.exports = {createResturantController, getAllResturantController, getResturantByIdController, deleteResturantController};