import { useState } from 'react';
import { 
    Box, Paper, Fab, Typography, IconButton, 
    TextField, Avatar, Divider, Chip, Button
} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import PsychologyIcon from '@mui/icons-material/Psychology';

const AIAssistant = ({ role, contextData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'AI', text: `Hello! I am your AI Academic Assistant. How can I help you today?` }
    ]);
    const [input, setInput] = useState('');

    const handleActionClick = (promptText, answerText) => {
        setMessages([
            ...messages,
            { sender: 'User', text: promptText },
            { sender: 'AI', text: answerText }
        ]);
    };

    const handleSend = () => {
        if (!input.trim()) return;
        const userMsg = input.trim();
        let aiMsg = "I am processing that request. Based on school data trends, I recommend reviewing core subjects weekly to maintain a stable grade point average.";
        
        if (userMsg.toLowerCase().includes('predict') || userMsg.toLowerCase().includes('result')) {
            aiMsg = "Predictive Model Output: Your current progression suggests a final aggregate grade of 84.6%. Consistent homework completions could lift this to 89%.";
        } else if (userMsg.toLowerCase().includes('attendance') || userMsg.toLowerCase().includes('absent')) {
            aiMsg = "Attendance Risk Audit: Current compliance is high. Maintain attendance above 75% to stay clear of administrative academic warnings.";
        }

        setMessages([
            ...messages,
            { sender: 'User', text: userMsg },
            { sender: 'AI', text: aiMsg }
        ]);
        setInput('');
    };

    return (
        <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}>
            {/* Floating Action Button */}
            {!isOpen && (
                <Fab 
                    color="primary" 
                    onClick={() => setIsOpen(true)}
                    sx={{
                        background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                        boxShadow: '0 8px 30px rgba(79, 70, 229, 0.4)',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'scale(1.1)' }
                    }}
                >
                    <SmartToyIcon />
                </Fab>
            )}

            {/* Chat Dialog box */}
            {isOpen && (
                <Paper 
                    sx={{
                        width: 360,
                        height: 480,
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 4,
                        boxShadow: '0 12px 40px rgba(15, 23, 42, 0.15)',
                        border: '1px solid rgba(226, 232, 240, 0.8)',
                        overflow: 'hidden'
                    }}
                >
                    {/* Header bar */}
                    <Box sx={{ 
                        p: 2, 
                        background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PsychologyIcon />
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>AI Advisor</Typography>
                        </Box>
                        <IconButton size="small" color="inherit" onClick={() => setIsOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Chat Messages */}
                    <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {messages.map((msg, idx) => (
                            <Box key={idx} sx={{ alignSelf: msg.sender === 'User' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                                <Box sx={{
                                    p: 1.5,
                                    borderRadius: msg.sender === 'User' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                                    bgcolor: msg.sender === 'User' ? '#4F46E5' : '#F1F5F9',
                                    color: msg.sender === 'User' ? '#FFFFFF' : '#1E293B',
                                }}>
                                    <Typography variant="body2">{msg.text}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>

                    {/* Quick AI Action Suggestions */}
                    <Box sx={{ px: 2, py: 1, display: 'flex', gap: 1, flexWrap: 'wrap', bgcolor: '#F8FAFC' }}>
                        {role === 'Student' && (
                            <>
                                <Chip 
                                    label="🔮 Predict Grades" 
                                    size="small" 
                                    onClick={() => handleActionClick("Predict my grades", "Predictive Model Output: Your current average is 85%. You are on track to secure an 'A' grade in mathematics and science.")} 
                                    clickable 
                                />
                                <Chip 
                                    label="📅 Study Suggestion" 
                                    size="small" 
                                    onClick={() => handleActionClick("Suggest study schedule", "Recommended Actions: Dedicate 45 minutes daily to Chemistry homework, and take weekly self-evaluations to solidify concepts.")} 
                                    clickable 
                                />
                            </>
                        )}
                        {role === 'Teacher' && (
                            <>
                                <Chip 
                                    label="📈 Performance Predictor" 
                                    size="small" 
                                    onClick={() => handleActionClick("Analyze student grades", "Analytics Insight: Class Grade distributions skew normal. 3 students are identified at risk of falling below average in Physics.")} 
                                    clickable 
                                />
                                <Chip 
                                    label="📅 Auto-Scheduler Slots" 
                                    size="small" 
                                    onClick={() => handleActionClick("Find free timetable slots", "Timetable Suggestions: Class 10-A has unassigned periods on Tuesday Period 4. This is conflict-free for Mrs. Angela.")} 
                                    clickable 
                                />
                            </>
                        )}
                    </Box>
                    
                    <Divider />

                    {/* Chat input box */}
                    <Box sx={{ p: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
                        <TextField 
                            placeholder="Ask AI..." 
                            size="small" 
                            fullWidth 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <IconButton color="primary" onClick={handleSend}>
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Paper>
            )}
        </Box>
    );
};

export default AIAssistant;
