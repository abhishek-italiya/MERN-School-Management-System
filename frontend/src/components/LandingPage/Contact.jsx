import React from 'react';
import { Container, Grid, Typography, TextField, Box } from '@mui/material';
import styled from 'styled-components';
import { LightPurpleButton } from '../buttonStyles';

const Contact = () => {
  return (
    <SectionContainer id="contact">
      <Container>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={8}>
            <GlassForm>
              <Typography variant="h3" align="center" sx={{ fontFamily: 'Poppins', fontWeight: 700, mb: 4, color: '#252525' }}>
                Contact Us
              </Typography>
              <Typography variant="body1" align="center" sx={{ fontFamily: 'Poppins', color: '#555', mb: 4 }}>
                Have questions or need support? Send us a message and our team will get back to you shortly.
              </Typography>
              <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField fullWidth label="Full Name" variant="outlined" color="secondary" />
                <TextField fullWidth label="Email Address" variant="outlined" color="secondary" type="email" />
                <TextField fullWidth label="Message" variant="outlined" color="secondary" multiline rows={4} />
                <LightPurpleButton variant="contained" size="large" sx={{ py: 1.5, fontSize: '1.1rem', borderRadius: '12px' }}>
                  Send Message
                </LightPurpleButton>
              </Box>
            </GlassForm>
          </Grid>
        </Grid>
      </Container>
    </SectionContainer>
  );
};

export default Contact;

const SectionContainer = styled.section`
  padding: 100px 0;
  background-color: #fafafa;
  min-height: 80vh;
`;

const GlassForm = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 50px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
`;
