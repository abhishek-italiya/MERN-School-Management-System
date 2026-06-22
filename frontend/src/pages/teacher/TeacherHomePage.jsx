import { Container, Grid, Paper, Box, Typography } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import styled from 'styled-components';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const TeacherHomePage = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id;
    const subjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    const numberOfStudents = sclassStudents?.length || 0;
    const numberOfSessions = subjectDetails?.sessions || 0;

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', fontFamily: 'Poppins', color: '#2c2143' }}>
                    Dashboard Overview
                </Typography>
                <Grid container spacing={4}>

                    {/* Class Students - Keep CountUp */}
                    <Grid item xs={12} sm={4}>
                        <StatCard>
                            <IconWrapper style={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}>
                                <PeopleAltIcon sx={{ fontSize: 36 }} />
                            </IconWrapper>
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 600, fontFamily: 'Poppins', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Class Students
                                </Typography>
                                <Data start={0} end={numberOfStudents} duration={2.5} />
                            </Box>
                        </StatCard>
                    </Grid>

                    {/* Total Lessons - Keep CountUp */}
                    <Grid item xs={12} sm={4}>
                        <StatCard>
                            <IconWrapper style={{ backgroundColor: '#f3e5f5', color: '#7f56da' }}>
                                <ClassIcon sx={{ fontSize: 36 }} />
                            </IconWrapper>
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 600, fontFamily: 'Poppins', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Total Lessons
                                </Typography>
                                <Data start={0} end={numberOfSessions} duration={2.5} />
                            </Box>
                        </StatCard>
                    </Grid>

                    {/* Tests Taken - REMOVE CountUp */}
                    <Grid item xs={12} sm={4}>
                        <StatCard>
                            <IconWrapper style={{ backgroundColor: '#fff3e0', color: '#f57c00' }}>
                                <AssignmentIcon sx={{ fontSize: 36 }} />
                            </IconWrapper>
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 600, fontFamily: 'Poppins', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Tests Taken
                                </Typography>
                                <StaticNumber>24</StaticNumber>
                            </Box>
                        </StatCard>
                    </Grid>

                    {/* Total Hours - REMOVE CountUp */}
                    <Grid item xs={12} sm={4}>
                        <StatCard>
                            <IconWrapper style={{ backgroundColor: '#e8f5e9', color: '#388e3c' }}>
                                <AccessTimeIcon sx={{ fontSize: 36 }} />
                            </IconWrapper>
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 600, fontFamily: 'Poppins', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Total Hours
                                </Typography>
                                <StaticNumber>30 hrs</StaticNumber>
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
                                Recent Notices
                            </Typography>
                            <SeeNotice />
                        </Paper>
                    </Grid>

                </Grid>
            </Container>
        </>
    )
};

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

/* Static number without CountUp */
const StaticNumber = styled.p`
  font-size: 2rem;
  font-weight: 800;
  color: #252525;
  font-family: 'Poppins', sans-serif;
  line-height: 1.2;
  margin: 0;
`;

export default TeacherHomePage;
