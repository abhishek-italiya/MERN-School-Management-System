import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import { Box, Button, Typography, Paper } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import CancelIcon from '@mui/icons-material/Cancel';
import styled from 'styled-components';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', p: 3 }}>
            <StyledPaper elevation={0}>
                <IconWrapper>
                    <LogoutIcon sx={{ fontSize: 40, color: '#e73c7e' }} />
                </IconWrapper>
                <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143', mt: 3, mb: 1, textAlign: 'center' }}>
                    {currentUser.name}
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Poppins', color: '#666', mb: 4, textAlign: 'center' }}>
                    Are you sure you want to log out of your account?
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                    <Button 
                        variant="contained" 
                        fullWidth
                        size="large"
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                        sx={{
                            backgroundColor: '#e73c7e',
                            color: '#fff',
                            fontFamily: 'Poppins',
                            fontWeight: 600,
                            borderRadius: '8px',
                            textTransform: 'none',
                            py: 1.5,
                            '&:hover': {
                                backgroundColor: '#c2185b'
                            }
                        }}
                    >
                        Yes, Log Out
                    </Button>
                    <Button 
                        variant="outlined" 
                        fullWidth
                        size="large"
                        startIcon={<CancelIcon />}
                        onClick={handleCancel}
                        sx={{
                            color: '#411d70',
                            borderColor: '#411d70',
                            fontFamily: 'Poppins',
                            fontWeight: 600,
                            borderRadius: '8px',
                            textTransform: 'none',
                            py: 1.5,
                            '&:hover': {
                                backgroundColor: '#f0eaff',
                                borderColor: '#411d70'
                            }
                        }}
                    >
                        Cancel
                    </Button>
                </Box>
            </StyledPaper>
        </Box>
    );
};

export default Logout;

const StyledPaper = styled(Paper)`
  max-width: 400px;
  width: 100%;
  padding: 40px;
  border-radius: 20px !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05) !important;
  border: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #fcecf3;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(231, 60, 126, 0.15);
`;
