const { UserSellerTransfer } = require('../../service/smartContractService');

const userSeller = async (userAddress, sellerAddress, tokens) => {
  try {
    console.log("From userSeller function");

    // const userAddress = ''; // Replace with actual user address
    // const sellerAddress = ''; // Replace with actual seller address

    // A function which will calculate tokens required to purchase an offer from the seller
    // The data will be retrieved from the database
    // const tokensRequired = 1000;
    await UserSellerTransfer(userAddress, sellerAddress, tokens);

    console.log("Transaction successful");
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = userSeller
