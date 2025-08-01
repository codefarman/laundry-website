import React, { useRef, useState } from 'react';
import { FiShoppingBag, FiTruck, FiPhoneCall } from 'react-icons/fi';
import { MdLocalLaundryService } from 'react-icons/md';
import { BsStars } from 'react-icons/bs';

const steps = [
    {
        icon: <FiShoppingBag size={30} />,
        title: "Book & Bag it",
        desc: "Schedule pickup and pack your laundry—we'll handle the rest."
    },
    {
        icon: <MdLocalLaundryService size={30} />,
        title: "Washed with care",
        desc: "We wash & dry your clothes professionally in local facilities."
    },
    {
        icon: <BsStars size={30} />,
        title: "Fresh delivery",
        desc: "Enjoy fresh, clean laundry delivered right to your door."
    }
];

const HowItWorks = () => {
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        const cardWidth = el.firstChild.offsetWidth + 16; // 16px gap-4
        const idx = Math.round(el.scrollLeft / cardWidth);
        setActiveIndex(idx);
    };

    return (
        <div className='bg-white mt-10'>
            <section className='max-w-[1300px] mx-auto p-8 rounded-2xl bg-gradient-to-r from-[#e0f7f7] to-[#fdf6e3] shadow-xl'>
                <div className='max-w-xl'>
                    <h1 className='text-[32px] md:text-[36px] font-bold text-[#006666] leading-tight mb-4'>
                        Let Us Handle Your Laundry—<br />Fast, Fresh, and Easy.
                    </h1>
                    <a
                        href="#"
                        className='text-[#0050b3] font-semibold text-base inline-flex items-center gap-2 mt-2 md:mt-1 mb-8 md:mb-12 hover:underline'
                    >
                        How it works <FiTruck size={18} />
                    </a>
                </div>

                {/* Steps Cards */}
                <div>
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className='flex md:space-x-6 space-x-4 overflow-x-auto pb-4 max-w-6xl snap-x snap-mandatory scroll-smooth hide-scrollbar'
                    >
                        {steps.map((step, idx) => (
                            <div
                                key={idx}
                                className='bg-white rounded-xl p-6 flex items-start space-x-4 min-w-[270px] md:min-w-0 md:flex-1 shadow-md snap-start'
                            >
                                <div className='text-[#008080] p-2 bg-[#e6f2f2] rounded-full'>
                                    {step.icon}
                                </div>
                                <div>
                                    <h3 className='font-semibold text-base mb-2'>
                                        {step.title}
                                    </h3>
                                    <p className='text-sm leading-relaxed'>
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-4 md:hidden">
                        {steps.map((_, idx) => (
                            <span
                                key={idx}
                                className={`h-2 w-2 mx-1 rounded-full transition-all duration-300 ${activeIndex === idx ? 'bg-[#008080]' : 'bg-gray-300'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Features */}
                <div className='mt-8 max-w-5xl flex flex-wrap gap-6 text-[#005555] font-medium text-sm'>
                    <div className='flex items-center gap-2'>
                        <FiTruck />
                        Free pickup & delivery
                    </div>
                    <div className='flex items-center gap-2'>
                        <FiPhoneCall />
                        24/7 Customer support
                    </div>
                    <div className='flex items-center gap-2'>
                        <BsStars />
                        Real-time order updates
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;