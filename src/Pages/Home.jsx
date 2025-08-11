import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import HowItWorks from '../Components/HowItWorks';
import LaundryServices from '../Components/LaundryServices';
import OrderControl from '../Components/OrderControl';
import Quates from '../Components/Quates';
import Footer from '../Components/Footer';
import { Truck, WashingMachine, CalendarDays, MapPin, Phone } from 'lucide-react';
import { Link } from "react-router-dom";

const cities = ['Abu Dhabi'];

const branches = [
  {
    name: 'Main Branch',
    address: 'Mussafah Shabiya, ME - 11, M.B.Z Abu Dhabi',
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
    address: '7th Building Banijas Court West, Abu Dhabi, U.A.E.',
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

// Haversine distance formula
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Home = () => {
  const city = useTypingEffect(cities);
  const [nearestBranch, setNearestBranch] = useState(branches[0]); // Default to Main
  const [locationError, setLocationError] = useState(false);

  // Auto-select nearest branch using geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
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
        },
        () => {
          setLocationError(true); // Default to Main if denied
        }
      );
    }
  }, []);

  const handleSchedule = () => {
    // Save nearest branch to localStorage for use in booking page
    localStorage.setItem('selectedBranch', JSON.stringify(nearestBranch));
  };

  return (
    <>
      <Navbar />

      {/* Hero Section - Updated with poster branding */}
      <div className="min-h-screen lg:min-h-[800px] bg-[#008080] text-white pt-[120px] pb-14 px-4 sm:px-8 flex flex-col justify-center">
        <div className="max-w-[1300px] w-full mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
          {/* Left Side - Text */}
          <div className="lg:w-1/2 w-full animate-fadeIn">
            <p className="text-sm font-semibold text-yellow-400 mb-2 text-center sm:text-left">Since 2004</p>
            <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-extrabold leading-tight text-white text-center sm:text-left">
              Towers Laundry
              <br />
              <span className="text-yellow-400">All Dry Steam More Clean</span>
              <br />
              in <span className="px-2 text-[#111827] bg-white lg:text-5xl sm:text-xl font-bold rounded-md">{city}&nbsp;</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-white/90 text-center sm:text-left">
              Full Dry Cleaning & Laundry Services · 3 Branches · Free Home Delivery · 1hr Service
            </p>

            {/* CTA Button - Automatic branch assignment */}
            <div className="mt-6  sm:w-auto">
              <Link to="/booking" onClick={handleSchedule}>
                <button className="bg-[#F4B400] text-[#111827] px-5 py-2 rounded-md hover:bg-yellow-500 transition w-full sm:w-auto">
                  Schedule at Nearest Branch
                </button>
              </Link>
            </div>

            {/* Mobile-only icons */}
            <div className="mt-6 flex sm:hidden justify-around text-white">
              <div className="flex flex-col items-center">
                <Truck className="w-8 h-8" />
                <span className="text-xs mt-1">Free Pickup</span>
              </div>
              <div className="flex flex-col items-center">
                <WashingMachine className="w-8 h-8" />
                <span className="text-xs mt-1">Clean Wash</span>
              </div>
              <div className="flex flex-col items-center">
                <CalendarDays className="w-8 h-8" />
                <span className="text-xs mt-1">1hr Service</span>
              </div>
            </div>
          </div>

          {/* Right Side - Image (Hide on mobile) */}
          <div className="hidden md:flex w-full md:w-1/2 justify-center">
            <div className="w-[320px] sm:w-[420px] lg:w-[500px] h-[320px] sm:h-[420px] lg:h-[500px] rounded-full overflow-hidden shadow-lg">
              <img
                src="/images/homeimg.png"
                alt="Hero"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* New Branches Section - Creative grid with hover effects */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-[1300px] mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#008080] mb-10">Our Branches</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {branches.map((branch, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition duration-300 border-t-4 border-yellow-400"
              >
                <h3 className="text-xl font-semibold text-[#008080] mb-2">{branch.name}</h3>
                <p className="flex items-center text-gray-600 mb-2"><MapPin className="w-5 h-5 mr-2" /> {branch.address}</p>
                <p className="flex items-center text-gray-600"><Phone className="w-5 h-5 mr-2" /> {branch.phone}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-gray-600">Suggestions & Complaints: 055 1656 700</p>
        </div>
      </div>

      {/* Other Sections */}
      <HowItWorks />
      <LaundryServices />
      <OrderControl />
      <Quates />
      <Footer />
    </>
  );
};

export default Home;