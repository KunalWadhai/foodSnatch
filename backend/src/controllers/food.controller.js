const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const foodModel = require("../models/food.model");


const createFood = async (req, res) => {
    
    console.log(req.foodPartner);
    console.log(req.file);
    res.send("food item created");
}


module.exports = {
    createFood
}