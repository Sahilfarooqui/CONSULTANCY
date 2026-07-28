import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileQuickBar from './components/layout/MobileQuickBar';

import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Courses from './pages/Courses';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Apply from './pages/Apply';
import Install from './pages/Install';
import ThankYou from './pages/ThankYou';

function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="main-content flex-grow pb-20 md:pb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/install" element={<Install />} />
            <Route path="/app" element={<Install />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>
        </main>
        <Footer />
        <MobileQuickBar />
      </div>
    </Router>
  );
}

export default App;
