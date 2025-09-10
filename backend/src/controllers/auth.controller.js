const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model")

const registerUser = async (req, res) => {
   let {fullname, email, password} = req.body;
   
   let isUserAlereadyCreated = await userModel.findOne({email:email});
   if(isUserAlereadyCreated){
      return res.status(400).json({
         message : "User Already Created"
      });
   }
   //const hashedPassword =  bcrypt.hash(password, 10)
   const saltRounds = 10;
   const hashedPassword = await bcrypt.hash(password, saltRounds);
   
   let user = await userModel.create({
        fullname, 
        email, 
        password: hashedPassword
     });

    let token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
    res.cookie("token", token);

    res.status(201).json({
        message:"User Created Successfully",
            user : {
                id : user._id, 
                fullname : user.fullname,
                email : user.email
            }
        });     
}

const loginUser = async (req, res) => {
    let {email, password} = req.body;

    let user = await userModel.findOne({email:email});
    if(!user){
        return res.status(400).json({
            message : "Invalid Email Or Password"
        });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(isPasswordValid){
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
        //console.log(token);
        res.cookie("token", token);

        return res.status(200).json({
        message : "User logged in successfully"
        });
   }
}

const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message : "User logged out successfully."
    });
}

const registerFoodPartner = async (req, res) => {
    let {name, email, password} = req.body;

    let foodPartnerAlreadyExist = await foodPartnerModel.findOne({email:email});
    if(foodPartnerAlreadyExist){
        return res.status(400).json({
            message : "Food Partner Already Exist"
        });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const foodPartner = await foodPartnerModel.create({
        name, 
        email,
        password: hashedPassword
    });
    let token = jwt.sign({id:foodPartner._id}, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(201).json({
        message : "Food Partner Created Successfully",
        foodPartner:{
            id: foodPartner._id,
            name: foodPartner.name,
            email: foodPartner.email  
        }
    });
}

const loginFoodPartner = async (req, res) => {
    let {email, password} = req.body;

    let foodPartner = await foodPartnerModel.findOne({email:email});
    if(!foodPartner){
        return res.status(400).json({
            message: "Food Partner Not Exist With This Email"
        });
    }
    const isFoodPartnerPasswordValid = await bcrypt.compare(password, foodPartner.password);
    if(isFoodPartnerPasswordValid){
        let token = jwt.sign({id:foodPartner._id}, process.env.JWT_SECRET);
        res.cookie("token", token);

        return res.status(200).json({
            message: "Food Partner Logged In Successfully"
        });
    }
}

const logoutFoodPartner = async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        message: "Food Partner Logged Out Successfully"
    });
}

// right now there is single function is to export but what if there are multiple
// routes then don't preffered the below way instead just add module.exports before
// function name or by the below method.

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
};