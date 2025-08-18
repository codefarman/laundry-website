import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './Pages/Home';
import About from './Pages/About';
import HowItWorks from './Pages/HowItWorks';
import Business from './Pages/ForBusiness';
import Prices from './Pages/Prices&Services';
import ScrollToTop from './Components/ScrollToTop';
import BookingPage from './Pages/Booking';
import LoginSignupPage from './Pages/LoginSignupPage';
import Account from './Pages/Account';
import MyOrders from './Pages/MyOrders';
import HelpCenter from './Pages/HelpCenter';
import Schedule from './Pages/Schedule';
import AdminPanel from './Pages/AdminPanel';
import UserOrders from './Pages/UserOrder';

// Create a QueryClient instance
const queryClient = new QueryClient();

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  try {
    const userData = JSON.parse(user);
    if (userData.role !== 'admin') {
      return <Navigate to="/booking" replace />;
    }
    return children;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return <Navigate to="/login" replace />;
  }
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/business" element={<Business />} />
          <Route path="/login" element={<LoginSignupPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route path="/orders" element={<UserOrders />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;