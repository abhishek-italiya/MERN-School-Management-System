import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, Paper } from '@mui/material'
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate } from 'react-router-dom';
import TableTemplate from '../../../components/TableTemplate';
import ClassIcon from '@mui/icons-material/Class';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ChooseClass = ({ situation }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllSclasses(currentUser._id, "Sclass"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error)
    }

    const navigateHandler = (classID) => {
        if (situation === "Teacher") {
            navigate("/Admin/teachers/choosesubject/" + classID)
        }
        else if (situation === "Subject") {
            navigate("/Admin/addsubject/" + classID)
        }
    }

    const sclassColumns = [
        { id: 'name', label: 'Class Name', minWidth: 170 },
    ]

    const sclassRows = sclassesList && sclassesList.length > 0 && sclassesList.map((sclass) => {
        return {
            name: sclass.sclassName,
            id: sclass._id,
        };
    })

    const SclassButtonHaver = ({ row }) => {
        return (
            <Button 
                variant="contained"
                startIcon={<CheckCircleOutlineIcon />}
                onClick={() => navigateHandler(row.id)}
                sx={{
                    backgroundColor: '#411d70',
                    color: '#fff',
                    fontFamily: 'Poppins',
                    fontWeight: 600,
                    borderRadius: '8px',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: '#2c2143'
                    }
                }}
            >
                Choose
            </Button>
        );
    };

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            {loading ?
                <div>Loading...</div>
                :
                <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Box sx={{ width: 40, height: 40, borderRadius: '8px', backgroundColor: '#f0eaff', display: 'flex', justifyContent: 'center', alignItems: 'center', mr: 2 }}>
                            <ClassIcon sx={{ color: '#7f56da' }} />
                        </Box>
                        <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#2c2143' }}>
                            Choose a Class
                        </Typography>
                    </Box>

                    {getresponse ?
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4 }}>
                            <Typography variant="h6" sx={{ color: '#888', fontFamily: 'Poppins', mb: 2 }}>
                                No classes found.
                            </Typography>
                            <Button 
                                variant="contained" 
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
                                Add Class
                            </Button>
                        </Box>
                        :
                        <>
                            {Array.isArray(sclassesList) && sclassesList.length > 0 &&
                                <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
                            }
                        </>
                    }
                </Paper>
            }
        </Box>
    )
}

export default ChooseClass
