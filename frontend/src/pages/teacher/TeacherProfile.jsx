import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Grid, Box, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import SubjectIcon from '@mui/icons-material/MenuBook';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import WcIcon from '@mui/icons-material/Wc';

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const teachSclass = currentUser.teachSclass;
  const teachSubject = currentUser.teachSubject;
  const teachSchool = currentUser.school;

  return (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
      <StyledCard>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Avatar sx={{ 
                width: 100, 
                height: 100, 
                background: 'linear-gradient(135deg, #7f56da 0%, #e73c7e 100%)',
                color: '#fff',
                fontSize: '3rem',
                fontWeight: 'bold',
                fontFamily: 'Poppins',
                mb: 2,
                boxShadow: '0 8px 24px rgba(127, 86, 218, 0.3)'
            }}>
                {String(currentUser?.name || 'T').charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#2c2143', fontFamily: 'Poppins' }}>
                {currentUser.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#666', fontFamily: 'Poppins' }}>
                Teacher
            </Typography>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ color: '#2c2143', fontWeight: 600, mb: 3, fontFamily: 'Poppins', mt: 2 }}>
            Academic & Professional Information
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6}>
                <InfoBox>
                    <IconWrapper>
                        <AccountCircleIcon sx={{ color: '#7f56da' }} />
                    </IconWrapper>
                    <Box>
                        <Typography variant="body2" sx={{ color: '#888', fontFamily: 'Poppins' }}>Full Name</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: '#252525', fontFamily: 'Poppins' }}>{currentUser.name}</Typography>
                    </Box>
                </InfoBox>
            </Grid>
            <Grid item xs={12} sm={6}>
                <InfoBox>
                    <IconWrapper>
                        <ClassIcon sx={{ color: '#23a6d5' }} />
                    </IconWrapper>
                    <Box>
                        <Typography variant="body2" sx={{ color: '#888', fontFamily: 'Poppins' }}>Class</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: '#252525', fontFamily: 'Poppins' }}>{teachSclass?.sclassName}</Typography>
                    </Box>
                </InfoBox>
            </Grid>
            <Grid item xs={12} sm={6}>
                <InfoBox>
                    <IconWrapper>
                        <SubjectIcon sx={{ color: '#f57c00' }} />
                    </IconWrapper>
                    <Box>
                        <Typography variant="body2" sx={{ color: '#888', fontFamily: 'Poppins' }}>Subject</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: '#252525', fontFamily: 'Poppins' }}>{teachSubject?.subName}</Typography>
                    </Box>
                </InfoBox>
            </Grid>
            <Grid item xs={12} sm={6}>
                <InfoBox>
                    <IconWrapper>
                        <SchoolIcon sx={{ color: '#388e3c' }} />
                    </IconWrapper>
                    <Box>
                        <Typography variant="body2" sx={{ color: '#888', fontFamily: 'Poppins' }}>School</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: '#252525', fontFamily: 'Poppins' }}>{teachSchool?.schoolName}</Typography>
                    </Box>
                </InfoBox>
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ color: '#2c2143', fontWeight: 600, mb: 3, fontFamily: 'Poppins', mt: 4 }}>
            Personal Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <InfoBox>
                    <IconWrapper>
                        <EmailIcon sx={{ color: '#e73c7e' }} />
                    </IconWrapper>
                    <Box>
                        <Typography variant="body2" sx={{ color: '#888', fontFamily: 'Poppins' }}>Email Address</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: '#252525', fontFamily: 'Poppins' }}>{currentUser.email}</Typography>
                    </Box>
                </InfoBox>
            </Grid>
            <Grid item xs={12} sm={6}>
                <InfoBox>
                    <IconWrapper>
                        <WcIcon sx={{ color: '#9c27b0' }} />
                    </IconWrapper>
                    <Box>
                        <Typography variant="body2" sx={{ color: '#888', fontFamily: 'Poppins' }}>Gender</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: '#252525', fontFamily: 'Poppins' }}>Male</Typography>
                    </Box>
                </InfoBox>
            </Grid>
            <Grid item xs={12} sm={6}>
                <InfoBox>
                    <IconWrapper>
                        <PhoneIcon sx={{ color: '#1976d2' }} />
                    </IconWrapper>
                    <Box>
                        <Typography variant="body2" sx={{ color: '#888', fontFamily: 'Poppins' }}>Phone</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: '#252525', fontFamily: 'Poppins' }}>(123) 456-7890</Typography>
                    </Box>
                </InfoBox>
            </Grid>
            <Grid item xs={12} sm={6}>
                <InfoBox>
                    <IconWrapper>
                        <HomeIcon sx={{ color: '#795548' }} />
                    </IconWrapper>
                    <Box>
                        <Typography variant="body2" sx={{ color: '#888', fontFamily: 'Poppins' }}>Address</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: '#252525', fontFamily: 'Poppins' }}>123 Main St, City</Typography>
                    </Box>
                </InfoBox>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>
    </Box>
  )
}

export default TeacherProfile;

const StyledCard = styled(Card)`
  max-width: 800px;
  width: 100%;
  border-radius: 20px !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05) !important;
  border: 1px solid #f0f0f0;
`;

const InfoBox = styled(Box)`
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #eee;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f0f4f8;
    border-color: #d1e4f3;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  margin-right: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;
