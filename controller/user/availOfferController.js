const User = require("../../models/userModel");
const Seller = require("../../models/sellerModel");
const UserSellerTransfer = require("../smartContract fncs/userSellerController.js");
const mongoose = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;

const availOfferController = async (req, res) => {
  console.log("intitiating avail offer controller");
  try {
    const { userEmail, offerId } = req.body;

    const user = await User.findOne({ email: userEmail });
    const seller = await Seller.findOne({ "offers._id": offerId });
    if (!user) {
      return res.status(400).send("User not found");
    }

    //update db - user offers
    user.availedOffers.push(offerId);

    //update db - seller offers
    if (!seller) {
      return res.status(400).send("Seller not found");
    }
    const offerToUpdate = seller.offers.id(offerId);
    if (!offerToUpdate) {
      return res.status(400).send("Offer not found");
    }
    offerToUpdate.availedUsers.push(userEmail);

    // console.log(user)
    // console.log(seller)

    await UserSellerTransfer(
      user.walletPublicAddress,
      seller.walletPublicAddress,
      offerToUpdate.tokensRequired
    );

    await seller.save();
    await user.save();

    return res.status(200).send({ message: "Offer availed successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
};

module.exports = availOfferController;
