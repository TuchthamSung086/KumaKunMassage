const Reservation = require('../models/Reservation');
const User = require('../models/User');

function reservationToRow(reservation) {
    let headers = ['Subject', 'Start Date', 'Start Time', 'End Date', 'End Time', 'All Day Event', 'Description', 'Location', 'Private'];
    let ans = {};
    // Initialize every with empty string
    for (let i = 0; i < headers.length; i++) {
        ans[headers[i]] = '';
    }
    ans['Subject'] = "Reservation with " + reservation.massageShop.name + " massage shop.";
    ans['Start Date'] = reservation.datetime;
    ans['Description'] = "Reservation made on KumaKunMassage website!";
    ans['Location'] = reservation.massageShop.address;
    ans['Private'] = "TRUE";
    return ans;
}

function makeCSVString(reservations) {
    // Initial with headers
    let headers = ['Subject', 'Start Date', 'Start Time', 'End Date', 'End Time', 'All Day Event', 'Description', 'Location', 'Private'];
    let ans = headers.join(","); // Join with comma
    for (let i = 0; i < reservations.length; i++) {
        let line = "";
        let fields = reservationToRow(reservations[i]);
        for (let j = 0; j < headers.length; j++) {
            line += fields[headers[j]];
            if (j < headers.length - 1) {
                line += ","
            }
        }
        ans += '\n' + line;
    }
    return ans;
}

exports.getRow = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate({
            path: 'massageShop',
            select: 'name address tel opentime closetime'
        });
        if (!reservation) {
            return res.status(404).json({ success: false, message: `No reservation with the id of ${req.params.id}` });
        }

        res.status(200).json({
            success: true,
            data: reservationToRow(reservation),
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Cannot find Reservation" });
    }
}


//@desc     GET Google Calendar CSV
//@router   GET /api/v1/calendar/update
//@access   Private
exports.getCSV = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        const reservations = await Reservation.find({ user: req.user.id }).populate({
            path: 'massageShop',
            select: 'name address tel opentime closetime'
        });

        res.status(200).json({
            success: true,
            data: makeCSVString(reservations),
        });
    } catch (err) {
        res.status(400).json({ success: false, message: "Calendar CSV Update error caught." });
    }
};
