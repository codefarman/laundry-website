import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import HowItWorks from '../Components/HowItWorks'
import LaundryServices from '../Components/LaundryServices'
import OrderControl from '../Components/OrderControl'
import Quates from '../Components/Quates'
import Footer from '../Components/Footer'
import { useEffect } from 'react'

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
                    setDisplayed(prev => prev + words[wordIndex][charIndex])
                    setCharIndex(charIndex + 1)
                }, typingSpeed)
            } else {
                timeout = setTimeout(() => setTyping(false), pause)
            }
        } else {
            if (charIndex > 0) {
                timeout = setTimeout(() => {
                    setDisplayed(prev => prev.slice(0, -1))
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
            <div className="min-h-screen lg:min-h-[800px] sm:min-h-0 bg-[#008080] text-white pt-[120px] pb-14 px-4 sm:px-8 flex flex-col justify-center">
                <div className='max-w-[1300px] w-full mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10'>

                    {/* Left Side - Text */}
                    <div className='lg:w-1/2 w-full'>
                        <h1 className='text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-extrabold leading-tight text-white'>
                            Fast & Fresh Laundry Service
                            <br />
                            in <span className='px-2 text-[#111827] bg-white lg:text-5xl sm:text-xl font-bold rounded-md'>{city}&nbsp;</span>
                        </h1>

                        <p className='mt-4 text-sm sm:text-base text-white/90'>
                            24h delivery · 3 branches · Free home pickup & drop
                        </p>

                        {/* CTA Input + Button */}
                        <div className='mt-6 bg-white rounded-lg p-2 flex flex-col sm:flex-row items-center shadow-md gap-2 sm:gap-0'>
                            <input
                                type='text'
                                placeholder='Enter your area (e.g. MBZ, Mussafah)'
                                className='flex-1 text-[#111827] px-3 py-2 w-full sm:w-auto outline-none'
                            />
                            <button className='bg-[#F4B400] text-[#111827] px-5 py-2 rounded-md hover:bg-yellow-400 transition w-full sm:w-auto'>
                                Schedule
                            </button>
                        </div>
                    </div>

                    {/* Right Side - Image */}
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
