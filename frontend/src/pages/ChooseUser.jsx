import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Box,
  Container,
  CircularProgress,
  Backdrop,
  Typography
} from '@mui/material';
import { AccountCircle, School, Group, SupervisorAccount } from '@mui/icons-material';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const password = "zxc"

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Adminlogin');
      }
    }

    else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1"
        const studentName = "Dipesh Awasthi"
        const fields = { rollNum, studentName, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Studentlogin');
      }
    }

    else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Teacherlogin');
      }
    }

    else if (user === "Parent") {
      if (visitor === "guest") {
        const email = "parent@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Parentlogin');
      }
    }
  }

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      }
      else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      } else if (currentRole === 'Parent') {
        navigate('/Parent/dashboard');
      }
    }
    else if (status === 'error') {
      setLoader(false)
      setMessage("Network Error")
      setShowPopup(true)
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <PageContainer>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, fontWeight: 800, fontFamily: 'Poppins', color: '#1E293B' }}>
          Choose Your Role
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <div onClick={() => navigateHandler("Admin")} style={{ height: '100%' }}>
              <GlassCard>
                <IconWrapper style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)' }}>
                  <AccountCircle sx={{ fontSize: 60, color: '#4F46E5' }} />
                </IconWrapper>
                <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 600, mb: 1, color: '#1E293B' }}>
                  Admin
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#64748B', lineHeight: 1.6 }}>
                  Access management tools for students, classes, and subjects.
                </Typography>
              </GlassCard>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div onClick={() => navigateHandler("Student")} style={{ height: '100%' }}>
              <GlassCard>
                <IconWrapper style={{ backgroundColor: 'rgba(124, 58, 237, 0.1)' }}>
                  <School sx={{ fontSize: 60, color: '#7C3AED' }} />
                </IconWrapper>
                <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 600, mb: 1, color: '#1E293B' }}>
                  Student
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#64748B', lineHeight: 1.6 }}>
                  View timetables, course assignments, and academic tracking.
                </Typography>
              </GlassCard>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div onClick={() => navigateHandler("Teacher")} style={{ height: '100%' }}>
              <GlassCard>
                <IconWrapper style={{ backgroundColor: 'rgba(6, 182, 212, 0.1)' }}>
                  <Group sx={{ fontSize: 60, color: '#06B6D4' }} />
                </IconWrapper>
                <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 600, mb: 1, color: '#1E293B' }}>
                  Teacher
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#64748B', lineHeight: 1.6 }}>
                  Record attendance, grade assignments, and track class grades.
                </Typography>
              </GlassCard>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div onClick={() => navigateHandler("Parent")} style={{ height: '100%' }}>
              <GlassCard>
                <IconWrapper style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                  <SupervisorAccount sx={{ fontSize: 60, color: '#10B981' }} />
                </IconWrapper>
                <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 600, mb: 1, color: '#1E293B' }}>
                  Parent
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#64748B', lineHeight: 1.6 }}>
                  Monitor children's attendance, due fee lists, and report cards.
                </Typography>
              </GlassCard>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="primary" />
        <Typography sx={{ ml: 2, fontFamily: 'Poppins' }}>Please Wait...</Typography>
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </PageContainer>
  );
};

export default ChooseUser;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(-45deg, #EEF2FF, #E0E7FF, #C7D2FE, #EEF2FF);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 40px 20px;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(79, 70, 229, 0.1);
    background: rgba(255, 255, 255, 0.9);
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  border-radius: 50%;
`;
