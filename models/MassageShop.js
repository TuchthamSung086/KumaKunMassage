const mongoose = require('mongoose');

const MassageShopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, "Name can not be more than 50 characters."]
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    tel: {
        type: String,
        required: [true, 'Please add a telephone number'],
        match: [
            /^\d{9,10}$/,
            'Please add a valid telephone number'
        ]
    },
    opentime: {
        type: String,
        required: [true, 'Please add your open time'],
        match: [
            /^([01]\d|2[0-3])[0-5]\d$/,
            'Please add a valid time in this format [hhmm] such as 1530 for 3:30PM']
    },
    closetime: {
        type: String,
        required: [true, 'Please add your close time'],
        match: [
            /^([01]\d|2[0-3])[0-5]\d$/,
            'Please add a valid time in this format [hhmm] such as 1530 for 3:30PM']
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Cascade delete reservations when a massage shop is deleted
MassageShopSchema.pre('remove', async function (next) {
    console.log(`Reservations beig removed from massage shop ${this._id}`);
    await this.model('Reservation').deleteMany({ massageShop: this._id });
    next();
});

// Reverse populate with virtuals
MassageShopSchema.virtual('reservations', {
    ref: 'Reservation',
    localField: "_id",
    foreignField: "massageShop",
    justOne: false
});

module.exports = mongoose.model('MassageShop', MassageShopSchema);