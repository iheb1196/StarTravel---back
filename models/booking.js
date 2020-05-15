const mongoose = require('mongoose');

const booking = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    flight: { type: mongoose.Schema.Types.ObjectId, ref: 'flight' },
    status: { type: String, default: 'pending', enum: ['accepted', 'pending', 'refused', 'canceled'] },
    numberOfPassangers: { type: Number, default: 1 },
    description: String,
    phone: String,
    checkInDate: String,
    paymentMethod: String,
    dateCreation: { type: Date, default: Date.now },
});

module.exports = mongoose.model('booking', booking);