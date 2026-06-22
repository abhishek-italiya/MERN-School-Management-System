import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
    Paper, Box, IconButton, Tooltip, Typography, Button
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/Visibility';
import TableTemplate from '../../../components/TableTemplate';
import Popup from '../../../components/Popup';
import styled from 'styled-components';

const ShowSubjects = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getSubjectList(currentUser._id, "AllSubjects"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true)
    }

    const subjectColumns = [
        { id: 'subName', label: 'Subject Name', minWidth: 170 },
        { id: 'sessions', label: 'Sessions', minWidth: 170 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ]

    const subjectRows = subjectsList.map((subject) => {
        return {
            subName: subject.subName,
            sessions: subject.sessions,
            sclassName: subject.sclassName.sclassName,
            sclassID: subject.sclassName._id,
            id: subject._id,
        };
    })

    const SubjectsButtonHaver = ({ row }) => {
        return (
            <ButtonContainer>
                <Tooltip title="View Details">
                    <IconButton 
                        onClick={() => navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)} 
                        size="small" 
                        sx={{ color: '#411d70', backgroundColor: '#f0eaff', '&:hover': { backgroundColor: '#dccaff' } }}
                    >
                        <VisibilityIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton 
                        onClick={() => deleteHandler(row.id, "Subject")} 
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
                            Manage Subjects
                        </Typography>
                        <Button 
                            variant="contained" 
                            startIcon={<PostAddIcon />}
                            onClick={() => navigate("/Admin/subjects/chooseclass")}
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
                            Add New Subject
                        </Button>
                    </Box>
                    
                    {response ?
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                            <Typography variant="h6" sx={{ color: '#888', fontFamily: 'Poppins' }}>No Subjects Found.</Typography>
                        </Box>
                        :
                        <>
                            {Array.isArray(subjectsList) && subjectsList.length > 0 &&
                                <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                            }
                        </>
                    }
                </Paper>
            }
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Box>
    );
};

export default ShowSubjects;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
`;
