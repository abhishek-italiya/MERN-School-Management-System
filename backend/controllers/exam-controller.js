const Exam = require('../models/examSchema');
const Student = require('../models/studentSchema');

const createExam = async (req, res) => {
    try {
        const exam = new Exam(req.body);
        const result = await exam.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getExamsByClass = async (req, res) => {
    try {
        const exams = await Exam.find({ sclass: req.params.classId })
            .populate('subjects.subject', 'subName subCode');
        res.status(200).json(exams);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getExamsBySchool = async (req, res) => {
    try {
        const exams = await Exam.find({ school: req.params.schoolId })
            .populate('sclass', 'sclassName')
            .populate('subjects.subject', 'subName subCode');
        res.status(200).json(exams);
    } catch (err) {
        res.status(500).json(err);
    }
};

const generateReportCard = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const student = await Student.findById(studentId)
            .populate('sclassName', 'sclassName')
            .populate('examResult.subName', 'subName subCode');

        if (!student) return res.status(404).json({ message: "Student not found" });

        // Calculate rankings in the class
        const allClassStudents = await Student.find({ sclassName: student.sclassName._id }).lean();
        
        // Custom simple score metric for rankings
        const calculateAverage = (std) => {
            if (!std.examResult || std.examResult.length === 0) return 0;
            const sum = std.examResult.reduce((acc, curr) => acc + curr.marksObtained, 0);
            return sum / std.examResult.length;
        };

        const studentsWithAverages = allClassStudents.map(s => ({
            id: s._id.toString(),
            name: s.name,
            avg: calculateAverage(s)
        })).sort((a, b) => b.avg - a.avg);

        const rank = studentsWithAverages.findIndex(s => s.id === studentId) + 1;

        res.status(200).json({
            student,
            rank,
            totalStudents: studentsWithAverages.length,
            averageScore: calculateAverage(student)
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { createExam, getExamsByClass, getExamsBySchool, generateReportCard };
