import { pointsPerOrder, pointsPerPenny } from "../consts/consts";


function calculateLoyaltyPoints(noOfOrders, pennySpent) {
  
    const pointsFromPennySpent = pennySpent * pointsPerPenny;
    const pointsFromOrders = noOfOrders * pointsPerOrder;
  
    const totalPoints = pointsFromPennySpent + pointsFromOrders;
    return totalPoints;
  }

  module.exports = { calculateLoyaltyPoints };