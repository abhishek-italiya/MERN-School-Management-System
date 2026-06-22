import { useEffect, useState } from 'react';
import { IconButton, Box, Menu, MenuItem, ListItemIcon, Tooltip, Typography, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, CircularProgress } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllSclasses, updateSclassFields, deleteSclassItem } from '../../../redux/sclassRelated/sclassHandle';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';

import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddCardIcon from '@mui/icons-material/AddCard';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import styled from 'styled-components';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';

const ShowClasses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user);

  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  if (error) {
    console.log(error);
  }

  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteAddress, setDeleteAddress] = useState("");
  const [deleteLoader, setDeleteLoader] = useState(false);

  const deleteHandler = (deleteID, address) => {
    setDeleteId(deleteID);
    setDeleteAddress(address);
    setOpenConfirm(true);
  }

  const handleDelete = async () => {
    setDeleteLoader(true);
    await dispatch(deleteSclassItem(deleteId, deleteAddress));
    setDeleteLoader(false);
    setOpenConfirm(false);
    dispatch(getAllSclasses(adminID, "Sclass"));
  }

  const sclassColumns = [
    { id: 'name', label: 'Class Name', minWidth: 170 },
  ];

  const sclassRows = sclassesList && sclassesList.length > 0 && sclassesList.map((sclass) => {
    return {
      name: sclass.sclassName,
      id: sclass._id,
    };
  });

  const SclassButtonHaver = ({ row }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [className, setClassName] = useState(row.name);
    const [dialogLoader, setDialogLoader] = useState(false);

    const handleOpen = () => setOpenDialog(true);
    const handleClose = () => {
      setOpenDialog(false);
      setClassName(row.name);
    };

    const handleSave = async () => {
      setDialogLoader(true);
      await dispatch(updateSclassFields(row.id, { sclassName: className }));
      setDialogLoader(false);
      handleClose();
      dispatch(getAllSclasses(adminID, "Sclass"));
    };

    const actions = [
      { icon: <PostAddIcon fontSize="small" sx={{ color: '#23a6d5' }}/>, name: 'Add Subjects', action: () => navigate("/Admin/addsubject/" + row.id) },
      { icon: <PersonAddAlt1Icon fontSize="small" sx={{ color: '#e73c7e' }}/>, name: 'Add Student', action: () => navigate("/Admin/class/addstudents/" + row.id) },
    ];
    return (
      <ButtonContainer>
        <Tooltip title="View Details">
          <IconButton 
            onClick={() => navigate("/Admin/classes/class/" + row.id)} 
            size="small" 
            sx={{ color: '#411d70', backgroundColor: '#f0eaff', '&:hover': { backgroundColor: '#dccaff' } }}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit Class Name">
          <IconButton 
            onClick={handleOpen} 
            size="small" 
            sx={{ color: '#ff9800', backgroundColor: '#fff3e0', '&:hover': { backgroundColor: '#ffe0b2' } }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton 
            onClick={() => deleteHandler(row.id, "Sclass")} 
            size="small" 
            sx={{ color: '#e73c7e', backgroundColor: '#fcecf3', '&:hover': { backgroundColor: '#f9d2e4' } }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <ActionMenu actions={actions} />

        <Dialog open={openDialog} onClose={handleClose} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
            Edit Class Name
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Class Name"
              type="text"
              fullWidth
              variant="outlined"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              sx={{ mt: 1, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              InputLabelProps={{ style: { fontFamily: 'Poppins' } }}
              inputProps={{ style: { fontFamily: 'Poppins' } }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleClose} sx={{ fontFamily: 'Poppins', textTransform: 'none', color: '#666', fontWeight: 600 }}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              variant="contained"
              disabled={dialogLoader || !className.trim()}
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
      </ButtonContainer>
    );
  };

  const ActionMenu = ({ actions }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <>
        <Tooltip title="More Actions">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ backgroundColor: '#f5f5f5', '&:hover': { backgroundColor: '#e0e0e0' } }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: styles.styledPaper,
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {actions.map((action, index) => (
            <MenuItem key={index} onClick={action.action} sx={{ py: 1.5, px: 2 }}>
              <ListItemIcon>
                {action.icon}
              </ListItemIcon>
              <Typography sx={{ fontFamily: 'Poppins', fontWeight: 500, color: '#2c2143' }}>
                {action.name}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }

  const actions = [
    {
      icon: <AddCardIcon color="primary" />, name: 'Add New Class',
      action: () => navigate("/Admin/addclass")
    },
    {
      icon: <DeleteIcon color="error" />, name: 'Delete All Classes',
      action: () => deleteHandler(adminID, "Sclasses")
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {loading ?
        <Box sx={{ p: 4 }}>Loading...</Box>
        :
        <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
              Manage Classes
            </Typography>
            <Button 
                variant="contained" 
                startIcon={<AddCardIcon />}
                onClick={() => navigate("/Admin/addclass")}
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
                Add New Class
            </Button>
          </Box>
          
          {getresponse ?
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <Typography variant="h6" sx={{ color: '#888', fontFamily: 'Poppins' }}>No Classes Found.</Typography>
            </Box>
            :
            <>
              {Array.isArray(sclassesList) && sclassesList.length > 0 &&
                <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
              }
            </>}
        </Paper>
      }

      {/* Confirm Delete Dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
          <DialogTitle sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
              Confirm Delete
          </DialogTitle>
          <DialogContent>
              <DialogContentText sx={{ fontFamily: 'Poppins' }}>
                  Are you sure you want to delete {deleteAddress === "Sclasses" ? "all classes" : "this class"}? This action cannot be undone.
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

export default ShowClasses;

const styles = {
  styledPaper: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.1))',
    mt: 1.5,
    borderRadius: '12px',
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
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
  }
}

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
`;
