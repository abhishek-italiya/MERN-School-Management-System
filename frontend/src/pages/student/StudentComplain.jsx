import { useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, TextField, Typography, Paper, Container, Button } from '@mui/material';
import Popup from '../../components/Popup';
import { BlueButton } from '../../components/buttonStyles';
import { addStuff } from '../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { underControl } from '../../redux/userRelated/userSlice';

const StudentComplain = () => {
    const [complaint, setComplaint] = useState("");
    const [date, setDate] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, currentUser, error } = useSelector(state => state.user);

    const user = currentUser._id
    const school = currentUser.school._id
    const address = "Complain"

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        user,
        date,
        complaint,
        school,
    };

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === "added") {
            dispatch(underControl());
            navigate('/Student/complain');
        }
        else if (error) {
            setLoader(false)
            setShowPopup(true)
            setMessage("Network Error")
        }
    }, [status, error, navigate, dispatch])

    return (
        <>
            <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
                <Paper sx={{ p: 5, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                    <Stack spacing={1} sx={{ mb: 4 }}>
                        <Typography variant="h4" align="center" sx={{ fontFamily: 'Poppins', fontWeight: 'bold', color: '#2c2143' }}>
                            Write a Complaint
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ fontFamily: 'Poppins', color: '#666' }}>
                            We are here to help. Let us know your issue.
                        </Typography>
                    </Stack>
                    <form onSubmit={submitHandler}>
                        <Stack spacing={4}>
                            <TextField
                                fullWidth
                                label="Select Date"
                                type="date"
                                value={date}
                                onChange={(event) => setDate(event.target.value)} required
                                InputLabelProps={{
                                    shrink: true,
                                    style: { fontFamily: 'Poppins' }
                                }}
                                InputProps={{
                                    style: { fontFamily: 'Poppins' }
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            />
                            <TextField
                                fullWidth
                                label="Write your complaint"
                                variant="outlined"
                                value={complaint}
                                onChange={(event) => {
                                    setComplaint(event.target.value);
                                }}
                                required
                                multiline
                                minRows={4}
                                maxRows={8}
                                InputLabelProps={{
                                    style: { fontFamily: 'Poppins' }
                                }}
                                InputProps={{
                                    style: { fontFamily: 'Poppins' }
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            />
                        </Stack>
                        <BlueButton
                            fullWidth
                            size="large"
                            sx={{ mt: 5, mb: 2, borderRadius: 2, fontFamily: 'Poppins', fontWeight: 600, py: 1.5, fontSize: '1.1rem' }}
                            variant="contained"
                            type="submit"
                            disabled={loader}
                        >
                            {loader ? <CircularProgress size={24} color="inherit" /> : "Submit Complaint"}
                        </BlueButton>
                        <Button 
                            variant="outlined" 
                            fullWidth
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
                    </form>
                </Paper>
            </Container>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default StudentComplain;
