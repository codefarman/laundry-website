import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import HowItWorks from './Pages/HowItWorks'
import Prices from './Pages/Prices&Services'
import ScrollToTop from './Components/ScrollToTop';
import BookingPage from './Pages/Booking'
import LoginSignupPage from './Pages/LoginSignupPage'
import Account from './Pages/Account'
import MyOrders from './Pages/MyOrders'
import HelpCenter from './Pages/HelpCenter'
import RepeatOrder from './Pages/RepeatOrders'

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
        <Route path="/account" element={<Account />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/repeat-orders" element={<RepeatOrder />} />
        <Route path="/help-center" element={<HelpCenter />} />
      </Routes>
    </Router>
  )
}

export default App
