const connectDB = require("../config/db");
const Seller = require("../models/sellerModel.js");
const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");

const addItemToSeller = async (email, newItem) => {
  try {
    const seller = await Seller.findOne({ email });
    if (!seller) {
      console.log("Seller not found");
      return;
    }

    seller.items.push(newItem);

    await seller.save();

    console.log("Item added successfully");
  } catch (error) {
    console.error(error);
  }
};

const addOfferToSeller = async (email, newOffer) => {
  try {
    const seller = await Seller.findOne({ email });
    if (!seller) {
      console.log("Seller not found");
      return;
    }

    seller.offers.push(newOffer);

    await seller.save();

    console.log("Offer added successfully");
  } catch (error) {
    console.error(error);
  }
};

const addUser = async (nameofuser, email, password) => {
  try {
    // const user = await User.findOne({email});
    // if (!user) {
    //   console.log('User not found');
    //   return;
    // }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("user exists");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      console.log("Invalid password");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: nameofuser,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    console.log("successfull");
  } catch (error) {
    console.error(error);
  }
};

const addSeller = async (nameofuser, email, password) => {
  try {
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      console.log("seller exists");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      console.log("Invalid password");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSeller = new Seller({
      name: nameofuser,
      email: email,
      password: hashedPassword,
    });

    await newSeller.save();

    console.log("successfull");
  } catch (error) {
    console.error(error);
  }
};

// Usage example
connectDB();

// var name1 = "user1";
// var email1 = "user1@gmail.com";
// var password1 = "12qw!@QW";
// var name2 = "user2";
// var email2 = "user2@gmail.com";
// var password2 = "12qw!@QW";
// addUser(name1, email1, password1);
// addUser(name2, email2, password2);

// var seller1 = "seller1";
// var selleremail1 = "seller1@gmail.com";
// var password1 = "12qw!@QW";
// var seller2 = "seller2";
// var selleremail2 = "seller2@gmail.com";
// var password2 = "12qw!@QW";
// addSeller(seller1, selleremail1, password1);
// addSeller(seller2, selleremail2, password2);


const itemselleremail1 = "seller1@gmail.com";
const itemselleremail2 = "seller2@gmail.com";
const newItem1S = {
  name: "google pixel 1",
  category: "smartphone",
  price: 100,
  units: 10,
};
const newItem2S = {
  name: "google pixel 2",
  category: "smartphone",
  price: 200,
  units: 10,
};
const newItem3L = {
  name: "hp laptop",
  category: "laptop",
  price: 300,
  units: 10,
};
const newItem4S = {
  name: "google pixel 5",
  category: "smartphone",
  price: 100,
  units: 10,
};
const newItem5L = {
  name: "acer Laptop",
  category: "laptop",
  price: 200,
  units: 10,
};
const newItem6L = {
  name: "hp laptop",
  category: "laptop",
  price: 300,
  units: 10,
};
addItemToSeller(itemselleremail1, newItem1S);
addItemToSeller(itemselleremail1, newItem2S);
addItemToSeller(itemselleremail1, newItem3L);
addItemToSeller(itemselleremail2, newItem4S);
addItemToSeller(itemselleremail2, newItem5L);
addItemToSeller(itemselleremail2, newItem6L);

const offerselleremail1 = "seller1@gmail.com";
const offerselleremail2 = "seller2@gmail.com"
const newOffer1 = {
  details: "Buy 2 get 1 free",
  tokensRequired: 5,
  availedUsers: [],
};
const newOffer2 = {
  details: "discount 50%",
  tokensRequired: 10,
  availedUsers: [],
};
const newOffer3 = {
  details: "flat 100 off",
  tokensRequired: 15,
  availedUsers: [],
};
addOfferToSeller(offerselleremail1, newOffer1);
addOfferToSeller(offerselleremail1, newOffer2);
addOfferToSeller(offerselleremail2, newOffer3);
