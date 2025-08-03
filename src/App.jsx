import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import HowItWorks from './Pages/HowItWorks'
import Prices from './Pages/Prices&Services'
import ScrollToTop from './Components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/prices" element={<Prices />} />
      </Routes>
    </Router>
  )
}

export default App
