import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import HowItWorks from '../Components/HowItWorks';
import LaundryServices from '../Components/LaundryServices';
import OrderControl from '../Components/OrderControl';
import Quates from '../Components/Quates';
import Footer from '../Components/Footer';
import { Truck, WashingMachine, CalendarDays, Layers, Shirt, Package, MapPin, Phone } from "lucide-react";
import { Link } from 'react-router-dom';

const cities = ['Abu Dhabi'];

const branches = [
  {
    name: 'Main Branch',
    address: 'Musaffah Shabiya, ME - 11, M.B.Z Abu Dhabi',
    phone: '050 4224 956, 055 1452 443',
    lat: 24.3267,
    lng: 54.532,
  },
  {
    name: 'Branch 2',
    address: 'Near Emirates Nation School, Abu Dhabi, U.A.E.',
    phone: '050 4224 956, 055 1452 443',
    lat: 24.47,
    lng: 54.383,
  },
  {
    name: 'Branch 3',
    address: '7th Building Baniyas Court West, Abu Dhabi, U.A.E.',
    phone: '050 4224 956',
    lat: 24.3065,
    lng: 54.6349,
  },
];

const useTypingEffect = (words, typingSpeed = 50, pause = 800) => {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [typing, setTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let timeout;
    if (typing) {
      if (charIndex < words[wordIndex].length) {
        timeout = setTimeout(() => {
          setDisplayed((prev) => prev + words[wordIndex][charIndex]);
          setCharIndex(charIndex + 1);
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setTyping(false), pause);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayed((prev) => prev.slice(0, -1));
          setCharIndex(charIndex - 1);
        }, typingSpeed / 2);
      } else {
        setTyping(true);
        setWordIndex((wordIndex + 1) % words.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [typing, charIndex, wordIndex, words, typingSpeed, pause]);

  return displayed;
};

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Home = () => {
  const city = useTypingEffect(cities);
  const [nearestBranch, setNearestBranch] = useState(branches[0]);
  const [showMobileCTA, setShowMobileCTA] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        let nearest = branches[0];
        let minDist = Infinity;
        branches.forEach((branch) => {
          const dist = getDistance(userLat, userLng, branch.lat, branch.lng);
          if (dist < minDist) {
            minDist = dist;
            nearest = branch;
          }
        });
        setNearestBranch(nearest);
      });
    }

    const handleScroll = () => {
      setShowMobileCTA(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSchedule = () => {
    localStorage.setItem('selectedBranch', JSON.stringify(nearestBranch));
  };

  return (
    <>
      <Navbar />

      {/* Desktop Hero */}
      <section className="hidden lg:flex min-h-screen bg-[#017C80] items-center justify-between px-20 pt-[100px]">
        {/* Left Text */}
        <div className="max-w-lg text-white">
          <p className="text-yellow-400 font-semibold">Since 2004</p>
          <h1 className="text-5xl font-bold mt-2">
            مصبغة ابراج
          </h1>
          <h1 className="text-5xl font-bold">TOWERS LAUNDRY</h1>
          <h2 className="text-4xl font-bold text-yellow-400 mt-1">
            All Dry Steam More Clean
          </h2>
          <div className="flex mt-2 items-center text-lg font-semibold">
            <span className="mr-2">in</span>
            <span>{city}</span>
          </div>
          <p className="mt-4 text-white/80">
            Full Dry Cleaning & Laundry Services · 3 Branches · Free Home Delivery · 1hr Service
          </p>
          <Link to="/booking" onClick={handleSchedule}>
            <button className="mt-6 bg-yellow-400 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-500">
              Schedule at Nearest Branch
            </button>
          </Link>
        </div>
        {/* Right Image */}
        <div className="w-[320px] sm:w-[420px] lg:w-[500px] h-[320px] sm:h-[420px] lg:h-[500px] rounded-full overflow-hidden shadow-lg">
          <img
            src="/images/homeimg.png"
            alt="Hero"
            className="object-cover w-full h-full"
          />
        </div>
      </section>

      {/* Mobile Hero */}
      <section
        className="block lg:hidden relative bg-cover bg-center  min-h-[100vh] flex items-center justify-center pt-[90px]"
        style={{ backgroundImage: "url('/images/homeimg.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        <div className="relative z-10 text-center px-6">
          <p className="text-yellow-400 font-semibold text-lg mb-2">Since 2004</p>
          <h1 className="text-4xl font-extrabold text-white leading-tight">
            <span className="block">مصبغة ابراج</span>
            <span className="block">TOWERS LAUNDRY</span>
          </h1>
          <p className="text-xl text-yellow-400 mt-2">All Steam More Clean</p>
          {/* <p className="text-lg text-white/90 mt-1">جميع خدمات التنظيف بالبخار</p> */}
          <div className="h-1 w-16 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-white/90">
            Full Dry Cleaning & Laundry Services · Free Home Delivery · 1 Hour Service
          </p>
          <div className="mt-2 flex items-center justify-center text-white font-bold text-lg">
            <span className="mr-1">in</span>
            <span>{city}</span>
          </div>
          <Link to="/booking" onClick={handleSchedule}>
            <button className="mt-6 bg-yellow-400 text-black px-8 mb-2 py-3 rounded-lg hover:bg-yellow-500 font-semibold text-lg shadow-lg">
              Schedule at Nearest Branch
            </button>
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="py-8 bg-white sm:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#008080] mb-6 sm:mb-10">
            Our Services
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
            <ServiceCard icon={<Truck className="w-7 h-7 sm:w-8 sm:h-8" />} title="Free Pickup" />
            <ServiceCard icon={<WashingMachine className="w-7 h-7 sm:w-8 sm:h-8" />} title="Clean Wash" />
            <ServiceCard icon={<CalendarDays className="w-7 h-7 sm:w-8 sm:h-8" />} title="1hr Service" />
            <ServiceCard icon={<Layers className="w-7 h-7 sm:w-8 sm:h-8" />} title="Carpet Cleaning" />
            <ServiceCard icon={<Shirt className="w-7 h-7 sm:w-8 sm:h-8" />} title="Dry Cleaning" />
            <ServiceCard icon={<Package className="w-7 h-7 sm:w-8 sm:h-8" />} title="Fast Delivery" />
          </div>
        </div>
      </section>


      {/* Branches */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#008080] mb-10">Our Branches</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((branch, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-[#008080] mb-2">{branch.name}</h3>
                <p className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-2" /> {branch.address}
                </p>
                <p className="flex items-center mt-2 text-gray-700">
                  <Phone className="w-5 h-5 mr-2" /> {branch.phone}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-gray-600">Suggestions & Complaints: 055 1656 700</p>
        </div>
      </section>

      <HowItWorks />
      <LaundryServices />
      <OrderControl />
      <Quates />
      <Footer />

      {/* Mobile CTA */}
      {showMobileCTA && (
        <div className="fixed bottom-6 left-6 right-6 sm:hidden z-50 animate-slideUp">
          <Link to="/booking" onClick={handleSchedule}>
            <button className="w-full bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-500 transition">
              Schedule Now
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

const ServiceCard = ({ icon, title }) => (
  <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow hover:shadow-lg transition">
    <div className="text-[#008080]">{icon}</div>
    <p className="mt-2 text-sm font-medium text-gray-700 text-center">{title}</p>
  </div>
);

export default Home;
