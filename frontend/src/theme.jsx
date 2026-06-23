import { createTheme } from '@mui/material/styles';

export const premiumTheme = createTheme({
  palette: {
    primary: {
      main: '#4F46E5', // Indigo
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#7C3AED', // Violet
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#10B981', // EmeraldSuccess
    },
    warning: {
      main: '#F59E0B', // AmberWarning
    },
    error: {
      main: '#EF4444', // RedRoseDanger
    },
    info: {
      main: '#06B6D4', // CyanInfo
    },
    background: {
      default: '#F8FAFC', // Slate background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B', // Slate text
      secondary: '#64748B',
    },
  },
  typography: {
    fontFamily: ['Outfit', 'Poppins', 'Inter', 'sans-serif'].join(','),
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 800, letterSpacing: '-0.02em' },
    h3: { fontWeight: 800, letterSpacing: '-0.015em' },
    h4: { fontWeight: 800, letterSpacing: '-0.015em' },
    h5: { fontWeight: 700, letterSpacing: '-0.01em' },
    h6: { fontWeight: 600, letterSpacing: '-0.01em' },
    body1: { fontSize: '0.975rem', lineHeight: 1.6, color: '#1E293B' },
    body2: { fontSize: '0.875rem', lineHeight: 1.5, color: '#64748B' },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 20px',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.15)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 20px 0 rgba(15, 23, 42, 0.05)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          background: '#FFFFFF',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 16,
          boxShadow: '0 4px 20px 0 rgba(15, 23, 42, 0.05)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '& fieldset': {
              borderColor: 'rgba(226, 232, 240, 1)',
            },
            '&:hover fieldset': {
              borderColor: '#4F46E5',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#4F46E5',
              borderWidth: 2,
            },
          },
        },
      },
    },
  },
});
