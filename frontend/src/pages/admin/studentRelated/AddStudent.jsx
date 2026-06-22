import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { Box, Button, CircularProgress, Stack, TextField, Typography, Paper, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import styled from "styled-components";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AddStudent = ({ situation }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const { sclassesList } = useSelector((state) => state.sclass);

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('')
    const [className, setClassName] = useState('')
    const [sclassName, setSclassName] = useState('')

    const adminID = currentUser._id
    const role = "Student"
    const attendance = []

    useEffect(() => {
        if (situation === "Class") {
            setSclassName(params.id);
        }
    }, [params.id, situation]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch]);

    const changeHandler = (event) => {
        if (event.target.value === 'Select Class') {
            setClassName('Select Class');
            setSclassName('');
        } else {
            const selectedClass = sclassesList.find(
                (classItem) => classItem.sclassName === event.target.value
            );
            setClassName(selectedClass.sclassName);
            setSclassName(selectedClass._id);
        }
    }

    const fields = { name, rollNum, password, sclassName, adminID, role, attendance }

    const submitHandler = (event) => {
        event.preventDefault()
        if (sclassName === "") {
            setMessage("Please select a classname")
            setShowPopup(true)
        }
        else {
            setLoader(true)
            dispatch(registerUser(fields, role))
        }
    }

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl())
            navigate(-1)
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
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <Box sx={{ flex: '1 1 auto', alignItems: 'center', display: 'flex', justifyContent: 'center', p: 3 }}>
            <StyledPaper elevation={0}>
                <Stack sx={{ alignItems: 'center', mb: 4 }}>
                    <IconWrapper>
                        <PersonAddAlt1Icon sx={{ fontSize: 40, color: '#7f56da' }} />
                    </IconWrapper>
                    <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143', mt: 2 }}>
                        Add New Student
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#666', mt: 1, textAlign: 'center' }}>
                        Register a new student into the system.
                    </Typography>
                </Stack>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        <StyledTextField
                            label="Student's Name"
                            variant="outlined"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            autoComplete="name"
                            required
                            fullWidth
                        />
                        
                        {situation === "Student" && (
                            <FormControl fullWidth required>
                                <InputLabel id="class-select-label">Select Class</InputLabel>
                                <Select
                                    labelId="class-select-label"
                                    id="class-select"
                                    value={className || 'Select Class'}
                                    label="Select Class"
                                    onChange={changeHandler}
                                    sx={{ borderRadius: '8px', fontFamily: 'Poppins' }}
                                >
                                    <MenuItem value="Select Class">
                                        <em>Select Class</em>
                                    </MenuItem>
                                    {sclassesList.map((classItem, index) => (
                                        <MenuItem key={index} value={classItem.sclassName}>
                                            {classItem.sclassName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}

                        <StyledTextField
                            label="Roll Number"
                            variant="outlined"
                            type="number"
                            value={rollNum}
                            onChange={(event) => setRollNum(event.target.value)}
                            required
                            fullWidth
                        />

                        <StyledTextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="new-password"
                            required
                            fullWidth
                        />

                        <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            type="submit"
                            disabled={loader}
                            sx={{
                                backgroundColor: '#411d70',
                                color: '#fff',
                                fontFamily: 'Poppins',
                                fontWeight: 600,
                                py: 1.5,
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontSize: '1rem',
                                '&:hover': {
                                    backgroundColor: '#2c2143'
                                }
                            }}
                        >
                            {loader ? <CircularProgress size={24} color="inherit" /> : "Register Student"}
                        </Button>
                        <Button 
                            variant="outlined" 
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate(-1)}
                            sx={{
                                color: '#411d70',
                                borderColor: '#411d70',
                                fontFamily: 'Poppins',
                                fontWeight: 600,
                                py: 1.5,
                                borderRadius: '8px',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#f0eaff',
                                    borderColor: '#411d70'
                                }
                            }}
                        >
                            Go Back
                        </Button>
                    </Stack>
                </form>
            </StyledPaper>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Box>
    )
}

export default AddStudent

const StyledPaper = styled(Paper)`
  max-width: 450px;
  width: 100%;
  padding: 40px;
  border-radius: 20px !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05) !important;
  border: 1px solid #f0f0f0;
  background-color: #ffffff;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #f0eaff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(127, 86, 218, 0.15);
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
