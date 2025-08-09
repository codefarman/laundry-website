import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './Pages/Home';
import HowItWorks from './Pages/HowItWorks';
import Prices from './Pages/Prices&Services';
import ScrollToTop from './Components/ScrollToTop';
import BookingPage from './Pages/Booking';
import LoginSignupPage from './Pages/LoginSignupPage';
import Account from './Pages/Account';
import MyOrders from './Pages/MyOrders';
import HelpCenter from './Pages/HelpCenter';
import RepeatOrder from './Pages/RepeatOrders';
import Dashboard from './pages/Dashboard';
import Orders from './Pages/Orders';
import Services from './Pages/Services';
import Customers from './Pages/Customers';
import Analytics from './Pages/Analytics';
import Staff from './Pages/Staff';
// import { useAuth } from './Hooks/useAuth'; // Adjusted to match your case

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  // const { user } = useAuth();
  // if (!user) return <div className="p-6">Please log in at /login</div>;

  return (
    <QueryClientProvider client={queryClient}>
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
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/services" element={<Services />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/staff" element={<Staff />} />
          <Route path="*" element={<div>Page Not Found</div>} /> {/* Catch-all route */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;