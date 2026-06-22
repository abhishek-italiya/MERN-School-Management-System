import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Table, TableBody, TableContainer, TableHead, Typography, Paper, Button, CircularProgress } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherFreeClassSubjects } from '../../../redux/sclassRelated/sclassHandle';
import { updateTeachSubject } from '../../../redux/teacherRelated/teacherHandle';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ChooseSubject = ({ situation }) => {
    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [classID, setClassID] = useState("");
    const [teacherID, setTeacherID] = useState("");
    const [loader, setLoader] = useState(false)

    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);

    const { id, classID: paramClassID, teacherID: paramTeacherID } = params;

    useEffect(() => {
        if (situation === "Norm") {
            setClassID(id);
            dispatch(getTeacherFreeClassSubjects(id));
        }
        else if (situation === "Teacher") {
            setClassID(paramClassID);
            setTeacherID(paramTeacherID);
            dispatch(getTeacherFreeClassSubjects(paramClassID));
        }
    }, [situation, id, paramClassID, paramTeacherID, dispatch]);

    if (loading) {
        return <Box sx={{ p: 4 }}>Loading...</Box>;
    } else if (error) {
        console.log(error)
    }

    const updateSubjectHandler = (teacherId, teachSubject) => {
        setLoader(true)
        dispatch(updateTeachSubject(teacherId, teachSubject))
        navigate("/Admin/teachers")
    }

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', p: 3, borderBottom: '1px solid #eee', backgroundColor: '#faf9fc' }}>
                    <Button 
                        variant="outlined" 
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate(-1)}
                        sx={{
                            color: '#411d70',
                            borderColor: '#411d70',
                            fontFamily: 'Poppins',
                            fontWeight: 600,
                            borderRadius: '8px',
                            textTransform: 'none',
                            mr: 3,
                            '&:hover': {
                                backgroundColor: '#f0eaff',
                                borderColor: '#411d70'
                            }
                        }}
                    >
                        Back
                    </Button>
                    <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 800, color: '#2c2143' }}>
                        Choose a Subject
                    </Typography>
                </Box>

                {response ? (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                        <Box sx={{ width: 64, height: 64, borderRadius: '16px', backgroundColor: '#fff3e0', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto', mb: 2 }}>
                            <MenuBookIcon sx={{ color: '#ef6c00', fontSize: 32 }} />
                        </Box>
                        <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143', mb: 1 }}>
                            No Free Subjects Available
                        </Typography>
                        <Typography variant="body1" sx={{ fontFamily: 'Poppins', color: '#666', mb: 4 }}>
                            All subjects in this class already have teachers assigned to them.
                        </Typography>
                        <Button 
                            variant="contained"
                            startIcon={<PostAddIcon />}
                            onClick={() => navigate("/Admin/addsubject/" + classID)}
                            sx={{ 
                                backgroundColor: '#411d70', 
                                fontFamily: 'Poppins', 
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 600,
                                px: 4,
                                py: 1.5,
                                '&:hover': { backgroundColor: '#2c2143' }
                            }}
                        >
                            Add New Subject
                        </Button>
                    </Box>
                ) : (
                    <Box sx={{ p: 3 }}>
                        <TableContainer>
                            <Table aria-label="subjects table">
                                <TableHead>
                                    <StyledTableRow>
                                        <StyledTableCell align="center">#</StyledTableCell>
                                        <StyledTableCell align="center">Subject Name</StyledTableCell>
                                        <StyledTableCell align="center">Subject Code</StyledTableCell>
                                        <StyledTableCell align="center">Actions</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {Array.isArray(subjectsList) && subjectsList.length > 0 && subjectsList.map((subject, index) => (
                                        <StyledTableRow key={subject._id}>
                                            <StyledTableCell align="center" style={{ color: "#888" }}>
                                                {index + 1}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Typography sx={{ fontFamily: 'Poppins', fontWeight: 500, color: '#2c2143' }}>
                                                    {subject.subName}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{subject.subCode}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {situation === "Norm" ?
                                                    <Button 
                                                        variant="contained"
                                                        startIcon={<CheckCircleOutlineIcon />}
                                                        onClick={() => navigate("/Admin/teachers/addteacher/" + subject._id)}
                                                        sx={{ backgroundColor: '#28a745', fontFamily: 'Poppins', borderRadius: '8px', textTransform: 'none', '&:hover': { backgroundColor: '#218838' } }}
                                                    >
                                                        Select Subject
                                                    </Button>
                                                    :
                                                    <Button 
                                                        variant="contained" 
                                                        disabled={loader}
                                                        startIcon={loader ? undefined : <CheckCircleOutlineIcon />}
                                                        onClick={() => updateSubjectHandler(teacherID, subject._id)}
                                                        sx={{ backgroundColor: '#411d70', fontFamily: 'Poppins', borderRadius: '8px', textTransform: 'none', '&:hover': { backgroundColor: '#2c2143' } }}
                                                    >
                                                        {loader ? <CircularProgress size={24} color="inherit" /> : 'Assign Subject'}
                                                    </Button>
                                                }
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default ChooseSubject;
