import React, { useEffect, useState } from 'react'
import { getClassStudents, getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Tab, Container, Typography, BottomNavigation, BottomNavigationAction, Paper, Grid, Card, CardContent, Divider, IconButton, Tooltip, Button } from '@mui/material';
import TableTemplate from '../../../components/TableTemplate';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import ClassIcon from '@mui/icons-material/Class';
import NumbersIcon from '@mui/icons-material/Numbers';
import EventNoteIcon from '@mui/icons-material/EventNote';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import GradeIcon from '@mui/icons-material/Grade';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from 'styled-components';

const ViewSubject = () => {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch();
  const { subloading, subjectDetails, sclassStudents, getresponse, error } = useSelector((state) => state.sclass);

  const { classID, subjectID } = params

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  if (error) {
    console.log(error)
  }

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [selectedSection, setSelectedSection] = useState('attendance');
  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const studentColumns = [
    { id: 'rollNum', label: 'Roll No.', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
  ]

  const studentRows = sclassStudents ? sclassStudents.map((student) => {
    return {
      rollNum: student.rollNum,
      name: student.name,
      id: student._id,
    };
  }) : []

  const StudentsAttendanceButtonHaver = ({ row }) => {
    return (
      <ButtonContainer>
        <Tooltip title="View Student">
          <IconButton 
            onClick={() => navigate("/Admin/students/student/" + row.id)} 
            size="small" 
            sx={{ color: '#411d70', backgroundColor: '#f0eaff', '&:hover': { backgroundColor: '#dccaff' } }}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Take Attendance">
          <IconButton 
            onClick={() => navigate(`/Admin/subject/student/attendance/${row.id}/${subjectID}`)} 
            size="small" 
            sx={{ color: '#28a745', backgroundColor: '#e6f4ea', '&:hover': { backgroundColor: '#cce8d6' } }}
          >
            <FactCheckIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </ButtonContainer>
    );
  };

  const StudentsMarksButtonHaver = ({ row }) => {
    return (
      <ButtonContainer>
        <Tooltip title="View Student">
          <IconButton 
            onClick={() => navigate("/Admin/students/student/" + row.id)} 
            size="small" 
            sx={{ color: '#411d70', backgroundColor: '#f0eaff', '&:hover': { backgroundColor: '#dccaff' } }}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Provide Marks">
          <IconButton 
            onClick={() => navigate(`/Admin/subject/student/marks/${row.id}/${subjectID}`)} 
            size="small" 
            sx={{ color: '#ffc107', backgroundColor: '#fff8e1', '&:hover': { backgroundColor: '#ffecb3' } }}
          >
            <GradeIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </ButtonContainer>
    );
  };

  const SubjectStudentsSection = () => {
    return (
      <>
        {getresponse ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4, mt: 4 }}>
            <Typography variant="h6" sx={{ color: '#888', fontFamily: 'Poppins' }}>No Students Found.</Typography>
          </Box>
        ) : (
          <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', mb: 8 }}>
            <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143', mb: 3 }}>
              Students Enrolled
            </Typography>

            {selectedSection === 'attendance' &&
              <TableTemplate buttonHaver={StudentsAttendanceButtonHaver} columns={studentColumns} rows={studentRows} />
            }
            {selectedSection === 'marks' &&
              <TableTemplate buttonHaver={StudentsMarksButtonHaver} columns={studentColumns} rows={studentRows} />
            }
          </Paper>
        )}
        
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderTop: '1px solid #eee', zIndex: 1000 }} elevation={3}>
          <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels sx={{ height: 70 }}>
            <BottomNavigationAction
              label={<Typography sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Attendance</Typography>}
              value="attendance"
              icon={selectedSection === 'attendance' ? <TableChartIcon sx={{ color: '#411d70' }}/> : <TableChartOutlinedIcon />}
              sx={{ '&.Mui-selected': { color: '#411d70' } }}
            />
            <BottomNavigationAction
              label={<Typography sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Marks</Typography>}
              value="marks"
              icon={selectedSection === 'marks' ? <InsertChartIcon sx={{ color: '#411d70' }}/> : <InsertChartOutlinedIcon />}
              sx={{ '&.Mui-selected': { color: '#411d70' } }}
            />
          </BottomNavigation>
        </Paper>
      </>
    )
  }

  const SubjectDetailsSection = () => {
    const numberOfStudents = sclassStudents ? sclassStudents.length : 0;

    return (
      <Grid container spacing={3} sx={{ mt: 1 }}>
        
        <Grid item xs={12} md={6}>
            <DetailCard>
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <IconWrapper bg="#f0eaff" color="#7f56da">
                            <MenuBookIcon />
                        </IconWrapper>
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#888' }}>Subject Name</Typography>
                            <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: 600, color: '#2c2143' }}>
                                {subjectDetails && subjectDetails.subName}
                            </Typography>
                        </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <IconWrapper bg="#fff8e1" color="#fbc02d">
                            <NumbersIcon />
                        </IconWrapper>
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#888' }}>Subject Code</Typography>
                            <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: 600, color: '#2c2143' }}>
                                {subjectDetails && subjectDetails.subCode}
                            </Typography>
                        </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconWrapper bg="#e6f4ea" color="#28a745">
                            <EventNoteIcon />
                        </IconWrapper>
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#888' }}>Sessions</Typography>
                            <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: 600, color: '#2c2143' }}>
                                {subjectDetails && subjectDetails.sessions}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </DetailCard>
        </Grid>

        <Grid item xs={12} md={6}>
            <DetailCard>
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <IconWrapper bg="#fcecf3" color="#e73c7e">
                            <ClassIcon />
                        </IconWrapper>
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#888' }}>Class</Typography>
                            <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: 600, color: '#2c2143' }}>
                                {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}
                            </Typography>
                        </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <IconWrapper bg="#e3f2fd" color="#1e88e5">
                            <PersonIcon />
                        </IconWrapper>
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#888' }}>Students Enrolled</Typography>
                            <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: 600, color: '#2c2143' }}>
                                {numberOfStudents}
                            </Typography>
                        </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconWrapper bg={subjectDetails?.teacher ? "#f0eaff" : "#fff3e0"} color={subjectDetails?.teacher ? "#7f56da" : "#ef6c00"}>
                            <PersonIcon />
                        </IconWrapper>
                        <Box sx={{ ml: 2, flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#888' }}>Teacher</Typography>
                                <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: 600, color: '#2c2143' }}>
                                    {subjectDetails?.teacher ? subjectDetails.teacher.name : "Unassigned"}
                                </Typography>
                            </Box>
                            {!subjectDetails?.teacher && (
                                <Button 
                                    variant="contained" 
                                    size="small"
                                    onClick={() => navigate("/Admin/teachers/addteacher/" + subjectDetails._id)}
                                    sx={{ backgroundColor: '#411d70', fontFamily: 'Poppins', textTransform: 'none', borderRadius: '8px' }}
                                >
                                    Assign
                                </Button>
                            )}
                        </Box>
                    </Box>
                </CardContent>
            </DetailCard>
        </Grid>
      </Grid>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {subloading ?
        <div>Loading...</div>
        :
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
                    Subject Details
                </Typography>
            </Box>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: '#faf9fc' }}>
                <TabList onChange={handleChange} sx={{ px: 2 }}>
                  <Tab label={<Typography sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Overview</Typography>} value="1" />
                  <Tab label={<Typography sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Students & Actions</Typography>} value="2" />
                </TabList>
              </Box>
              <Box sx={{ p: { xs: 2, md: 4 } }}>
                <TabPanel value="1" sx={{ p: 0 }}>
                  <SubjectDetailsSection />
                </TabPanel>
                <TabPanel value="2" sx={{ p: 0 }}>
                  <SubjectStudentsSection />
                </TabPanel>
              </Box>
            </TabContext>
        </Paper>
      }
    </Box>
  )
}

export default ViewSubject

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
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${props => props.bg};
  color: ${props => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
      font-size: 24px;
  }
`;
