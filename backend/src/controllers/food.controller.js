const express = require("express");
const foodModel = require("../models/food.model");
const likeModel = require("../models/likes.model");
const savedFood = require("../models/food.save.model");
const storageService = require("../services/storage.service");
const {v4:uuid} = require("uuid");
const foodSaveModel = require("../models/food.save.model");


const createFood = async (req, res) => {
    // for the unique file name UUID package helps to assign a uniqud id
    const uploadFileResult = await storageService.uploadFile(req.file.buffer, uuid());

    const foodItem = await foodModel.create({
        name:req.body.name,
        video: uploadFileResult.url,
        description: req.body.description,
        foodpartner: req.foodPartner._id
    })
    res.status(201).json({
        message: "Food Created Successfully",
        food: foodItem
    });
}

const getFoodItems = async (req, res) => {
    const foodItems = await foodModel.find({});
    res.status(200).json({
        message : "Food Items Fetch Successfully",
        foodItem: foodItems
    });
}

const likeFood = async (req, res) => {
   const {foodId} = req.body;
   const user = req.user;

   let isAlreadyLiked = await likeModel.findOne({
     user: user._id,
     food: foodId
   });

   if(isAlreadyLiked){
     await likeModel.deleteOne({user: user._id, food: foodId});

     await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });

     return res.status(200).json({
        message: "Food Unliked Successfully"
     });
   } 
    
    const like = await likeModel.create({
        user: user._id,
        food: foodId
    });

    await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });
    res.status(201).json({
        message: "Like Added Successfully",
        like
     });
}

const saveFoodReel = async (req, res) => {
     const {foodId} = req.body;
     const user = req.user;
     console.log("saveFoodReel called with user:", user._id, "foodId:", foodId);

     let isAlreadySaved = await savedFood.findOne({
        user: user._id,
        food: foodId
     });

     if(isAlreadySaved){
        await foodSaveModel.deleteOne({
            user: user._id,
            food: foodId
        });

        await foodModel.findByIdAndUpdate(foodId,
            { $inc: {savesCount: -1}});

        return res.status(200).json({
            message: "Food unsaved successfully"
        });
     }

     let save = await savedFood.create({
        user: user._id,
        food: foodId
     });

     await foodModel.findByIdAndUpdate(foodId,{
        $inc: {savesCount: 1}
     })

     res.status(201).json({
        message: "Food Saved Successfully",
        save
     });
}

const getSavedFoods = async (req, res) => {
    const user = req.user;

    const savedFoods = await savedFood.find({ user: user._id })
        .populate('food');


    res.status(200).json({
        message: "Saved Foods Retrieved Successfully",
        savedFoods
    });
}

module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFoodReel,
    getSavedFoods,
}
