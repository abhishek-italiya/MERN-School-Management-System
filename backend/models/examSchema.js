const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    examName: {
        type: String,
        required: true
    },
    sclass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass',
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    },
    subjects: [{
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subject',
            required: true
        },
        examDate: {
            type: Date,
            required: true
        },
        maxMarks: {
            type: Number,
            default: 100
        },
        passingMarks: {
            type: Number,
            default: 40
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model("exam", examSchema);
