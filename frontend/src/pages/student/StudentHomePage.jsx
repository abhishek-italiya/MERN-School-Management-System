import React, { useEffect, useState } from 'react'
import { Container, Grid, Paper, Typography, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import SubjectIcon from '@mui/icons-material/MenuBook';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser.sclassName._id

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];
    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', fontFamily: 'Poppins', color: '#2c2143' }}>
                    Dashboard Overview
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <StatCard>
                            <IconWrapper style={{ backgroundColor: '#fff3e0', color: '#f57c00' }}>
                                <SubjectIcon sx={{ fontSize: 36 }} />
                            </IconWrapper>
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 600, fontFamily: 'Poppins', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Total Subjects
                                </Typography>
                                <Data start={0} end={numberOfSubjects} duration={2.5} />
                            </Box>
                        </StatCard>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <StatCard>
                            <IconWrapper style={{ backgroundColor: '#f3e5f5', color: '#7f56da' }}>
                                <AssignmentIcon sx={{ fontSize: 36 }} />
                            </IconWrapper>
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 600, fontFamily: 'Poppins', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Total Assignments
                                </Typography>
                                <Data start={0} end={15} duration={4} />
                            </Box>
                        </StatCard>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <StatCard>
                            <IconWrapper style={{ backgroundColor: '#e8f5e9', color: '#388e3c' }}>
                                <CheckCircleOutlineIcon sx={{ fontSize: 36 }} />
                            </IconWrapper>
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 600, fontFamily: 'Poppins', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Attendance
                                </Typography>
                                <StaticNumber>{overallAttendancePercentage}%</StaticNumber>
                            </Box>
                        </StatCard>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ 
                            p: 3, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            borderRadius: 4, 
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            border: '1px solid #eee',
                            mt: 2,
                            height: '100%'
                        }}>
                            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', fontFamily: 'Poppins', color: '#2c2143' }}>
                                Attendance Chart
                            </Typography>
                            <ChartContainer>
                                {
                                    response ?
                                        <Typography variant="h6">No Attendance Found</Typography>
                                        :
                                        <>
                                            {loading
                                                ? (
                                                    <Typography variant="h6">Loading...</Typography>
                                                )
                                                :
                                                <>
                                                    {
                                                        subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                                                            <>
                                                                <CustomPieChart data={chartData} />
                                                            </>
                                                        )
                                                            :
                                                            <Typography variant="h6">No Attendance Found</Typography>
                                                    }
                                                </>
                                            }
                                        </>
                                }
                            </ChartContainer>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ 
                            p: 3, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            borderRadius: 4, 
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            border: '1px solid #eee',
                            mt: 2,
                            height: '100%'
                        }}>
                            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', fontFamily: 'Poppins', color: '#2c2143' }}>
                                Recent Notices
                            </Typography>
                            <SeeNotice />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

const ChartContainer = styled.div`
  padding: 2px;
  display: flex;
  flex-direction: column;
  height: 240px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StatCard = styled.div`
  background: #ffffff;
  border: 1px solid #eee;
  border-radius: 20px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const IconWrapper = styled.div`
  border-radius: 50%;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Data = styled(CountUp)`
  font-size: 2rem;
  font-weight: 800;
  color: #252525;
  font-family: 'Poppins', sans-serif;
  line-height: 1.2;
`;

const StaticNumber = styled.p`
  font-size: 2rem;
  font-weight: 800;
  color: #252525;
  font-family: 'Poppins', sans-serif;
  line-height: 1.2;
  margin: 0;
`;

export default StudentHomePage
