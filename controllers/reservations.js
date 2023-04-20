const MassageShop = require('../models/MassageShop');
const User = require('../models/User');
const Reservation = require('../models/Reservation');
//@desc     Create single reservation
//@route    POST /api/v1/massageShops/:id
//@access   Private
exports.makeReservation = async (req, res, next) => {
    try {

        const params = Object.values(req.params);
        console.log(params);
        const shopId = req.params.massageShopId;
        const userId = req.user.id;

        // check if shop in database
        const shop = await MassageShop.findById(shopId);
        if (!shop) {
            return res.status(404).json({ success: false, message: `No massage shop with the id of ${shopId}` })
        }

        // Check for existed appointment
        const user = await User.findById(userId);
        const existingReservations = await Reservation.find({ user: userId });

        // If the user is not an admin, they can only make 3 reservations.
        if (existingReservations.length >= 3 && req.user.role !== 'admin') {
            return res.status(400).json({ success: false, message: `The user with Id ${userId} has already made 3 reservations.` });
        }

        // create reservation
        req.body.massageShop = shopId;
        req.body.user = userId;
        const reservation = await Reservation.create(req.body);

        res.status(200).json({
            success: true,
            data: reservation
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Cannot create reservation" });
    }
}