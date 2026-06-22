import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import styled from 'styled-components';

const About = () => {
  return (
    <SectionContainer id="about">
      <Container>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h3" sx={{ fontFamily: 'Poppins', fontWeight: 700, mb: 3, color: '#252525' }}>
                About Our Platform
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Poppins', color: '#555', lineHeight: 1.8, fontSize: '1.1rem', mb: 2 }}>
                We believe in empowering educational institutions with the right tools to foster a modern, digital-first learning environment. Our system simplifies daily tasks so educators can focus on what truly matters: teaching.
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Poppins', color: '#555', lineHeight: 1.8, fontSize: '1.1rem', mb: 2 }}>
                From attendance tracking to comprehensive performance analytics, we bring students, teachers, and administrators together onto a single, seamless platform.
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: 600, color: '#252525', mb: 1 }}>
                  Why Choose Us?
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#555', lineHeight: 1.8, fontSize: '1rem', mb: 1 }}>
                  • <b>Centralized Hub:</b> Manage everything from a single dashboard.
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#555', lineHeight: 1.8, fontSize: '1rem', mb: 1 }}>
                  • <b>Data Security:</b> Your school's data is protected with industry-leading encryption.
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#555', lineHeight: 1.8, fontSize: '1rem' }}>
                  • <b>Real-time Insights:</b> Instant access to student grades, attendance, and feedback.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <ImageContainer>
              {/* Using a solid elegant shape or placeholder image */}
              <GlassShape />
            </ImageContainer>
          </Grid>
        </Grid>
      </Container>
    </SectionContainer>
  );
};

export default About;

const SectionContainer = styled.section`
  padding: 100px 0;
  background-color: #fafafa;
  min-height: 80vh;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  position: relative;
`;

const GlassShape = styled.div`
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, rgba(127, 86, 218, 0.4), rgba(231, 60, 126, 0.4));
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  animation: morph 8s ease-in-out infinite;

  @keyframes morph {
    0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
    50% { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; }
    100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
  }
`;
