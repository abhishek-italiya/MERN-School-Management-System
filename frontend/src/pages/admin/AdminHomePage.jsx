import { Container, Grid, Paper, Box, Typography, Button } from '@mui/material';
import TableViewTemplate from '../../components/TableViewTemplate';
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSclasses, getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';
import { getAllNotices } from '../../redux/noticeRelated/noticeHandle';
import { getAllComplains } from '../../redux/complainRelated/complainHandle';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ClassIcon from '@mui/icons-material/Class';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ReportIcon from '@mui/icons-material/Report';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const [showAllNotices, setShowAllNotices] = useState(false);
    const [showAllComplains, setShowAllComplains] = useState(false);
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList, subjectsList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);
    const { noticesList } = useSelector((state) => state.notice);
    const { complainsList } = useSelector((state) => state.complain);
    const { currentUser } = useSelector(state => state.user);

    const adminID = currentUser._id;

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
        dispatch(getSubjectList(adminID, "AllSubjects"));
        dispatch(getAllNotices(adminID, "Notice"));
        dispatch(getAllComplains(adminID, "Complain"));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList?.length || 0;
    const numberOfClasses = sclassesList?.length || 0;
    const numberOfTeachers = teachersList?.length || 0;
    const numberOfSubjects = subjectsList?.length || 0;
    const numberOfNotices = noticesList?.length || 0;
    const numberOfComplains = complainsList?.length || 0;

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = Array.isArray(noticesList) && noticesList.length > 0 ? noticesList.map((notice) => {
        const date = new Date(notice.date);
        const dateString = isNaN(date.getTime()) ? "Invalid Date" : date.toISOString().substring(0, 10);
        return {
            title: notice.title,
            details: notice.details,
            date: dateString,
            id: notice._id,
        };
    }) : [];

    const complainColumns = [
        { id: 'user', label: 'User', minWidth: 170 },
        { id: 'complaint', label: 'Complaint', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const complainRows = Array.isArray(complainsList) && complainsList.length > 0 ? complainsList.map((complain) => {
        const date = new Date(complain.date);
        const dateString = isNaN(date.getTime()) ? "Invalid Date" : date.toISOString().substring(0, 10);
        return {
            user: complain.user?.name || '',
            complaint: complain.complaint,
            date: dateString,
            id: complain._id,
        };
    }) : [];

    const displayedNoticeRows = showAllNotices ? noticeRows : noticeRows.slice(0, 5);
    const displayedComplainRows = showAllComplains ? complainRows : complainRows.slice(0, 5);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', fontFamily: 'Poppins', color: '#2c2143' }}>
                Dashboard Overview
            </Typography>
            <Grid container spacing={4}>
                {/* Students */}
                <Grid item xs={12} sm={4}>
                    <StatCard>
                        <IconWrapper style={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}>
                            <PeopleAltIcon sx={{ fontSize: 36 }} />
                        </IconWrapper>
                        <Box>
                            <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 600, fontFamily: 'Poppins', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                Total Students
                            </Typography>
                            <Data start={0} end={numberOfStudents} duration={2.5} />
                        </Box>
                    </StatCard>
                </Grid>

                {/* Classes */}
                <Grid item xs={12} sm={4}>
                    <StatCard>
                        <IconWrapper style={{ backgroundColor: '#f3e5f5', color: '#7f56da' }}>
                            <ClassIcon sx={{ fontSize: 36 }} />
                        </IconWrapper>
                        <Box>
                            <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 600, fontFamily: 'Poppins', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                Total Classes
                            </Typography>
                            <Data start={0} end={numberOfClasses} duration={2.5} />
                        </Box>
                    </StatCard>
                </Grid>

                {/* Teachers */}
                <Grid item xs={12} sm={4}>
                    <StatCard>
                        <IconWrapper style={{ backgroundColor: '#e8f5e9', color: '#388e3c' }}>
                            <SchoolIcon sx={{ fontSize: 36 }} />
                        </IconWrapper>
                        <Box>
                            <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 600, fontFamily: 'Poppins', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                Total Teachers
                            </Typography>
                            <Data start={0} end={numberOfTeachers} duration={2.5} />
                        </Box>
                    </StatCard>
                </Grid>

                {/* Subjects */}
                <Grid item xs={12} sm={4}>
                    <StatCard>
                        <IconWrapper style={{ backgroundColor: '#fff3e0', color: '#f57c00' }}>
                            <AssignmentIcon sx={{ fontSize: 36 }} />
                        </IconWrapper>
                        <Box>
                            <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 600, fontFamily: 'Poppins', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                Total Subjects
                            </Typography>
                            <Data start={0} end={numberOfSubjects} duration={2.5} />
                        </Box>
                    </StatCard>
                </Grid>

                {/* Notices */}
                <Grid item xs={12} sm={4}>
                    <StatCard>
                        <IconWrapper style={{ backgroundColor: '#e0f7fa', color: '#0097a7' }}>
                            <AnnouncementOutlinedIcon sx={{ fontSize: 36 }} />
                        </IconWrapper>
                        <Box>
                            <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 600, fontFamily: 'Poppins', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                Total Notices
                            </Typography>
                            <Data start={0} end={numberOfNotices} duration={2.5} />
                        </Box>
                    </StatCard>
                </Grid>

                {/* Complains */}
                <Grid item xs={12} sm={4}>
                    <StatCard>
                        <IconWrapper style={{ backgroundColor: '#fce4ec', color: '#c2185b' }}>
                            <ReportIcon sx={{ fontSize: 36 }} />
                        </IconWrapper>
                        <Box>
                            <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 600, fontFamily: 'Poppins', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                Total Complaints
                            </Typography>
                            <Data start={0} end={numberOfComplains} duration={2.5} />
                        </Box>
                    </StatCard>
                </Grid>

                {/* Notices List */}
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
                        {noticeRows.length > 0 ? (
                            <TableViewTemplate columns={noticeColumns} rows={displayedNoticeRows} hidePagination={true} />
                        ) : (
                            <Typography variant="subtitle1" sx={{ color: '#666', fontFamily: 'Poppins' }}>
                                No Notices Right Now
                            </Typography>
                        )}
                        {noticeRows.length > 5 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                                <Button variant="outlined" onClick={() => setShowAllNotices(!showAllNotices)}>
                                    {showAllNotices ? 'Show Less' : 'View All'}
                                </Button>
                            </Box>
                        )}
                    </Paper>
                </Grid>

                {/* Complains List */}
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
                            Recent Complaints
                        </Typography>
                        {complainRows.length > 0 ? (
                            <TableViewTemplate columns={complainColumns} rows={displayedComplainRows} hidePagination={true} />
                        ) : (
                            <Typography variant="subtitle1" sx={{ color: '#666', fontFamily: 'Poppins' }}>
                                No Complaints Right Now
                            </Typography>
                        )}
                        {complainRows.length > 5 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                                <Button variant="outlined" onClick={() => setShowAllComplains(!showAllComplains)}>
                                    {showAllComplains ? 'Show Less' : 'View All'}
                                </Button>
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
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

export default AdminHomePage;
