import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SchoolIcon from '@mui/icons-material/School';
import StudentSideBar from './StudentSideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StudentHomePage from './StudentHomePage';
import StudentProfile from './StudentProfile';
import StudentSubjects from './StudentSubjects';
import ViewStdAttendance from './ViewStdAttendance';
import StudentComplain from './StudentComplain';
import StudentComplaints from './StudentComplaints';
import Logout from '../Logout'
import AccountMenu from '../../components/AccountMenu';
import { AppBar, Drawer } from '../../components/styles';

const StudentDashboard = () => {
    const [open, setOpen] = useState(() => {
        const stored = localStorage.getItem("sidebarOpen");
        return stored !== null ? stored === "true" : true;
    });
    const toggleDrawer = () => {
        const nextState = !open;
        setOpen(nextState);
        localStorage.setItem("sidebarOpen", nextState);
    };

    const { currentUser } = useSelector(state => state.user);

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar open={open} position='absolute'>
                    <Toolbar sx={{ pr: '24px', position: 'relative' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '16px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        
                        {/* Left Side Text */}
                        <Typography
                            component="h1"
                            variant="subtitle1"
                            color="inherit"
                            noWrap
                            sx={{ fontFamily: 'Poppins', opacity: 0.8, display: { xs: 'none', sm: 'block' } }}
                        >
                            Student Dashboard
                        </Typography>

                        {/* Centered School Name */}
                        <Box sx={{ 
                            position: 'absolute', 
                            left: '50%', 
                            transform: 'translateX(-50%)',
                            width: 'auto',
                            textAlign: 'center'
                        }}>
                            <Typography
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ fontFamily: 'Poppins', fontWeight: 600, letterSpacing: '0.5px' }}
                            >
                                {currentUser?.school?.schoolName || currentUser?.schoolName || "School Management"}
                            </Typography>
                        </Box>

                        <Box sx={{ flexGrow: 1 }} />
                        <AccountMenu />
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                    <Toolbar sx={{ ...styles.toolBarStyled, justifyContent: open ? 'space-between' : 'center' }}>
                        {open && (
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                                <SchoolIcon sx={{ color: '#7f56da', mr: 1, fontSize: 32 }} />
                                <Typography variant="h6" sx={{ 
                                    fontFamily: 'Poppins', 
                                    fontWeight: 800, 
                                    background: 'linear-gradient(90deg, #411d70 0%, #7f56da 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    letterSpacing: '1px' 
                                }}>
                                    SchoolSync
                                </Typography>
                            </Box>
                        )}
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <StudentSideBar open={open} />
                    </List>
                </Drawer>
                <Box component="main" sx={styles.boxStyled}>
                    <Toolbar />
                    <Routes>
                        <Route path="/" element={<StudentHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Student/dashboard" element={<StudentHomePage />} />
                        <Route path="/Student/profile" element={<StudentProfile />} />

                        <Route path="/Student/subjects" element={<StudentSubjects />} />
                        <Route path="/Student/attendance" element={<ViewStdAttendance />} />
                        <Route path="/Student/complain" element={<StudentComplaints />} />
                        <Route path="/Student/addcomplain" element={<StudentComplain />} />

                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
}

export default StudentDashboard

const styles = {
    boxStyled: {
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
    },
    drawerStyled: {
        display: "flex"
    },
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },
}
