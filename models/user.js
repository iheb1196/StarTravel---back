const mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs')

const user = new mongoose.Schema({
    firstname: String,
    lastname: String,
    phonenumber:Number,
    Country:String,
    adress:String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['client', 'admin'] }
});

user.methods.comparePassword = function (candidatePassword, cb) {
    return bcrypt.compareSync(candidatePassword, this.password)
}

user.pre('save', function () {
    this.password = bcrypt.hashSync(this.password);
});

module.exports = mongoose.model('user', user);