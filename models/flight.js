const mongoose = require('mongoose');

const flight = new mongoose.Schema({
    dep: { type: mongoose.Schema.Types.ObjectId, ref: 'airport' },
    arr: { type: mongoose.Schema.Types.ObjectId, ref: 'airport' },
    price: Number,
    duration: Number,
    date: String,
    time: String,
    companyName: String,
    companyLogo: String,
});

module.exports = mongoose.model('flight', flight);