import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const HelpCenter = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setContactForm({ name: parsedUser.name || '', email: parsedUser.email || '', message: '' });
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

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const submissions = JSON.parse(localStorage.getItem('supportSubmissions') || '[]');
    submissions.push({ ...contactForm, id: Date.now(), date: new Date().toISOString() });
    localStorage.setItem('supportSubmissions', JSON.stringify(submissions));
    setSuccessMessage('Your query has been submitted! We’ll get back to you soon.');
    setContactForm({ ...contactForm, message: '' });
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-30 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Towers Laundry Help Center</h2>
          {successMessage && (
            <div className="mb-6 p-4 bg-[#008080] text-white rounded-md text-center animate-fade-in">
              {successMessage}
            </div>
          )}
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                      placeholder="Enter your name"
                    />
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                      placeholder="Describe your issue or question"
                      rows="4"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-5 py-2 rounded-md bg-[#008080] text-white font-medium hover:bg-[#006666] transition-colors duration-300"
                  >
                    Submit Query
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HelpCenter;