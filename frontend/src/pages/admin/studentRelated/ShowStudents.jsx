import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllStudents, deleteStudentItem } from '../../../redux/studentRelated/studentHandle';
import {
    Paper, Box, IconButton, Tooltip, Typography, Button, Menu, MenuItem, ListItemIcon,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import GradeIcon from '@mui/icons-material/Grade';
import TableTemplate from '../../../components/TableTemplate';
import Popup from '../../../components/Popup';
import styled from 'styled-components';

const ShowStudents = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { studentsList, loading, error, response } = useSelector((state) => state.student);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllStudents(currentUser._id));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const [openConfirm, setOpenConfirm] = useState(false);
    const [deleteStudentId, setDeleteStudentId] = useState("");
    const [deleteLoader, setDeleteLoader] = useState(false);

    const handleOpenConfirm = (id) => {
        setDeleteStudentId(id);
        setOpenConfirm(true);
    };

    const handleDelete = async () => {
        setDeleteLoader(true);
        await dispatch(deleteStudentItem(deleteStudentId));
        setDeleteLoader(false);
        setOpenConfirm(false);
        dispatch(getAllStudents(currentUser._id));
    };

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ]

    const studentRows = studentsList && studentsList.length > 0 && studentsList.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            sclassName: student.sclassName.sclassName,
            id: student._id,
        };
    })

    const StudentButtonHaver = ({ row }) => {
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };

        const handleAttendance = () => {
            handleClose();
            navigate("/Admin/students/student/attendance/" + row.id)
        }
        const handleMarks = () => {
            handleClose();
            navigate("/Admin/students/student/marks/" + row.id)
        };

        return (
            <ButtonContainer>
                <Tooltip title="View Profile">
                    <IconButton 
                        onClick={() => navigate("/Admin/students/student/" + row.id)} 
                        size="small" 
                        sx={{ color: '#411d70', backgroundColor: '#f0eaff', '&:hover': { backgroundColor: '#dccaff' } }}
                    >
                        <VisibilityIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton 
                        onClick={() => handleOpenConfirm(row.id)} 
                        size="small" 
                        sx={{ color: '#e73c7e', backgroundColor: '#fcecf3', '&:hover': { backgroundColor: '#f9d2e4' } }}
                    >
                        <PersonRemoveIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="More Actions">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ backgroundColor: '#f5f5f5', '&:hover': { backgroundColor: '#e0e0e0' } }}
                    >
                        <MoreVertIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.1))',
                            mt: 1.5,
                            borderRadius: '12px',
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleAttendance} sx={{ py: 1.5, px: 2 }}>
                        <ListItemIcon>
                            <FactCheckIcon fontSize="small" sx={{ color: '#28a745' }} />
                        </ListItemIcon>
                        <Typography sx={{ fontFamily: 'Poppins', fontWeight: 500, color: '#2c2143' }}>Take Attendance</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleMarks} sx={{ py: 1.5, px: 2 }}>
                        <ListItemIcon>
                            <GradeIcon fontSize="small" sx={{ color: '#ffc107' }} />
                        </ListItemIcon>
                        <Typography sx={{ fontFamily: 'Poppins', fontWeight: 500, color: '#2c2143' }}>Provide Marks</Typography>
                    </MenuItem>
                </Menu>
            </ButtonContainer>
        );
    };

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            {loading ?
                <div>Loading...</div>
                :
                <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
                            Manage Students
                        </Typography>
                        <Button 
                            variant="contained" 
                            startIcon={<PersonAddAlt1Icon />}
                            onClick={() => navigate("/Admin/addstudents")}
                            sx={{ 
                                backgroundColor: '#411d70', 
                                fontFamily: 'Poppins', 
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 600,
                                px: 3,
                                '&:hover': { backgroundColor: '#2c2143' }
                            }}
                        >
                            Add New Student
                        </Button>
                    </Box>
                    
                    {response ?
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                            <Typography variant="h6" sx={{ color: '#888', fontFamily: 'Poppins' }}>No Students Found.</Typography>
                        </Box>
                        :
                        <>
                            {Array.isArray(studentsList) && studentsList.length > 0 &&
                                <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
                            }
                        </>
                    }
                </Paper>
            }
            {/* Confirm Delete Dialog */}
            <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
                <DialogTitle sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
                    Confirm Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontFamily: 'Poppins' }}>
                        Are you sure you want to delete this student? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={() => setOpenConfirm(false)} sx={{ fontFamily: 'Poppins', textTransform: 'none', color: '#666', fontWeight: 600 }}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleDelete}
                        variant="contained"
                        disabled={deleteLoader}
                        sx={{ 
                            backgroundColor: '#e73c7e', 
                            fontFamily: 'Poppins', 
                            borderRadius: '8px', 
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': { backgroundColor: '#c2185b' }
                        }}
                    >
                        {deleteLoader ? <CircularProgress size={24} color="inherit" /> : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ShowStudents;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
`;
