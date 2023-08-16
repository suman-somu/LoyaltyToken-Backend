const { calculateLoyaltyPoints } = require('../../utils/calculateLoyaltyPoints');
const { calculateTokens } = require('../../utils/calculateTokens');
const { flipkartUserTransfer } = require('../../service/smartContractService');

const flipkartUser = async (req, res) => {
  try {
    console.log("from flipkartUser function");

    const userAddress = ''; // Replace with actual user address
    const noOfOrders = 10;
    const pennySpent = 1000;
    
    const loyaltyPoints = calculateLoyaltyPoints(noOfOrders, pennySpent);
    const tokens = calculateTokens(loyaltyPoints);
    
    await flipkartUserTransfer(userAddress, tokens);
    
    res.send("Transaction successful");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
};

module.exports = { flipkartUser };
