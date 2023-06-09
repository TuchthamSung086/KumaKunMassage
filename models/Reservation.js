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
        validate: {
            validator: function (v) {
                return v.getTime() >= Date.now();
            },
            message: props => `${props.value} is before the current date!`
        }
    }
});

module.exports = mongoose.model('Reservation', ReservationSchema);