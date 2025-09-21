const foodPartnerModel = require("../models/foodpartner.model");
const foodModel = require("../models/food.model"); // to displaying total meals that food partner have on frontend.


const getFoodPartnerById = async (req, res) => {
    const foodPartnerId = req.params.id;

    const foodPartner = await foodPartnerModel.findById({id: foodPartnerId});
    const foodByFoodPartnerId = await foodModel.findById({_id: foodPartnerId});

    console.log(foodPartner);
    console.log(foodByFoodPartnerId);

    if(!foodPartner){
        return res.status(404).json({
            message: "Food Partner Not Found"
        });
    }

    res.status(200).json({
        message: "Food Partner Fetch Successfully.",
        foodPartner: {
            ...foodPartner.toObject(),
            foodItem: foodByFoodPartnerId
        }
    });
}

module.exports = {
    getFoodPartnerById
}