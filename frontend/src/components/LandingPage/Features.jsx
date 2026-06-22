import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import styled from 'styled-components';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InsightsIcon from '@mui/icons-material/Insights';

const featureList = [
  {
    title: 'User Management',
    description: 'Easily manage Admins, Teachers, and Students securely in one centralized dashboard.',
    icon: <GroupsIcon sx={{ fontSize: 60, color: '#7f56da' }} />
  },
  {
    title: 'Attendance & Marks',
    description: 'Seamlessly track daily attendance and record examination marks with just a few clicks.',
    icon: <AssignmentIcon sx={{ fontSize: 60, color: '#e73c7e' }} />
  },
  {
    title: 'Performance Analytics',
    description: 'Visualize student performance through beautiful charts and detailed feedback reports.',
    icon: <InsightsIcon sx={{ fontSize: 60, color: '#23a6d5' }} />
  },
  {
    title: 'Secure Communication',
    description: 'Built-in tools to broadcast notices and enable seamless communication between teachers and students.',
    icon: <InsightsIcon sx={{ fontSize: 60, color: '#ba68c8' }} /> // Reusing Insights or ideally another icon, but let's just use Insights or import another. Wait, I didn't import a new icon. Let's just use AssignmentIcon for now.
  },
  {
    title: 'Class Organization',
    description: 'Organize classrooms, subjects, and study materials dynamically without conflicts.',
    icon: <GroupsIcon sx={{ fontSize: 60, color: '#f5a623' }} />
  },
  {
    title: 'Instant Records Access',
    description: 'Quickly access past student records, marks, and historical data with our high-speed database.',
    icon: <AssignmentIcon sx={{ fontSize: 60, color: '#4caf50' }} />
  }
];

const Features = () => {
  return (
    <SectionContainer id="features">
      <Container>
        <Typography variant="h3" align="center" sx={{ fontFamily: 'Poppins', fontWeight: 700, mb: 6, color: '#252525' }}>
          Core Features
        </Typography>
        <Grid container spacing={4}>
          {featureList.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <GlassCard>
                <IconWrapper>
                  {feature.icon}
                </IconWrapper>
                <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 600, mb: 2, color: '#252525' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Poppins', color: '#555', lineHeight: 1.6 }}>
                  {feature.description}
                </Typography>
              </GlassCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </SectionContainer>
  );
};

export default Features;

const SectionContainer = styled.section`
  padding: 100px 0;
  background-color: #fff;
  min-height: 100vh;
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 40px 30px;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

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
