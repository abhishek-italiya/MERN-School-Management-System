import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ForumIcon from '@mui/icons-material/Forum';
import EventIcon from '@mui/icons-material/Event';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Navigate, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Drawer } from '../../components/styles';
import { logoutUser } from '../../redux/userRelated/userHandle';
import ParentHomePage from './ParentHomePage';
import ParentMeeting from './ParentMeeting';
import ParentChat from './ParentChat';

const ParentDashboard = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => setOpen(!open);
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar open={open} position='absolute' sx={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' }}>
                <Toolbar sx={{ pr: '24px' }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{ marginRight: '16px', ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    
                    <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                        Parent Portal - {currentUser?.name}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography variant="body2" color="inherit" sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
                        School: {currentUser?.children?.[0]?.school?.schoolName || "ERP Academy"}
                    </Typography>
                </Toolbar>
            </AppBar>
            
            <Drawer variant="permanent" open={open}>
                <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: [1] }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                        <SupervisorAccountIcon sx={{ color: '#4F46E5', mr: 1, fontSize: 28 }} />
                        {open && (
                            <Typography variant="subtitle1" sx={{ fontFamily: 'Poppins', fontWeight: 800, color: '#4F46E5' }}>
                                FamilyHub
                            </Typography>
                        )}
                    </Box>
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                
                <List component="nav" sx={{ p: 2 }}>
                    <ListItemButton 
                        onClick={() => navigate('/Parent/dashboard')} 
                        selected={location.pathname === '/Parent/dashboard'}
                        sx={{ borderRadius: 2, mb: 1 }}
                    >
                        <ListItemIcon><DashboardIcon sx={{ color: location.pathname === '/Parent/dashboard' ? '#4F46E5' : 'inherit' }} /></ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>

                    <ListItemButton 
                        onClick={() => navigate('/Parent/meetings')} 
                        selected={location.pathname === '/Parent/meetings'}
                        sx={{ borderRadius: 2, mb: 1 }}
                    >
                        <ListItemIcon><EventIcon sx={{ color: location.pathname === '/Parent/meetings' ? '#4F46E5' : 'inherit' }} /></ListItemIcon>
                        <ListItemText primary="PTA Meetings" />
                    </ListItemButton>

                    <ListItemButton 
                        onClick={() => navigate('/Parent/chat')} 
                        selected={location.pathname === '/Parent/chat'}
                        sx={{ borderRadius: 2, mb: 1 }}
                    >
                        <ListItemIcon><ForumIcon sx={{ color: location.pathname === '/Parent/chat' ? '#4F46E5' : 'inherit' }} /></ListItemIcon>
                        <ListItemText primary="Teacher Chat" />
                    </ListItemButton>

                    <Divider sx={{ my: 2 }} />

                    <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2, color: '#EF4444' }}>
                        <ListItemIcon><ExitToAppIcon sx={{ color: '#EF4444' }} /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </List>
            </Drawer>
            
            <Box component="main" sx={{
                backgroundColor: '#F8FAFC',
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
                p: 3
            }}>
                <Toolbar />
                <Routes>
                    <Route path="/" element={<ParentHomePage />} />
                    <Route path="/dashboard" element={<ParentHomePage />} />
                    <Route path="/meetings" element={<ParentMeeting />} />
                    <Route path="/chat" element={<ParentChat />} />
                    <Route path="*" element={<Navigate to="/Parent/dashboard" />} />
                </Routes>
            </Box>
        </Box>
    );
};

export default ParentDashboard;
