const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    feeType: {
        type: String,
        enum: ['Tuition', 'Hostel', 'Transport', 'Library', 'Exam'],
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Paid', 'Pending', 'Failed'],
        default: 'Pending'
    },
    paymentMethod: {
        type: String
    },
    transactionId: {
        type: String
    },
    paymentDate: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model("fee", feeSchema);
