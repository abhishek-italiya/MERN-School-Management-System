import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Stack, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Popup from "../../../components/Popup";
import Classroom from "../../../assets/classroom.png";
import styled from "styled-components";
import ClassIcon from '@mui/icons-material/Class';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AddClass = () => {
    const [sclassName, setSclassName] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error, tempDetails } = userState;

    const adminID = currentUser._id
    const address = "Sclass"

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        sclassName,
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === 'added' && tempDetails) {
            navigate("/Admin/classes/class/" + tempDetails._id)
            dispatch(underControl())
            setLoader(false)
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
    }, [status, navigate, error, response, dispatch, tempDetails]);
    
    return (
        <Box sx={{ flex: '1 1 auto', alignItems: 'center', display: 'flex', justifyContent: 'center', p: 3 }}>
            <StyledPaper elevation={0}>
                <Stack sx={{ alignItems: 'center', mb: 4 }}>
                    <IconWrapper>
                        <ClassIcon sx={{ fontSize: 40, color: '#7f56da' }} />
                    </IconWrapper>
                    <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143', mt: 2 }}>
                        Create a New Class
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#666', mt: 1, textAlign: 'center' }}>
                        Enter the name of the new class to add it to your school's system.
                    </Typography>
                </Stack>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        <StyledTextField
                            label="Class Name (e.g. Grade 10 A)"
                            variant="outlined"
                            value={sclassName}
                            onChange={(event) => setSclassName(event.target.value)}
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
                            {loader ? <CircularProgress size={24} color="inherit" /> : "Create Class"}
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

export default AddClass

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
