import React from 'react';
import Navbar from '../components/LandingPage/Navbar';
import Hero from '../components/LandingPage/Hero';
import About from '../components/LandingPage/About';
import Features from '../components/LandingPage/Features';
import Contact from '../components/LandingPage/Contact';
import Footer from '../components/LandingPage/Footer';
import styled from 'styled-components';

const Homepage = () => {
    return (
        <PageWrapper>
            <Navbar />
            <Hero />
            <About />
            <Features />
            <Contact />
            <Footer />
        </PageWrapper>
    );
};

export default Homepage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
`;
