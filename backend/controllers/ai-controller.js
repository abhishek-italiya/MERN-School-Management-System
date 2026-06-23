const Student = require('../models/studentSchema');

const predictAttendance = async (req, res) => {
    try {
        const { studentId } = req.body;
        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        const records = student.attendance || [];
        const total = records.length;
        if (total === 0) {
            return res.json({
                status: "Stable",
                predictedPercentage: 100,
                warning: false,
                recommendation: "Attend all scheduled classes to set a baseline."
            });
        }

        const present = records.filter(r => r.status === 'Present').length;
        const currentPercentage = (present / total) * 100;
        
        // Simple linear forecasting: if past trend continues
        let warning = false;
        let recommendation = "Maintain current attendance to remain above requirements.";
        if (currentPercentage < 75) {
            warning = true;
            recommendation = "High risk of academic warning. Dedicate additional days to make up for missed classes.";
        }

        res.json({
            currentPercentage: currentPercentage.toFixed(1),
            predictedPercentage: currentPercentage.toFixed(1),
            warning,
            recommendation
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const predictResults = async (req, res) => {
    try {
        const { studentId } = req.body;
        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        const results = student.examResult || [];
        if (results.length === 0) {
            return res.json({
                currentAverage: 0,
                predictedGrade: "B",
                recommendation: "Begin subject revisions early to secure high grades."
            });
        }

        const avg = results.reduce((acc, curr) => acc + curr.marksObtained, 0) / results.length;
        let predictedGrade = "C";
        let recommendation = "Increase study hours in core areas to boost aggregate score.";
        
        if (avg >= 90) {
            predictedGrade = "A+";
            recommendation = "Excellent performance. Maintain current study methods.";
        } else if (avg >= 75) {
            predictedGrade = "A";
            recommendation = "Strong performance. Focus on fine details to reach top grades.";
        } else if (avg >= 60) {
            predictedGrade = "B";
        }

        res.json({
            currentAverage: avg.toFixed(1),
            predictedGrade,
            recommendation
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getAcademicRecommendations = async (req, res) => {
    try {
        const { studentId } = req.body;
        const student = await Student.findById(studentId).populate('examResult.subName');
        if (!student) return res.status(404).json({ message: "Student not found" });

        const results = student.examResult || [];
        const weakSubjects = results.filter(r => r.marksObtained < 60);

        const recommendations = [];
        if (weakSubjects.length > 0) {
            weakSubjects.forEach(ws => {
                recommendations.push({
                    subject: ws.subName?.subName || "Core Subject",
                    advice: "Spend an extra 30 minutes daily reviewing sample questions and assignments.",
                    resource: "Refer to the library textbook section for supplementary explanations."
                });
            });
        } else {
            recommendations.push({
                subject: "Advanced Placement Study",
                advice: "Request advanced reading lists from teachers to accelerate learning.",
                resource: "Explore the library catalog for scientific research papers."
            });
        }

        res.json(recommendations);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { predictAttendance, predictResults, getAcademicRecommendations };
