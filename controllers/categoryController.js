const categoryModel = require("../models/categoryModel")

//create cat
const creatCatController = async (req, res) => {
    try {
        const {title, imageUrl} = req.body
        //validation
        if(!title){
            return res.status(500).send({
                success:false,
                message:'Please provide category title or image'
            })
        }
        const newCategory = new categoryModel({title, imageUrl})
        await newCategory.save();
        res.status(201).send({
            success:true,
            message:"Category created",
            newCategory
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in craete cat API",
            error
        })
    }
};

//get all CAT
const getAllCatController = async (req, res) => {
    try {
        const categories = await categoryModel.find({})
        if(!categories){
            return res.status(404).send({
                success:false,
                message:"No categories found"
            })
        }
        res.status(200).send({
            success:true,
            totalCat:categories.length,
            categories
        });
    } catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:' Error in get All Category API',
            error
        })
    }
}

//update CAT
const updateCatController = async (req,res) => {
    try{
        const {id} = req.params
        const {title, imageUrl} = req.body
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, {title,imageUrl}, {new:true})
        if(!updatedCategory){
            return res.status(500).send({
                success:false,
                message:"no category found"
            })
        }
        res.status(200).send({
            success:true,
            message:"category updated successfully"
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in update cat API',
            error
        })
    }
}

//delete CAT
const deleteCatController = async(req,res) => {
    try{
        const {id} = req.params
        if(!id){
        return res.status(500).send({
            success:false,
            message:"Please provide caategory ID"
        })
    }
    const category = await categoryModel.findById(id)
    if(!category){
        return res.status(500).send({
            success:false,
            message:"no category found with this id"
        })
    }
    await categoryModel.findByIdAndDelete(id)
    res.status(200).send({
        success:true,
        message:'category deleted successfully'
    })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in delete cat API'
        })
    }
}

module.exports = { creatCatController, getAllCatController, updateCatController, deleteCatController };