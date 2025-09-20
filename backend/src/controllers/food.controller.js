const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const foodModel = require("../models/food.model");
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

module.exports = {
    createFood,
    getFoodItems
}