import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button, Typography } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import Students from "../../assets/students.svg";
import { LightPurpleButton } from '../buttonStyles';

const Hero = () => {
    return (
        <StyledContainer id="home" maxWidth={false}>
            <Grid container spacing={0} sx={{ height: '100%', alignItems: 'center', paddingTop: '80px' }}>
                <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
                    <AnimatedImage src={Students} alt="students" />
                </Grid>
                <Grid item xs={12} md={6} style={{ padding: '2rem' }}>
                    <StyledPaper>
                        <StyledTitle>
                            Welcome to
                            <br />
                            <GradientText>School Management</GradientText>
                            <br />
                            System
                        </StyledTitle>
                        <StyledText>
                            Streamline school management, class organization, and add students and faculty.
                            Seamlessly track attendance, assess performance, and provide feedback.
                            Access records, view marks, and communicate effortlessly.
                        </StyledText>
                        <StyledBox>
                            <StyledLink to="/choose">
                                <LightPurpleButton variant="contained" fullWidth sx={{ py: 1.5, fontSize: '1.1rem', borderRadius: '12px', boxShadow: '0 8px 16px rgba(127, 86, 218, 0.3)', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 20px rgba(127, 86, 218, 0.4)' }, mb: 3 }}>
                                    Login
                                </LightPurpleButton>
                            </StyledLink>
                            <StyledText style={{ textAlign: 'center', marginBottom: 0 }}>
                                Don't have an account?{' '}
                                <Link to="/Adminregister" style={{color:"#7f56da", fontWeight: 'bold', textDecoration: 'none'}}>
                                    Sign up
                                </Link>
                            </StyledText>
                            
                            {/* Trust Badge / Details */}
                           
                        </StyledBox>
                    </StyledPaper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Hero;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 0 !important;
  margin: 0 !important;
  background: linear-gradient(-45deg, #f3e5f5, #e1bee7, #ce93d8, #ba68c8);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
`;

const AnimatedImage = styled.img`
  width: 90%;
  max-width: 600px;
  animation: ${floatAnimation} 6s ease-in-out infinite;
  filter: drop-shadow(0px 20px 30px rgba(0, 0, 0, 0.15));
`;

const StyledPaper = styled.div`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 50px;
  margin: auto;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  }
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding-top: 16px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  padding-top: 0;
  letter-spacing: -1px;
  line-height: 1.2;
  margin-bottom: 20px;
`;

const GradientText = styled.span`
  background: -webkit-linear-gradient(45deg, #7f56da, #e73c7e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StyledText = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 1.05rem;
  color: #555;
  margin-top: 10px;
  margin-bottom: 20px; 
  letter-spacing: normal;
  line-height: 1.6;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;
