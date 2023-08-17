const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel.js"); // Update the path
const Seller = require("../../models/sellerModel.js"); // Update the path

const signUp = async (req, res) => {
  console.log("inside signup");
  try {
    const { name, email, password } = req.body;

    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "already exists" });
    }
    //check password for validity using regex
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(409).json({ message: "Invalid password" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    console.log("successful")
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logIn = async (req, res) => {
  console.log("inside login");
  // console.log(req);
  try {
    const { email, password, walletPublicAddress } = req.body;

    //if null or undefined return error
    if (!email || !password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //check if wallet address is present
    if (walletPublicAddress) {
      user.walletPublicAddress = walletPublicAddress;
      await user.save();
    }

    // Create and send a JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    console.log("successful")
    return res
      .status(200)
      .json({ name: user.name, email, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logOut = (req, res) => {
  // You can handle any necessary logout logic here
  return res.status(200).json({ message: "Logged out successfully" });
};

const sellerSignUp = async (req, res) => {
  console.log("seller signup")
  try {
    const { name, email, password } = req.body;

    // Check if a user with the provided email already exists
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res
        .status(409)
        .json({ message: "SEller with this email already exists" });
    }

    //check password for validity using regex
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(409).json({ message: "Invalid password" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newSeller = new Seller({
      name,
      email,
      password: hashedPassword,
    });

    await newSeller.save();

    console.log("successful")
    return res.status(201).json({ message: "Seller registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const sellerLogIn = async (req, res) => {
  console.log("inside login");
  // console.log(req);
  try {
    const { email, password, walletPublicAddress } = req.body;

    //if null or undefined return error
    if (!email || !password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Check if the user exists
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, seller.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //check if wallet address is present
    if (walletPublicAddress) {
      seller.walletPublicAddress = walletPublicAddress;
      await seller.save();
    }

    console.log("successful")
    return res.status(200).json({name: seller.name, email: seller.email});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const sellerLogOut = (req, res) => {
  // You can handle any necessary logout logic here
  return res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  signUp,
  logIn,
  logOut,
  sellerSignUp,
  sellerLogIn,
  sellerLogOut,
};
