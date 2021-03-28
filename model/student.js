const mongoose = require('mongoose');

const { Schema } = mongoose;
const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    stream: {
        type: String,
        required: true,
    },
    inWhichYear: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model('Student', studentSchema);