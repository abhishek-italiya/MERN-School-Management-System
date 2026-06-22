import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Typography, Checkbox, FormControlLabel, TextField, IconButton, InputAdornment, CircularProgress, Backdrop } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SchoolIcon from '@mui/icons-material/School';
import { LightPurpleButton } from '../components/buttonStyles';
import styled, { keyframes } from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const LoginPage = ({ role }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false)
    const [guestLoader, setGuestLoader] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (role === "Student") {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const password = event.target.password.value;

            if (!rollNum || !studentName || !password) {
                if (!rollNum) setRollNumberError(true);
                if (!studentName) setStudentNameError(true);
                if (!password) setPasswordError(true);
                return;
            }
            const fields = { rollNum, studentName, password }
            setLoader(true)
            dispatch(loginUser(fields, role))
        }

        else {
            const email = event.target.email.value;
            const password = event.target.password.value;

            if (!email || !password) {
                if (!email) setEmailError(true);
                if (!password) setPasswordError(true);
                return;
            }

            const fields = { email, password }
            setLoader(true)
            dispatch(loginUser(fields, role))
        }
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'rollNumber') setRollNumberError(false);
        if (name === 'studentName') setStudentNameError(false);
    };

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
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
            setGuestLoader(false)
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

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
                    {role} Login
                </Typography>
                <Typography variant="body2" sx={{ textAlign: 'center', color: '#666', mb: 3, fontFamily: 'Poppins' }}>
                    Welcome back! Please enter your details.
                </Typography>

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    {role === "Student" ? (
                        <>
                            <StyledTextField
                                margin="normal"
                                required
                                fullWidth
                                id="rollNumber"
                                label="Enter your Roll Number"
                                name="rollNumber"
                                autoComplete="off"
                                type="number"
                                autoFocus
                                error={rollNumberError}
                                helperText={rollNumberError && 'Roll Number is required'}
                                onChange={handleInputChange}
                            />
                            <StyledTextField
                                margin="normal"
                                required
                                fullWidth
                                id="studentName"
                                label="Enter your name"
                                name="studentName"
                                autoComplete="name"
                                error={studentNameError}
                                helperText={studentNameError && 'Name is required'}
                                onChange={handleInputChange}
                            />
                        </>
                    ) : (
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
                    )}
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
                        <StyledLink to="/forgot-password">
                            Forgot password?
                        </StyledLink>
                    </Box>

                    <LightPurpleButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ py: 1.5, fontSize: '1.1rem', borderRadius: '12px', mb: 3 }}
                    >
                        {loader ? <CircularProgress size={24} color="inherit" /> : "Login"}
                    </LightPurpleButton>

                    {role === "Admin" && (
                        <Typography variant="body2" sx={{ textAlign: 'center', fontFamily: 'Poppins' }}>
                            Don't have an account?{' '}
                            <StyledLink to="/Adminregister" style={{ fontWeight: 600 }}>
                                Sign up
                            </StyledLink>
                        </Typography>
                    )}
                </Box>
            </GlassCard>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={guestLoader}
            >
                <CircularProgress color="primary" />
                <Typography sx={{ ml: 2, fontFamily: 'Poppins' }}>Please Wait...</Typography>
            </Backdrop>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </PageContainer>
    );
}

export default LoginPage;

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

const StyledTextLink = styled.span`
  text-decoration: none;
  color: #7f56da;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  cursor: pointer;
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
