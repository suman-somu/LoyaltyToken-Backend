const { flipkartSellerTransfer } = require('../../service/smartContractService');
const { calculateTokens } = require('../../utils/calculateTokens');


const flipkartSeller = async (sellerAddress) => {
  try {
    console.log("from flipkartSeller function");

    //TODO: logic for loyalty points for each sold product
    //currenyly it's 1000 points for each sold product
    const loyaltyPoints = 2000;
    const tokens = calculateTokens(loyaltyPoints);

    await flipkartSellerTransfer(sellerAddress, tokens);

  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = flipkartSeller;
