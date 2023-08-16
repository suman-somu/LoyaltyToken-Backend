const { tokensPerLoyaltyPoint } = require( "../consts/consts");

function calculateTokens(loyaltyPoints) {
    const tokens = loyaltyPoints * tokensPerLoyaltyPoint;
    return tokens;
  }

  module.exports = { calculateTokens };