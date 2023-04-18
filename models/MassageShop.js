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
            /^ ([01]\d | 2[0 - 3])[0 - 5]\d$/,
            'Please add a valid time in this format [hhmm] such as 1530 for 3:30PM']
    },
    closetime: {
        type: String,
        required: [true, 'Please add your close time'],
        match: [
            /^ ([01]\d | 2[0 - 3])[0 - 5]\d$/,
            'Please add a valid time in this format [hhmm] such as 1530 for 3:30PM']
    },
});

module.exports = mongoose.model('MassageShop', MassageShopSchema);