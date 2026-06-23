const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',
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
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
        required: true
    },
    fileUrl: {
        type: String
    },
    submissions: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'student',
            required: true
        },
        submissionDate: {
            type: Date,
            default: Date.now
        },
        fileUrl: {
            type: String
        },
        status: {
            type: String,
            enum: ['Submitted', 'Graded', 'Late'],
            default: 'Submitted'
        },
        marksObtained: {
            type: Number
        },
        feedback: {
            type: String
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model("assignment", assignmentSchema);
