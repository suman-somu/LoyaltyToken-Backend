const { pointsPerPenny, pointsPerOrder, tokensPerLoyaltyPoint} = require('../../consts/consts');
const tokenRules = (req, res) => {
    try {

        return res.status(200).json({ pointsPerPenny, pointsPerOrder, tokensPerLoyaltyPoint });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = tokenRules;
