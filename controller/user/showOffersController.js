const Seller = require("../../models/sellerModel");

const showOffersController = async (req, res) => {
  try {
    const {useremail} = req.headers;
    console.log(useremail);
    // Fetch all seller documents from the database
    const sellers = await Seller.find();

    // Create an array to store offers from all sellers
    const allOffers = [];

    // Loop through each seller and extract their 'offers' array
    sellers.forEach((seller) => {
      const sellerOffers = seller.offers || [];
      sellerOffers.forEach((offer) => {
        if (!offer.availedUsers.includes(useremail)) {
          allOffers.push(offer);
        }
      });
    });

    // Send the 'allOffers' array back to the client
    return res.status(200).json({ allOffers });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = showOffersController;
