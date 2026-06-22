import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getClassDetails, getClassStudents, getSubjectList, updateSclassFields, updateSubjectFields } from "../../../redux/sclassRelated/sclassHandle";
import { updateStudentFields } from "../../../redux/studentRelated/studentHandle";
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { getAllTeachers, updateTeacherFields } from "../../../redux/teacherRelated/teacherHandle";
import {
    Box, Container, Typography, Tab, IconButton, Paper, Grid, Card, CardContent, Divider, Button, Tooltip,
    Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { resetSubjects } from "../../../redux/sclassRelated/sclassSlice";
import TableTemplate from "../../../components/TableTemplate";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Popup from "../../../components/Popup";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PostAddIcon from '@mui/icons-material/PostAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClassIcon from '@mui/icons-material/Class';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from 'styled-components';

const ClassDetails = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { subjectsList, sclassStudents, sclassDetails, loading, error, response, getresponse } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector((state) => state.user);

    const classID = params.id

    useEffect(() => {
        dispatch(getClassDetails(classID, "Sclass"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
        dispatch(getClassStudents(classID));
        dispatch(getAllTeachers(currentUser._id));
    }, [dispatch, classID, currentUser._id]);

    if (error) {
        console.log(error)
    }

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true)
    }

    const [dialogLoader, setDialogLoader] = useState(false);

    // Class Edit States
    const [openClassEdit, setOpenClassEdit] = useState(false);
    const [newClassName, setNewClassName] = useState("");

    const handleOpenClassEdit = () => {
        setNewClassName(sclassDetails?.sclassName || "");
        setOpenClassEdit(true);
    };

    // Subject Edit States
    const [openSubjectEdit, setOpenSubjectEdit] = useState(false);
    const [editSubjectId, setEditSubjectId] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [subjectCode, setSubjectCode] = useState("");

    const handleOpenSubjectEdit = (row) => {
        setEditSubjectId(row.id);
        setSubjectName(row.name);
        setSubjectCode(row.code);
        setOpenSubjectEdit(true);
    };

    // Student Edit States
    const [openStudentEdit, setOpenStudentEdit] = useState(false);
    const [editStudentId, setEditStudentId] = useState("");
    const [studentName, setStudentName] = useState("");
    const [studentRollNum, setStudentRollNum] = useState("");

    const handleOpenStudentEdit = (row) => {
        setEditStudentId(row.id);
        setStudentName(row.name);
        setStudentRollNum(row.rollNum);
        setOpenStudentEdit(true);
    };

    // Teacher Edit States
    const [openTeacherEdit, setOpenTeacherEdit] = useState(false);
    const [editTeacherId, setEditTeacherId] = useState("");
    const [teacherName, setTeacherName] = useState("");
    const [teacherEmail, setTeacherEmail] = useState("");

    const handleOpenTeacherEdit = (row) => {
        setEditTeacherId(row.id);
        setTeacherName(row.name);
        setTeacherEmail(row.email || "");
        setOpenTeacherEdit(true);
    };

    const subjectColumns = [
        { id: 'name', label: 'Subject Name', minWidth: 170 },
        { id: 'code', label: 'Subject Code', minWidth: 100 },
    ]

    const subjectRows = subjectsList && subjectsList.length > 0 && subjectsList.map((subject) => {
        return {
            name: subject.subName,
            code: subject.subCode,
            id: subject._id,
        };
    })

    const SubjectsButtonHaver = ({ row }) => {
        return (
            <ButtonContainer>
                <Tooltip title="View Details">
                    <IconButton 
                        onClick={() => navigate(`/Admin/class/subject/${classID}/${row.id}`)} 
                        size="small" 
                        sx={{ color: '#411d70', backgroundColor: '#f0eaff', '&:hover': { backgroundColor: '#dccaff' } }}
                    >
                        <VisibilityIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Edit Subject">
                    <IconButton 
                        onClick={() => handleOpenSubjectEdit(row)} 
                        size="small" 
                        sx={{ color: '#ff9800', backgroundColor: '#fff3e0', '&:hover': { backgroundColor: '#ffe0b2' } }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton 
                        onClick={() => deleteHandler(row.id, "Subject")} 
                        size="small" 
                        sx={{ color: '#e73c7e', backgroundColor: '#fcecf3', '&:hover': { backgroundColor: '#f9d2e4' } }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </ButtonContainer>
        );
    };

    const ClassSubjectsSection = () => {
        return (
            <Box sx={{ p: { xs: 0, md: 2 } }}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
                            Subjects List
                        </Typography>
                        <Button 
                            variant="contained" 
                            startIcon={<PostAddIcon />}
                            onClick={() => navigate("/Admin/addsubject/" + classID)}
                            sx={{ 
                                backgroundColor: '#411d70', 
                                fontFamily: 'Poppins', 
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 600,
                                px: 3,
                                '&:hover': { backgroundColor: '#2c2143' }
                            }}
                        >
                            Add Subjects
                        </Button>
                    </Box>

                    {response ?
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                            <Typography variant="h6" sx={{ color: '#888', fontFamily: 'Poppins' }}>No Subjects Found.</Typography>
                        </Box>
                        :
                        <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                    }
                </Paper>
            </Box>
        )
    }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ]

    const studentRows = sclassStudents.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            id: student._id,
        };
    })

    const StudentsButtonHaver = ({ row }) => {
        return (
            <ButtonContainer>
                <Tooltip title="View Profile">
                    <IconButton 
                        onClick={() => navigate("/Admin/students/student/" + row.id)} 
                        size="small" 
                        sx={{ color: '#411d70', backgroundColor: '#f0eaff', '&:hover': { backgroundColor: '#dccaff' } }}
                    >
                        <VisibilityIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Edit Student">
                    <IconButton 
                        onClick={() => handleOpenStudentEdit(row)} 
                        size="small" 
                        sx={{ color: '#ff9800', backgroundColor: '#fff3e0', '&:hover': { backgroundColor: '#ffe0b2' } }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Take Attendance">
                    <IconButton 
                        onClick={() => navigate("/Admin/students/student/attendance/" + row.id)} 
                        size="small" 
                        sx={{ color: '#28a745', backgroundColor: '#e6f4ea', '&:hover': { backgroundColor: '#cce8d6' } }}
                    >
                        <FactCheckIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton 
                        onClick={() => deleteHandler(row.id, "Student")} 
                        size="small" 
                        sx={{ color: '#e73c7e', backgroundColor: '#fcecf3', '&:hover': { backgroundColor: '#f9d2e4' } }}
                    >
                        <PersonRemoveIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </ButtonContainer>
        );
    };

    const ClassStudentsSection = () => {
        return (
            <Box sx={{ p: { xs: 0, md: 2 } }}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
                            Students List
                        </Typography>
                        <Button 
                            variant="contained" 
                            startIcon={<PersonAddAlt1Icon />}
                            onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                            sx={{ 
                                backgroundColor: '#411d70', 
                                fontFamily: 'Poppins', 
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 600,
                                px: 3,
                                '&:hover': { backgroundColor: '#2c2143' }
                            }}
                        >
                            Add Students
                        </Button>
                    </Box>
                    {getresponse ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                            <Typography variant="h6" sx={{ color: '#888', fontFamily: 'Poppins' }}>No Students Found.</Typography>
                        </Box>
                    ) : (
                        <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                    )}
                </Paper>
            </Box>
        )
    }

    const teacherColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'teachSubject', label: 'Subject', minWidth: 170 },
    ];

    const classTeachers = teachersList && teachersList.filter((teacher) => teacher.teachSclass?._id === classID);

    const teacherRows = classTeachers && classTeachers.length > 0 ? classTeachers.map((teacher) => {
        return {
            name: teacher.name,
            email: teacher.email,
            teachSubject: teacher.teachSubject?.subName || 'Unassigned',
            id: teacher._id,
        };
    }) : [];

    const TeachersButtonHaver = ({ row }) => {
        return (
            <ButtonContainer>
                <Tooltip title="View Profile">
                    <IconButton 
                        onClick={() => navigate("/Admin/teachers/teacher/" + row.id)} 
                        size="small" 
                        sx={{ color: '#411d70', backgroundColor: '#f0eaff', '&:hover': { backgroundColor: '#dccaff' } }}
                    >
                        <VisibilityIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Edit Teacher">
                    <IconButton 
                        onClick={() => handleOpenTeacherEdit(row)} 
                        size="small" 
                        sx={{ color: '#ff9800', backgroundColor: '#fff3e0', '&:hover': { backgroundColor: '#ffe0b2' } }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton 
                        onClick={() => deleteHandler(row.id, "Teacher")} 
                        size="small" 
                        sx={{ color: '#e73c7e', backgroundColor: '#fcecf3', '&:hover': { backgroundColor: '#f9d2e4' } }}
                    >
                        <PersonRemoveIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </ButtonContainer>
        );
    };

    const ClassTeachersSection = () => {
        return (
            <Box sx={{ p: { xs: 0, md: 2 } }}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
                            Teachers List
                        </Typography>
                        <Button 
                            variant="contained" 
                            startIcon={<PersonAddAlt1Icon />}
                            onClick={() => navigate("/Admin/teachers/choosesubject/" + classID)}
                            sx={{ 
                                backgroundColor: '#411d70', 
                                fontFamily: 'Poppins', 
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 600,
                                px: 3,
                                '&:hover': { backgroundColor: '#2c2143' }
                            }}
                        >
                            Add Teacher
                        </Button>
                    </Box>
                    {teacherRows.length === 0 ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                            <Typography variant="h6" sx={{ color: '#888', fontFamily: 'Poppins' }}>No Teachers Found.</Typography>
                        </Box>
                    ) : (
                        <TableTemplate buttonHaver={TeachersButtonHaver} columns={teacherColumns} rows={teacherRows} />
                    )}
                </Paper>
            </Box>
        )
    }

    const ClassDetailsSection = () => {
        const numberOfSubjects = subjectsList.length;
        const numberOfStudents = sclassStudents.length;

        return (
            <Box sx={{ p: { xs: 0, md: 2 } }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <DetailCard>
                            <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                <IconWrapper bg="#e3f2fd" color="#1e88e5">
                                    <ClassIcon sx={{ fontSize: 40 }} />
                                </IconWrapper>
                                <Typography variant="body1" sx={{ fontFamily: 'Poppins', color: '#888', mt: 3, mb: 1 }}>
                                    Class Name
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography variant="h4" sx={{ fontFamily: 'Poppins', fontWeight: 800, color: '#2c2143' }}>
                                        {sclassDetails && sclassDetails.sclassName}
                                    </Typography>
                                    <Tooltip title="Edit Class Name">
                                        <IconButton 
                                            onClick={handleOpenClassEdit} 
                                            size="small"
                                            sx={{ color: '#ff9800', backgroundColor: '#fff3e0', '&:hover': { backgroundColor: '#ffe0b2' } }}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </CardContent>
                        </DetailCard>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                        <DetailCard>
                            <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                <IconWrapper bg="#f0eaff" color="#7f56da">
                                    <MenuBookIcon sx={{ fontSize: 40 }} />
                                </IconWrapper>
                                <Typography variant="body1" sx={{ fontFamily: 'Poppins', color: '#888', mt: 3, mb: 1 }}>
                                    Total Subjects
                                </Typography>
                                <Typography variant="h4" sx={{ fontFamily: 'Poppins', fontWeight: 800, color: '#2c2143' }}>
                                    {numberOfSubjects}
                                </Typography>
                            </CardContent>
                        </DetailCard>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <DetailCard>
                            <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                <IconWrapper bg="#fcecf3" color="#e73c7e">
                                    <PersonIcon sx={{ fontSize: 40 }} />
                                </IconWrapper>
                                <Typography variant="body1" sx={{ fontFamily: 'Poppins', color: '#888', mt: 3, mb: 1 }}>
                                    Total Students
                                </Typography>
                                <Typography variant="h4" sx={{ fontFamily: 'Poppins', fontWeight: 800, color: '#2c2143' }}>
                                    {numberOfStudents}
                                </Typography>
                            </CardContent>
                        </DetailCard>
                    </Grid>
                </Grid>
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 3, borderBottom: '1px solid #eee', backgroundColor: '#faf9fc' }}>
                        <Button 
                            variant="outlined" 
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate(-1)}
                            sx={{
                                color: '#411d70',
                                borderColor: '#411d70',
                                fontFamily: 'Poppins',
                                fontWeight: 600,
                                borderRadius: '8px',
                                textTransform: 'none',
                                mr: 3,
                                '&:hover': {
                                    backgroundColor: '#f0eaff',
                                    borderColor: '#411d70'
                                }
                            }}
                        >
                            Back
                        </Button>
                        <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 800, color: '#2c2143' }}>
                            Class Details
                        </Typography>
                    </Box>

                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: '#faf9fc' }}>
                            <TabList onChange={handleChange} sx={{ px: 2 }}>
                                <Tab label={<Typography sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Overview</Typography>} value="1" />
                                <Tab label={<Typography sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Subjects</Typography>} value="2" />
                                <Tab label={<Typography sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Students</Typography>} value="3" />
                                <Tab label={<Typography sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Teachers</Typography>} value="4" />
                            </TabList>
                        </Box>
                        <Box sx={{ p: { xs: 2, md: 4 } }}>
                            <TabPanel value="1" sx={{ p: 0 }}>
                                <ClassDetailsSection />
                            </TabPanel>
                            <TabPanel value="2" sx={{ p: 0 }}>
                                <ClassSubjectsSection />
                            </TabPanel>
                            <TabPanel value="3" sx={{ p: 0 }}>
                                <ClassStudentsSection />
                            </TabPanel>
                            <TabPanel value="4" sx={{ p: 0 }}>
                                <ClassTeachersSection />
                            </TabPanel>
                        </Box>
                    </TabContext>
                </Paper>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />

            {/* Edit Class Name Dialog */}
            <Dialog open={openClassEdit} onClose={() => setOpenClassEdit(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
                    Edit Class Name
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Class Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newClassName}
                        onChange={(e) => setNewClassName(e.target.value)}
                        sx={{ mt: 1, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        InputLabelProps={{ style: { fontFamily: 'Poppins' } }}
                        inputProps={{ style: { fontFamily: 'Poppins' } }}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={() => setOpenClassEdit(false)} sx={{ fontFamily: 'Poppins', textTransform: 'none', color: '#666', fontWeight: 600 }}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={async () => {
                            setDialogLoader(true);
                            await dispatch(updateSclassFields(classID, { sclassName: newClassName }));
                            setDialogLoader(false);
                            setOpenClassEdit(false);
                            dispatch(getClassDetails(classID, "Sclass"));
                        }} 
                        variant="contained"
                        disabled={dialogLoader || !newClassName.trim()}
                        sx={{ 
                            backgroundColor: '#411d70', 
                            fontFamily: 'Poppins', 
                            borderRadius: '8px', 
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': { backgroundColor: '#2c2143' }
                        }}
                    >
                        {dialogLoader ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Subject Dialog */}
            <Dialog open={openSubjectEdit} onClose={() => setOpenSubjectEdit(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
                    Edit Subject Details
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Subject Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                        sx={{ mt: 1, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        InputLabelProps={{ style: { fontFamily: 'Poppins' } }}
                        inputProps={{ style: { fontFamily: 'Poppins' } }}
                    />
                    <TextField
                        margin="dense"
                        label="Subject Code"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={subjectCode}
                        onChange={(e) => setSubjectCode(e.target.value)}
                        sx={{ mt: 2, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        InputLabelProps={{ style: { fontFamily: 'Poppins' } }}
                        inputProps={{ style: { fontFamily: 'Poppins' } }}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={() => setOpenSubjectEdit(false)} sx={{ fontFamily: 'Poppins', textTransform: 'none', color: '#666', fontWeight: 600 }}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={async () => {
                            setDialogLoader(true);
                            await dispatch(updateSubjectFields(editSubjectId, { subName: subjectName, subCode: subjectCode }));
                            setDialogLoader(false);
                            setOpenSubjectEdit(false);
                            dispatch(getSubjectList(classID, "ClassSubjects"));
                        }} 
                        variant="contained"
                        disabled={dialogLoader || !subjectName.trim() || !subjectCode.trim()}
                        sx={{ 
                            backgroundColor: '#411d70', 
                            fontFamily: 'Poppins', 
                            borderRadius: '8px', 
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': { backgroundColor: '#2c2143' }
                        }}
                    >
                        {dialogLoader ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Student Dialog */}
            <Dialog open={openStudentEdit} onClose={() => setOpenStudentEdit(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
                    Edit Student Details
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Student Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        sx={{ mt: 1, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        InputLabelProps={{ style: { fontFamily: 'Poppins' } }}
                        inputProps={{ style: { fontFamily: 'Poppins' } }}
                    />
                    <TextField
                        margin="dense"
                        label="Roll Number"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={studentRollNum}
                        onChange={(e) => setStudentRollNum(e.target.value)}
                        sx={{ mt: 2, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        InputLabelProps={{ style: { fontFamily: 'Poppins' } }}
                        inputProps={{ style: { fontFamily: 'Poppins' } }}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={() => setOpenStudentEdit(false)} sx={{ fontFamily: 'Poppins', textTransform: 'none', color: '#666', fontWeight: 600 }}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={async () => {
                            setDialogLoader(true);
                            await dispatch(updateStudentFields(editStudentId, { name: studentName, rollNum: Number(studentRollNum) }, "Student"));
                            setDialogLoader(false);
                            setOpenStudentEdit(false);
                            dispatch(getClassStudents(classID));
                        }} 
                        variant="contained"
                        disabled={dialogLoader || !studentName.trim() || !String(studentRollNum).trim()}
                        sx={{ 
                            backgroundColor: '#411d70', 
                            fontFamily: 'Poppins', 
                            borderRadius: '8px', 
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': { backgroundColor: '#2c2143' }
                        }}
                    >
                        {dialogLoader ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Teacher Dialog */}
            <Dialog open={openTeacherEdit} onClose={() => setOpenTeacherEdit(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
                    Edit Teacher Details
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Teacher Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={teacherName}
                        onChange={(e) => setTeacherName(e.target.value)}
                        sx={{ mt: 1, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        InputLabelProps={{ style: { fontFamily: 'Poppins' } }}
                        inputProps={{ style: { fontFamily: 'Poppins' } }}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={teacherEmail}
                        onChange={(e) => setTeacherEmail(e.target.value)}
                        sx={{ mt: 2, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        InputLabelProps={{ style: { fontFamily: 'Poppins' } }}
                        inputProps={{ style: { fontFamily: 'Poppins' } }}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={() => setOpenTeacherEdit(false)} sx={{ fontFamily: 'Poppins', textTransform: 'none', color: '#666', fontWeight: 600 }}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={async () => {
                            setDialogLoader(true);
                            await dispatch(updateTeacherFields(editTeacherId, { name: teacherName, email: teacherEmail }));
                            setDialogLoader(false);
                            setOpenTeacherEdit(false);
                            dispatch(getAllTeachers(currentUser._id));
                        }} 
                        variant="contained"
                        disabled={dialogLoader || !teacherName.trim() || !teacherEmail.trim()}
                        sx={{ 
                            backgroundColor: '#411d70', 
                            fontFamily: 'Poppins', 
                            borderRadius: '8px', 
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': { backgroundColor: '#2c2143' }
                        }}
                    >
                        {dialogLoader ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ClassDetails;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
`;

const DetailCard = styled(Card)`
  border-radius: 16px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03) !important;
  border: 1px solid #f0f0f0;
  height: 100%;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background-color: ${props => props.bg};
  color: ${props => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
`;
