const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
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
    schedule: [{
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            required: true
        },
        periods: [{
            periodNumber: {
                type: Number,
                required: true
            },
            subject: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'subject',
                required: true
            },
            teacher: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'teacher',
                required: true
            },
            startTime: {
                type: String,
                required: true
            },
            endTime: {
                type: String,
                required: true
            }
        }]
    }]
}, { timestamps: true });

module.exports = mongoose.model("timetable", timetableSchema);
