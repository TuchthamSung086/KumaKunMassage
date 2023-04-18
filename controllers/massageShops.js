const MassageShop = require('../models/MassageShop.js');

//@desc     Get massage shops
//@router   GET /api/v1/massageShops
//@access   Public
exports.getMassageShops = async (req, res, next) => {
    try {
        const massageShops = await MassageShop.find();
        res.status(200).json({ success: true, data: massageShops });
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occured while retrieving Massage Shops."
        });
    }
};

//@desc     Get single hospital
//@route    GET /api/v1/hospitals/:id
//@access   Public
exports.getMassageShop = async (req, res, next) => {
    try {
        const shop = await MassageShop.findById(req.params.id);

        if (!shop) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: shop });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

//@desc     Create new massage shop
//@route    POST /api/v1/massageShops
//@access   Private
exports.createMassageShop = async (req, res, next) => {
    const hospital = await MassageShop.create(req.body);
    res.status(201).json({ success: true, data: hospital });
};

