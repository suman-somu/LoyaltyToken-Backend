const { UserSellerTransfer } = require('../../service/smartContractService');

const userSeller = async (userAddress, sellerAddress, tokens) => {
  try {
    console.log("From userSeller function");
    
    await UserSellerTransfer(userAddress, sellerAddress, tokens);

    console.log("Transaction successful");
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = userSeller
