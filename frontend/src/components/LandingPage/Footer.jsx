import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#252525', color: '#fff', py: 4, textAlign: 'center' }}>
      <Typography variant="body1" sx={{ fontFamily: 'Poppins', mb: 1 }}>
        &copy; {new Date().getFullYear()} School Management System
      </Typography>
      
    </Box>
  );
};

export default Footer;
