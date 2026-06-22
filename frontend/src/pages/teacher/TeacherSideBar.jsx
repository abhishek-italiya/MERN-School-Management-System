import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Tooltip } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import { useSelector } from 'react-redux';

const TeacherSideBar = ({ open }) => {
    const { currentUser } = useSelector((state) => state.user);
    const sclassName = currentUser.teachSclass

    const location = useLocation();
    return (
        <>
            <React.Fragment>
                <Tooltip title="Home" placement="right" disableHoverListener={open}>
                    <ListItemButton component={Link} to="/">
                        <ListItemIcon>
                            <HomeIcon color={location.pathname === ("/" || "/Teacher/dashboard") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </Tooltip>
                <Tooltip title={`Class ${sclassName.sclassName}`} placement="right" disableHoverListener={open}>
                    <ListItemButton component={Link} to="/Teacher/class">
                        <ListItemIcon>
                            <ClassOutlinedIcon color={location.pathname.startsWith("/Teacher/class") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary={`Class ${sclassName.sclassName}`} />
                    </ListItemButton>
                </Tooltip>
                <Tooltip title="Complaints" placement="right" disableHoverListener={open}>
                    <ListItemButton component={Link} to="/Teacher/complain">
                        <ListItemIcon>
                            <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Teacher/complain") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Complaints" />
                    </ListItemButton>
                </Tooltip>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                {open && (
                    <ListSubheader component="div" sx={{ display: 'flex', justifyContent: 'center', width: '100%', pl: 0 }}>
                        User
                    </ListSubheader>
                )}
                <Tooltip title="Profile" placement="right" disableHoverListener={open}>
                    <ListItemButton component={Link} to="/Teacher/profile">
                        <ListItemIcon>
                            <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Teacher/profile") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                </Tooltip>
                <Tooltip title="Logout" placement="right" disableHoverListener={open}>
                    <ListItemButton component={Link} to="/logout">
                        <ListItemIcon>
                            <ExitToAppIcon color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </Tooltip>
            </React.Fragment>
        </>
    )
}

export default TeacherSideBar;
