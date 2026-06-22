import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper, Box, Typography, IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, CircularProgress, Button, MenuItem, Select, FormControl, InputLabel, Chip
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getAllComplains, updateComplainFields, deleteComplainItem } from '../../../redux/complainRelated/complainHandle';
import TableTemplate from '../../../components/TableTemplate';
import styled from 'styled-components';

const SeeComplains = () => {
  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector((state) => state.complain);
  const { currentUser } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const [openEdit, setOpenEdit] = useState(false);
  const [editComplainId, setEditComplainId] = useState("");
  const [complainText, setComplainText] = useState("");
  const [complainStatus, setComplainStatus] = useState("Pending");
  const [dialogLoader, setDialogLoader] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteComplainId, setDeleteComplainId] = useState("");
  const [deleteLoader, setDeleteLoader] = useState(false);

  const handleOpenEdit = (row) => {
      setEditComplainId(row.id);
      setComplainText(row.complaint);
      setComplainStatus(row.status || "Pending");
      setOpenEdit(true);
  };

  const handleOpenConfirm = (id) => {
      setDeleteComplainId(id);
      setOpenConfirm(true);
  };

  const handleDelete = async () => {
      setDeleteLoader(true);
      await dispatch(deleteComplainItem(deleteComplainId));
      setDeleteLoader(false);
      setOpenConfirm(false);
      dispatch(getAllComplains(currentUser._id, "Complain"));
  };

  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'complaint', label: 'Complaint', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

  const complainRows = complainsList && complainsList.length > 0 && complainsList.map((complain) => {
    const date = new Date(complain.date);
    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
    return {
      user: complain.user.name,
      complaint: complain.complaint,
      status: complain.status === 'Solved' ? 
              <Chip label="Solved" color="success" size="small" sx={{ fontFamily: 'Poppins', fontWeight: 600 }} /> : 
              <Chip label="Pending" color="warning" size="small" sx={{ fontFamily: 'Poppins', fontWeight: 600 }} />,
      date: dateString,
      id: complain._id,
      rawStatus: complain.status || "Pending"
    };
  });

  const ComplainButtonHaver = ({ row }) => {
    return (
        <ButtonContainer>
            <Tooltip title="Edit Complaint">
                <IconButton 
                    onClick={() => handleOpenEdit({ ...row, status: row.rawStatus })} 
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
                    Manage Complaints
                </Typography>
            </Box>

            {response ?
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <Typography variant="h6" sx={{ color: '#888', fontFamily: 'Poppins' }}>No Complaints Right Now.</Typography>
                </Box>
                :
                <>
                    {Array.isArray(complainsList) && complainsList.length > 0 &&
                        <TableTemplate buttonHaver={ComplainButtonHaver} columns={complainColumns} rows={complainRows} />
                    }
                </>
            }
        </Paper>
      }

      {/* Edit Complaint Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
              Edit Complaint
          </DialogTitle>
          <DialogContent>
              <TextField
                  margin="dense"
                  label="Complaint"
                  type="text"
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  value={complainText}
                  onChange={(e) => setComplainText(e.target.value)}
                  sx={{ mt: 2, mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                  InputLabelProps={{ style: { fontFamily: 'Poppins' } }}
                  inputProps={{ style: { fontFamily: 'Poppins' } }}
              />
              <FormControl fullWidth sx={{ mt: 1 }}>
                  <InputLabel id="status-select-label" sx={{ fontFamily: 'Poppins' }}>Status</InputLabel>
                  <Select
                      labelId="status-select-label"
                      value={complainStatus}
                      label="Status"
                      onChange={(e) => setComplainStatus(e.target.value)}
                      sx={{ borderRadius: '8px', fontFamily: 'Poppins' }}
                  >
                      <MenuItem value="Pending" sx={{ fontFamily: 'Poppins' }}>Pending</MenuItem>
                      <MenuItem value="Solved" sx={{ fontFamily: 'Poppins' }}>Solved</MenuItem>
                  </Select>
              </FormControl>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button onClick={() => setOpenEdit(false)} sx={{ fontFamily: 'Poppins', textTransform: 'none', color: '#666', fontWeight: 600 }}>
                  Cancel
              </Button>
              <Button 
                  onClick={async () => {
                      setDialogLoader(true);
                      await dispatch(updateComplainFields(editComplainId, { complaint: complainText, status: complainStatus }));
                      setDialogLoader(false);
                      setOpenEdit(false);
                      dispatch(getAllComplains(currentUser._id, "Complain"));
                  }}  
                  variant="contained"
                  disabled={dialogLoader || !complainText.trim()}
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
                  Are you sure you want to delete this complaint? This action cannot be undone.
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

export default SeeComplains;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
`;
