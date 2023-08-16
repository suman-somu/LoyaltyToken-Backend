const { flipkartSellerTransfer } = require('../../service/smartContractService');
const { calculateTokens } = require('../../utils/calculateTokens');


const flipkartSeller = async (req, res) => {
  try {
    console.log("from flipkartSeller function");

    const sellerAddress = ''; // Replace with actual seller address

    // Define rules of seller loyalty based on some parameters
    

    //see the product sold and calculate the loyalty points
    const loyaltyPoints = 1000;
    const tokens = calculateTokens(loyaltyPoints); // You need to define the `calculateTokens` function

    await flipkartSellerTransfer(sellerAddress, tokens);

    res.send("Transaction successful");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
};

module.exports = { flipkartSeller };
