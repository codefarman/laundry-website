import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const About = () => {
  const [faqOpen, setFaqOpen] = useState(null);

  const toggleFAQ = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-20 from-[#F1F5F9] to-[#E0F2F7] font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16" role="main" aria-label="About Towers Laundry">
        {/* Hero Section with Poster */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-cover bg-center h-64 sm:h-96 rounded-lg mb-12 overflow-hidden"
          style={{ backgroundImage: "url('/images/about-poster.jpg')" }}
          aria-label="Towers Laundry Poster"
        >
          <div className="absolute inset-0 bg-[#008080]/70 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl sm:text-5xl font-bold mb-4">About Towers Laundry</h1>
              <p className="text-lg sm:text-xl max-w-2xl mx-auto">
                Celebrating 21 years of excellence in laundry care since 2004. Discover our story and commitment to you.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mission & Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
          aria-labelledby="mission-title"
        >
          <h2 id="mission-title" className="text-3xl font-semibold text-[#1E293B] text-center mb-6">Our Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <p className="text-lg text-[#64748B] leading-relaxed">
              At Towers Laundry, our mission is to revolutionize laundry care with unparalleled quality, eco-friendly practices, and exceptional customer service. Since our inception in 2004, we’ve grown into a trusted name across Abu Dhabi, serving over 50,000 households with dedication. We aim to simplify your life while preserving the environment, one clean load at a time.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-[#008080] text-white p-4 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-bold mb-2">Quality</h3>
                <p className="text-sm">Ensuring every garment is treated with expertise.</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-[#008080] text-white p-4 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-bold mb-2">Sustainability</h3>
                <p className="text-sm">Using 30% less water than industry averages.</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-[#008080] text-white p-4 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-bold mb-2">Trust</h3>
                <p className="text-sm">Building lasting relationships with every client.</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-[#008080] text-white p-4 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-bold mb-2">Innovation</h3>
                <p className="text-sm">Leading with cutting-edge laundry technology.</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* History Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
          aria-labelledby="history-title"
        >
          <h2 id="history-title" className="text-3xl font-semibold text-[#1E293B] text-center mb-6">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#008080]/20"></div>
            <div className="space-y-12">
              <div className="flex flex-col sm:flex-row items-center mb-8">
                <div className="bg-white p-4 rounded-lg shadow-md w-40 h-40 flex items-center justify-center sm:order-1">
                  <span className="text-2xl font-bold text-[#008080]">2004</span>
                </div>
                <div className="sm:ml-8 mt-4 sm:mt-0 sm:w-3/4">
                  <h3 className="text-xl font-bold text-[#1E293B] mb-2">Founded in Abu Dhabi</h3>
                  <p className="text-[#64748B]">Towers Laundry began with a single shop, driven by a passion for clean clothes and community service.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row-reverse items-center mb-8">
                <div className="bg-white p-4 rounded-lg shadow-md w-40 h-40 flex items-center justify-center sm:order-1">
                  <span className="text-2xl font-bold text-[#008080]">2010</span>
                </div>
                <div className="sm:mr-8 mt-4 sm:mt-0 sm:w-3/4">
                  <h3 className="text-xl font-bold text-[#1E293B] mb-2">Expansion to 3 Branches</h3>
                  <p className="text-[#64748B]">Opened branches in Mussafah, Jumeirah, and Al Ain, introducing free home delivery.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center mb-8">
                <div className="bg-white p-4 rounded-lg shadow-md w-40 h-40 flex items-center justify-center sm:order-1">
                  <span className="text-2xl font-bold text-[#008080]">2015</span>
                </div>
                <div className="sm:ml-8 mt-4 sm:mt-0 sm:w-3/4">
                  <h3 className="text-xl font-bold text-[#1E293B] mb-2">Eco-Friendly Initiative</h3>
                  <p className="text-[#64748B]">Launched a program to reduce water usage by 30% with advanced machines.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row-reverse items-center">
                <div className="bg-white p-4 rounded-lg shadow-md w-40 h-40 flex items-center justify-center sm:order-1">
                  <span className="text-2xl font-bold text-[#008080]">2025</span>
                </div>
                <div className="sm:mr-8 mt-4 sm:mt-0 sm:w-3/4">
                  <h3 className="text-xl font-bold text-[#1E293B] mb-2">21 Years of Excellence</h3>
                  <p className="text-[#64748B]">Celebrating our milestone with online booking and a growing team of 50 experts.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Team Showcase
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
          aria-labelledby="team-title"
        >
          <h2 id="team-title" className="text-3xl font-semibold text-[#1E293B] text-center mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-4 rounded-lg shadow-md text-center"
            >
              <img src="/images/team1.jpg" alt="Ahmed Al-Sheikh" className="w-32 h-32 rounded-full mx-auto mb-2" loading="lazy" />
              <h3 className="text-lg font-bold text-[#1E293B]">Ahmed Al-Sheikh</h3>
              <p className="text-[#64748B]">Founder & CEO</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-4 rounded-lg shadow-md text-center"
            >
              <img src="/images/team2.jpg" alt="Fatima Rahman" className="w-32 h-32 rounded-full mx-auto mb-2" loading="lazy" />
              <h3 className="text-lg font-bold text-[#1E293B]">Fatima Rahman</h3>
              <p className="text-[#64748B]">Operations Manager</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-4 rounded-lg shadow-md text-center"
            >
              <img src="/images/team3.jpg" alt="Omar Khalid" className="w-32 h-32 rounded-full mx-auto mb-2" loading="lazy" />
              <h3 className="text-lg font-bold text-[#1E293B]">Omar Khalid</h3>
              <p className="text-[#64748B]">Head of Sustainability</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-4 rounded-lg shadow-md text-center"
            >
              <img src="/images/team4.jpg" alt="Layla Hassan" className="w-32 h-32 rounded-full mx-auto mb-2" loading="lazy" />
              <h3 className="text-lg font-bold text-[#1E293B]">Layla Hassan</h3>
              <p className="text-[#64748B]">Customer Service Lead</p>
            </motion.div>
          </div>
        </motion.section> */}

        {/* Sustainability Commitment */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
          aria-labelledby="sustainability-title"
        >
          <h2 id="sustainability-title" className="text-3xl font-semibold text-[#1E293B] text-center mb-6">Our Sustainability Pledge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <p className="text-lg text-[#64748B] leading-relaxed">
              We’re proud to lead the laundry industry with sustainable practices. Our facilities use 30% less water and 25% less energy than traditional methods, thanks to state-of-the-art equipment. We recycle 90% of our water and use biodegradable detergents, reducing our carbon footprint by 15 tons annually.
            </p>
            <div className="bg-[#008080]/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#008080] mb-2">Green Stats</h3>
              <ul className="list-disc list-inside text-[#64748B]">
                <li>Water saved: 1.2 million liters/year</li>
                <li>Energy reduction: 25% across branches</li>
                <li>Carbon offset: 15 tons/year</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Customer Testimonials */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-16"
          aria-labelledby="testimonials-title"
        >
          <h2 id="testimonials-title" className="text-3xl font-semibold text-[#1E293B] text-center mb-6">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-lg italic text-[#64748B] mb-4">&quot;Fast, friendly, and my clothes have never been cleaner!&quot;</p>
              <p className="text-sm text-[#008080] font-semibold">- Amina K., Dubai</p>
              <img src="/images/customer1.jpg" alt="Amina K." className="w-16 h-16 rounded-full mx-auto mt-2" loading="lazy" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-lg italic text-[#64748B] mb-4">&quot;Their eco-friendly approach is a game-changer for me.&quot;</p>
              <p className="text-sm text-[#008080] font-semibold">- Hassan M., Abu Dhabi</p>
              <img src="/images/customer2.jpg" alt="Hassan M." className="w-16 h-16 rounded-full mx-auto mt-2" loading="lazy" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-lg italic text-[#64748B] mb-4">&quot;Reliable service with a smile—highly recommend!&quot;</p>
              <p className="text-sm text-[#008080] font-semibold">- Sara L., Al Ain</p>
              <img src="/images/customer3.jpg" alt="Sara L." className="w-16 h-16 rounded-full mx-auto mt-2" loading="lazy" />
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-16"
          aria-labelledby="faq-title"
        >
          <h2 id="faq-title" className="text-3xl font-semibold text-[#1E293B] text-center mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How long does delivery take?", a: "Typically 24-48 hours, depending on your location and schedule." },
              { q: "Are your detergents eco-friendly?", a: "Yes, we use 100% biodegradable detergents for all services." },
              { q: "Can I cancel my booking?", a: "Yes, cancellations are free up to 12 hours before pickup." },
              { q: "Do you offer bulk discounts?", a: "Yes, contact us for custom quotes on large orders." },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left text-lg font-semibold text-[#1E293B] flex justify-between items-center"
                  aria-expanded={faqOpen === index}
                  aria-controls={`faq-${index}`}
                >
                  {faq.q}
                  <span>{faqOpen === index ? '−' : '+'}</span>
                </button>
                <div
                  id={`faq-${index}`}
                  className={`mt-2 text-[#64748B] overflow-hidden transition-all duration-300 ${faqOpen === index ? 'max-h-40' : 'max-h-0'}`}
                  aria-hidden={faqOpen !== index}
                >
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Awards Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mb-16 text-center"
          aria-labelledby="awards-title"
        >
          <h2 id="awards-title" className="text-3xl font-semibold text-[#1E293B] mb-6">Our Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#008080] mb-2">Best Laundry Service 2023</h3>
              <p className="text-[#64748B]">Awarded by UAE Business Excellence Awards.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#008080] mb-2">Green Innovation 2022</h3>
              <p className="text-[#64748B]">Recognized by Eco-Friendly Business Forum.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#008080] mb-2">Customer Choice 2021</h3>
              <p className="text-[#64748B]">Voted by over 10,000 satisfied clients.</p>
            </div>
          </div>
        </motion.section>

        {/* CTA & Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-center mb-16"
          aria-labelledby="cta-title"
        >
          <h2 id="cta-title" className="text-2xl font-semibold text-[#1E293B] mb-4">Join Our Clean Journey</h2>
          <p className="text-lg text-[#64748B] mb-6 max-w-xl mx-auto">
            Ready to experience Towers Laundry? Schedule a pickup or reach out with any questions. We’re here for you!
          </p>
          <a href="/booking">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#F4B400] text-[#1E293B] px-6 py-3 rounded-lg hover:bg-[#F4B400]/90 transition-colors text-lg font-semibold mb-6"
              aria-label="Schedule a pickup now"
            >
              Schedule Now
            </motion.button>
          </a>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h3 className="text-xl font-bold text-[#1E293B] mb-4">Contact Us</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-[#008080]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                aria-label="Your name"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border border-[#008080]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                aria-label="Your email"
                required
              />
              <textarea
                placeholder="Your Message"
                className="w-full p-3 border border-[#008080]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] h-24"
                aria-label="Your message"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#008080] text-white py-2 rounded-lg hover:bg-[#008080]/90 transition-colors"
                aria-label="Send message"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default About;