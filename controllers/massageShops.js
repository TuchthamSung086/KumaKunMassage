const MassageShop = require('../models/MassageShop.js');

//@desc     Get vaccine centers
//@router   GET /api/v1/hospitals/vecCenters
//@access   Public
exports.getMassageShops = (req, res, next) => {
    MassageShop.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving Massage Shops."
            });
        else res.send(data);
    })
};

//@desc     Create new hospital
//@route    POST /api/v1/hospitals
//@access   Private
exports.createMassageShop = async (req, res, next) => {
    const hospital = await MassageShop.create(req.body);
    res.status(201).json({ success: true, data: hospital });
};