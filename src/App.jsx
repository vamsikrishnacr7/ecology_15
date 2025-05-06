import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import About from './components/About';
import Navbar from './components/Navbar';
import Features from './components/Features';
import Story from './components/Story';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EncroachmentList from './components/Encroachment';
import CardDeal from './components/CardDeal';
import Case from './components/Case';
import Carousel from './components/Carousel';
import ML from './components/ML';
import Team from './components/ourteam';
import CaseStudy from './components/CaseStudy';
import VoiceAssistant from './components/VoiceAssistant';
import CityAreaComponent from './components/ML_data';
import ProfessorsCard from './components/noteofthanks';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <MainLayout>
            <Hero />
            <About />
            <EncroachmentList />
            <Carousel />
            <ML />
            {/* <Features/> */}
            <CityAreaComponent/>
            <Contact />
            <Team />
            <ProfessorsCard/>
            <VoiceAssistant />
          </MainLayout>
        } />
        <Route path="/case-study/:id" element={
          <MainLayout>
            <CaseStudy />
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
};

const MainLayout = ({ children }) => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default App;