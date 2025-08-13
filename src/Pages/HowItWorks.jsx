import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Clock, Package, Bell, MapPin, Shirt, Truck } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

// Define stepVariants outside the components
const stepVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const HowItWorks = () => {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Handle click on step buttons
    const stepButtons = document.querySelectorAll('.step-button');
    stepButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        const stepSection = document.querySelectorAll('section')[index + 1]; // +1 to skip hero section
        if (stepSection) stepSection.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Update progress bar based on scroll
    const updateProgress = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      sections.forEach((section, index) => {
        if (index > 0 && section.offsetTop <= scrollPosition) {
          const progress = ((index) / (sections.length - 1)) * 100;
          document.querySelector('.progress-bar').style.width = `${progress}%`;
        }
      });
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', updateProgress);
    handleHashChange(); // Initial check
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return (
    <div className="font-sans">
      {/* Sticky Navbar */}
      {/* <motion.nav
        className="fixed top-0 w-full bg-white shadow-md z-50 transition-all duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      > */}
      {/* </motion.nav> */}
        <Navbar />

      <section className="relative bg-gradient-to-b from-[#F0FDF4] to-white pt-32 pb-20 text-center overflow-hidden mt-16">
        <div className="absolute top-0 left-0 w-full h-24">
          {/* <svg viewBox="0 0 500 80" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,80 C150,0 350,160 500,80 L500,0 L0,0 Z" className="fill-[#008080]" />
          </svg> */}
        </div>
        <div className="max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#111827] mb-6 leading-tight"
          >
            Effortless Laundry, Delivered to You
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-[#111827] mb-8"
          >
            Schedule, track, and enjoy fresh, clean clothes in 24 hours — all from home.
          </motion.p>
          <motion.a
            href="#schedule"
            whileHover={{ scale: 1.05, backgroundColor: '#E6A500' }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-[#F4B400] text-[#111827] font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
            aria-label="Schedule a pickup"
          >
            <Truck className="text-lg" />
            Schedule a Pickup
          </motion.a>
        </div>
      </section>

      <section className="bg-[#F0FDF4] py-12">
        {/* Progress Indicator with Clickable Steps */}
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <div className="flex justify-between items-center text-sm font-medium">
            {['Step 1', 'Step 2', 'Step 3', 'Step 4'].map((step, index) => (
              <button
                key={index}
                className="step-button px-4 py-2 rounded-full text-[#008080] hover:bg-[#008080]/10 focus:outline-none focus:ring-2 focus:ring-[#008080] transition-colors duration-200"
                aria-label={`Go to ${step}`}
              >
                {step}
              </button>
            ))}
          </div>
          <div className="h-2 bg-[#008080]/20 rounded-full mt-2">
            <div className="h-2 bg-[#008080] rounded-full progress-bar w-1/4 transition-all duration-300"></div>
          </div>
        </div>

        <StepSection
          stepVariants={stepVariants}
          step="Step 1"
          title="Schedule Your Pickup"
          description="Book your laundry pickup in seconds with our intuitive app or website, tailored to your schedule."
          items={[
            { icon: Smartphone, text: 'Instant booking via app or website' },
            { icon: Clock, text: 'Flexible slots, including evenings and weekends' },
          ]}
          imageSrc="https://storage.googleapis.com/a1aa/image/f94bbd61-5a54-412b-8987-343dec34e663.jpg"
          imageAlt="Person using smartphone to schedule laundry pickup"
          cardContent={
            <>
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-[#008080] w-20 h-20 flex items-center justify-center">
                  <Shirt className="text-white text-2xl" />
                </div>
              </div>
              <h3 className="text-[#111827] font-bold text-lg mb-2">Pickup Confirmed</h3>
              <p className="text-[#111827] text-sm">We’ll notify you when our driver is on the way.</p>
            </>
          }
        />
        <StepSection
          stepVariants={stepVariants}
          step="Step 2"
          title="Pack Your Laundry"
          description="Use our provided disposable bag or opt for eco-friendly reusable bags handled by our team."
          items={[
            { icon: Package, text: 'One bag per order for simplicity' },
            { icon: Clock, text: 'No need to count or weigh items' },
          ]}
          imageSrc="https://storage.googleapis.com/a1aa/image/6ff61bda-faa1-4f41-035d-26d1a61e30fe.jpg"
          imageAlt="Person packing laundry into a bag"
          cardContent={
            <>
              <div className="flex justify-center mb-4">
                <img
                  src="https://placehold.co/80x80?text=Bag&font=inter"
                  alt="Laundry bag icon"
                  className="w-20 h-20 object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="text-[#111827] font-bold text-lg mb-2">Eco-Friendly Bags</h3>
              <p className="text-[#111827] text-sm">Your items are transferred to reusable TowerLaundry bags.</p>
            </>
          }
          reverse
        />
        <StepSection
          stepVariants={stepVariants}
          step="Step 3"
          title="Track Your Laundry Live"
          description="Stay updated with real-time notifications and track your driver’s location during processing."
          items={[
            { icon: Bell, text: 'Instant order updates' },
            { icon: MapPin, text: 'Live driver tracking' },
          ]}
          imageSrc="https://storage.googleapis.com/a1aa/image/25a1b799-47f1-434b-46ca-0bb0d89b82a1.jpg"
          imageAlt="Delivery van on a city street"
          cardContent={
            <>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://storage.googleapis.com/a1aa/image/4d403c97-6f48-40f6-11d5-20477bb385f4.jpg"
                  alt="Smiling delivery driver"
                  className="w-12 h-12 rounded-lg object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="font-bold text-[#111827]">Alex Johnson</p>
                  <p className="text-[#111827] text-sm">FastTrack Delivery</p>
                  <p className="text-[#008080] font-semibold text-sm">Arriving in 5 minutes</p>
                </div>
              </div>
              <img
                src="https://storage.googleapis.com/a1aa/image/348e7a17-e6d8-42e7-660a-bf5962dbba23.jpg"
                alt="Map with driver location"
                className="rounded-lg w-full h-auto"
                loading="lazy"
              />
            </>
          }
        />
        <StepSection
          stepVariants={stepVariants}
          step="Step 4"
          title="Relax and Receive"
          description="We clean your laundry with care and deliver it back on your schedule. Reschedule anytime with ease."
          items={[
            { icon: Clock, text: '24-hour turnaround time' },
            { icon: Bell, text: 'Real-time order status' },
            { icon: Smartphone, text: 'Easy rescheduling options' },
          ]}
          imageSrc="https://storage.googleapis.com/a1aa/image/f485403c-f7ef-468c-713f-6f347588f4d9.jpg"
          imageAlt="Person receiving laundry delivery"
          cardContent={
            <>
              <p className="text-[#008080] font-semibold text-lg mb-2">Delivery Today</p>
              <p className="text-[#111827] font-bold text-xl mb-4">12:00 - 15:00</p>
              <p className="text-[#111827] text-sm">
                Not home?{' '}
                <a
                  href="#"
                  className="text-[#008080] font-semibold hover:underline transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Reschedule modal would open here');
                  }}
                  aria-label="Reschedule delivery"
                >
                  Reschedule
                </a>
              </p>
            </>
          }
          reverse
        />
      </section>
      <Footer />
    </div>
  );
};

const StepSection = ({ stepVariants, step, title, description, items, imageSrc, imageAlt, cardContent, reverse }) => {
  return (
    <motion.section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"
      variants={stepVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-12`}>
        <div className="lg:w-1/2 max-w-lg">
          <p className="text-sm font-semibold text-[#008080] uppercase tracking-wide mb-3">{step}</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] mb-4 leading-tight">{title}</h2>
          <p className="text-lg md:text-xl text-[#111827] mb-8">{description}</p>
          <ul className="space-y-5">
            {items.map((item, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-4"
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#008080]/10 text-[#F4B400]">
                  <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="text-base md:text-lg font-semibold text-[#111827]">{item.text}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="lg:w-1/2 relative max-w-lg w-full">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="rounded-xl w-full h-auto object-cover shadow-md hover:shadow-lg transition-shadow duration-300"
            loading="lazy"
            width="600"
            height="400"
          />
          {cardContent && (
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 w-72 md:w-80 text-center border border-[#008080]/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              {cardContent}
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorks;