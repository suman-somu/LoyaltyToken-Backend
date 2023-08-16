const Seller = require('../../models/sellerModel'); // Update the path

const setRecentItem = async (req, res) => {

    // console.log(req);   
    try {
      const { name, email ,category, price, units } = req.body;
  
      const seller = await Seller.findOne({ email });
      if (!seller) {
        return res.status(404).json({ message: 'Seller not found' });
      }
  
      const recentSoldItem = {
        name,
        category,
        price,
        units,
      };
  
      seller.recentItem = recentSoldItem;
  
      await seller.save();
  
      return res.status(200).json({ message: 'Recent item set successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  module.exports =
    setRecentItem;  