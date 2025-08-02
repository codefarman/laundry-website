import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-[#F0FDF4] to-white pt-32 pb-20 text-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24">
        <svg viewBox="0 0 500 80" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,80 C150,0 350,160 500,80 L500,0 L0,0 Z" className="fill-[#008080]" />
        </svg>
      </div>
      <div className="max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold text-[#111827] mb-6"
        >
          Effortless Laundry, Delivered to You
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-xl text-[#111827] mb-8"
        >
          Schedule, track, and enjoy fresh, clean clothes in 24 hours — all from the comfort of your home.
        </motion.p>
        <motion.a
          href="#schedule"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 bg-[#F4B400] text-[#111827] font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[#F4B400]/90 transition duration-300"
        >
          <i className="fas fa-truck text-lg"></i> Schedule a Pickup
        </motion.a>
      </div>
    </section>
  );
};

const StepSection = ({ step, title, description, items, imageSrc, imageAlt, cardContent, reverse }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-16`}>
        <div className="lg:w-1/2 max-w-lg">
          <p className="text-sm font-semibold text-[#008080] uppercase tracking-wide mb-3">{step}</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] mb-4">{title}</h2>
          <p className="text-lg text-[#111827] mb-8">{description}</p>
          <ul className="space-y-6">
            {items.map((item, index) => (
              <li key={index} className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#008080]/10 text-[#F4B400]">
                  <i className={item.icon}></i>
                </div>
                <span className="font-semibold text-[#111827]">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:w-1/2 relative max-w-lg w-full">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="rounded-xl w-full h-auto object-cover shadow-lg"
            width="600"
            height="400"
          />
          {cardContent && (
            <div className="absolute top-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 w-80 text-center border border-[#008080]/20">
              {cardContent}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <HeroSection />
      <section className="bg-[#F0FDF4] py-12">
        <StepSection
          step="Step 1"
          title="Schedule Your Pickup"
          description="Book your laundry pickup in seconds with our user-friendly app or website, tailored to your schedule."
          items={[
            { icon: "fas fa-mobile-alt", text: "Instant booking via app or website" },
            { icon: "fas fa-clock", text: "Flexible slots, including evenings and weekends" },
          ]}
          imageSrc="https://storage.googleapis.com/a1aa/image/f94bbd61-5a54-412b-8987-343dec34e663.jpg"
          imageAlt="Person using smartphone to schedule laundry pickup"
          cardContent={
            <>
              <div className="flex justify-center mb-4 top-1">
                <div className="rounded-full bg-[#008080] w-20 h-20 flex items-center justify-center">
                  <i className="fas fa-shirt text-white text-2xl"></i>
                </div>
              </div>
              <h3 className="text-[#111827] font-bold text-lg mb-2">Pickup Confirmed</h3>
              <p className="text-[#111827] text-sm">We’ll notify you when our driver is on the way to collect your laundry.</p>
            </>
          }
        />
        <StepSection
          step="Step 2"
          title="Pack Your Laundry"
          description="Use our provided disposable bag for your laundry. Our team will handle the rest with eco-friendly reusable bags."
          items={[
            { icon: "fas fa-box-open", text: "One bag per order for simplicity" },
            { icon: "fas fa-weight-hanging", text: "No need to count or weigh items" },
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
                />
              </div>
              <h3 className="text-[#111827] font-bold text-lg mb-2">Eco-Friendly Bags</h3>
              <p className="text-[#111827] text-sm">Your items are transferred to reusable TowerLaundry bags.</p>
            </>
          }
          reverse
        />
        <StepSection
          step="Step 3"
          title="Track Your Laundry Live"
          description="Stay updated with real-time notifications and track your driver’s location as your laundry is processed."
          items={[
            { icon: "fas fa-bell", text: "Instant order updates" },
            { icon: "fas fa-map-marker-alt", text: "Live driver tracking" },
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
              />
            </>
          }
        />
        <StepSection
          step="Step 4"
          title="Relax and Receive"
          description="We clean your laundry with care and deliver it back to you on your schedule. Reschedule anytime with ease."
          items={[
            { icon: "fas fa-clock", text: "24-hour turnaround time" },
            { icon: "fas fa-tachometer-alt", text: "Real-time order status" },
            { icon: "fas fa-mobile-alt", text: "Easy rescheduling options" },
          ]}
          imageSrc="https://storage.googleapis.com/a1aa/image/f485403c-f7ef-468c-713f-6f347588f4d9.jpg"
          imageAlt="Person receiving laundry delivery"
          cardContent={
            <>
              <p className="text-[#008080] font-semibold text-lg mb-2">Delivery Today</p>
              <p className="text-[#111827] font-bold text-xl mb-4">12:00 - 15:00</p>
              <p className="text-[#111827] text-sm">
                Not home?{' '}
                <a href="#" className="text-[#008080] font-semibold hover:underline">
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

export default HowItWorks;