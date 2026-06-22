import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography, Box, Paper, Grid, Card, CardContent, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ClassIcon from '@mui/icons-material/Class';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from 'styled-components';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Paper elevation={0} sx={{ p: 4, borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
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
                                '&:hover': {
                                    backgroundColor: '#f0eaff',
                                    borderColor: '#411d70'
                                }
                            }}
                        >
                            Back
                        </Button>
                        <Typography variant="h4" sx={{ fontFamily: 'Poppins', fontWeight: 800, color: '#2c2143', ml: 2 }}>
                            Teacher Profile
                        </Typography>
                    </Box>

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
                                                {teacherDetails?.name}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Divider sx={{ my: 3 }} />
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <IconWrapper bg="#fcecf3" color="#e73c7e">
                                            <ClassIcon sx={{ fontSize: 32 }} />
                                        </IconWrapper>
                                        <Box sx={{ ml: 3 }}>
                                            <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#888' }}>Assigned Class</Typography>
                                            <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: 600, color: '#2c2143' }}>
                                                {teacherDetails?.teachSclass?.sclassName}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </DetailCard>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <DetailCard>
                                <CardContent sx={{ p: 4 }}>
                                    {isSubjectNamePresent ? (
                                        <>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                                <IconWrapper bg="#f0eaff" color="#7f56da">
                                                    <MenuBookIcon sx={{ fontSize: 32 }} />
                                                </IconWrapper>
                                                <Box sx={{ ml: 3 }}>
                                                    <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#888' }}>Subject Taught</Typography>
                                                    <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
                                                        {teacherDetails?.teachSubject?.subName}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Divider sx={{ my: 3 }} />
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <IconWrapper bg="#e6f4ea" color="#28a745">
                                                    <EventNoteIcon sx={{ fontSize: 32 }} />
                                                </IconWrapper>
                                                <Box sx={{ ml: 3 }}>
                                                    <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#888' }}>Total Sessions</Typography>
                                                    <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: 600, color: '#2c2143' }}>
                                                        {teacherDetails?.teachSubject?.sessions}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </>
                                    ) : (
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '160px', textAlign: 'center' }}>
                                            <Typography variant="h6" sx={{ fontFamily: 'Poppins', color: '#888', mb: 2 }}>
                                                No Subject Assigned
                                            </Typography>
                                            <Button 
                                                variant="contained" 
                                                startIcon={<PostAddIcon />}
                                                onClick={handleAddSubject}
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
                                                Assign Subject Now
                                            </Button>
                                        </Box>
                                    )}
                                </CardContent>
                            </DetailCard>
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </Box>
    );
};

export default TeacherDetails;

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
