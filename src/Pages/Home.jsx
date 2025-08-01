// import React, { useState } from 'react'
// import Navbar from '../Components/Navbar'
// import HowItWorks from '../Components/HowItWorks'
// import LaundryServices from '../Components/LaundryServices'
// import OrderControl from '../Components/OrderControl'
// import Quates from '../Components/Quates'
// import Footer from '../Components/Footer'
// import { useEffect } from 'react'

// const cities = ['Abu Dhabi', 'Dubai']

// const useTypingEffect = (words, typingSpeed = 50, pause = 800) => {
//     const [displayed, setDisplayed] = useState('')
//     const [wordIndex, setWordIndex] = useState(0)
//     const [typing, setTyping] = useState(true)
//     const [charIndex, setCharIndex] = useState(0)

//     useEffect(() => {
//         let timeout
//         if (typing) {
//             if (charIndex < words[wordIndex].length) {
//                 timeout = setTimeout(() => {
//                     setDisplayed(prev => prev + words[wordIndex][charIndex])
//                     setCharIndex(charIndex + 1)
//                 }, typingSpeed)
//             } else {
//                 timeout = setTimeout(() => setTyping(false), pause)
//             }
//         } else {
//             if (charIndex > 0) {
//                 timeout = setTimeout(() => {
//                     setDisplayed(prev => prev.slice(0, -1))
//                     setCharIndex(charIndex - 1)
//                 }, typingSpeed / 2)
//             } else {
//                 setTyping(true)
//                 setWordIndex((wordIndex + 1) % words.length)
//             }
//         }
//         return () => clearTimeout(timeout)
//     }, [typing, charIndex, wordIndex, words, typingSpeed, pause])

//     return displayed
// }


// const Home = () => {
//     const city = useTypingEffect(cities)

//     return (
//         <>
//             <Navbar />

//             {/* Hero Section */}
//             <div className="relative bg-[#008080] text-white pt-[100px] pb-14 px-4 sm:px-8 min-h-[100vh] sm:min-h-0 flex flex-col justify-center">
//                 {/* Light background blob only for mobile */}
//                 <div className="absolute inset-0 bg-white opacity-[0.05] rounded-[50%] w-[300px] h-[300px] blur-3xl left-1/2 -translate-x-1/2 top-10 md:hidden" />

//                 <div className='max-w-[1300px] w-full mx-auto flex flex-col items-center justify-between gap-8'>

//                     {/* Animated badge (only on mobile) */}
//                     <div className="md:hidden text-sm font-semibold bg-yellow-300 text-[#111827] px-4 py-1 rounded-full shadow-lg animate-bounce mb-3">
//                         🎉 Free Pickup & Delivery!
//                     </div>

//                     {/* Main Text */}
//                     <div className='text-center md:text-left'>
//                         <h1 className='text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-extrabold leading-tight'>
//                             Fast & Fresh Laundry Service<br />
//                             in <span className='bg-white text-[#111827] px-2 rounded-md'>{city}&nbsp;</span>
//                         </h1>

//                         <p className='mt-4 text-sm sm:text-base text-white/90'>
//                             24h delivery · 3 branches · Free home pickup & drop
//                         </p>
//                     </div>

//                     {/* CTA */}
//                     <div className='w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2 sm:gap-0 bg-white rounded-lg p-3 shadow-md'>
//                         <input
//                             type='text'
//                             placeholder='Enter your area (e.g. MBZ, Mussafah)'
//                             className='text-[#111827] px-3 py-2 rounded-md w-full sm:w-auto outline-none'
//                         />
//                         <button className='bg-[#F4B400] text-[#111827] px-5 py-2 rounded-md hover:bg-yellow-400 transition w-full sm:w-auto'>
//                             Schedule
//                         </button>
//                     </div>

//                     {/* Image (visible on all devices now) */}
//                     <div className="w-[250px] sm:w-[300px] md:w-[420px] h-[250px] sm:h-[300px] md:h-[420px] rounded-full overflow-hidden shadow-lg mt-6 md:mt-0">
//                         <img
//                             src="/images/homeimg.png"
//                             alt="Hero"
//                             className="object-cover w-full h-full"
//                         />
//                     </div>
//                 </div>
//             </div>


//             {/* Other Sections */}
//             <HowItWorks />
//             <LaundryServices />
//             <OrderControl />
//             <Quates />
//             <Footer />
//         </>
//     )
// }

// export default Home

import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import HowItWorks from '../Components/HowItWorks'
import LaundryServices from '../Components/LaundryServices'
import OrderControl from '../Components/OrderControl'
import Quates from '../Components/Quates'
import Footer from '../Components/Footer'
import { Truck, WashingMachine, CalendarDays } from 'lucide-react'

const cities = ['Abu Dhabi', 'Dubai']

const useTypingEffect = (words, typingSpeed = 50, pause = 800) => {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [typing, setTyping] = useState(true)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    let timeout
    if (typing) {
      if (charIndex < words[wordIndex].length) {
        timeout = setTimeout(() => {
          setDisplayed((prev) => prev + words[wordIndex][charIndex])
          setCharIndex(charIndex + 1)
        }, typingSpeed)
      } else {
        timeout = setTimeout(() => setTyping(false), pause)
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayed((prev) => prev.slice(0, -1))
          setCharIndex(charIndex - 1)
        }, typingSpeed / 2)
      } else {
        setTyping(true)
        setWordIndex((wordIndex + 1) % words.length)
      }
    }
    return () => clearTimeout(timeout)
  }, [typing, charIndex, wordIndex, words, typingSpeed, pause])

  return displayed
}

const Home = () => {
  const city = useTypingEffect(cities)

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="min-h-screen lg:min-h-[800px] bg-[#008080] text-white pt-[120px] pb-14 px-4 sm:px-8 flex flex-col justify-center">
        <div className="max-w-[1300px] w-full mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10">

          {/* Left Side - Text */}
          <div className="lg:w-1/2 w-full">
            <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-extrabold leading-tight text-white text-center sm:text-left">
              Fast & Fresh Laundry Service
              <br />
              in <span className="px-2 text-[#111827] bg-white lg:text-5xl sm:text-xl font-bold rounded-md">{city}&nbsp;</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-white/90 text-center sm:text-left">
              24h delivery · 3 branches · Free home pickup & drop
            </p>

            {/* CTA Input + Button */}
            <div className="mt-6 bg-white rounded-lg p-2 flex flex-col sm:flex-row items-center shadow-md gap-3 sm:gap-0 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Enter your area (e.g. MBZ, Mussafah)"
                className="flex-1 text-[#111827] px-3 py-2 w-full sm:w-auto outline-none"
              />
              <button className="bg-[#F4B400] text-[#111827] px-5 py-2 rounded-md hover:bg-yellow-400 transition w-full sm:w-auto">
                Schedule
              </button>
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
                <span className="text-xs mt-1">Next-day Delivery</span>
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

      {/* Other Sections */}
      <HowItWorks />
      <LaundryServices />
      <OrderControl />
      <Quates />
      <Footer />
    </>
  )
}

export default Home
