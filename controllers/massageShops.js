const MassageShop = require('../models/MassageShop.js');

//@desc     Get vaccine centers
//@router   GET /api/v1/hospitals/vecCenters
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

//@desc     Create new hospital
//@route    POST /api/v1/hospitals
//@access   Private
exports.createMassageShop = async (req, res, next) => {
    const hospital = await MassageShop.create(req.body);
    res.status(201).json({ success: true, data: hospital });
};