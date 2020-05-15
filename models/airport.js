const mongoose = require('mongoose');
 
const airport = new mongoose.Schema({
    name: String,
    country: String,
});


module.exports = mongoose.model('airport', airport);