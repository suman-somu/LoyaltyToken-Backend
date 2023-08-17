const Seller = require("../../models/sellerModel");
const User = require("../../models/userModel");
const { SellerUserTransfer } = require("../../service/smartContractService");

const rewardCustomer = async (req, res) => {
    console.log("removing user from seller's loyal customers list")
  try {
    const { userEmail, sellerEmail } = req.body;

    const user = await User.findOne({ email: userEmail });

    const seller = await Seller.findOne({ email: sellerEmail });
    if (!seller) {
      return res.status(400).send("Seller not found");
    }
    //remove the user from the seller's loyal customers list
    const userIndex = seller.loyalUsers.indexOf(userEmail);
    
    if (userIndex !== -1) {
      // Remove the user's email from the loyalUsers array
      seller.loyalUsers.splice(userIndex, 1);

      // Save the updated seller document
      await seller.save();

      //TODO: transfer tokens from seller to user

      //print wallet address
      console.log("seller wallet address: ", seller.walletPublicAddress);
      console.log("user wallet address: ", user.walletPublicAddress);

      console.log("tranfering")
      await SellerUserTransfer(seller.walletPublicAddress, user.walletPublicAddress, 10);
      console.log("tranfered")

      console.log("User removed from loyal customers");
      return res.status(200).send("User removed from loyal customers");
    } else {
      return res.status(400).send("User not found in loyal customers list");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
};

module.exports = rewardCustomer;
