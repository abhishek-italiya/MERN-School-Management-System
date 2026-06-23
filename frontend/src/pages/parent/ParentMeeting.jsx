import { useState } from 'react';
import { 
    Box, Paper, Typography, Grid, Button, 
    TextField, MenuItem, Select, InputLabel, FormControl,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const ParentMeeting = () => {
    const [meetings, setMeetings] = useState([
        { id: 1, teacher: 'Mrs. Angela (Mathematics)', date: '2026-06-25', time: '10:30 AM', status: 'Approved' },
        { id: 2, teacher: 'Mr. David (Physics)', date: '2026-06-30', time: '02:00 PM', status: 'Pending' }
    ]);
    const [teacher, setTeacher] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSchedule = (e) => {
        e.preventDefault();
        if (!teacher || !date || !time) return;
        const newMeeting = {
            id: Date.now(),
            teacher,
            date,
            time,
            status: 'Pending'
        };
        setMeetings([...meetings, newMeeting]);
        setTeacher('');
        setDate('');
        setTime('');
    };

    return (
        <Box sx={{ p: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, fontFamily: 'Poppins' }}>
                Parent-Teacher Association (PTA) Meetings
            </Typography>
            <Grid container spacing={4}>
                {/* Form to Schedule */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, borderRadius: 4 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Request a Meeting</Typography>
                        <Box component="form" onSubmit={handleSchedule} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Select Teacher</InputLabel>
                                <Select
                                    value={teacher}
                                    onChange={(e) => setTeacher(e.target.value)}
                                    label="Select Teacher"
                                    required
                                >
                                    <MenuItem value="Mrs. Angela (Mathematics)">Mrs. Angela (Mathematics)</MenuItem>
                                    <MenuItem value="Mr. David (Physics)">Mr. David (Physics)</MenuItem>
                                    <MenuItem value="Dr. Sarah (Chemistry)">Dr. Sarah (Chemistry)</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Meeting Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                            <TextField
                                label="Time Slot"
                                type="time"
                                InputLabelProps={{ shrink: true }}
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            />
                            <Button type="submit" variant="contained" color="primary" sx={{ py: 1.5 }}>
                                Schedule
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                {/* Scheduled Meetings list */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, borderRadius: 4 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Your Appointments</Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Teacher</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Time Slot</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {meetings.map((meet) => (
                                        <TableRow key={meet.id}>
                                            <TableCell sx={{ fontWeight: 600 }}>{meet.teacher}</TableCell>
                                            <TableCell>{meet.date}</TableCell>
                                            <TableCell>{meet.time}</TableCell>
                                            <TableCell>
                                                <Chip 
                                                    label={meet.status} 
                                                    color={meet.status === 'Approved' ? 'success' : 'warning'}
                                                    size="small"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ParentMeeting;
