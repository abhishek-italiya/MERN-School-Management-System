import React, { useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../../redux/userRelated/userHandle';
import { useNavigate } from 'react-router-dom'
import { authLogout } from '../../redux/userRelated/userSlice';
import { Button, Collapse, Card, CardContent, Typography, Grid, TextField, Box, Paper, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import styled from 'styled-components';

const AdminProfile = () => {
    const [showTab, setShowTab] = useState(false);
    const buttonText = showTab ? 'Cancel' : 'Edit profile';

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser, response, error } = useSelector((state) => state.user);
    const address = "Admin";

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState("");
    const [schoolName, setSchoolName] = useState(currentUser.schoolName);

    const fields = password === "" ? { name, email, schoolName } : { name, email, password, schoolName };

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateUser(fields, currentUser._id, address));
    };

    const deleteHandler = () => {
        try {
            dispatch(deleteUser(currentUser._id, "Students"));
            dispatch(deleteUser(currentUser._id, address));
            dispatch(authLogout());
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

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
                            {String(currentUser?.name || 'A').charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#2c2143', fontFamily: 'Poppins' }}>
                            {currentUser.name}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: '#666', fontFamily: 'Poppins' }}>
                            System Administrator
                        </Typography>
                    </Box>

                    <Grid container spacing={3} sx={{ mb: 4, px: { xs: 0, sm: 4 } }}>
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
                            <InfoBox>
                                <IconWrapper>
                                    <SchoolIcon sx={{ color: '#23a6d5' }} />
                                </IconWrapper>
                                <Box>
                                    <Typography variant="body2" sx={{ color: '#888', fontFamily: 'Poppins' }}>School Name</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#252525', fontFamily: 'Poppins' }}>{currentUser.schoolName}</Typography>
                                </Box>
                            </InfoBox>
                        </Grid>
                        <Grid item xs={12}>
                            <InfoBox>
                                <IconWrapper>
                                    <VpnKeyIcon sx={{ color: '#10B981' }} />
                                </IconWrapper>
                                <Box>
                                    <Typography variant="body2" sx={{ color: '#888', fontFamily: 'Poppins' }}>School Admin ID (Share with Parents)</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#4F46E5', fontFamily: 'Poppins', letterSpacing: '0.5px' }}>{currentUser._id}</Typography>
                                </Box>
                            </InfoBox>
                        </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
                        <Button 
                            variant="contained" 
                            color="error" 
                            onClick={deleteHandler}
                            sx={{ borderRadius: '8px', px: 3, fontFamily: 'Poppins' }}
                        >
                            Delete Account
                        </Button>
                        <Button 
                            variant="contained" 
                            sx={{ backgroundColor: "#411d70", borderRadius: '8px', px: 3, fontFamily: 'Poppins', "&:hover": { backgroundColor: "#2c2143" } }}
                            onClick={() => setShowTab(!showTab)}
                            endIcon={showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        >
                            {buttonText}
                        </Button>
                    </Box>

                    <Collapse in={showTab} timeout="auto" unmountOnExit>
                        <Paper elevation={0} sx={{ p: 3, mt: 2, borderRadius: '12px', border: '1px solid #eee', backgroundColor: '#fafafa' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#2c2143', fontWeight: 600, mb: 3, fontFamily: 'Poppins' }}>
                                Edit Details
                            </Typography>
                            <Box component="form" onSubmit={submitHandler} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <StyledTextField
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    required
                                />
                                <StyledTextField
                                    label="School Name"
                                    variant="outlined"
                                    fullWidth
                                    value={schoolName}
                                    onChange={(event) => setSchoolName(event.target.value)}
                                    required
                                />
                                <StyledTextField
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                                <StyledTextField
                                    label="New Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Leave blank to keep current"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    sx={{ mt: 2, backgroundColor: "#7f56da", borderRadius: '8px', py: 1.5, fontFamily: 'Poppins', fontWeight: 600, "&:hover": { backgroundColor: "#5a3ea1" } }}
                                >
                                    Update Profile
                                </Button>
                            </Box>
                        </Paper>
                    </Collapse>

                </CardContent>
            </StyledCard>
        </Box>
    );
};

export default AdminProfile;

const StyledCard = styled(Card)`
  max-width: 600px;
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

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    & fieldset {
      border-radius: 8px;
    }
    &.Mui-focused fieldset {
      border-color: #7f56da;
    }
  }
`;
