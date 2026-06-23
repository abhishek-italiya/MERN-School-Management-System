const router = require('express').Router();

// const { adminRegister, adminLogIn, deleteAdmin, getAdminDetail, updateAdmin } = require('../controllers/admin-controller.js');

const { adminRegister, adminLogIn, getAdminDetail} = require('../controllers/admin-controller.js');

const { sclassCreate, sclassList, deleteSclass, deleteSclasses, getSclassDetail, getSclassStudents, updateSclass } = require('../controllers/class-controller.js');
const { complainCreate, complainList, updateComplain, deleteComplain } = require('../controllers/complain-controller.js');
const { noticeCreate, noticeList, deleteNotices, deleteNotice, updateNotice } = require('../controllers/notice-controller.js');
const {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByClass,
    updateExamResult,
    clearAllStudentsAttendanceBySubject,
    clearAllStudentsAttendance,
    removeStudentAttendanceBySubject,
    removeStudentAttendance } = require('../controllers/student_controller.js');
const { subjectCreate, freeSubjectList, classSubjects, deleteSubjectsByClass, getSubjectDetail, deleteSubject, deleteSubjects, allSubjects, updateSubject } = require('../controllers/subject-controller.js');
const { teacherRegister, teacherLogIn, getTeachers, getTeacherDetail, deleteTeachers, deleteTeachersByClass, deleteTeacher, updateTeacherSubject, teacherAttendance, updateTeacher } = require('../controllers/teacher-controller.js');

const { parentRegister, parentLogIn, getParentDetail } = require('../controllers/parent-controller.js');
const { createFeeRecord, getStudentFees, getSchoolFees, processPaymentMock } = require('../controllers/fee-controller.js');
const { createExam, getExamsByClass, getExamsBySchool, generateReportCard } = require('../controllers/exam-controller.js');
const { createTimetable, getTimetableByClass, getTimetableByTeacher, getTimetableSuggestions } = require('../controllers/timetable-controller.js');
const { createAssignment, getAssignmentsByClass, getAssignmentsByTeacher, submitAssignment, gradeSubmission } = require('../controllers/assignment-controller.js');
const { predictAttendance, predictResults, getAcademicRecommendations } = require('../controllers/ai-controller.js');


// Admin
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);

router.get("/Admin/:id", getAdminDetail)
// router.delete("/Admin/:id", deleteAdmin)

// router.put("/Admin/:id", updateAdmin)

// Student

router.post('/StudentReg', studentRegister);
router.post('/StudentLogin', studentLogIn)

router.get("/Students/:id", getStudents)
router.get("/Student/:id", getStudentDetail)

router.delete("/Students/:id", deleteStudents)
router.delete("/StudentsClass/:id", deleteStudentsByClass)
router.delete("/Student/:id", deleteStudent)

router.put("/Student/:id", updateStudent)

router.put('/UpdateExamResult/:id', updateExamResult)

router.put('/StudentAttendance/:id', studentAttendance)

router.put('/RemoveAllStudentsSubAtten/:id', clearAllStudentsAttendanceBySubject);
router.put('/RemoveAllStudentsAtten/:id', clearAllStudentsAttendance);

router.put('/RemoveStudentSubAtten/:id', removeStudentAttendanceBySubject);
router.put('/RemoveStudentAtten/:id', removeStudentAttendance)

// Teacher

router.post('/TeacherReg', teacherRegister);
router.post('/TeacherLogin', teacherLogIn)

router.get("/Teachers/:id", getTeachers)
router.get("/Teacher/:id", getTeacherDetail)

router.delete("/Teachers/:id", deleteTeachers)
router.delete("/TeachersClass/:id", deleteTeachersByClass)
router.delete("/Teacher/:id", deleteTeacher)

router.put("/TeacherSubject", updateTeacherSubject)
router.put("/Teacher/:id", updateTeacher)

router.post('/TeacherAttendance/:id', teacherAttendance)

// Notice

router.post('/NoticeCreate', noticeCreate);

router.get('/NoticeList/:id', noticeList);

router.delete("/Notices/:id", deleteNotices)
router.delete("/Notice/:id", deleteNotice)
router.delete("/Complain/:id", deleteComplain)
router.delete("/Sclasses/:id", deleteSclasses)

router.put("/Notice/:id", updateNotice)

// Complain

router.post('/ComplainCreate', complainCreate);

router.get('/ComplainList/:id', complainList);
router.put("/Complain/:id", updateComplain)

// Sclass

router.post('/SclassCreate', sclassCreate);

router.get('/SclassList/:id', sclassList);
router.get("/Sclass/:id", getSclassDetail)
router.put("/Sclass/:id", updateSclass)

router.get("/Sclass/Students/:id", getSclassStudents)

router.delete("/Sclasses/:id", deleteSclasses)
router.delete("/Sclass/:id", deleteSclass)

// Subject

router.post('/SubjectCreate', subjectCreate);

router.get('/AllSubjects/:id', allSubjects);
router.get('/ClassSubjects/:id', classSubjects);
router.get('/FreeSubjectList/:id', freeSubjectList);
router.get("/Subject/:id", getSubjectDetail)

router.delete("/Subject/:id", deleteSubject)
router.put("/Subject/:id", updateSubject)
router.delete("/Subjects/:id", deleteSubjects)
router.delete("/SubjectsClass/:id", deleteSubjectsByClass)

// Parent
router.post('/ParentReg', parentRegister);
router.post('/ParentLogin', parentLogIn);
router.get('/Parent/:id', getParentDetail);

// Fees
router.post('/FeeCreate', createFeeRecord);
router.get('/StudentFees/:studentId', getStudentFees);
router.get('/SchoolFees/:schoolId', getSchoolFees);
router.post('/FeePayment', processPaymentMock);

// Exams
router.post('/ExamCreate', createExam);
router.get('/ClassExams/:classId', getExamsByClass);
router.get('/SchoolExams/:schoolId', getExamsBySchool);
router.get('/StudentReportCard/:studentId', generateReportCard);

// Timetable
router.post('/TimetableCreate', createTimetable);
router.get('/ClassTimetable/:classId', getTimetableByClass);
router.get('/TeacherTimetable/:teacherId', getTimetableByTeacher);
router.post('/TimetableSuggestions', getTimetableSuggestions);

// Assignments
router.post('/AssignmentCreate', createAssignment);
router.get('/ClassAssignments/:classId', getAssignmentsByClass);
router.get('/TeacherAssignments/:teacherId', getAssignmentsByTeacher);
router.post('/AssignmentSubmit', submitAssignment);
router.post('/AssignmentGrade', gradeSubmission);

// AI Features
router.post('/AiPredictAttendance', predictAttendance);
router.post('/AiPredictResults', predictResults);
router.post('/AiRecommendations', getAcademicRecommendations);

module.exports = router;