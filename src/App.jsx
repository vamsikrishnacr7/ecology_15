import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Navbar from './components/Navbar';
import Features from './components/Features';
import Story from './components/Story';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EncroachmentList from './components/Encroachment'; 
import CardDeal from './components/CardDeal';
import Case from './components/Case'
import Carousel from './components/Carousel';
import ML from './components/ML';
import Team from './components/ourteam';

const App = () => {
  return (
    <main className = "relative min-h-screen w-screen overflow-x-hidden">
      <Navbar/>
      <Hero/>
      <About/>
      <EncroachmentList/>
      {/* <CardDeal paratext = {"Arcu tortor, purus in mattis at sed integer faucibus. Aliquet quis aliquet eget mauris tortor. Aliquit ultrices ac, ametau."}/>
      <Case/> */}
      <Carousel/>
      <ML/>
      {/* <Features/> 
      <Story/>  */}
      <Contact/>
      <Team/>
      <Footer/>
    </main>
  )
}

export default App