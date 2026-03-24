import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import SiteLoader from './components/SiteLoader';
import Home from './pages/Home';
import Biens from './pages/Biens';
import BienDetail from './pages/BienDetail';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const finishLoading = () => {
      window.setTimeout(() => setIsLoading(false), 900);
    };

    if (document.readyState === 'complete') {
      finishLoading();
      return;
    }

    window.addEventListener('load', finishLoading, { once: true });
    return () => window.removeEventListener('load', finishLoading);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <SiteLoader isVisible={isLoading} />
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/biens" element={<Biens />} />
            <Route path="/biens/:id" element={<BienDetail />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
        <WhatsAppButton />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
