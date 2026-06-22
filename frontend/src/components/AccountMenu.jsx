import React, { useState } from 'react';
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import { Settings, Logout, AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AccountMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const { currentRole, currentUser } = useSelector(state => state.user);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigateTo = (path) => {
        handleClose();
        navigate(path);
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Typography variant="body1" sx={{ color: 'inherit', fontWeight: 600, mr: 1, display: { xs: 'none', sm: 'block' }, fontFamily: 'Poppins' }}>
                    {currentUser?.name}
                </Typography>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 1 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ 
                            width: 40, 
                            height: 40, 
                            background: 'linear-gradient(135deg, #7f56da 0%, #e73c7e 100%)',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontFamily: 'Poppins'
                        }}>
                            {String(currentUser?.name || 'A').charAt(0).toUpperCase()}
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
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
                <MenuItem onClick={() => navigateTo(`/${currentRole}/profile`)} sx={{ py: 1.5 }}>
                    <ListItemIcon>
                        <AccountCircle fontSize="small" sx={{ color: '#7f56da' }}/>
                    </ListItemIcon>
                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: 500, color: '#2c2143' }}>
                        Profile
                    </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => navigateTo(`/${currentRole}/profile`)} sx={{ py: 1.5 }}>
                    <ListItemIcon>
                        <Settings fontSize="small" sx={{ color: '#23a6d5' }}/>
                    </ListItemIcon>
                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: 500, color: '#2c2143' }}>
                        Settings
                    </Typography>
                </MenuItem>
                <MenuItem onClick={() => navigateTo('/logout')} sx={{ py: 1.5 }}>
                    <ListItemIcon>
                        <Logout fontSize="small" sx={{ color: '#e73c7e' }}/>
                    </ListItemIcon>
                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: 500, color: '#2c2143' }}>
                        Logout
                    </Typography>
                </MenuItem>
            </Menu>
        </>
    );
}

export default AccountMenu;

const styles = {
    styledPaper: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.1))',
        mt: 1.5,
        borderRadius: '12px',
        minWidth: '200px',
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
            right: 18,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    }
};
