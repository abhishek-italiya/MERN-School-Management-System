import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import Popup from '../../../components/Popup';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { Box, Button, CircularProgress, Stack, TextField, Typography, Paper } from "@mui/material";
import styled from "styled-components";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AddTeacher = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const subjectID = params.id

  const { status, response, error } = useSelector(state => state.user);
  const { subjectDetails } = useSelector((state) => state.sclass);

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
  }, [dispatch, subjectID]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false)

  const role = "Teacher"
  const school = subjectDetails && subjectDetails.school
  const teachSubject = subjectDetails && subjectDetails._id
  const teachSclass = subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName._id

  const fields = { name, email, password, role, school, teachSubject, teachSclass }

  const submitHandler = (event) => {
    event.preventDefault()
    setLoader(true)
    dispatch(registerUser(fields, role))
  }

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl())
      navigate("/Admin/teachers")
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
                    Add New Teacher
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#666', mt: 1, textAlign: 'center' }}>
                    Assign a new teacher to this subject and class.
                </Typography>
            </Stack>
            
            <Box sx={{ mb: 4, p: 2, backgroundColor: '#faf9fc', borderRadius: '12px', border: '1px solid #f0f0f0' }}>
                <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#555', mb: 1 }}>
                    <strong>Subject:</strong> {subjectDetails && subjectDetails.subName}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#555' }}>
                    <strong>Class:</strong> {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}
                </Typography>
            </Box>

            <form onSubmit={submitHandler}>
                <Stack spacing={3}>
                    <StyledTextField
                        label="Teacher's Name"
                        variant="outlined"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        autoComplete="name"
                        required
                        fullWidth
                    />
                    <StyledTextField
                        label="Email Address"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="email"
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
                        {loader ? <CircularProgress size={24} color="inherit" /> : "Register Teacher"}
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

export default AddTeacher

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
