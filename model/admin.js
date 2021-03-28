const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    sinceInCompany: {
        required: true,
        type: Number,
    },
    contactNo: {
        required: true,
        type: Number,
    },
    address: {
            type: String,
            required: true        
        }
});
module.exports = mongoose.model('Admin', adminSchema);