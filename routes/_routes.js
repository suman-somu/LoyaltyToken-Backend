const router = require("express").Router();

const setRecentItem = require("../controller/seller/recentItemChange");
const productList = require("../controller/user/userProductsList");
const userBuyService = require("../controller/user/userBuyService");
const showOffersController = require("../controller/user/showOffersController");
const availOfferController = require("../controller/user/availOfferController");
const getBalance = require("../controller/smartContract fncs/getBalance.js");
const getLoyalCustomers = require("../controller/seller/getLoyalCustomers.js");
const rewardCustomer = require("../controller/seller/rewardCustomer.js");

const {
  signUp,
  logIn,
  logOut,
  sellerSignUp,
  sellerLogIn,
  sellerLogOut,
} = require("../controller/auth/authController");

router.post("/user/signup", signUp);
router.post("/user/login", logIn);
router.get("/user/logout", logOut);
router.post("/seller/signup", sellerSignUp);
router.post("/seller/login", sellerLogIn);
router.get("/seller/logout", sellerLogOut);
router.post("/seller/recentItemChange", setRecentItem);
router.get("/user/productList", productList)
router.post("/user/buy", userBuyService)
router.get("/user/getOffers", showOffersController)
router.post("/user/availOffer", availOfferController)
router.get("/user/getTokenBalance", getBalance)
router.get("/seller/getLoyalCustomers", getLoyalCustomers)
router.post("/seller/rewardCustomer", rewardCustomer)

module.exports = router;
