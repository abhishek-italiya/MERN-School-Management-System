const Timetable = require('../models/timetableSchema');
const Subject = require('../models/subjectSchema');
const Teacher = require('../models/teacherSchema');

const createTimetable = async (req, res) => {
    try {
        const { sclass, school, schedule } = req.body;
        
        // Conflict Check: Check if any teacher is double-booked on same day & period
        for (const daySchedule of schedule) {
            for (const period of daySchedule.periods) {
                const existingConflict = await Timetable.findOne({
                    school,
                    sclass: { $ne: sclass }, // in another class
                    'schedule': {
                        $elemMatch: {
                            day: daySchedule.day,
                            'periods': {
                                $elemMatch: {
                                    periodNumber: period.periodNumber,
                                    teacher: period.teacher
                                }
                            }
                        }
                    }
                });

                if (existingConflict) {
                    const conflictingTeacher = await Teacher.findById(period.teacher);
                    return res.send({
                        message: `Scheduling Conflict: Teacher ${conflictingTeacher ? conflictingTeacher.name : 'assigned'} is already booked for Period ${period.periodNumber} on ${daySchedule.day} in another class.`
                    });
                }
            }
        }

        // Upsert timetable for class
        let timetable = await Timetable.findOne({ sclass, school });
        if (timetable) {
            timetable.schedule = schedule;
            await timetable.save();
        } else {
            timetable = new Timetable({ sclass, school, schedule });
            await timetable.save();
        }

        res.status(201).json(timetable);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getTimetableByClass = async (req, res) => {
    try {
        const timetable = await Timetable.findOne({ sclass: req.params.classId })
            .populate('schedule.periods.subject', 'subName subCode')
            .populate('schedule.periods.teacher', 'name email');
        if (timetable) {
            res.status(200).json(timetable);
        } else {
            res.send({ message: "No timetable found for this class" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getTimetableByTeacher = async (req, res) => {
    try {
        const teacherId = req.params.teacherId;
        const timetables = await Timetable.find({ 'schedule.periods.teacher': teacherId })
            .populate('sclass', 'sclassName')
            .populate('schedule.periods.subject', 'subName subCode');

        // Extract slots specific to this teacher
        const teacherSchedule = [];
        for (const t of timetables) {
            for (const daySchedule of t.schedule) {
                const matchingPeriods = daySchedule.periods.filter(p => p.teacher.toString() === teacherId);
                if (matchingPeriods.length > 0) {
                    teacherSchedule.push({
                        class: t.sclass,
                        day: daySchedule.day,
                        periods: matchingPeriods
                    });
                }
            }
        }
        res.status(200).json(teacherSchedule);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getTimetableSuggestions = async (req, res) => {
    try {
        const { sclassId, schoolId } = req.body;
        
        // Dynamic AI/Heuristic slot suggestions:
        // Find subjects in this class and list free periods of their respective teachers
        const subjects = await Subject.find({ sclassName: sclassId, school: schoolId }).populate('teacher', 'name');
        const timetables = await Timetable.find({ school: schoolId }).lean();
        
        const suggestions = [];
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        
        for (const sub of subjects) {
            if (!sub.teacher) continue;
            
            // Look for conflict-free periods
            const freeSlots = [];
            for (const d of days) {
                for (let pNum = 1; pNum <= 6; pNum++) {
                    // Check if teacher is busy
                    const isTeacherBusy = timetables.some(t => 
                        t.schedule.some(day => 
                            day.day === d && day.periods.some(p => p.periodNumber === pNum && p.teacher && p.teacher.toString() === sub.teacher._id.toString())
                        )
                    );
                    
                    if (!isTeacherBusy) {
                        freeSlots.push({ day: d, period: pNum });
                    }
                }
            }
            
            suggestions.push({
                subject: sub.subName,
                teacher: sub.teacher.name,
                recommendedSlots: freeSlots.slice(0, 3) // Return top 3 suggested slots
            });
        }
        
        res.status(200).json(suggestions);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { createTimetable, getTimetableByClass, getTimetableByTeacher, getTimetableSuggestions };
