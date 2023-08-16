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

// const nameofuser = "user";
// const email = "user@gmail.com";
// const password = "12qw!@QW";
// addUser(nameofuser, email, password);

// const nameofseller = "seller";
// const selleremail = "seller@gmail.com";
// const password = "12qw!@QW";
// addSeller(nameofseller, selleremail, password);

// const selleremail = "seller@gmail.com";
// const newItem = {
//   name: "google pixel 3",
//   category: "smartphone",
//   price: 500,
//   units: 10,
// };
// addItemToSeller(selleremail, newItem);
