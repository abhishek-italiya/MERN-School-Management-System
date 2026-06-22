import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import styled from 'styled-components';
import SchoolIcon from '@mui/icons-material/School';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <StyledAppBar position="fixed" elevation={0}>
      <Container>
        <Toolbar sx={{ padding: '0.5rem 0', display: 'flex', justifyContent: 'space-between' }}>
          
          {/* Logo Section */}
          <LogoBox>
            <SchoolIcon sx={{ color: '#7f56da', fontSize: 32, mr: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: 'Poppins', letterSpacing: '-0.5px' }}>
              <GradientText>School</GradientText>Sync
            </Typography>
          </LogoBox>

          {/* Center Links */}
          <NavLinksBox sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
            <NavButton href="#home">Home</NavButton>
            <NavButton href="#about">About</NavButton>
            <NavButton href="#features">Features</NavButton>
            <NavButton href="#contact">Contact</NavButton>
          </NavLinksBox>

          {/* Call to Action Buttons */}
          <ActionBox sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Link to="/choose" style={{ textDecoration: 'none' }}>
              <LoginButton variant="outlined">Login</LoginButton>
            </Link>
            <Link to="/Adminregister" style={{ textDecoration: 'none' }}>
              <SignupButton variant="contained">Get Started</SignupButton>
            </Link>
          </ActionBox>

        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
`;

const StyledAppBar = styled(AppBar)`
  && {
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
    color: #252525;
    transition: all 0.3s ease;
  }
`;

const LogoBox = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const GradientText = styled.span`
  background: -webkit-linear-gradient(45deg, #7f56da, #e73c7e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavLinksBox = styled(Box)`
  align-items: center;
`;

const NavButton = styled.a`
  text-decoration: none;
  color: #444;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1.05rem;
  position: relative;
  transition: color 0.3s ease;
  
  &:hover {
    color: #7f56da;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background: linear-gradient(45deg, #7f56da, #e73c7e);
    transition: width 0.3s ease;
    border-radius: 2px;
  }

  &:hover::after {
    width: 100%;
  }
`;

const ActionBox = styled(Box)`
  align-items: center;
`;

const LoginButton = styled(Button)`
  && {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    color: #7f56da;
    border: 2px solid #7f56da;
    border-radius: 20px;
    padding: 6px 20px;
    text-transform: none;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(127, 86, 218, 0.1);
      border: 2px solid #7f56da;
      transform: translateY(-2px);
    }
  }
`;

const SignupButton = styled(Button)`
  && {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    background: linear-gradient(45deg, #7f56da, #e73c7e);
    color: #fff;
    border-radius: 20px;
    padding: 6px 24px;
    text-transform: none;
    box-shadow: 0 4px 14px rgba(127, 86, 218, 0.4);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 6px 20px rgba(127, 86, 218, 0.6);
      transform: translateY(-2px);
    }
  }
`;
