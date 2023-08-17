const { calculateLoyaltyPoints } = require('../../utils/calculateLoyaltyPoints');
const { calculateTokens } = require('../../utils/calculateTokens');
const { flipkartUserTransfer } = require('../../service/smartContractService');
const User = require('../../models/userModel.js');

const flipkartUser = async (userEmail, pennySpent, noOfProducts) => {
  try {
    console.log("from flipkartUser function");

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const walletAddress = user.walletPublicAddress;

    console.log("walletAddress: ", walletAddress);
    
    const loyaltyPoints = calculateLoyaltyPoints(noOfProducts, pennySpent);
    var tokens = calculateTokens(loyaltyPoints);
    tokens = Math.floor(tokens);

    console.log("tokens: ", tokens);

    // const walletAddress = '0xaF0f983378773CC5a53914e28395666f198eB4EF'
    // const tokens = 100;
    
    await flipkartUserTransfer(walletAddress, tokens);
    
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = flipkartUser
