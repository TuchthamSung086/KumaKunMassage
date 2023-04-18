const MassageShop = require('../models/MassageShop');

exports.makeReservation = async (req, res, next) => {
    try {
        req.body.hospital = req.params.hospitalId;

        const hospital = await Hospital.findById(req.params.hospitalId);

        if (!hospital) {
            return res.status(404).json({ success: false, message: `No hospital with the id of ${req.params.hospitalId}` })
        }

        // add user Id to req.body
        req.body.user = req.user.id;

        // Check for existed appointment
        const existedAppointments = await Appointment.find({ user: req.user.id });

        // If the user is not an admim, they can only create 3 appointment.
        if (existedAppointments.length >= 3 && req.user.role !== 'admin') {
            return res.status(400).json({ success: false, message: `The user with Id ${req.user.id} has already made 3 appointments.` });

        }

        const appointment = await Appointment.create(req.body);

        res.status(200).json({
            success: true,
            data: appointment
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Cannot create Appointment" });
    }
}