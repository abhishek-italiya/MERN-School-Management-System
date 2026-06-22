import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { Box, Button, CircularProgress, Stack, TextField, Typography, Paper } from '@mui/material';
import Popup from '../../../components/Popup';
import styled from "styled-components";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, error } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.user);

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const adminID = currentUser._id

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const fields = { title, details, date, adminID };
  const address = "Notice"

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === 'added') {
      navigate('/Admin/notices');
      dispatch(underControl())
    } else if (status === 'error') {
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
                    <NoteAddIcon sx={{ fontSize: 40, color: '#7f56da' }} />
                </IconWrapper>
                <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143', mt: 2 }}>
                    Create New Notice
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#666', mt: 1, textAlign: 'center' }}>
                    Publish an announcement for students and teachers.
                </Typography>
            </Stack>
            <form onSubmit={submitHandler}>
                <Stack spacing={3}>
                    <StyledTextField
                        label="Notice Title"
                        variant="outlined"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                        fullWidth
                    />
                    
                    <StyledTextField
                        label="Notice Details"
                        variant="outlined"
                        value={details}
                        onChange={(event) => setDetails(event.target.value)}
                        required
                        fullWidth
                        multiline
                        rows={4}
                    />

                    <StyledTextField
                        label="Date"
                        variant="outlined"
                        type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        required
                        fullWidth
                        InputLabelProps={{ shrink: true }}
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
                        {loader ? <CircularProgress size={24} color="inherit" /> : "Publish Notice"}
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
  );
};

export default AddNotice;

const StyledPaper = styled(Paper)`
  max-width: 500px;
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
