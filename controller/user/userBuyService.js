const { flipkartUser } = require('../smartContract fncs/flipkartUserController.js');
const { flipkartSeller } = require('../smartContract fncs/flipkartSellerController.js');
const { sellerUser } = require('../smartContract fncs/sellerUserController.js');
const User = require('../../models/userModel.js'); // Import your User model
const Seller = require('../../models/sellerModel.js'); // Import your Seller model

const userByService = async (req, res) => {
  try {

    console.log("inside userByService");
    const { userEmail, itemID } = req.body;

    console.log("userEmail: ", userEmail);
    console.log("itemID: ", itemID);



    //update user and seller db
    //update user db - update recentOrder field 
    //requirement- userEmail, no of orders and penny spent
    //penny spent can be calculated from quering itemID from seller db 
    //no of orders is always = 1


    // Fetch the seller's item details using itemID
    const sellerItem = await Seller.findOne({ 'items._id': itemID }, { 'items.$': 1 });

    if (!sellerItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Calculate the penny spent from the fetched sellerItem
    const pennySpent = sellerItem.items[0].price;

    // Update user's recentOrder field

    console.log("debug 1")

    const noOfProducts = 1;
    await User.updateOne(
      { email: userEmail },
      {
        $set: {
          recentOrder: {
            noOfProducts: noOfProducts,
            pennySpent: pennySpent*noOfProducts,
          },
        },
      }
    );

    console.log("debug 2")


     //upadte seller db - update recentItem field
    //requirement - name, category, price units
    //

    // Update seller's recentItem field
    await Seller.updateOne(
      { 'items._id': itemID },
      {
        $set: {
          recentItem: {
            userEmail: userEmail,
            itemID: itemID,
            noOfProducts: noOfProducts,
          }
        },
        $push: {
          loyalUsers: userEmail,
        },
      }
    );
    

    console.log("debug 3")

    // Call flipkartUser function
    flipkartUser();

    // Call flipkartSeller function
    flipkartSeller();
    
    return res.status(200).json({ message: 'User and seller data updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = userByService;
