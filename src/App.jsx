import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import HowItWorks from './Pages/HowItWorks'
import Prices from './Pages/Prices&Services'
import ScrollToTop from './Components/ScrollToTop';
import BookingPage from './Pages/Booking'
import LoginSignupPage from './Pages/LoginSignupPage'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/prices" element={<Prices />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/login" element={<LoginSignupPage />} />
      </Routes>
    </Router>
  )
}

export default App
