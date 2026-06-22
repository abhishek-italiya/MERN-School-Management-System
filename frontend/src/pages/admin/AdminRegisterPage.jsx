import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Checkbox, FormControlLabel, TextField, IconButton, InputAdornment, CircularProgress} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SchoolIcon from '@mui/icons-material/School';
import { LightPurpleButton } from '../../components/buttonStyles';
import { registerUser } from '../../redux/userRelated/userHandle';
import styled, { keyframes } from 'styled-components';
import Popup from '../../components/Popup';

const AdminRegisterPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [adminNameError, setAdminNameError] = useState(false);
    const [schoolNameError, setSchoolNameError] = useState(false);
    const role = "Admin"

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = event.target.adminName.value;
        const schoolName = event.target.schoolName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!name || !schoolName || !email || !password) {
            if (!name) setAdminNameError(true);
            if (!schoolName) setSchoolNameError(true);
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            return;
        }

        const fields = { name, email, password, role, schoolName }
        setLoader(true)
        dispatch(registerUser(fields, role))
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'adminName') setAdminNameError(false);
        if (name === 'schoolName') setSchoolNameError(false);
    };

    useEffect(() => {
        if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
            navigate('/Admin/dashboard');
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            console.log(error)
        }
    }, [status, currentUser, currentRole, navigate, error, response]);

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
                    Admin Register
                </Typography>
                <Typography variant="body2" sx={{ textAlign: 'center', color: '#666', mb: 3, fontFamily: 'Poppins', lineHeight: 1.5 }}>
                    Create your own school by registering as an admin. You will be able to add students, faculty, and manage the system.
                </Typography>

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <StyledTextField
                        margin="normal"
                        required
                        fullWidth
                        id="adminName"
                        label="Enter your name"
                        name="adminName"
                        autoComplete="name"
                        autoFocus
                        error={adminNameError}
                        helperText={adminNameError && 'Name is required'}
                        onChange={handleInputChange}
                    />
                    <StyledTextField
                        margin="normal"
                        required
                        fullWidth
                        id="schoolName"
                        label="Create your school name"
                        name="schoolName"
                        autoComplete="off"
                        error={schoolNameError}
                        helperText={schoolNameError && 'School name is required'}
                        onChange={handleInputChange}
                    />
                    <StyledTextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Enter your email"
                        name="email"
                        autoComplete="email"
                        error={emailError}
                        helperText={emailError && 'Email is required'}
                        onChange={handleInputChange}
                    />
                    <StyledTextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={toggle ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        error={passwordError}
                        helperText={passwordError && 'Password is required'}
                        onChange={handleInputChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setToggle(!toggle)}>
                                        {toggle ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, mb: 2 }}>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" sx={{ '&.Mui-checked': { color: '#7f56da' } }} />}
                            label={<Typography variant="body2" sx={{ fontFamily: 'Poppins' }}>Remember me</Typography>}
                        />
                    </Box>

                    <LightPurpleButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ py: 1.5, fontSize: '1.1rem', borderRadius: '12px', mb: 3 }}
                    >
                        {loader ? <CircularProgress size={24} color="inherit" /> : "Register"}
                    </LightPurpleButton>

                    <Typography variant="body2" sx={{ textAlign: 'center', fontFamily: 'Poppins' }}>
                        Already have an account?{' '}
                        <StyledLink to="/Adminlogin" style={{ fontWeight: 600 }}>
                            Log in
                        </StyledLink>
                    </Typography>
                </Box>
            </GlassCard>

            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </PageContainer>
    );
}

export default AdminRegisterPage;

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
