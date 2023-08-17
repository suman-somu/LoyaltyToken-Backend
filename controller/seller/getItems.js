const Seller = require ("../../models/sellerModel.js")

const sellerGetItems = async (req, res) => {
    console.log("inside sellerGetItems")
    try {

        const {selleremail } = req.headers

        const seller = await Seller.findOne({ email: selleremail })

        if (!seller) {
            res.status(400).json({ error: "Seller not found" })
            return
        }

        //return the items of the seller
        console.log("got seller items")
        res.status(200).json({ items: seller.items })

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message })
    }
}

module.exports = sellerGetItems