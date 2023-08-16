//make a seller model
const mongoose = require("mongoose");

const ItemDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  units: {
    type: Number,
    default: 0,
    required: true,
  },
});

const recentItemSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  itemID: {
    type: String,
    required: true,
  },
  noOfProducts: {
    type: Number,
    required: true,
  },
});

const offerSchema = new mongoose.Schema({
  details: {
    type: String,
    required: true,
  },
  tokensRequired: {
    type: Number,
    required: true,
  },
  availedUsers: {
    type: [String],
    default: [],
  },
});

const SellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  items: {
    type: [ItemDetailsSchema],
    default: [],
  },
  recentItem: {
    type: recentItemSchema,
    required: false,
  },
  offers: {
    type: [offerSchema],
  },
  loyalUsers: {
    type: [String],
    default: [],
  },
  walletPublicAddress: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Seller", SellerSchema);
