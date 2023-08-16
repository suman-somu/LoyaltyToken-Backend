const router = require("express").Router();

const flipkartUser = require("../controller/smartContract fncs/flipkartUserController");
const flipkartSeller = require("../controller/smartContract fncs/flipkartSellerController");
const userSeller = require("../controller/smartContract fncs/userSellerController");
const sellerUser = require("../controller/smartContract fncs/sellerUserController");
const setRecentItem = require("../controller/seller/recentItemChange");
const productList = require("../controller/user/userProductsList");
const userBuyService = require("../controller/user/userBuyService");

const {
  signUp,
  logIn,
  logOut,
  sellerSignUp,
  sellerLogIn,
  sellerLogOut,
} = require("../controller/auth/authController");

router.get("/flipkartUser", flipkartUser.flipkartUser);
router.get("/flipkartSeller", flipkartSeller.flipkartSeller);
router.get("/userSeller", userSeller.userSeller);
router.get("/sellerUser", sellerUser.sellerUser);
router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/logout", logOut);
router.post("/seller/signup", sellerSignUp);
router.post("/seller/login", sellerLogIn);
router.get("/seller/logout", sellerLogOut);
router.post("/seller/recentItemChange", setRecentItem);
router.get("/productList", productList)
router.post("/buyService", userBuyService)

module.exports = router;
