const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    massageShop: {
        type: mongoose.Schema.ObjectId,
        ref: 'MassageShop',
        required: true
    },
    datetime: {
        type: Date,
        required: [true, 'Please provide date and time of reservation.'],
    }
});

module.exports = mongoose.model('Reservation', ReservationSchema);