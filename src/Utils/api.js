import axios from 'axios';

const api = axios.create({
  baseURL: 'https://laundry-website-v1fi.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('API Request: Sending token', token);
  } else {
    console.log('API Request: No token found in localStorage');
  }
  return config;
});

// In-memory cache for services and branches
let servicesCache = null;
let branchesCache = null;

export const login = async (email, password) => {
  try {
    console.log('Login request: Sending', { email, password });
    const response = await api.post('/auth/login', { email, password });
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to login');
  }
};

export const signup = async (name, email, password, confirmPassword) => {
  try {
    console.log('Signup request: Sending', { name, email, password, confirmPassword });
    const response = await api.post('/auth/signup', { name, email, password, confirmPassword });
    console.log('Signup response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Signup error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to signup');
  }
};

export const initiateSocialLogin = (provider) => {
  console.log('Initiating social login for:', provider);
  window.location.href = `http://localhost:5000/api/auth/${provider.toLowerCase()}`;
};

export const getServices = async () => {
  try {
    if (servicesCache) {
      console.log('Returning cached services:', servicesCache);
      return servicesCache;
    }
    console.log('Fetching services from /services');
    const response = await api.get('/services');
    servicesCache = response.data;
    console.log('Services fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch services:', error.response?.data || error.message);
    throw new Error('Failed to fetch services: ' + error.message);
  }
};

export const getBranches = async () => {
  try {
    if (branchesCache) {
      console.log('Returning cached branches:', branchesCache);
      return branchesCache;
    }
    console.log('Fetching branches from /branches');
    const response = await api.get('/branches');
    branchesCache = response.data;
    console.log('Branches fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch branches:', error.response?.data || error.message);
    throw new Error('Failed to fetch branches: ' + error.message);
  }
};

export const createBooking = async (bookingData) => {
  try {
    console.log('Creating booking with data:', bookingData);
    const response = await api.post('/booking', bookingData);
    console.log('Booking created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to create booking:', error.response?.data || error.message);
    throw new Error('Failed to create booking: ' + error.message);
  }
};

export const getProfile = async () => {
  try {
    console.log('Fetching profile from /profile');
    const response = await api.get('/profile');
    console.log('Profile fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch profile:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch profile');
  }
};



export const updateContactDetails = async (data) => {
  try {
    console.log('Updating contact details with data:', data);
    const response = await api.patch('/profile/contact', data);
    console.log('Contact details updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to update contact details:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to update contact details');
  }
};

export const addAddress = async (address) => {
  try {
    console.log('Adding address with data:', address);
    const response = await api.post('/profile/addresses', address);
    console.log('Address added:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to add address:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to add address');
  }
};

export const updateAddress = async (addressId, address) => {
  try {
    console.log('Updating address with ID:', addressId, 'and data:', address);
    const response = await api.patch(`/profile/addresses/${addressId}`, address);
    console.log('Address updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to update address:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to update address');
  }
};

export const deleteAddress = async (addressId) => {
  try {
    console.log('Deleting address with ID:', addressId);
    const response = await api.delete(`/profile/addresses/${addressId}`);
    console.log('Address deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to delete address:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to delete address');
  }
};

export const addPaymentMethod = async (payment) => {
  try {
    console.log('Adding payment method with data:', payment);
    const response = await api.post('/profile/payment-methods', payment);
    console.log('Payment method added:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to add payment method:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to add payment method');
  }
};

export const updatePaymentMethod = async (paymentId, payment) => {
  try {
    console.log('Updating payment method with ID:', paymentId, 'and data:', payment);
    const response = await api.patch(`/profile/payment-methods/${paymentId}`, payment);
    console.log('Payment method updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to update payment method:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to update payment method');
  }
};

export const deletePaymentMethod = async (paymentId) => {
  try {
    console.log('Deleting payment method with ID:', paymentId);
    const response = await api.delete(`/profile/payment-methods/${paymentId}`);
    console.log('Payment method deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to delete payment method:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to delete payment method');
  }
};

export const getUserOrders = async () => {
  try {
    console.log('Fetching user orders from /orders/user');
    const response = await api.get('/orders/user');
    console.log('User orders fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user orders:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch user orders');
  }
};

export const getOrderById = async (orderId) => {
  try {
    console.log(`Fetching order from /orders/${orderId}`);
    const response = await api.get(`/orders/${orderId}`);
    console.log('Order fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch order:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch order');
  }
};

export const createFeedback = async (feedbackData) => {
  try {
    console.log('Creating feedback with data:', feedbackData);
    const response = await api.post('/feedback', feedbackData);
    console.log('Feedback created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to create feedback:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to create feedback');
  }
};

export const getFeedback = async (params) => {
  try {
    console.log('Fetching feedback with params:', params);
    const response = await api.get('/feedback', { params });
    console.log('Feedback fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch feedback:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch feedback');
  }
};

export const getFeedbackById = async (feedbackId) => {
  try {
    console.log(`Fetching feedback from /feedback/${feedbackId}`);
    const response = await api.get(`/feedback/${feedbackId}`);
    console.log('Feedback fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch feedback:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch feedback');
  }
};

export const updateFeedbackStatus = async (feedbackId, status) => {
  try {
    console.log(`Updating feedback status for ID: ${feedbackId} to ${status}`);
    const response = await api.patch(`/feedback/${feedbackId}/status`, { status });
    console.log('Feedback status updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to update feedback status:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to update feedback status');
  }
};

export const getOrders = async (params) => {
  try {
    console.log('Fetching orders with params:', params);
    const response = await api.get('/orders', { params });
    console.log('Orders fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch orders:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch orders');
  }
};

export default api;