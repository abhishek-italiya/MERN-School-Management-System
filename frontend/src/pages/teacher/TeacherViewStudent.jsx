import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Collapse, Table, TableBody, TableHead, Typography, Tab, Paper, BottomNavigation, BottomNavigationAction, Container, Grid, Card, CardContent, Divider, Tooltip } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { StyledTableCell, StyledTableRow } from '../../components/styles';
import styled from 'styled-components';

import PersonIcon from '@mui/icons-material/Person';
import ClassIcon from '@mui/icons-material/Class';
import SchoolIcon from '@mui/icons-material/School';
import NumbersIcon from '@mui/icons-material/Numbers';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import GradeIcon from '@mui/icons-material/Grade';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';

const TeacherViewStudent = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { currentUser, userDetails, response, loading, error } = useSelector((state) => state.user);

    const studentID = params.id;
    const address = "Student";
    const teachSubject = currentUser.teachSubject?.subName;
    const teachSubjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [openStates, setOpenStates] = useState({});
    const [tabValue, setTabValue] = useState('1');
    const [selectedSection, setSelectedSection] = useState('table');

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    useEffect(() => {
        if (userDetails) {
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

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
            </Grid>
        );
    };

    const StudentAttendanceSection = () => {
        const renderTableSection = () => {
            return (
                <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', mb: 8 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
                            Attendance Records
                        </Typography>
                        <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: 600, color: '#411d70' }}>
                            Subject: {teachSubject}
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
                        <TableBody>
                            {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                if (subName === teachSubject) {
                                    const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                                    return (
                                        <React.Fragment key={index}>
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
                                                </StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow>
                                                <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                                                    <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                        <Box sx={{ margin: 2, p: 2, backgroundColor: '#faf9fc', borderRadius: '8px', border: '1px solid #eee' }}>
                                                            <Typography variant="subtitle2" gutterBottom component="div" sx={{ fontFamily: 'Poppins', fontWeight: 600, color: '#2c2143' }}>
                                                                Attendance Details Log
                                                            </Typography>
                                                            <Table size="small">
                                                                <TableHead>
                                                                    <StyledTableRow>
                                                                        <StyledTableCell sx={{ backgroundColor: '#fff !important' }}>Date</StyledTableCell>
                                                                        <StyledTableCell sx={{ backgroundColor: '#fff !important' }} align="right">Status</StyledTableCell>
                                                                    </StyledTableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {allData.map((data, idx) => {
                                                                        const date = new Date(data.date);
                                                                        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                        return (
                                                                            <StyledTableRow key={idx} sx={{ backgroundColor: '#fff !important' }}>
                                                                                <StyledTableCell component="th" scope="row">
                                                                                    {dateString}
                                                                                </StyledTableCell>
                                                                                <StyledTableCell align="right">
                                                                                    <Typography sx={{ fontFamily: 'Poppins', fontSize: '0.85rem', fontWeight: 600, color: data.status === "Present" ? '#28a745' : '#dc3545' }}>
                                                                                        {data.status}
                                                                                    </Typography>
                                                                                </StyledTableCell>
                                                                            </StyledTableRow>
                                                                        );
                                                                    })}
                                                                </TableBody>
                                                            </Table>
                                                        </Box>
                                                    </Collapse>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        </React.Fragment>
                                    );
                                }
                                return null;
                            })}
                        </TableBody>
                    </Table>
                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button 
                            variant="contained" 
                            startIcon={<FactCheckIcon />}
                            onClick={() => navigate(`/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`)}
                            sx={{ backgroundColor: '#411d70', fontFamily: 'Poppins', borderRadius: '8px', textTransform: 'none', '&:hover': { backgroundColor: '#2c2143' } }}
                        >
                            Add Attendance
                        </Button>
                    </Box>
                </Paper>
            );
        };
        
        const renderChartSection = () => {
            const teachSubjectData = Object.entries(groupAttendanceBySubject(subjectAttendance))
                .filter(([subName]) => subName === teachSubject)
                .map(([subName, { present, sessions }]) => {
                    const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                    return {
                        name: 'Present',
                        value: subjectAttendancePercentage
                    };
                });

            const presentVal = teachSubjectData[0]?.value || 0;
            const absentVal = 100 - presentVal;

            const chartDataFiltered = [
                { name: 'Present', value: presentVal },
                { name: 'Absent', value: absentVal }
            ];

            return (
                <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', mb: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143', mb: 3 }}>
                        Attendance Chart ({teachSubject})
                    </Typography>
                    <CustomPieChart data={chartDataFiltered} />
                </Paper>
            );
        };

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
                            onClick={() => navigate(`/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`)}
                            sx={{ backgroundColor: '#411d70', fontFamily: 'Poppins', borderRadius: '8px', textTransform: 'none', '&:hover': { backgroundColor: '#2c2143' } }}
                        >
                            Add Attendance
                        </Button>
                    </Box>
                }
            </>
        );
    };

    const StudentMarksSection = () => {
        const hasMarks = subjectMarks && Array.isArray(subjectMarks) && subjectMarks.some(res => res.subName?.subName === teachSubject);

        return (
            <>
                {hasMarks
                    ?
                    <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', mb: 8 }}>
                        <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143', mb: 3 }}>
                            Subject Marks
                        </Typography>
                        <Table sx={{ mb: 3 }}>
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell>Subject</StyledTableCell>
                                    <StyledTableCell align="center">Marks Obtained</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {subjectMarks.map((result, index) => {
                                    if (result.subName?.subName === teachSubject) {
                                        return (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                                <StyledTableCell align="center">{result.marksObtained}</StyledTableCell>
                                            </StyledTableRow>
                                        );
                                    }
                                    return null;
                                })}
                            </TableBody>
                        </Table>
                        <Box sx={{ mt: 3 }}>
                            <Button 
                                variant="contained" 
                                startIcon={<GradeIcon />}
                                onClick={() => navigate(`/Teacher/class/student/marks/${studentID}/${teachSubjectID}`)}
                                sx={{ backgroundColor: '#411d70', fontFamily: 'Poppins', borderRadius: '8px', textTransform: 'none', '&:hover': { backgroundColor: '#2c2143' } }}
                            >
                                Add Marks
                            </Button>
                        </Box>
                    </Paper>
                    :
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4, mt: 4 }}>
                        <Typography variant="h6" sx={{ color: '#888', fontFamily: 'Poppins', mb: 3 }}>No Marks Records Found.</Typography>
                        <Button 
                            variant="contained" 
                            startIcon={<GradeIcon />}
                            onClick={() => navigate(`/Teacher/class/student/marks/${studentID}/${teachSubjectID}`)}
                            sx={{ backgroundColor: '#411d70', fontFamily: 'Poppins', borderRadius: '8px', textTransform: 'none', '&:hover': { backgroundColor: '#2c2143' } }}
                        >
                            Add Marks
                        </Button>
                    </Box>
                }
            </>
        );
    };

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

                    <TabContext value={tabValue}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: '#faf9fc' }}>
                            <TabList onChange={handleTabChange} sx={{ px: 2 }}>
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
        </Box>
    );
};

export default TeacherViewStudent;

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
