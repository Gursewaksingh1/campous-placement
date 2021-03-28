const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const resumeSchema  = new Schema({
    marticsMarks: {
        type: Number,
        required: true,
    },
    secondaryMarks: {
        type: Number,
        required: true,
    },
    gradutionMarks: {
        type: Number,
        required: true,
    },
    experience: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    Studentid: {
        type: Schema.Types.ObjectId,
        required: true,
    }
})
module.exports = mongoose.model('StuResume', resumeSchema)