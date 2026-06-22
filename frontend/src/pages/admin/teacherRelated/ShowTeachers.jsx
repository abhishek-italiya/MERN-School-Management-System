import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getAllTeachers, deleteTeacherItem } from '../../../redux/teacherRelated/teacherHandle';
import {
    Paper, Table, TableBody, TableContainer,
    TableHead, TablePagination, Button, Box, IconButton, Typography, Tooltip,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import styled from 'styled-components';

const ShowTeachers = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { teachersList, loading, error, response } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getAllTeachers(currentUser._id));
    }, [currentUser._id, dispatch]);

    const [openConfirm, setOpenConfirm] = useState(false);
    const [deleteTeacherId, setDeleteTeacherId] = useState("");
    const [deleteLoader, setDeleteLoader] = useState(false);

    if (error) {
        console.log(error);
    }

    const handleOpenConfirm = (id) => {
        setDeleteTeacherId(id);
        setOpenConfirm(true);
    };

    const handleDelete = async () => {
        setDeleteLoader(true);
        await dispatch(deleteTeacherItem(deleteTeacherId));
        setDeleteLoader(false);
        setOpenConfirm(false);
        dispatch(getAllTeachers(currentUser._id));
    };

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'teachSubject', label: 'Subject', minWidth: 100 },
        { id: 'teachSclass', label: 'Class', minWidth: 170 },
    ];

    const rows = teachersList.map((teacher) => {
        return {
            name: teacher.name,
            teachSubject: teacher.teachSubject?.subName || null,
            teachSclass: teacher.teachSclass.sclassName,
            teachSclassID: teacher.teachSclass._id,
            id: teacher._id,
        };
    });

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            {loading ? 
                <Box sx={{ p: 4 }}>Loading...</Box>
                :
                <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
                            Manage Teachers
                        </Typography>
                        <Button 
                            variant="contained" 
                            startIcon={<PersonAddAlt1Icon />}
                            onClick={() => navigate("/Admin/teachers/chooseclass")}
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
                            Add New Teacher
                        </Button>
                    </Box>
                    
                    {response ? 
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                            <Typography variant="h6" sx={{ color: '#888', fontFamily: 'Poppins' }}>No Teachers Found.</Typography>
                        </Box>
                        :
                        <>
                            <TableContainer>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <StyledTableRow>
                                            {columns.map((column) => (
                                                <StyledTableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                >
                                                    {column.label}
                                                </StyledTableCell>
                                            ))}
                                            <StyledTableCell align="center">
                                                Actions
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => {
                                                return (
                                                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                        {columns.map((column) => {
                                                            const value = row[column.id];
                                                            if (column.id === 'teachSubject') {
                                                                return (
                                                                    <StyledTableCell key={column.id} align={column.align}>
                                                                        {value ? (
                                                                            <Typography sx={{ fontFamily: 'Poppins', fontWeight: 500, color: '#2c2143' }}>
                                                                                {value}
                                                                            </Typography>
                                                                        ) : (
                                                                            <Button 
                                                                                variant="outlined"
                                                                                size="small"
                                                                                startIcon={<PostAddIcon />}
                                                                                onClick={() => {
                                                                                    navigate(`/Admin/teachers/choosesubject/${row.teachSclassID}/${row.id}`)
                                                                                }}
                                                                                sx={{
                                                                                    color: '#411d70',
                                                                                    borderColor: '#411d70',
                                                                                    fontFamily: 'Poppins',
                                                                                    borderRadius: '6px',
                                                                                    textTransform: 'none',
                                                                                    '&:hover': { backgroundColor: '#f0eaff', borderColor: '#411d70' }
                                                                                }}
                                                                            >
                                                                                Assign Subject
                                                                            </Button>
                                                                        )}
                                                                    </StyledTableCell>
                                                                );
                                                            }
                                                            return (
                                                                <StyledTableCell key={column.id} align={column.align}>
                                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                                </StyledTableCell>
                                                            );
                                                        })}
                                                        <StyledTableCell align="center">
                                                            <ButtonContainer>
                                                                <Tooltip title="View Profile">
                                                                    <IconButton 
                                                                        onClick={() => navigate("/Admin/teachers/teacher/" + row.id)} 
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
                                                            </ButtonContainer>
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 100]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={(event, newPage) => setPage(newPage)}
                                onRowsPerPageChange={(event) => {
                                    setRowsPerPage(parseInt(event.target.value, 5));
                                    setPage(0);
                                }}
                                sx={{
                                    '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                                        fontFamily: 'Poppins'
                                    }
                                }}
                            />
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
                        Are you sure you want to delete this teacher? This action cannot be undone.
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

export default ShowTeachers;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
`;
