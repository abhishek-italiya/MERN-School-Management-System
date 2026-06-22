import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Tooltip } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';

const SideBar = ({ open }) => {
    const location = useLocation();
    return (
        <>
            <React.Fragment>
                <Tooltip title="Home" placement="right" disableHoverListener={open}>
                    <ListItemButton component={Link} to="/">
                        <ListItemIcon>
                            <HomeIcon color={location.pathname === ("/" || "/Admin/dashboard") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </Tooltip>
                <Tooltip title="Classes" placement="right" disableHoverListener={open}>
                    <ListItemButton component={Link} to="/Admin/classes">
                        <ListItemIcon>
                            <ClassOutlinedIcon color={location.pathname.startsWith('/Admin/classes') ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Classes" />
                    </ListItemButton>
                </Tooltip>
                <Tooltip title="Subjects" placement="right" disableHoverListener={open}>
                    <ListItemButton component={Link} to="/Admin/subjects">
                        <ListItemIcon>
                            <AssignmentIcon color={location.pathname.startsWith("/Admin/subjects") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Subjects" />
                    </ListItemButton>
                </Tooltip>
                <Tooltip title="Teachers" placement="right" disableHoverListener={open}>
                    <ListItemButton component={Link} to="/Admin/teachers">
                        <ListItemIcon>
                            <SupervisorAccountOutlinedIcon color={location.pathname.startsWith("/Admin/teachers") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Teachers" />
                    </ListItemButton>
                </Tooltip>
                <Tooltip title="Students" placement="right" disableHoverListener={open}>
                    <ListItemButton component={Link} to="/Admin/students">
                        <ListItemIcon>
                            <PersonOutlineIcon color={location.pathname.startsWith("/Admin/students") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Students" />
                    </ListItemButton>
                </Tooltip>
                <Tooltip title="Notices" placement="right" disableHoverListener={open}>
                    <ListItemButton component={Link} to="/Admin/notices">
                        <ListItemIcon>
                            <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Admin/notices") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Notices" />
                    </ListItemButton>
                </Tooltip>
                <Tooltip title="Complaints" placement="right" disableHoverListener={open}>
                    <ListItemButton component={Link} to="/Admin/complains">
                        <ListItemIcon>
                            <ReportIcon color={location.pathname.startsWith("/Admin/complains") ? 'primary' : 'inherit'} />
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
                    <ListItemButton component={Link} to="/Admin/profile">
                        <ListItemIcon>
                            <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Admin/profile") ? 'primary' : 'inherit'} />
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

export default SideBar;
