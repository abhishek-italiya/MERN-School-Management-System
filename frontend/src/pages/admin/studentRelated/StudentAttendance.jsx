import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';

import {
    Box, InputLabel,
    MenuItem, Select,
    Typography, Stack,
    TextField, CircularProgress, FormControl, Paper, IconButton, Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PurpleButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';

const StudentAttendance = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams()
    const navigate = useNavigate();

    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [chosenSubName, setChosenSubName] = useState("");
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        if (situation === "Student") {
            setStudentID(params.id);
            const stdID = params.id
            dispatch(getUserDetails(stdID, "Student"));
        }
        else if (situation === "Subject") {
            const { studentID, subjectID } = params
            setStudentID(studentID);
            dispatch(getUserDetails(studentID, "Student"));
            setChosenSubName(subjectID);
        }
    }, [situation]);

    useEffect(() => {
        if (userDetails && userDetails.sclassName && situation === "Student") {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

    const changeHandler = (event) => {
        const selectedSubject = subjectsList.find(
            (subject) => subject.subName === event.target.value
        );
        setSubjectName(selectedSubject.subName);
        setChosenSubName(selectedSubject._id);
    }

    const fields = { subName: chosenSubName, status, date }

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(updateStudentFields(studentID, fields, "StudentAttendance"))
    }

    useEffect(() => {
        if (response) {
            setLoader(false)
            setShowPopup(true)
            setMessage(response)
        }
        else if (error) {
            setLoader(false)
            setShowPopup(true)
            setMessage("error")
        }
        else if (statestatus === "added") {
            setLoader(false)
            setShowPopup(true)
            setMessage("Done Successfully")
        }
    }, [response, statestatus, error])

    return (
        <>
            {loading
                ?
                <>
                    <div>Loading...</div>
                </>
                :
                <>
                    <Box sx={{ p: { xs: 2, md: 4 } }}>
                        <Paper elevation={0} sx={{ p: 4, borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', maxWidth: 600, mx: 'auto' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <IconButton onClick={() => navigate(-1)} sx={{ mr: 2, backgroundColor: '#f5f5f5', '&:hover': { backgroundColor: '#e0e0e0' } }}>
                                    <ArrowBackIcon />
                                </IconButton>
                                <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
                                    Take Attendance
                                </Typography>
                            </Box>

                            <Stack spacing={1} sx={{ mb: 4, backgroundColor: '#f8f9fa', p: 2, borderRadius: '8px' }}>
                                <Typography variant="subtitle1" sx={{ fontFamily: 'Poppins', color: '#444' }}>
                                    <strong>Student Name:</strong> {userDetails.name}
                                </Typography>
                                {currentUser.teachSubject &&
                                    <Typography variant="subtitle1" sx={{ fontFamily: 'Poppins', color: '#444' }}>
                                        <strong>Subject Name:</strong> {currentUser.teachSubject?.subName}
                                    </Typography>
                                }
                            </Stack>

                            <form onSubmit={submitHandler}>
                                <Stack spacing={3}>
                                    {
                                        situation === "Student" &&
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label" sx={{ fontFamily: 'Poppins' }}>Select Subject</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={subjectName}
                                                label="Choose an option"
                                                onChange={changeHandler} required
                                                sx={{ '& .MuiOutlinedInput-notchedOutline': { borderRadius: '8px' }, fontFamily: 'Poppins' }}
                                            >
                                                {subjectsList ?
                                                    subjectsList.map((subject, index) => (
                                                        <MenuItem key={index} value={subject.subName} sx={{ fontFamily: 'Poppins' }}>
                                                            {subject.subName}
                                                        </MenuItem>
                                                    ))
                                                    :
                                                    <MenuItem value="Select Subject" sx={{ fontFamily: 'Poppins' }}>
                                                        Add Subjects For Attendance
                                                    </MenuItem>
                                                }
                                            </Select>
                                        </FormControl>
                                    }
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" sx={{ fontFamily: 'Poppins' }}>Attendance Status</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={status}
                                            label="Choose an option"
                                            onChange={(event) => setStatus(event.target.value)}
                                            required
                                            sx={{ '& .MuiOutlinedInput-notchedOutline': { borderRadius: '8px' }, fontFamily: 'Poppins' }}
                                        >
                                            <MenuItem value="Present" sx={{ fontFamily: 'Poppins' }}>Present</MenuItem>
                                            <MenuItem value="Absent" sx={{ fontFamily: 'Poppins' }}>Absent</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <TextField
                                            label="Select Date"
                                            type="date"
                                            value={date}
                                            onChange={(event) => setDate(event.target.value)} required
                                            InputLabelProps={{
                                                shrink: true,
                                                style: { fontFamily: 'Poppins' }
                                            }}
                                            inputProps={{ style: { fontFamily: 'Poppins' } }}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                                        />
                                    </FormControl>
                                </Stack>

                                <Button
                                    fullWidth
                                    size="large"
                                    sx={{ 
                                        mt: 4, 
                                        backgroundColor: '#411d70', 
                                        fontFamily: 'Poppins', 
                                        borderRadius: '8px', 
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        '&:hover': { backgroundColor: '#2c2143' }
                                    }}
                                    variant="contained"
                                    type="submit"
                                    disabled={loader}
                                >
                                    {loader ? <CircularProgress size={24} color="inherit" /> : "Submit Attendance"}
                                </Button>
                            </form>
                        </Paper>
                    </Box>
                    <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
                </>
            }
        </>
    )
}

export default StudentAttendance
