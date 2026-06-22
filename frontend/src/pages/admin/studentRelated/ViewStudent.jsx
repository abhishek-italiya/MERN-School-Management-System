import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUserDetails, updateUser } from '../../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom'
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { Box, Button, Collapse, IconButton, Table, TableBody, TableHead, Typography, Tab, Paper, BottomNavigation, BottomNavigationAction, Container, Grid, Card, CardContent, Divider, Tooltip } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { KeyboardArrowUp, KeyboardArrowDown, Delete as DeleteIcon } from '@mui/icons-material';
import { removeStuff, updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../../components/attendanceCalculator';
import CustomBarChart from '../../../components/CustomBarChart'
import CustomPieChart from '../../../components/CustomPieChart'
import { StyledTableCell, StyledTableRow } from '../../../components/styles';

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import PersonIcon from '@mui/icons-material/Person';
import ClassIcon from '@mui/icons-material/Class';
import SchoolIcon from '@mui/icons-material/School';
import NumbersIcon from '@mui/icons-material/Numbers';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import GradeIcon from '@mui/icons-material/Grade';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Popup from '../../../components/Popup';
import styled from 'styled-components';

const ViewStudent = () => {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    const { userDetails, response, loading, error } = useSelector((state) => state.user);

    const studentID = params.id
    const address = "Student"

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID])

    useEffect(() => {
        if (userDetails && userDetails.sclassName && userDetails.sclassName._id !== undefined) {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const [openStates, setOpenStates] = useState({});

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [selectedSection, setSelectedSection] = useState('table');
    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const fields = password === ""
        ? { name, rollNum }
        : { name, rollNum, password }

    useEffect(() => {
        if (userDetails) {
            setName(userDetails.name || '');
            setRollNum(userDetails.rollNum || '');
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const deleteHandler = () => {
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true)
    }

    const removeHandler = (id, deladdress) => {
        dispatch(removeStuff(id, deladdress))
            .then(() => {
                dispatch(getUserDetails(studentID, address));
            })
    }

    const removeSubAttendance = (subId) => {
        dispatch(updateStudentFields(studentID, { subId }, "RemoveStudentSubAtten"))
            .then(() => {
                dispatch(getUserDetails(studentID, address));
            })
    }

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    const subjectData = Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { subCode, present, sessions }]) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        return {
            subject: subName,
            attendancePercentage: subjectAttendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    });

    const StudentAttendanceSection = () => {
        const renderTableSection = () => {
            return (
                <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', mb: 8 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
                            Attendance Records
                        </Typography>
                        <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: 600, color: overallAttendancePercentage > 75 ? '#28a745' : '#dc3545' }}>
                            Overall: {overallAttendancePercentage.toFixed(2)}%
                        </Typography>
                    </Box>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Subject</StyledTableCell>
                                <StyledTableCell align="center">Present</StyledTableCell>
                                <StyledTableCell align="center">Total Sessions</StyledTableCell>
                                <StyledTableCell align="center">Percentage</StyledTableCell>
                                <StyledTableCell align="center">Actions</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                            const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                            return (
                                <TableBody key={index}>
                                    <StyledTableRow>
                                        <StyledTableCell>{subName}</StyledTableCell>
                                        <StyledTableCell align="center">{present}</StyledTableCell>
                                        <StyledTableCell align="center">{sessions}</StyledTableCell>
                                        <StyledTableCell align="center">{subjectAttendancePercentage}%</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button variant="outlined" size="small"
                                                onClick={() => handleOpen(subId)}
                                                sx={{ fontFamily: 'Poppins', borderRadius: '8px', textTransform: 'none', mr: 1, borderColor: '#411d70', color: '#411d70', '&:hover': { backgroundColor: '#f0eaff', borderColor: '#411d70' } }}
                                            >
                                                {openStates[subId] ? <KeyboardArrowUp fontSize="small" /> : <KeyboardArrowDown fontSize="small" />} Details
                                            </Button>
                                            <Tooltip title="Delete Subject Attendance">
                                                <IconButton size="small" onClick={() => removeSubAttendance(subId)} sx={{ color: '#e73c7e', backgroundColor: '#fcecf3', mr: 1, '&:hover': { backgroundColor: '#f9d2e4' } }}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Change Attendance">
                                                <IconButton size="small" onClick={() => navigate(`/Admin/subject/student/attendance/${studentID}/${subId}`)} sx={{ color: '#411d70', backgroundColor: '#f0eaff', '&:hover': { backgroundColor: '#dccaff' } }}>
                                                    <FactCheckIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                                            <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 2, p: 2, backgroundColor: '#faf9fc', borderRadius: '8px', border: '1px solid #eee' }}>
                                                    <Typography variant="subtitle2" gutterBottom component="div" sx={{ fontFamily: 'Poppins', fontWeight: 600, color: '#2c2143' }}>
                                                        Attendance Details log
                                                    </Typography>
                                                    <Table size="small" aria-label="purchases">
                                                        <TableHead>
                                                            <StyledTableRow>
                                                                <StyledTableCell sx={{ backgroundColor: '#fff !important' }}>Date</StyledTableCell>
                                                                <StyledTableCell sx={{ backgroundColor: '#fff !important' }} align="right">Status</StyledTableCell>
                                                            </StyledTableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {allData.map((data, index) => {
                                                                const date = new Date(data.date);
                                                                const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                return (
                                                                    <StyledTableRow key={index} sx={{ backgroundColor: '#fff !important' }}>
                                                                        <StyledTableCell component="th" scope="row">
                                                                            {dateString}
                                                                        </StyledTableCell>
                                                                        <StyledTableCell align="right">
                                                                            <Typography sx={{ fontFamily: 'Poppins', fontSize: '0.85rem', fontWeight: 600, color: data.status === "Present" ? '#28a745' : '#dc3545' }}>
                                                                                {data.status}
                                                                            </Typography>
                                                                        </StyledTableCell>
                                                                    </StyledTableRow>
                                                                )
                                                            })}
                                                        </TableBody>
                                                    </Table>
                                                </Box>
                                            </Collapse>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                </TableBody>
                            )
                        })}
                    </Table>
                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button 
                            variant="contained" 
                            startIcon={<FactCheckIcon />}
                            onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}
                            sx={{ backgroundColor: '#411d70', fontFamily: 'Poppins', borderRadius: '8px', textTransform: 'none', '&:hover': { backgroundColor: '#2c2143' } }}
                        >
                            Add Attendance
                        </Button>
                        <Button 
                            variant="outlined" 
                            color="error" 
                            startIcon={<DeleteIcon />} 
                            onClick={() => removeHandler(studentID, "RemoveStudentAtten")}
                            sx={{ fontFamily: 'Poppins', borderRadius: '8px', textTransform: 'none' }}
                        >
                            Delete All
                        </Button>
                    </Box>
                </Paper>
            )
        }
        const renderChartSection = () => {
            return (
                <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', mb: 8 }}>
                    <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143', mb: 3 }}>
                        Attendance Chart
                    </Typography>
                    <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
                </Paper>
            )
        }
        return (
            <>
                {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0
                    ?
                    <>
                        {selectedSection === 'table' && renderTableSection()}
                        {selectedSection === 'chart' && renderChartSection()}

                        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderTop: '1px solid #eee', zIndex: 1000 }} elevation={3}>
                            <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels sx={{ height: 70 }}>
                                <BottomNavigationAction
                                    label={<Typography sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Table View</Typography>}
                                    value="table"
                                    icon={selectedSection === 'table' ? <TableChartIcon sx={{ color: '#411d70' }}/> : <TableChartOutlinedIcon />}
                                    sx={{ '&.Mui-selected': { color: '#411d70' } }}
                                />
                                <BottomNavigationAction
                                    label={<Typography sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Chart View</Typography>}
                                    value="chart"
                                    icon={selectedSection === 'chart' ? <InsertChartIcon sx={{ color: '#411d70' }}/> : <InsertChartOutlinedIcon />}
                                    sx={{ '&.Mui-selected': { color: '#411d70' } }}
                                />
                            </BottomNavigation>
                        </Paper>
                    </>
                    :
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4, mt: 4 }}>
                        <Typography variant="h6" sx={{ color: '#888', fontFamily: 'Poppins', mb: 3 }}>No Attendance Records Found.</Typography>
                        <Button 
                            variant="contained" 
                            startIcon={<FactCheckIcon />}
                            onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}
                            sx={{ backgroundColor: '#411d70', fontFamily: 'Poppins', borderRadius: '8px', textTransform: 'none', '&:hover': { backgroundColor: '#2c2143' } }}
                        >
                            Add Attendance
                        </Button>
                    </Box>
                }
            </>
        )
    }

    const StudentMarksSection = () => {
        const renderTableSection = () => {
            return (
                <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', mb: 8 }}>
                    <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143', mb: 3 }}>
                        Subject Marks
                    </Typography>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Subject</StyledTableCell>
                                <StyledTableCell align="center">Marks Obtained</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {subjectMarks.map((result, index) => {
                                if (!result.subName || !result.marksObtained) {
                                    return null;
                                }
                                return (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                        <StyledTableCell align="center">{result.marksObtained}</StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <Box sx={{ mt: 3 }}>
                        <Button 
                            variant="contained" 
                            startIcon={<GradeIcon />}
                            onClick={() => navigate("/Admin/students/student/marks/" + studentID)}
                            sx={{ backgroundColor: '#411d70', fontFamily: 'Poppins', borderRadius: '8px', textTransform: 'none', '&:hover': { backgroundColor: '#2c2143' } }}
                        >
                            Add Marks
                        </Button>
                    </Box>
                </Paper>
            )
        }
        const renderChartSection = () => {
            return (
                <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', mb: 8 }}>
                    <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143', mb: 3 }}>
                        Marks Chart
                    </Typography>
                    <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
                </Paper>
            )
        }
        return (
            <>
                {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0
                    ?
                    <>
                        {selectedSection === 'table' && renderTableSection()}
                        {selectedSection === 'chart' && renderChartSection()}

                        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderTop: '1px solid #eee', zIndex: 1000 }} elevation={3}>
                            <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels sx={{ height: 70 }}>
                                <BottomNavigationAction
                                    label={<Typography sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Table View</Typography>}
                                    value="table"
                                    icon={selectedSection === 'table' ? <TableChartIcon sx={{ color: '#411d70' }}/> : <TableChartOutlinedIcon />}
                                    sx={{ '&.Mui-selected': { color: '#411d70' } }}
                                />
                                <BottomNavigationAction
                                    label={<Typography sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Chart View</Typography>}
                                    value="chart"
                                    icon={selectedSection === 'chart' ? <InsertChartIcon sx={{ color: '#411d70' }}/> : <InsertChartOutlinedIcon />}
                                    sx={{ '&.Mui-selected': { color: '#411d70' } }}
                                />
                            </BottomNavigation>
                        </Paper>
                    </>
                    :
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4, mt: 4 }}>
                        <Typography variant="h6" sx={{ color: '#888', fontFamily: 'Poppins', mb: 3 }}>No Marks Records Found.</Typography>
                        <Button 
                            variant="contained" 
                            startIcon={<GradeIcon />}
                            onClick={() => navigate("/Admin/students/student/marks/" + studentID)}
                            sx={{ backgroundColor: '#411d70', fontFamily: 'Poppins', borderRadius: '8px', textTransform: 'none', '&:hover': { backgroundColor: '#2c2143' } }}
                        >
                            Add Marks
                        </Button>
                    </Box>
                }
            </>
        )
    }

    const StudentDetailsSection = () => {
        return (
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <DetailCard>
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <IconWrapper bg="#e3f2fd" color="#1e88e5">
                                    <PersonIcon sx={{ fontSize: 32 }} />
                                </IconWrapper>
                                <Box sx={{ ml: 3 }}>
                                    <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#888' }}>Full Name</Typography>
                                    <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
                                        {userDetails?.name}
                                    </Typography>
                                </Box>
                            </Box>
                            <Divider sx={{ my: 3 }} />
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconWrapper bg="#fff8e1" color="#fbc02d">
                                    <NumbersIcon sx={{ fontSize: 32 }} />
                                </IconWrapper>
                                <Box sx={{ ml: 3 }}>
                                    <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#888' }}>Roll Number</Typography>
                                    <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: 600, color: '#2c2143' }}>
                                        {userDetails?.rollNum}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </DetailCard>
                </Grid>

                <Grid item xs={12} md={6}>
                    <DetailCard>
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <IconWrapper bg="#fcecf3" color="#e73c7e">
                                    <ClassIcon sx={{ fontSize: 32 }} />
                                </IconWrapper>
                                <Box sx={{ ml: 3 }}>
                                    <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#888' }}>Assigned Class</Typography>
                                    <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
                                        {sclassName?.sclassName}
                                    </Typography>
                                </Box>
                            </Box>
                            <Divider sx={{ my: 3 }} />
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconWrapper bg="#e6f4ea" color="#28a745">
                                    <SchoolIcon sx={{ fontSize: 32 }} />
                                </IconWrapper>
                                <Box sx={{ ml: 3 }}>
                                    <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#888' }}>School</Typography>
                                    <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: 600, color: '#2c2143' }}>
                                        {studentSchool?.schoolName}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </DetailCard>
                </Grid>
                
                {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 && (
                    <Grid item xs={12}>
                        <Paper elevation={0} sx={{ p: 4, borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                            <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143', mb: 3 }}>
                                Overall Attendance
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CustomPieChart data={chartData} />
                            </Box>
                        </Paper>
                    </Grid>
                )}

                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button 
                            variant="outlined" 
                            color="error" 
                            startIcon={<DeleteIcon />} 
                            onClick={deleteHandler}
                            sx={{ fontFamily: 'Poppins', borderRadius: '8px', textTransform: 'none' }}
                        >
                            Delete Student
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        )
    }

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            {loading
                ?
                <div>Loading...</div>
                :
                <Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden', mb: 8 }}>
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
                            Student Profile
                        </Typography>
                    </Box>

                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: '#faf9fc' }}>
                            <TabList onChange={handleChange} sx={{ px: 2 }}>
                                <Tab label={<Typography sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Overview</Typography>} value="1" />
                                <Tab label={<Typography sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Attendance</Typography>} value="2" />
                                <Tab label={<Typography sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Marks</Typography>} value="3" />
                            </TabList>
                        </Box>
                        <Box sx={{ p: { xs: 2, md: 4 } }}>
                            <TabPanel value="1" sx={{ p: 0 }}>
                                <StudentDetailsSection />
                            </TabPanel>
                            <TabPanel value="2" sx={{ p: 0 }}>
                                <StudentAttendanceSection />
                            </TabPanel>
                            <TabPanel value="3" sx={{ p: 0 }}>
                                <StudentMarksSection />
                            </TabPanel>
                        </Box>
                    </TabContext>
                </Paper>
            }
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Box>
    )
}

export default ViewStudent

const DetailCard = styled(Card)`
  border-radius: 16px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03) !important;
  border: 1px solid #f0f0f0;
  height: 100%;
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background-color: ${props => props.bg};
  color: ${props => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
`;
