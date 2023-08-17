
const { getTokenBalance } = require('../../service/smartContractService');

const User = require('../../models/userModel');
const Seller = require('../../models/sellerModel')

const getBalance = async (req, res) => {

  try {

    const {email} = req.headers;

    // const email = "user@gmail.com"
    const user = await User.findOne({ email });

    //if user not present return
    if(!user){
        return res.status(409).send("User not found");
    }

    const address = user.walletPublicAddress;

    const balance = await getTokenBalance(address);
    const myNumber = Number(balance);

    //send balance in body of response
    return res
    .status(200)
    .send({ balance: myNumber });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
};

const getSellerBalance = async (req, res) => {

  try {

    const {email} = req.headers;

    // const email = "user@gmail.com"
    const seller = await Seller.findOne({ email });

    //if user not present return
    if(!seller){
        return res.status(409).send("Seller not found");
    }

    const address = seller.walletPublicAddress;

    const balance = await getTokenBalance(address);
    const myNumber = Number(balance);

    //send balance in body of response
    return res
    .status(200)
    .send({ balance: myNumber });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
};

module.exports = {getBalance, getSellerBalance};
