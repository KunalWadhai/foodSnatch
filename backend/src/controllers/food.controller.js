const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const foodModel = require("../models/food.model");
const likeModel = require("../models/likes.model");
const savedFood = require("../models/food.save.model");
const storageService = require("../services/storage.service");
const {v4:uuid} = require("uuid");


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

   const food = await foodModel.findById(foodId);
   if (!food) {
     return res.status(404).json({
       message: "Food item not found"
     });
   }

   // If no user is authenticated, just increment the like count without tracking user
   if (!user) {
     await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });
     return res.status(200).json({
        message: "Like Added Successfully (Guest)"
     });
   }

   let isAlreadyLiked = await likeModel.findOne({
     user: user._id,
     food: foodId
   });

   if(isAlreadyLiked){
     await likeModel.deleteOne({user: user._id, food: foodId});

     await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });

     res.status(200).json({
        message: "Food Unliked Successfully"
     });
   } else {
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
}

const saveFoodReel = async (req, res) => {
     const {foodId} = req.body;
     const user = req.user;

     // If no user is authenticated, return error as saving requires user context
     if (!user) {
        return res.status(401).json({
            message: "Authentication required to save food items"
        });
     }

     let isAlreadySaved = await savedFood.findOne({
        user: user._id,
        food: foodId
     });

     if(isAlreadySaved){
        await savedFood.findByIdAndDelete(isAlreadySaved._id);
        return res.status(200).json({
            message: "Saved Food Deleted Successfully."
        });
     }

     let savedFoodItem = await savedFood.create({
        user: user._id,
        food: foodId
     });
     res.status(201).json({
        message: "Food Saved Successfully",
        savedFood: savedFoodItem
     });
}

const getSavedFoods = async (req, res) => {
    const user = req.user;

    // If no user is authenticated, return empty array
    if (!user) {
        return res.status(200).json({
            message: "Saved Foods Retrieved Successfully",
            savedFoods: []
        });
    }

    const savedFoods = await savedFood.find({ user: user._id })
        .populate('food')
        .sort({ createdAt: -1 });

    res.status(200).json({
        message: "Saved Foods Retrieved Successfully",
        savedFoods
    });
}

const getLikeStatus = async (req, res) => {
    const user = req.user;
    const { foodIds } = req.body;

    if (!foodIds || !Array.isArray(foodIds)) {
        return res.status(400).json({
            message: "foodIds array is required"
        });
    }

    // If no user is authenticated, return empty array
    if (!user) {
        return res.status(200).json({
            message: "Like Status Retrieved Successfully",
            likedFoodIds: []
        });
    }

    const likes = await likeModel.find({
        user: user._id,
        food: { $in: foodIds }
    });

    const likedFoodIds = likes.map(like => like.food.toString());

    res.status(200).json({
        message: "Like Status Retrieved Successfully",
        likedFoodIds
    });
}
module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFoodReel,
    getSavedFoods,
    getLikeStatus
}
