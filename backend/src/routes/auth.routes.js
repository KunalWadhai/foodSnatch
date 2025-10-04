const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { authUserMiddleware } = require("../middlewares/auth.middleware");

// User Auth APIs
router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.get("/user/logout", authController.logoutUser);
router.get("/user/me", authUserMiddleware, authController.getUserInfo);
router.post("/user/update", authUserMiddleware, authController.updateUserInfo);


// Food Partner Auth APIs
router.post("/food-partner/register", authController.registerFoodPartner);
router.post("/food-partner/login", authController.loginFoodPartner);
router.get("/food-partner/logout", authController.logoutFoodPartner);

module.exports = router;