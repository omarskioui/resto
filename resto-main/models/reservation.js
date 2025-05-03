const mongoose = require('mongoose');
const ReservationSchema = new mongoose.Schema({
    name: String,
    phone: String,
    person: Number,
    date: Date,
    time: String,
    message: String
})

module.exports = mongoose.model('Reservation', ReservationSchema);