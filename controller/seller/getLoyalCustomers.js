const Seller = require("../../models/sellerModel"); // Update the path

const getLoyalCustomers = async (req, res) => {
  console.log("inside getLoyalCustomers");
  try {
    const { selleremail } = req.headers;
    const seller = await Seller.findOne({ email: selleremail });
    if (!seller) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const loyalCustomers = seller.loyalUsers;
    return res.status(200).json({ loyalCustomers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getLoyalCustomers;
