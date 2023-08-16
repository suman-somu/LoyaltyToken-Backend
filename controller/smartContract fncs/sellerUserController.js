const { SellerUserTransfer } = require('../../service/smartContractService');
const { calculateTokens } = require('../../utils/calculateTokens');


const sellerUser = async (req, res) => {
  try {
    console.log("From sellerUser function!");

    const userAddress = ''; // Replace with actual user address
    const sellerAddress = ''; // Replace with actual seller address

    // Define a function which will calculate loyalty points of seller
    // MAYBE the rules can be different for different sellers but the parameters will be the same
    
    
    //fixed loyalty points / tokens to be given to user per order

    const loyaltyPoints = 1000;
    const tokens = calculateTokens(loyaltyPoints); // You need to define the `calculateTokens` function

    await SellerUserTransfer(sellerAddress, userAddress, tokens);

    res.send("Transaction successful");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
};

module.exports = { sellerUser };
