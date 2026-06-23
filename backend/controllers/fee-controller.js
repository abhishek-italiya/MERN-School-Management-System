const Fee = require('../models/feeSchema');
const Student = require('../models/studentSchema');

const createFeeRecord = async (req, res) => {
    try {
        const { student, school, amount, feeType, dueDate } = req.body;
        
        // If student is "All", create for all students in the class/school
        if (student === 'All') {
            const { sclassId } = req.body;
            const students = await Student.find({ school, sclassName: sclassId });
            
            const feeRecords = students.map(s => ({
                student: s._id,
                school,
                amount,
                feeType,
                dueDate,
                status: 'Pending'
            }));
            
            const result = await Fee.insertMany(feeRecords);
            return res.status(201).json(result);
        } else {
            const fee = new Fee({
                student,
                school,
                amount,
                feeType,
                dueDate,
                status: 'Pending'
            });
            const result = await fee.save();
            return res.status(201).json(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getStudentFees = async (req, res) => {
    try {
        const fees = await Fee.find({ student: req.params.studentId }).sort({ dueDate: 1 });
        res.status(200).json(fees);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSchoolFees = async (req, res) => {
    try {
        const fees = await Fee.find({ school: req.params.schoolId }).populate('student', 'name rollNum');
        res.status(200).json(fees);
    } catch (err) {
        res.status(500).json(err);
    }
};

const processPaymentMock = async (req, res) => {
    try {
        const { feeId, transactionId, paymentMethod } = req.body;
        const fee = await Fee.findById(feeId);
        if (!fee) return res.status(404).json({ message: "Fee record not found" });

        fee.status = 'Paid';
        fee.transactionId = transactionId || `TXN_ERP_${Date.now()}`;
        fee.paymentMethod = paymentMethod || 'Stripe';
        fee.paymentDate = new Date();

        const updatedFee = await fee.save();
        res.status(200).json(updatedFee);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { createFeeRecord, getStudentFees, getSchoolFees, processPaymentMock };
