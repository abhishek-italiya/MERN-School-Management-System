const Assignment = require('../models/assignmentSchema');

const createAssignment = async (req, res) => {
    try {
        const assignment = new Assignment(req.body);
        const result = await assignment.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getAssignmentsByClass = async (req, res) => {
    try {
        const assignments = await Assignment.find({ sclass: req.params.classId })
            .populate('subject', 'subName subCode')
            .populate('teacher', 'name');
        res.status(200).json(assignments);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getAssignmentsByTeacher = async (req, res) => {
    try {
        const assignments = await Assignment.find({ teacher: req.params.teacherId })
            .populate('sclass', 'sclassName')
            .populate('subject', 'subName subCode');
        res.status(200).json(assignments);
    } catch (err) {
        res.status(500).json(err);
    }
};

const submitAssignment = async (req, res) => {
    try {
        const { assignmentId, studentId, fileUrl } = req.body;
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) return res.status(404).json({ message: "Assignment not found" });

        // Update or insert submission
        const existingIdx = assignment.submissions.findIndex(sub => sub.student.toString() === studentId);
        if (existingIdx > -1) {
            assignment.submissions[existingIdx].fileUrl = fileUrl;
            assignment.submissions[existingIdx].submissionDate = new Date();
            assignment.submissions[existingIdx].status = 'Submitted';
        } else {
            assignment.submissions.push({
                student: studentId,
                fileUrl,
                status: 'Submitted',
                submissionDate: new Date()
            });
        }

        const result = await assignment.save();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

const gradeSubmission = async (req, res) => {
    try {
        const { assignmentId, studentId, marksObtained, feedback } = req.body;
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) return res.status(404).json({ message: "Assignment not found" });

        const sub = assignment.submissions.find(sub => sub.student.toString() === studentId);
        if (sub) {
            sub.status = 'Graded';
            sub.marksObtained = marksObtained;
            sub.feedback = feedback;
            await assignment.save();
            res.status(200).json({ message: "Submission graded successfully", assignment });
        } else {
            res.status(404).json({ message: "Submission not found for this student" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { createAssignment, getAssignmentsByClass, getAssignmentsByTeacher, submitAssignment, gradeSubmission };
