import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Paper, Box, Typography, Button, Chip
} from '@mui/material';
import { getAllComplains } from '../../redux/complainRelated/complainHandle';
import TableViewTemplate from '../../components/TableViewTemplate';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import { useNavigate } from 'react-router-dom';

const TeacherComplaints = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { complainsList, loading, error, response } = useSelector((state) => state.complain);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllComplains(currentUser.school._id, "Complain"));
    }, [currentUser.school._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const complainColumns = [
        { id: 'date', label: 'Date', minWidth: 170 },
        { id: 'complaint', label: 'Complaint', minWidth: 100 },
        { id: 'status', label: 'Status', minWidth: 100 },
    ];

    const complainRows = (complainsList && complainsList.length > 0) ? complainsList.filter(c => c.user?._id === currentUser._id).map((complain) => {
        const date = new Date(complain.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
            date: dateString,
            complaint: complain.complaint,
            status: complain.status === 'Solved' ? 
                    <Chip label="Solved" color="success" size="small" sx={{ fontFamily: 'Poppins', fontWeight: 600 }} /> : 
                    <Chip label="Pending" color="warning" size="small" sx={{ fontFamily: 'Poppins', fontWeight: 600 }} />,
            id: complain._id,
        };
    }) : [];

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            {loading ?
                <div>Loading...</div>
                :
                <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
                            My Complaints
                        </Typography>
                        <Button 
                            variant="contained" 
                            startIcon={<AnnouncementOutlinedIcon />}
                            onClick={() => navigate("/Teacher/addcomplain")}
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
                            Add New Complaint
                        </Button>
                    </Box>

                    {response || complainRows.length === 0 ?
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                            <Typography variant="h6" sx={{ color: '#888', fontFamily: 'Poppins' }}>No Complaints Found.</Typography>
                        </Box>
                        :
                        <TableViewTemplate columns={complainColumns} rows={complainRows} />
                    }
                </Paper>
            }
        </Box>
    );
};

export default TeacherComplaints;
