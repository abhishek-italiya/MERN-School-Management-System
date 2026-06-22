import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    Paper, Box, IconButton, Tooltip, Typography, Button,
    Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getAllNotices, updateNoticeFields, deleteNoticeItem } from '../../../redux/noticeRelated/noticeHandle';
import TableTemplate from '../../../components/TableTemplate';
import { DialogContentText } from '@mui/material';
import styled from 'styled-components';

const ShowNotices = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { noticesList, loading, error, response } = useSelector((state) => state.notice);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllNotices(currentUser._id, "Notice"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const [openEdit, setOpenEdit] = useState(false);
    const [editNoticeId, setEditNoticeId] = useState("");
    const [noticeTitle, setNoticeTitle] = useState("");
    const [noticeDetails, setNoticeDetails] = useState("");
    const [noticeDate, setNoticeDate] = useState("");
    const [dialogLoader, setDialogLoader] = useState(false);

    const [openConfirm, setOpenConfirm] = useState(false);
    const [deleteNoticeId, setDeleteNoticeId] = useState("");
    const [deleteLoader, setDeleteLoader] = useState(false);

    const handleOpenEdit = (row) => {
        setEditNoticeId(row.id);
        setNoticeTitle(row.title);
        setNoticeDetails(row.details);
        setNoticeDate(row.date);
        setOpenEdit(true);
    };

    const handleOpenConfirm = (id) => {
        setDeleteNoticeId(id);
        setOpenConfirm(true);
    };

    const handleDelete = async () => {
        setDeleteLoader(true);
        await dispatch(deleteNoticeItem(deleteNoticeId));
        setDeleteLoader(false);
        setOpenConfirm(false);
        dispatch(getAllNotices(currentUser._id, "Notice"));
    };

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = noticesList && noticesList.length > 0 && noticesList.map((notice) => {
        const date = new Date(notice.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
            title: notice.title,
            details: notice.details,
            date: dateString,
            id: notice._id,
        };
    });

    const NoticeButtonHaver = ({ row }) => {
        return (
            <ButtonContainer>
                <Tooltip title="Edit Notice">
                    <IconButton 
                        onClick={() => handleOpenEdit(row)} 
                        size="small" 
                        sx={{ color: '#ff9800', backgroundColor: '#fff3e0', '&:hover': { backgroundColor: '#ffe0b2' } }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton 
                        onClick={() => handleOpenConfirm(row.id)} 
                        size="small" 
                        sx={{ color: '#e73c7e', backgroundColor: '#fcecf3', '&:hover': { backgroundColor: '#f9d2e4' } }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
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
                            Manage Notices
                        </Typography>
                        <Button 
                            variant="contained" 
                            startIcon={<NoteAddIcon />}
                            onClick={() => navigate("/Admin/addnotice")}
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
                            Add New Notice
                        </Button>
                    </Box>

                    {response ?
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                            <Typography variant="h6" sx={{ color: '#888', fontFamily: 'Poppins' }}>No Notices Found.</Typography>
                        </Box>
                        :
                        <>
                            {Array.isArray(noticesList) && noticesList.length > 0 &&
                                <TableTemplate buttonHaver={NoticeButtonHaver} columns={noticeColumns} rows={noticeRows} />
                            }
                        </>
                    }
                </Paper>
            }

            {/* Edit Notice Dialog */}
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
                    Edit Notice Details
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={noticeTitle}
                        onChange={(e) => setNoticeTitle(e.target.value)}
                        sx={{ mt: 1, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        InputLabelProps={{ style: { fontFamily: 'Poppins' } }}
                        inputProps={{ style: { fontFamily: 'Poppins' } }}
                    />
                    <TextField
                        margin="dense"
                        label="Details"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={noticeDetails}
                        onChange={(e) => setNoticeDetails(e.target.value)}
                        sx={{ mt: 2, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        InputLabelProps={{ style: { fontFamily: 'Poppins' } }}
                        inputProps={{ style: { fontFamily: 'Poppins' } }}
                    />
                    <TextField
                        margin="dense"
                        label="Date"
                        type="date"
                        fullWidth
                        variant="outlined"
                        value={noticeDate}
                        onChange={(e) => setNoticeDate(e.target.value)}
                        sx={{ mt: 2, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        InputLabelProps={{ style: { fontFamily: 'Poppins' }, shrink: true }}
                        inputProps={{ style: { fontFamily: 'Poppins' } }}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={() => setOpenEdit(false)} sx={{ fontFamily: 'Poppins', textTransform: 'none', color: '#666', fontWeight: 600 }}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={async () => {
                            setDialogLoader(true);
                            await dispatch(updateNoticeFields(editNoticeId, { title: noticeTitle, details: noticeDetails, date: noticeDate }));
                            setDialogLoader(false);
                            setOpenEdit(false);
                            dispatch(getAllNotices(currentUser._id, "Notice"));
                        }} 
                        variant="contained"
                        disabled={dialogLoader || !noticeTitle.trim() || !noticeDetails.trim() || !noticeDate}
                        sx={{ 
                            backgroundColor: '#411d70', 
                            fontFamily: 'Poppins', 
                            borderRadius: '8px', 
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': { backgroundColor: '#2c2143' }
                        }}
                    >
                        {dialogLoader ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Confirm Delete Dialog */}
            <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
                <DialogTitle sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
                    Confirm Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontFamily: 'Poppins' }}>
                        Are you sure you want to delete this notice? This action cannot be undone.
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

export default ShowNotices;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
`;
