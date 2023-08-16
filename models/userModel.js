const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    noOfProducts: {
      type: Number,
      required: true,
    },
    pennySpent: {
      type: Number,
      required: true,
    },
  });

  const RecentOrderSchema = new mongoose.Schema({
    noOfProducts: {
      type: Number,
      required: true,
    },
    pennySpent: {
      type: Number,
      required: true,
    },
  });


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  mobile: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    min: 4,
    max: 50,
    unique: true,
    // Regular expression to validate email
    validate: {
      validator: function (value) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  accessToken: {
    type: String,
  },
  totalOrders: {
    type: [OrderSchema],
  },
  recentOrder:{
    type: RecentOrderSchema,
  },
  availedOffers: {
    type: [String],
    default: [],
  },
  walletPublicAddress: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", UserSchema);
