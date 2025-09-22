const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");

const upload = multer({
    storage : multer.memoryStorage(),
});

// prefix api endpoint : /api/food/...then the forward api point
// for adding food food partner must be logged in so it would be the protected route
router.post("/", authMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood);

// when user scrolls the food reels i.e sending get request /api/food -- get ---public (temporarily for testing)
router.get("/", foodController.getFoodItems);

// some features over the food reels to like and save the stuff.
// post: /api/food/like
router.post("/like", foodController.likeFood);

// post : /api/food/save-food
router.post("/save", foodController.saveFoodReel);

// get : /api/food/saved - get saved foods for user
router.get("/saved", foodController.getSavedFoods);

// post : /api/food/like-status - get like status for multiple foods
router.post("/like-status", foodController.getLikeStatus);

module.exports = router;
