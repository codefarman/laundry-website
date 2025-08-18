import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const ForBusiness = () => {
  const [loadSize, setLoadSize] = useState(10);
  const [frequency, setFrequency] = useState('weekly');
  const [faqOpen, setFaqOpen] = useState(null);

  const toggleFAQ = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  // Pricing Logic (AED per load: 10 AED base, 5% discount for weekly, 10% for bi-weekly)
  const basePrice = 10;
  const discount = frequency === 'weekly' ? 0.05 : frequency === 'bi-weekly' ? 0.10 : 0;
  const totalPrice = (loadSize * basePrice * (1 - discount)).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br mt-20 from-[#F1F5F9] to-[#E0F2F7] font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16" role="main" aria-label="Towers Laundry for Business">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-cover bg-center h-64 sm:h-96 rounded-lg mb-12 overflow-hidden"
          style={{ backgroundImage: "url('/images/business-banner.jpg')" }}
          aria-label="Towers Laundry Business Services Banner"
        >
          <div className="absolute inset-0 bg-[#008080]/70 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl sm:text-5xl font-bold mb-4">Laundry Solutions for Businesses</h1>
              <p className="text-lg sm:text-xl max-w-2xl mx-auto">
                Streamline your operations with our tailored laundry services for corporations and partners.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Services for Businesses */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
          aria-labelledby="services-title"
        >
          <h2 id="services-title" className="text-3xl font-semibold text-[#1E293B] text-center mb-6">Our Business Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#008080] mb-2">Bulk Laundry</h3>
              <p className="text-[#64748B]">Handle large volumes with a 20% discount on orders over 50 loads per week.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#008080] mb-2">Uniform Cleaning</h3>
              <p className="text-[#64748B]">Keep your team looking professional with specialized uniform care.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#008080] mb-2">Corporate Accounts</h3>
              <p className="text-[#64748B]">Set up a dedicated account with flexible billing and priority service.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#008080] mb-2">Event Laundry</h3>
              <p className="text-[#64748B]">On-demand service for events, ensuring linens and attire are pristine.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#008080] mb-2">Hotel Partnerships</h3>
              <p className="text-[#64748B]">Custom solutions for hotels with high laundry turnover.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#008080] mb-2">Sustainability Audit</h3>
              <p className="text-[#64748B]">Help your business reduce its carbon footprint with our green practices.</p>
            </div>
          </div>
        </motion.section>

        {/* Partnership Program */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
          aria-labelledby="partnership-title"
        >
          <h2 id="partnership-title" className="text-3xl font-semibold text-[#1E293B] text-center mb-6">Become a Partner</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <p className="text-lg text-[#64748B] leading-relaxed">
              Join our network of over 500 business partners across the UAE. Enjoy exclusive discounts, branded marketing support, and priority scheduling. Whether you’re a hotel, gym, or office, we tailor our services to boost your efficiency and reputation.
            </p>
            <div className="bg-[#008080]/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#008080] mb-2">Partner Benefits</h3>
              <ul className="list-disc list-inside text-[#64748B]">
                <li>15% discount on initial orders</li>
                <li>Priority pickup and delivery</li>
                <li>Co-branded promotional materials</li>
                <li>Access to quarterly sustainability reports</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Pricing Calculator */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
          aria-labelledby="pricing-title"
        >
          <h2 id="pricing-title" className="text-3xl font-semibold text-[#1E293B] text-center mb-6">Get a Quick Estimate</h2>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Number of Loads</label>
              <input
                type="number"
                value={loadSize}
                onChange={(e) => setLoadSize(Math.max(1, e.target.value))}
                className="w-full p-3 border border-[#008080]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                aria-label="Number of loads"
                min="1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full p-3 border border-[#008080]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                aria-label="Frequency of service"
              >
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <p className="text-lg font-bold text-[#008080] mb-4">Estimated Cost: AED {totalPrice}</p>
            <p className="text-sm text-[#64748B]">*Prices are indicative. Contact us for a custom quote.</p>
          </div>
        </motion.section>

        {/* Business Testimonials */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
          aria-labelledby="business-testimonials-title"
        >
          <h2 id="business-testimonials-title" className="text-3xl font-semibold text-[#1E293B] text-center mb-6">What Businesses Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-lg italic text-[#64748B] mb-4">&quot;Saved us hours with their bulk service—highly efficient!&quot;</p>
              <p className="text-sm text-[#008080] font-semibold">- John D., Hotel Manager</p>
              <img src="/images/business1.jpg" alt="John D." className="w-16 h-16 rounded-full mx-auto mt-2" loading="lazy" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-lg italic text-[#64748B] mb-4">&quot;Uniforms are always spotless, and the discount is a bonus.&quot;</p>
              <p className="text-sm text-[#008080] font-semibold">- Priya S., Office Admin</p>
              <img src="/images/business2.jpg" alt="Priya S." className="w-16 h-16 rounded-full mx-auto mt-2" loading="lazy" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-lg italic text-[#64748B] mb-4">&quot;Their partnership program boosted our brand visibility.&quot;</p>
              <p className="text-sm text-[#008080] font-semibold">- Ahmed R., Gym Owner</p>
              <img src="/images/business3.jpg" alt="Ahmed R." className="w-16 h-16 rounded-full mx-auto mt-2" loading="lazy" />
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-16"
          aria-labelledby="business-faq-title"
        >
          <h2 id="business-faq-title" className="text-3xl font-semibold text-[#1E293B] text-center mb-6">Business FAQs</h2>
          <div className="space-y-4">
            {[
              { q: "What’s the minimum order for bulk?", a: "Minimum 20 loads per order for bulk discounts." },
              { q: "Can I track my corporate account?", a: "Yes, via our online portal with real-time updates." },
              { q: "Are there seasonal offers?", a: "Yes, check our seasonal promotions page for details." },
              { q: "How do I join the partnership?", a: "Fill out the contact form below to get started." },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left text-lg font-semibold text-[#1E293B] flex justify-between items-center"
                  aria-expanded={faqOpen === index}
                  aria-controls={`business-faq-${index}`}
                >
                  {faq.q}
                  <span>{faqOpen === index ? '−' : '+'}</span>
                </button>
                <div
                  id={`business-faq-${index}`}
                  className={`mt-2 text-[#64748B] overflow-hidden transition-all duration-300 ${faqOpen === index ? 'max-h-40' : 'max-h-0'}`}
                  aria-hidden={faqOpen !== index}
                >
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA & Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mb-16"
          aria-labelledby="business-cta-title"
        >
          <h2 id="business-cta-title" className="text-2xl font-semibold text-[#1E293B] mb-4">Take Your Business to the Next Level</h2>
          <p className="text-lg text-[#64748B] mb-6 max-w-xl mx-auto">
            Ready to simplify your laundry needs? Get a custom quote or join our partnership program today.
          </p>
          <a href="/booking">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#F4B400] text-[#1E293B] px-6 py-3 rounded-lg hover:bg-[#F4B400]/90 transition-colors text-lg font-semibold mb-6"
              aria-label="Get started with business services"
            >
              Get Started
            </motion.button>
          </a>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h3 className="text-xl font-bold text-[#1E293B] mb-4">Request a Quote</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Business Name"
                className="w-full p-3 border border-[#008080]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                aria-label="Business name"
                required
              />
              <input
                type="email"
                placeholder="Business Email"
                className="w-full p-3 border border-[#008080]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                aria-label="Business email"
                required
              />
              <input
                type="tel"
                placeholder="Contact Number"
                className="w-full p-3 border border-[#008080]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                aria-label="Contact number"
                required
              />
              <textarea
                placeholder="Your Requirements"
                className="w-full p-3 border border-[#008080]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] h-24"
                aria-label="Business requirements"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#008080] text-white py-2 rounded-lg hover:bg-[#008080]/90 transition-colors"
                aria-label="Submit quote request"
              >
                Submit Request
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ForBusiness;