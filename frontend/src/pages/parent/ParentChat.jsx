import { useState } from 'react';
import { Box, Paper, Typography, Grid, Avatar, TextField, IconButton, List, ListItemButton, ListItemText, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ParentChat = () => {
    const [activeTeacher, setActiveTeacher] = useState('Mrs. Angela');
    const [messageText, setMessageText] = useState('');
    const [threads, setThreads] = useState({
        'Mrs. Angela': [
            { sender: 'Teacher', text: 'Hello! I wanted to check in on how your child is doing with math assignments.' },
            { sender: 'Parent', text: 'Hello Mrs. Angela, he is working on the homework. He found trigonometry a bit challenging.' },
            { sender: 'Teacher', text: 'I understand. I will explain it again in tomorrow\'s revision session.' }
        ],
        'Mr. David': [
            { sender: 'Parent', text: 'Hello Mr. David, when is the next physics lab scheduled?' },
            { sender: 'Mr. David', text: 'It will be this Friday at 11 AM.' }
        ]
    });

    const handleSendMessage = () => {
        if (!messageText.trim()) return;
        const currentThread = threads[activeTeacher] || [];
        const updatedThread = [
            ...currentThread,
            { sender: 'Parent', text: messageText }
        ];
        setThreads({
            ...threads,
            [activeTeacher]: updatedThread
        });
        setMessageText('');
    };

    return (
        <Box sx={{ p: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, fontFamily: 'Poppins' }}>
                Parent-Teacher Hub Messaging
            </Typography>
            
            <Paper sx={{ height: '70vh', borderRadius: 4, overflow: 'hidden' }}>
                <Grid container sx={{ height: '100%' }}>
                    {/* Teachers selection sidebar list */}
                    <Grid item xs={12} sm={4} sx={{ borderRight: '1px solid #eee', height: '100%', overflowY: 'auto' }}>
                        <List sx={{ p: 2 }}>
                            <ListItemButton 
                                selected={activeTeacher === 'Mrs. Angela'}
                                onClick={() => setActiveTeacher('Mrs. Angela')}
                                sx={{ borderRadius: 2, mb: 1 }}
                            >
                                <Avatar sx={{ bgcolor: '#4F46E5', mr: 2 }}>A</Avatar>
                                <ListItemText primary="Mrs. Angela" secondary="Mathematics Teacher" />
                            </ListItemButton>
                            <ListItemButton 
                                selected={activeTeacher === 'Mr. David'}
                                onClick={() => setActiveTeacher('Mr. David')}
                                sx={{ borderRadius: 2 }}
                            >
                                <Avatar sx={{ bgcolor: '#7C3AED', mr: 2 }}>D</Avatar>
                                <ListItemText primary="Mr. David" secondary="Physics Teacher" />
                            </ListItemButton>
                        </List>
                    </Grid>

                    {/* Chat screen thread panel */}
                    <Grid item xs={12} sm={8} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                Chatting with {activeTeacher}
                            </Typography>
                        </Box>

                        <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {(threads[activeTeacher] || []).map((msg, idx) => {
                                const isParent = msg.sender === 'Parent';
                                return (
                                    <Box 
                                        key={idx}
                                        sx={{
                                            alignSelf: isParent ? 'flex-end' : 'flex-start',
                                            maxWidth: '70%',
                                            bgcolor: isParent ? '#4F46E5' : '#F1F5F9',
                                            color: isParent ? '#FFFFFF' : '#1E293B',
                                            p: 2,
                                            borderRadius: isParent ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                                            boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                                        }}
                                    >
                                        <Typography variant="body2">{msg.text}</Typography>
                                    </Box>
                                );
                            })}
                        </Box>

                        <Divider />
                        
                        {/* Input bar */}
                        <Box sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
                            <TextField
                                placeholder="Type a message..."
                                fullWidth
                                variant="outlined"
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                size="small"
                            />
                            <IconButton color="primary" onClick={handleSendMessage}>
                                <SendIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default ParentChat;
