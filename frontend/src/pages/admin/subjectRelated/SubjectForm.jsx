import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress, Paper, IconButton } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Popup from '../../../components/Popup';
import styled from 'styled-components';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SubjectForm = () => {
    const [subjects, setSubjects] = useState([{ subName: "", subCode: "", sessions: "" }]);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;

    const sclassName = params.id
    const adminID = currentUser._id
    const address = "Subject"

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    const handleSubjectNameChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subName = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSubjectCodeChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subCode = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSessionsChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].sessions = event.target.value || 0;
        setSubjects(newSubjects);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { subName: "", subCode: "", sessions: "" }]);
    };

    const handleRemoveSubject = (index) => () => {
        const newSubjects = [...subjects];
        newSubjects.splice(index, 1);
        setSubjects(newSubjects);
    };

    const fields = {
        sclassName,
        subjects: subjects.map((subject) => ({
            subName: subject.subName,
            subCode: subject.subCode,
            sessions: subject.sessions,
        })),
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === 'added') {
            navigate("/Admin/subjects");
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
    }, [status, navigate, error, response, dispatch]);

    return (
        <Box sx={{ flex: '1 1 auto', alignItems: 'center', display: 'flex', justifyContent: 'center', p: 3 }}>
            <StyledPaper elevation={0}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
                    <IconWrapper>
                        <MenuBookIcon sx={{ fontSize: 32, color: '#7f56da' }} />
                    </IconWrapper>
                    <Box>
                        <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
                            Add Subjects
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#666' }}>
                            Add one or multiple subjects to this class.
                        </Typography>
                    </Box>
                </Box>
                <form onSubmit={submitHandler}>
                    <Grid container spacing={3}>
                        {subjects.map((subject, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, border: '1px solid #f0f0f0', borderRadius: '12px', backgroundColor: '#faf9fc' }}>
                                        <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600, color: '#7f56da', minWidth: '24px' }}>
                                            {index + 1}.
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={4}>
                                                <StyledTextField
                                                    fullWidth
                                                    label="Subject Name"
                                                    variant="outlined"
                                                    value={subject.subName}
                                                    onChange={handleSubjectNameChange(index)}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <StyledTextField
                                                    fullWidth
                                                    label="Subject Code"
                                                    variant="outlined"
                                                    value={subject.subCode}
                                                    onChange={handleSubjectCodeChange(index)}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <StyledTextField
                                                    fullWidth
                                                    label="Sessions"
                                                    variant="outlined"
                                                    type="number"
                                                    inputProps={{ min: 0 }}
                                                    value={subject.sessions}
                                                    onChange={handleSessionsChange(index)}
                                                    required
                                                />
                                            </Grid>
                                        </Grid>
                                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                                            {index === 0 ? (
                                                <IconButton onClick={handleAddSubject} sx={{ color: '#411d70', backgroundColor: '#f0eaff', '&:hover': { backgroundColor: '#dccaff' } }}>
                                                    <AddCircleOutlineIcon />
                                                </IconButton>
                                            ) : (
                                                <IconButton onClick={handleRemoveSubject(index)} sx={{ color: '#e73c7e', backgroundColor: '#fcecf3', '&:hover': { backgroundColor: '#f9d2e4' } }}>
                                                    <RemoveCircleOutlineIcon />
                                                </IconButton>
                                            )}
                                        </Box>
                                    </Box>
                                </Grid>
                            </React.Fragment>
                        ))}
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
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
                                        px: 3,
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
                                <Button 
                                    variant="contained" 
                                    type="submit" 
                                    disabled={loader}
                                    sx={{
                                        backgroundColor: '#411d70',
                                        color: '#fff',
                                        fontFamily: 'Poppins',
                                        fontWeight: 600,
                                        py: 1.5,
                                        px: 5,
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        '&:hover': {
                                            backgroundColor: '#2c2143'
                                        }
                                    }}
                                >
                                    {loader ? <CircularProgress size={24} color="inherit" /> : 'Save Subjects'}
                                </Button>
                            </Box>
                        </Grid>
                        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
                    </Grid>
                </form>
            </StyledPaper>
        </Box>
    );
}

export default SubjectForm

const StyledPaper = styled(Paper)`
  max-width: 800px;
  width: 100%;
  padding: 40px;
  border-radius: 20px !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05) !important;
  border: 1px solid #f0f0f0;
  background-color: #ffffff;
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f0eaff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(127, 86, 218, 0.15);
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    background-color: #ffffff;
    & fieldset {
      border-radius: 8px;
      border-color: #e0e0e0;
    }
    &.Mui-focused fieldset {
      border-color: #7f56da;
    }
  }
`;
