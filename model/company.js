const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const companySchema = new Schema({
    nameOfCompany: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true,
    },
    aboutCompany: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Company', companySchema);