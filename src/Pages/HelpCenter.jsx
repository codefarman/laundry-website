import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { toast } from 'react-toastify';
import api from '../Utils/api';

const HelpCenter = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '', category: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setContactForm({ name: parsedUser.name || '', email: parsedUser.email || '', message: '', category: '' });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const faqs = [
    {
      id: 1,
      question: 'How do I book a laundry service?',
      answer:
        'To book a service, navigate to the "Book Now" page from the homepage or navbar. Select your service type (e.g., Wash & Fold, Dry Cleaning), choose a pickup time, and confirm your address and payment method.',
      keywords: ['book', 'service', 'laundry', 'order'],
    },
    {
      id: 2,
      question: 'What if my laundry is damaged or lost?',
      answer:
        'We take utmost care with your items. If an item is damaged or lost, please contact support within 48 hours of delivery. Provide your order ID and details, and we’ll investigate and offer a refund or credit as per our policy.',
      keywords: ['damaged', 'lost', 'laundry', 'refund'],
    },
    {
      id: 3,
      question: 'How do I track my order?',
      answer:
        'Visit the "My Orders" page to view your order status (Pending, In Progress, Completed, or Cancelled). You’ll also receive email updates on pickup and delivery.',
      keywords: ['track', 'order', 'status'],
    },
    {
      id: 4,
      question: 'What payment methods are accepted?',
      answer:
        'We accept credit/debit cards and digital wallets. Add or manage payment methods on the "Account" page under "Payment Methods."',
      keywords: ['payment', 'card', 'billing'],
    },
    {
      id: 5,
      question: 'What services does Towers Laundry offer?',
      answer:
        'Towers Laundry provides Wash & Fold, Dry Cleaning, Ironing, and Specialty Cleaning (e.g., delicates, comforters). All services are available for booking online with flexible scheduling.',
      keywords: ['services', 'wash', 'dry cleaning', 'ironing'],
    },
  ];

  const articles = [
    {
      id: 1,
      category: 'Using Our Services',
      title: 'About Towers Laundry',
      content:
        'Towers Laundry is a premium laundry service, not a physical laundry tower appliance like LG WashTower or Electrolux Laundry Tower. We offer convenient, on-demand laundry and dry cleaning services across the UAE, with pickup and delivery options. Book via our website or app, and manage orders, addresses, and payments seamlessly from your account.',
      keywords: ['towers laundry', 'services', 'about'],
    },
    {
      id: 2,
      category: 'Using Our Services',
      title: 'How to Schedule a Pickup',
      content:
        'Log in to your account, go to the "Book Now" page, select your service, and choose a pickup time. Ensure your address is updated in the "Account" page. You’ll receive a confirmation email with pickup details.',
      keywords: ['schedule', 'pickup', 'book'],
    },
    {
      id: 3,
      category: 'Troubleshooting',
      title: 'What to Do If Your Order Is Delayed',
      content:
        'If your order is delayed, check the status on the "My Orders" page. Delays may occur due to high demand or logistics issues. Contact support with your order ID for an update. We’ll resolve the issue promptly and may offer a credit for significant delays.',
      keywords: ['delayed', 'order', 'delivery'],
    },
    {
      id: 4,
      category: 'Troubleshooting',
      title: 'Resolving Payment Issues',
      content:
        'If a payment fails, verify your card details on the "Account" page. Ensure sufficient funds or try another payment method. For persistent issues, contact support with details of the error message.',
      keywords: ['payment', 'billing', 'card', 'issue'],
    },
    {
      id: 5,
      category: 'Billing & Payments',
      title: 'Understanding Your Invoice',
      content:
        'Your invoice is available on the "My Orders" page after order completion. It includes service fees, taxes, and any additional charges (e.g., express delivery). Download or email the invoice for your records.',
      keywords: ['invoice', 'billing', 'charges'],
    },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!contactForm.name.trim()) newErrors.name = 'Name is required';
    if (!contactForm.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(contactForm.email)) newErrors.email = 'Invalid email format';
    if (!contactForm.message.trim()) newErrors.message = 'Message is required';
    if (!['Complaint', 'Suggestion', 'Question'].includes(contactForm.category)) {
      newErrors.category = 'Please select a valid category (Complaint, Suggestion, or Question)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery) ||
      faq.answer.toLowerCase().includes(searchQuery) ||
      faq.keywords.some((keyword) => keyword.includes(searchQuery))
  );

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery) ||
      article.content.toLowerCase().includes(searchQuery) ||
      article.keywords.some((keyword) => keyword.includes(searchQuery))
  );

  const groupedArticles = filteredArticles.reduce((acc, article) => {
    if (!acc[article.category]) {
      acc[article.category] = [];
    }
    acc[article.category].push(article);
    return acc;
  }, {});

  const handleFAQToggle = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowConfirmModal(true);
  };

  const confirmSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      console.log('Submitting feedback:', contactForm);
      const response = await api.post('/feedback', contactForm);
      setShowConfirmModal(false);
      setShowSuccessModal(true); // Show success modal
      setContactForm({ ...contactForm, message: '', category: '' }); // Reset message and category only
    } catch (error) {
      console.error('Feedback submission error:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || 'Failed to submit feedback';
      if (error.response?.status === 401) {
        toast.error('Session expired. Please log in again.', {
          onClick: () => navigate('/login'),
        });
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-30 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Towers Laundry Help Center</h2>
          {!user ? (
            <p className="text-center text-gray-600">Redirecting to login...</p>
          ) : (
            <div className="space-y-8">
              {/* Search Bar */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-[#008080] mb-4">Search for Help</h3>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search for articles or FAQs (e.g., payment issues, order tracking)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                />
              </div>

              {/* FAQs Section */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-[#008080] mb-4">Frequently Asked Questions</h3>
                {filteredFAQs.length === 0 && searchQuery ? (
                  <p className="text-gray-600 text-center">No FAQs found. Try a different search term or contact support.</p>
                ) : (
                  filteredFAQs.map((faq) => (
                    <div key={faq.id} className="border-b border-gray-200 py-4">
                      <button
                        onClick={() => handleFAQToggle(faq.id)}
                        className="w-full text-left text-lg font-semibold text-gray-900 hover:text-[#008080] transition-colors duration-300"
                      >
                        {faq.question}
                      </button>
                      {expandedFAQ === faq.id && (
                        <p className="mt-2 text-gray-600">{faq.answer}</p>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Articles Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#008080] mb-4">Help Articles</h3>
                {Object.keys(groupedArticles).length === 0 && searchQuery ? (
                  <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                    <p className="text-gray-600 mb-4">No articles found. Try a different search term or contact support.</p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-5 py-2 rounded-md bg-[#F4B400] text-black font-medium hover:bg-[rgb(280,200,0)] transition-colors duration-300"
                    >
                      Clear Search
                    </button>
                  </div>
                ) : (
                  Object.keys(groupedArticles).map((category) => (
                    <div key={category} className="bg-white rounded-lg shadow-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">{category}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {groupedArticles[category].map((article) => (
                          <div
                            key={article.id}
                            className="p-4 border border-gray-200 rounded-md hover:shadow-md transition-shadow duration-300"
                          >
                            <h5 className="text-md font-medium text-gray-900">{article.title}</h5>
                            <p className="text-sm text-gray-600 mt-2">{article.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Contact Support Section */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-[#008080] mb-4">Contact Support</h3>
                <p className="text-gray-600 mb-6">Can’t find what you’re looking for? Send us a message, and our team will assist you.</p>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080] ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter your name"
                      disabled={isSubmitting}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080] ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter your email"
                      disabled={isSubmitting}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      id="category"
                      value={contactForm.category}
                      onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080] ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                      disabled={isSubmitting}
                    >
                      <option value="">Select a category</option>
                      <option value="Complaint">Complaint</option>
                      <option value="Suggestion">Suggestion</option>
                      <option value="Question">Question</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080] ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Describe your issue or question"
                      rows="4"
                      disabled={isSubmitting}
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-5 py-2 rounded-md text-white font-medium transition-colors duration-300 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#008080] hover:bg-[#006666]'}`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Query'}
                  </button>
                </form>
              </div>

              {/* Confirmation Modal */}
              {showConfirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Submission</h3>
                    <p className="text-gray-600 mb-6">Are you sure you want to submit this feedback?</p>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setShowConfirmModal(false)}
                        className="text-teal-600 hover:underline"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={confirmSubmit}
                        disabled={isSubmitting}
                        className={`px-4 py-2 rounded text-white ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'}`}
                      >
                        {isSubmitting ? 'Submitting...' : 'Confirm'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Success Modal */}
              {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                    <h3 className="text-lg font-semibold text-[#008080] mb-4">Feedback Submitted!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for your feedback. Our team will review it soon. You can submit another query or continue browsing.
                    </p>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setShowSuccessModal(false)}
                        className="px-4 py-2 rounded text-white bg-[#008080] hover:bg-[#006666] transition-colors duration-300"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => {
                          setShowSuccessModal(false);
                          navigate('/'); // Navigate to homepage or another page
                        }}
                        className="px-4 py-2 rounded text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300"
                      >
                        Back to Home
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HelpCenter;