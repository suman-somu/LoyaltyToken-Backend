const Seller = require("../../models/sellerModel.js"); // Update the path

const productList = async (req, res) => {

  try {
    const productCategory = req.query.category;

    // Query the database to find items with the specified category across all sellers
    const allSellers = await Seller.find({});

    // Create an array to store all items with the specified category
    const itemsWithCategory = [];

    // Loop through each seller and their items to find matching items
    allSellers.forEach((seller) => {
        seller.items.forEach((item) => {
          if (item.category == productCategory) {
            const itemWithSellerInfo = {
              sellerId: seller._id,
              sellerName: seller.name,
              itemID: item._id,
              itemName: item.name,
              itemCategory: item.category,
              itemPrice: item.price,
              itemUnits: item.units,
            };
            itemsWithCategory.push(itemWithSellerInfo);
          }
        });
      });
    return res.status(200).json({ items: itemsWithCategory });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = productList;
