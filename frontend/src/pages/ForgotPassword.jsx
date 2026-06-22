import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, CircularProgress } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { LightPurpleButton } from '../components/buttonStyles';
import styled, { keyframes } from 'styled-components';
import Popup from '../components/Popup';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [emailError, setEmailError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;

        if (!email) {
            setEmailError(true);
            return;
        }

        setLoader(true);
        // Mocking an API call
        setTimeout(() => {
            setLoader(false);
            setMessage("Password reset link sent! Check your email.");
            setShowPopup(true);
        }, 1500);
    };

    const handleInputChange = (event) => {
        if (event.target.name === 'email') setEmailError(false);
    };

    return (
        <PageContainer>
            <GlassCard>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <SchoolIcon sx={{ color: '#7f56da', fontSize: 40, mr: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'Poppins', letterSpacing: '-0.5px' }}>
                        <GradientText>School</GradientText>Sync
                    </Typography>
                </Box>
                
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#252525", textAlign: 'center', mb: 1, fontFamily: 'Poppins' }}>
                    Forgot Password
                </Typography>
                <Typography variant="body2" sx={{ textAlign: 'center', color: '#666', mb: 3, fontFamily: 'Poppins', lineHeight: 1.5 }}>
                    Enter your email address and we will send you a link to reset your password.
                </Typography>

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <StyledTextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Enter your email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={emailError}
                        helperText={emailError && 'Email is required'}
                        onChange={handleInputChange}
                    />

                    <LightPurpleButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ py: 1.5, fontSize: '1.1rem', borderRadius: '12px', mb: 3, mt: 2 }}
                    >
                        {loader ? <CircularProgress size={24} color="inherit" /> : "Send Reset Link"}
                    </LightPurpleButton>

                    <Typography variant="body2" sx={{ textAlign: 'center', fontFamily: 'Poppins' }}>
                        Remember your password?{' '}
                        <StyledLink to="/choose" style={{ fontWeight: 600 }}>
                            Log in
                        </StyledLink>
                    </Typography>
                </Box>
            </GlassCard>

            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </PageContainer>
    );
};

export default ForgotPassword;

// Premium Styles
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(-45deg, #f3e5f5, #e1bee7, #ce93d8, #ba68c8);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 40px;
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
  animation: ${floatUp} 0.8s ease-out;
  margin: 20px;
`;

const GradientText = styled.span`
  background: -webkit-linear-gradient(45deg, #7f56da, #e73c7e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #7f56da;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  &:hover {
    color: #e73c7e;
  }
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    & fieldset {
      border-radius: 12px;
    }
    &.Mui-focused fieldset {
      border-color: #7f56da;
    }
  }
`;
