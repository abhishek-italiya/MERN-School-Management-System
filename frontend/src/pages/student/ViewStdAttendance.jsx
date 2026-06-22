import React, { useEffect, useState } from 'react'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Box, Button, Collapse, Paper, Table, TableBody, TableHead, Typography, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';

import CustomBarChart from '../../components/CustomBarChart'

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const ViewStdAttendance = () => {
    const dispatch = useDispatch();

    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const attendanceBySubject = groupAttendanceBySubject(subjectAttendance)

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);

    const subjectData = Object.entries(attendanceBySubject).map(([subName, { subCode, present, sessions }]) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        return {
            subject: subName,
            attendancePercentage: subjectAttendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    });

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => {
        return (
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', fontFamily: 'Poppins', color: '#2c2143', mb: 4 }}>
                    Attendance
                </Typography>
                
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
                    <Paper sx={{ p: 3, borderRadius: 4, backgroundColor: '#f3e5f5', border: '1px solid #e1bee7', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                        <Typography variant="h6" sx={{ fontFamily: 'Poppins', color: '#7f56da', fontWeight: 600 }}>
                            Overall Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%
                        </Typography>
                    </Paper>
                </Box>

                <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Subject</StyledTableCell>
                                <StyledTableCell sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Present</StyledTableCell>
                                <StyledTableCell sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Total Sessions</StyledTableCell>
                                <StyledTableCell sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Attendance Percentage</StyledTableCell>
                                <StyledTableCell align="center" sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Actions</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        {Object.entries(attendanceBySubject).map(([subName, { present, allData, subId, sessions }], index) => {
                            const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);

                            return (
                                <TableBody key={index}>
                                    <StyledTableRow hover>
                                        <StyledTableCell sx={{ fontFamily: 'Poppins' }}>{subName}</StyledTableCell>
                                        <StyledTableCell sx={{ fontFamily: 'Poppins' }}>{present}</StyledTableCell>
                                        <StyledTableCell sx={{ fontFamily: 'Poppins' }}>{sessions}</StyledTableCell>
                                        <StyledTableCell sx={{ fontFamily: 'Poppins' }}>{subjectAttendancePercentage}%</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button variant="contained"
                                                sx={{ borderRadius: 2, fontFamily: 'Poppins', textTransform: 'none', backgroundColor: '#7f56da', '&:hover': { backgroundColor: '#6542af' } }}
                                                onClick={() => handleOpen(subId)}>
                                                {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />} Details
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                                            <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 2, p: 2, backgroundColor: '#f9f9f9', borderRadius: 2, border: '1px solid #eee' }}>
                                                    <Typography variant="h6" gutterBottom component="div" sx={{ fontFamily: 'Poppins', fontWeight: 600, color: '#2c2143' }}>
                                                        Attendance Details
                                                    </Typography>
                                                    <Table size="small" aria-label="purchases">
                                                        <TableHead>
                                                            <StyledTableRow>
                                                                <StyledTableCell sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Date</StyledTableCell>
                                                                <StyledTableCell align="right" sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Status</StyledTableCell>
                                                            </StyledTableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {allData.map((data, index) => {
                                                                const date = new Date(data.date);
                                                                const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                return (
                                                                    <StyledTableRow key={index} hover>
                                                                        <StyledTableCell component="th" scope="row" sx={{ fontFamily: 'Poppins' }}>
                                                                            {dateString}
                                                                        </StyledTableCell>
                                                                        <StyledTableCell align="right" sx={{ fontFamily: 'Poppins', color: data.status === 'Present' ? 'green' : 'red', fontWeight: 500 }}>
                                                                            {data.status}
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
                </Paper>
            </Container>
        )
    }

    const renderChartSection = () => {
        return (
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                <Paper sx={{ p: 4, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                    <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', fontFamily: 'Poppins', color: '#2c2143', mb: 4 }}>
                        Attendance Chart
                    </Typography>
                    <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
                </Paper>
            </Container>
        )
    };

    return (
        <Box sx={{ pb: 7 }}>
            {loading
                ? (
                    <Typography variant="h6" sx={{ textAlign: 'center', mt: 10, fontFamily: 'Poppins' }}>Loading...</Typography>
                )
                :
                <div>
                    {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ?
                        <>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}

                            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000, boxShadow: '0 -4px 10px rgba(0,0,0,0.05)' }} elevation={3}>
                                <BottomNavigation 
                                    value={selectedSection} 
                                    onChange={handleSectionChange} 
                                    showLabels
                                    sx={{
                                        '& .MuiBottomNavigationAction-label': {
                                            fontFamily: 'Poppins',
                                            fontWeight: 500
                                        }
                                    }}
                                >
                                    <BottomNavigationAction
                                        label="Table"
                                        value="table"
                                        icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                    />
                                    <BottomNavigationAction
                                        label="Chart"
                                        value="chart"
                                        icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                    />
                                </BottomNavigation>
                            </Paper>
                        </>
                        :
                        <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
                            <Paper sx={{ p: 5, borderRadius: 4, backgroundColor: '#fff', border: '1px solid #eee', textAlign: 'center' }}>
                                <Typography variant="h5" sx={{ fontFamily: 'Poppins', color: '#2c2143', fontWeight: 600 }}>
                                    Currently You Have No Attendance Details
                                </Typography>
                            </Paper>
                        </Box>
                    }
                </div>
            }
        </Box>
    )
}

export default ViewStdAttendance
