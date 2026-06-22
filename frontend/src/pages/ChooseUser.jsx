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
import { AccountCircle, School, Group } from '@mui/icons-material';
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
      <Container>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, fontWeight: 700, fontFamily: 'Poppins', color: '#252525' }}>
          Choose Your Role
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler("Admin")} style={{ height: '100%' }}>
              <GlassCard>
                <IconWrapper>
                  <AccountCircle sx={{ fontSize: 60, color: '#7f56da' }} />
                </IconWrapper>
                <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 600, mb: 1, color: '#252525' }}>
                  Admin
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#555', lineHeight: 1.6 }}>
                  Login as an administrator to access the dashboard to manage app data.
                </Typography>
              </GlassCard>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler("Student")} style={{ height: '100%' }}>
              <GlassCard>
                <IconWrapper>
                  <School sx={{ fontSize: 60, color: '#e73c7e' }} />
                </IconWrapper>
                <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 600, mb: 1, color: '#252525' }}>
                  Student
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#555', lineHeight: 1.6 }}>
                  Login as a student to explore course materials and assignments.
                </Typography>
              </GlassCard>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler("Teacher")} style={{ height: '100%' }}>
              <GlassCard>
                <IconWrapper>
                  <Group sx={{ fontSize: 60, color: '#23a6d5' }} />
                </IconWrapper>
                <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 600, mb: 1, color: '#252525' }}>
                  Teacher
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#555', lineHeight: 1.6 }}>
                  Login as a teacher to create courses, assignments, and track student progress.
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
  background: linear-gradient(-45deg, #f3e5f5, #e1bee7, #ce93d8, #ba68c8);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 40px 30px;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.7);
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(127, 86, 218, 0.1);
`;
