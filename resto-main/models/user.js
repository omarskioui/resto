const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    facebooklink: String,
    instagramlink: String,
    twitterlink: String,
    openinghours: String,
    closinghours: String,
    adress: String,
    role: {
        type: String,
        default: 'admin',
    },
});

module.exports = mongoose.model('User', userSchema);