import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { 
    Grid, Paper, Box, Typography, Card, CardContent, 
    Button, Tabs, Tab, Avatar, Divider, Chip, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow,
    Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const ParentHomePage = () => {
    const { currentUser } = useSelector(state => state.user);
    const [selectedTab, setSelectedTab] = useState(0);
    const [childDetail, setChildDetail] = useState(null);
    const [fees, setFees] = useState([]);
    const [notices, setNotices] = useState([]);
    
    // Payment Dialog State
    const [paymentOpen, setPaymentOpen] = useState(false);
    const [payingFee, setPayingFee] = useState(null);
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');

    const children = currentUser?.children || [];
    const activeChild = children[selectedTab];

    useEffect(() => {
        if (activeChild) {
            fetchChildDetails();
            fetchChildFees();
            fetchSchoolNotices();
        }
    }, [selectedTab, activeChild]);

    const fetchChildDetails = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/Student/${activeChild._id}`);
            setChildDetail(res.data);
        } catch (err) {
            console.error("Error fetching child details:", err);
        }
    };

    const fetchChildFees = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/StudentFees/${activeChild._id}`);
            setFees(res.data);
        } catch (err) {
            console.error("Error fetching child fees:", err);
        }
    };

    const fetchSchoolNotices = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/NoticeList/${currentUser.school}`);
            setNotices(res.data);
        } catch (err) {
            console.error("Error fetching notices:", err);
        }
    };

    const handlePayClick = (fee) => {
        setPayingFee(fee);
        setPaymentOpen(true);
    };

    const handlePaymentSubmit = async () => {
        if (!cardNumber || !cvv) return;
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/FeePayment`, {
                feeId: payingFee._id,
                transactionId: `TXN_PAY_${Date.now()}`,
                paymentMethod: 'Credit Card'
            });
            setPaymentOpen(false);
            setCardNumber('');
            setCvv('');
            fetchChildFees(); // reload fees
        } catch (err) {
            console.error("Payment failed:", err);
        }
    };

    // Calculate dynamic analytics metrics
    const attendanceRecords = childDetail?.attendance || [];
    const totalDays = attendanceRecords.length;
    const presentDays = attendanceRecords.filter(a => a.status === 'Present').length;
    const attendancePercent = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(1) : 0;

    const gradesData = childDetail?.examResult?.map(res => ({
        subject: res.subName?.subName || 'Subject',
        grade: res.marksObtained,
        fullMark: 100
    })) || [];

    const pendingFees = fees.filter(f => f.status === 'Pending');
    const totalPendingAmount = pendingFees.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <Box sx={{ flexGrow: 1, p: 1 }}>
            {/* Header Tabs for Selector */}
            {children.length > 1 && (
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs value={selectedTab} onChange={(e, val) => setSelectedTab(val)} textColor="primary" indicatorColor="primary">
                        {children.map((child, idx) => (
                            <Tab key={child._id} label={child.name} sx={{ fontWeight: 700, fontFamily: 'Poppins' }} />
                        ))}
                    </Tabs>
                </Box>
            )}

            {activeChild ? (
                <Grid container spacing={3}>
                    {/* Welcome Card banner */}
                    <Grid item xs={12}>
                        <Paper sx={{ 
                            p: 3, 
                            background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            borderRadius: 4
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ width: 60, height: 60, bgcolor: '#4F46E5', fontSize: '1.5rem', fontWeight: 800 }}>
                                    {activeChild.name[0]}
                                </Avatar>
                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: 'Poppins' }}>
                                        {activeChild.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Class: {activeChild.sclassName?.sclassName} | Roll Number: {activeChild.rollNum}
                                    </Typography>
                                </Box>
                            </Box>
                            <Chip label="Academic Status: Active" color="success" sx={{ fontWeight: 700 }} />
                        </Paper>
                    </Grid>

                    {/* Metric Cards Grid */}
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', p: 1 }}>
                            <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <Box sx={{ bgcolor: 'rgba(79, 70, 229, 0.1)', p: 1.5, borderRadius: 3 }}>
                                    <CalendarMonthIcon sx={{ color: '#4F46E5', fontSize: 32 }} />
                                </Box>
                                <Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>Attendance Ratio</Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 800, color: attendancePercent >= 75 ? '#10B981' : '#EF4444' }}>
                                        {attendancePercent}%
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', p: 1 }}>
                            <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <Box sx={{ bgcolor: 'rgba(124, 58, 237, 0.1)', p: 1.5, borderRadius: 3 }}>
                                    <AutoStoriesIcon sx={{ color: '#7C3AED', fontSize: 32 }} />
                                </Box>
                                <Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>Grade Average</Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 800 }}>
                                        {gradesData.length > 0 ? (gradesData.reduce((acc, curr) => acc + curr.grade, 0) / gradesData.length).toFixed(1) : 'N/A'}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', p: 1 }}>
                            <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <Box sx={{ bgcolor: 'rgba(245, 158, 11, 0.1)', p: 1.5, borderRadius: 3 }}>
                                    <CreditCardIcon sx={{ color: '#F59E0B', fontSize: 32 }} />
                                </Box>
                                <Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>Pending Fees</Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 800, color: totalPendingAmount > 0 ? '#EF4444' : '#10B981' }}>
                                        ₹{totalPendingAmount}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Recharts Analytics graphs */}
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 3, borderRadius: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <EqualizerIcon color="primary" /> Grade Analytics Breakdown
                            </Typography>
                            {gradesData.length > 0 ? (
                                <Box sx={{ width: '100%', height: 300 }}>
                                    <ResponsiveContainer>
                                        <AreaChart data={gradesData}>
                                            <defs>
                                                <linearGradient id="colorGrade" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4}/>
                                                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="subject" />
                                            <YAxis domain={[0, 100]} />
                                            <Tooltip />
                                            <Area type="monotone" dataKey="grade" stroke="#4F46E5" fillOpacity={1} fill="url(#colorGrade)" strokeWidth={3} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </Box>
                            ) : (
                                <Box sx={{ py: 6, textAlign: 'center' }}>
                                    <Typography color="text.secondary">No grades recorded for this term yet.</Typography>
                                </Box>
                            )}
                        </Paper>
                    </Grid>

                    {/* Subject Strengths Radar Chart */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, borderRadius: 4, height: '100%' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Subject Profile</Typography>
                            {gradesData.length >= 3 ? (
                                <Box sx={{ width: '100%', height: 280 }}>
                                    <ResponsiveContainer>
                                        <RadarChart outerRadius="70%" data={gradesData}>
                                            <PolarGrid />
                                            <PolarAngleAxis dataKey="subject" />
                                            <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                            <Radar name="Marks" dataKey="grade" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.6} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </Box>
                            ) : (
                                <Box sx={{ py: 6, textAlign: 'center' }}>
                                    <Typography color="text.secondary">Requires at least 3 graded subjects to draw radar matrix.</Typography>
                                </Box>
                            )}
                        </Paper>
                    </Grid>

                    {/* Fees Ledger & Receipts */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3, borderRadius: 4, height: '100%' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Fees Ledger Accounts</Typography>
                            {fees.length > 0 ? (
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Fee Category</TableCell>
                                                <TableCell>Amount</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell align="center">Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {fees.map((fee) => (
                                                <TableRow key={fee._id}>
                                                    <TableCell sx={{ fontWeight: 600 }}>{fee.feeType}</TableCell>
                                                    <TableCell>₹{fee.amount}</TableCell>
                                                    <TableCell>
                                                        <Chip 
                                                            label={fee.status} 
                                                            color={fee.status === 'Paid' ? 'success' : fee.status === 'Pending' ? 'warning' : 'error'}
                                                            size="small"
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {fee.status === 'Pending' ? (
                                                            <Button 
                                                                variant="contained" 
                                                                size="small" 
                                                                color="primary"
                                                                onClick={() => handlePayClick(fee)}
                                                                sx={{ borderRadius: 2 }}
                                                            >
                                                                Pay
                                                            </Button>
                                                        ) : (
                                                            <Button 
                                                                variant="outlined" 
                                                                size="small" 
                                                                color="success"
                                                                sx={{ borderRadius: 2 }}
                                                                onClick={() => window.print()}
                                                            >
                                                                Receipt
                                                            </Button>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <Typography color="text.secondary">No fee schedules mapped to this profile.</Typography>
                            )}
                        </Paper>
                    </Grid>

                    {/* Notices Timelines Bulletins */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3, borderRadius: 4, height: '100%' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <NotificationsActiveIcon color="warning" /> Notice Bulletin
                            </Typography>
                            {notices.length > 0 ? (
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {notices.slice(0, 4).map((notice) => (
                                        <Box key={notice._id} sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 3, borderLeft: '4px solid #4F46E5' }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                                {notice.title}
                                            </Typography>
                                            <Typography variant="body2" sx={{ my: 0.5 }}>
                                                {notice.details}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {new Date(notice.date).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            ) : (
                                <Typography color="text.secondary">No notice updates right now.</Typography>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            ) : (
                <Box sx={{ py: 10, textAlign: 'center' }}>
                    <Typography color="text.secondary">No children linked to this parent account.</Typography>
                </Box>
            )}

            {/* Simulated Checkout Payment Dialog */}
            <Dialog open={paymentOpen} onClose={() => setPaymentOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ fontWeight: 800, fontFamily: 'Poppins' }}>Simulated Checkout</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        <Typography variant="subtitle2">
                            Paying: <b>{payingFee?.feeType} Fee</b>
                        </Typography>
                        <Typography variant="h5" color="primary" sx={{ fontWeight: 800 }}>
                            Total Due: ₹{payingFee?.amount}
                        </Typography>
                        <Divider />
                        <TextField 
                            label="Card Number" 
                            fullWidth 
                            variant="outlined" 
                            value={cardNumber} 
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4111 2222 3333 4444"
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField label="Expiry" placeholder="MM/YY" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    label="CVV" 
                                    type="password" 
                                    fullWidth 
                                    value={cvv} 
                                    onChange={(e) => setCvv(e.target.value)}
                                    placeholder="123"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setPaymentOpen(false)}>Cancel</Button>
                    <Button variant="contained" color="success" onClick={handlePaymentSubmit} disabled={!cardNumber || !cvv}>
                        Confirm Payment
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ParentHomePage;
