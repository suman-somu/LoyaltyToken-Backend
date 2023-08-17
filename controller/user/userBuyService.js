const flipkartUser = require("../smartContract fncs/flipkartUserController.js");
const flipkartSeller = require("../smartContract fncs/flipkartSellerController.js");
const User = require("../../models/userModel.js"); // Import your User model
const Seller = require("../../models/sellerModel.js"); // Import your Seller model

const userByService = async (req, res) => {
  try {
    console.log("inside userByService");
    const { userEmail, itemID } = req.body;


    const sellerItems = await Seller.findOne(
      { "items._id": itemID },
      { "items.$": 1 }
    );
    const seller = await Seller.findOne(
      { "items._id": itemID })


    // Calculate the penny spent from the fetched sellerItem
    const pennySpent = sellerItems.items[0].price;

    // Update user's recentOrder field

    const noOfProducts = 1;
    await User.updateOne(
      { email: userEmail },
      {
        $set: {
          recentOrder: {
            noOfProducts: noOfProducts,
            pennySpent: pennySpent * noOfProducts,
          },
        },
      }
    );

    // Update seller's recentItem field
    await Seller.updateOne(
      { "items._id": itemID },
      {
        $set: {
          recentItem: {
            userEmail: userEmail,
            itemID: itemID,
            noOfProducts: noOfProducts,
          },
        },
        $push: {
          loyalUsers: userEmail,
        },
      }
    );

    // Call flipkartUser function
    await flipkartUser(userEmail, pennySpent, noOfProducts);

    // Call flipkartSeller function
    await flipkartSeller(seller.walletPublicAddress);

    console.log("successful updated db");
    return res
      .status(200)
      .json({ message: "User and seller data updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = userByService;
