import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const LoginSignupPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For signup
  const [confirmPassword, setConfirmPassword] = useState(''); // For signup
  const navigate = useNavigate();

  const handleSocialLogin = (provider) => {
    // Placeholder for social login implementation
    alert(`Logging in with ${provider}... (Implement OAuth API here)`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'login') {
      // Placeholder for login logic
      alert(`Logging in with email: ${email} and password: ${password}`);
      navigate('/booking'); // Redirect to booking page after login
    } else {
      // Placeholder for signup logic
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      alert(`Signing up with name: ${name}, email: ${email}, and password: ${password}`);
      setActiveTab('login'); // Switch to login after signup
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F5F9] to-[#E0F2F7] font-sans flex items-center justify-center py-12 px-4">
    
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl font-bold text-[#1E293B] mb-2">Laundry Simplified</h1>
          <p className="text-[#64748B] text-sm">
            {activeTab === 'login' ? 'Welcome back! Log in to continue.' : 'Join us to start your laundry journey.'}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <button
            className={`px-6 py-2 rounded-l-lg font-medium transition-all ${
              activeTab === 'login'
                ? 'bg-[#008080] text-white shadow-md'
                : 'bg-gray-100 text-[#1E293B] hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('login')}
          >
            Log In
          </button>
          <button
            className={`px-6 py-2 rounded-r-lg font-medium transition-all ${
              activeTab === 'signup'
                ? 'bg-[#008080] text-white shadow-md'
                : 'bg-gray-100 text-[#1E293B] hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {/* Social Login */}
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <button
              onClick={() => handleSocialLogin('Google')}
              className="w-full bg-white border-2 border-[#008080]/20 text-[#1E293B] py-3 rounded-lg flex items-center justify-center gap-3 mb-3 hover:bg-gray-50 transition-all shadow-sm"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
            <button
              onClick={() => handleSocialLogin('Facebook')}
              className="w-full bg-white border-2 border-[#008080]/20 text-[#1E293B] py-3 rounded-lg flex items-center justify-center gap-3 mb-3 hover:bg-gray-50 transition-all shadow-sm"
            >
              <img
                src="https://www.facebook.com/favicon.ico"
                alt="Facebook"
                className="w-5 h-5"
              />
              Continue with Facebook
            </button>
            <button
              onClick={() => handleSocialLogin('Apple')}
              className="w-full bg-white border-2 border-[#008080]/20 text-[#1E293B] py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm"
            >
              <img
                src="https://www.apple.com/favicon.ico"
                alt="Apple"
                className="w-5 h-5"
              />
              Continue with Apple
            </button>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="relative flex items-center mb-6">
          <div className="flex-grow border-t border-[#008080]/20"></div>
          <span className="flex-shrink mx-4 text-[#64748B] text-sm">Or with email</span>
          <div className="flex-grow border-t border-[#008080]/20"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {activeTab === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full p-3 border border-[#008080]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition-all"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-[#008080]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border border-[#008080]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition-all"
              required
            />
          </div>
          {activeTab === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full p-3 border border-[#008080]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition-all"
                required
              />
            </div>
          )}
          {activeTab === 'login' && (
            <p className="text-xs text-[#64748B] text-right">
              Forgot password? <a href="#" className="text-[#008080] hover:underline">Reset it</a>
            </p>
          )}
          {activeTab === 'signup' && (
            <p className="text-xs text-[#64748B] text-center">
              By signing up, you agree to our <a href="#" className="text-[#008080] hover:underline">Terms</a> and <a href="#" className="text-[#008080] hover:underline">Privacy Policy</a>.
            </p>
          )}
          <motion.button
            type="submit"
            className="w-full bg-[#008080] text-white py-3 rounded-lg hover:bg-[#006d6d] transition-all shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {activeTab === 'login' ? 'Log In' : 'Sign Up'}
          </motion.button>
        </form>

        {/* Trust and Security */}
        <p className="text-xs text-[#64748B] mt-6 text-center">
          Secured with <span className="text-[#008080] font-medium">SSL Encryption</span> | Your data is safe with us.
        </p>
      </div>
    </div>
  );
};

export default LoginSignupPage;