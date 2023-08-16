const {ethers } = require("ethers");
const dotenv = require('dotenv').config();

const abifile = require('../consts/loyalToken.json');
const abi = abifile.abi;

const provider = new ethers.AlchemyProvider('maticmum',process.env.ALCHEMY_ID);
const wallet = new ethers.Wallet(process.env.M_PRIVATE_KEY,provider)


const contractAddress = process.env.CONTRACT_ADDRESS;


const flipkartUserTransfer = async (address, amount) => {

    const flipkartadress = process.env.FLIPKART_ADDRESS;

    const signer = wallet.connect(provider)
    const contract1 = new ethers.Contract(contractAddress, abi, signer); 


    var balanceOf2 = await contract1.balanceOf(flipkartadress);
    console.log(`before balance of flipkart: ${balanceOf2}`);
    var balanceOf3 = await contract1.balanceOf(address);
    console.log(`before balance of user: ${balanceOf3}`);

    const decay = await contract1.updateAccountWithDecay(address);
    await decay.wait();

    balanceOf3 = await contract1.balanceOf(address);
    console.log(`after decay balance of user: ${balanceOf3}`);

    const transferFrom = await contract1.transfer(address, amount );
    await transferFrom.wait();

    balanceOf2 = await contract1.balanceOf(flipkartadress);
    console.log(`after transfer balance of flipkart: ${balanceOf2}`);
    balanceOf3 = await contract1.balanceOf(address);
    console.log(`after transfer balance of user: ${balanceOf3}`);
}

const flipkartSellerTransfer = async (address, amount) => {

    const flipkartadress = process.env.FLIPKART_ADDRESS;

    const signer = wallet.connect(provider)
    const contract1 = new ethers.Contract(contractAddress, abi, signer); 


    var balanceOf2 = await contract1.balanceOf(flipkartadress);
    console.log(`before balance of flipkart: ${balanceOf2}`);
    var balanceOf3 = await contract1.balanceOf(address);
    console.log(`before balance of seller: ${balanceOf3}`);

    const transferFrom = await contract1.transfer(address, amount );
    await transferFrom.wait();

    balanceOf2 = await contract1.balanceOf(flipkartadress);
    console.log(`after transfer balance of flipkart: ${balanceOf2}`);
    balanceOf3 = await contract1.balanceOf(address);
    console.log(`after transfer balance of seller: ${balanceOf3}`);
}

const UserSellerTransfer = async (fromUser, toSeller, amount) => {
    const signer = wallet.connect(provider)
    const contract1 = new ethers.Contract(contractAddress, abi, signer); 


    var balanceOf2 = await contract1.balanceOf(fromUser);
    console.log(`before balance of user: ${balanceOf2}`);
    var balanceOf3 = await contract1.balanceOf(toSeller);
    console.log(`before balance of seller: ${balanceOf3}`);

    const decay = await contract1.updateAccountWithDecay(fromUser);
    await decay.wait();

    balanceOf3 = await contract1.balanceOf(fromUser);
    console.log(`after decay balance of user: ${balanceOf3}`);


    const transferFrom = await contract1.transferFrom(fromUser, toSeller, amount );
    await transferFrom.wait();

    balanceOf2 = await contract1.balanceOf(fromUser);
    console.log(`after balance of user: ${balanceOf2}`);
    balanceOf3 = await contract1.balanceOf(toSeller);
    console.log(`after balance of seller: ${balanceOf3}`);
}

const SellerUserTransfer = async (fromSeller, toUser, amount) => {
    const signer = wallet.connect(provider)
    const contract1 = new ethers.Contract(contractAddress, abi, signer); 


    var balanceOf2 = await contract1.balanceOf(fromSeller);
    console.log(`before balance of seller: ${balanceOf2}`);
    var balanceOf3 = await contract1.balanceOf(toUser);
    console.log(`before balance of receiver: ${balanceOf3}`);

    const decay = await contract1.updateAccountWithDecay(toUser);
    await decay.wait();

    balanceOf3 = await contract1.balanceOf(toUser);
    console.log(`after decay balance of user: ${balanceOf3}`);


    const transferFrom = await contract1.transferFrom(fromSeller, toUser, amount );
    await transferFrom.wait();

    balanceOf2 = await contract1.balanceOf(fromSeller);
    console.log(`after balance of sender: ${balanceOf2}`);
    balanceOf3 = await contract1.balanceOf(toUser);
    console.log(`after balance of receiver: ${balanceOf3}`);
}



module.exports = { flipkartUserTransfer, flipkartSellerTransfer, UserSellerTransfer, SellerUserTransfer };