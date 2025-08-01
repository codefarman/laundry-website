// import React from 'react';
// import { FaTshirt, FaSoap, FaTruck, FaArrowRight, FaSprayCan } from 'react-icons/fa';

// const LaundryServices = () => {
//     return (
//         <div className="bg-white py-8 px-2 sm:px-6 lg:px-8">
//             <section className="max-w-[80rem] mx-auto bg-[#004D4D] rounded-2xl p-4 sm:p-8 md:p-12 text-white">
//                 {/* Main Content */}
//                 <div className="flex flex-col lg:flex-row items-center lg:items-stretch lg:justify-between gap-10">
//                     {/* Cards (left side on large screens) */}
//                     <div className="flex flex-col gap-4 w-full max-w-md lg:max-w-[340px] mx-auto lg:mx-0 order-2 lg:order-1">
//                         <div className="bg-white text-black rounded-xl p-4 flex items-center gap-3 relative shadow-md min-h-[80px]">
//                             <span className="absolute top-2 right-2 bg-[#FFD700] text-black text-[10px] font-semibold px-2 py-1 rounded z-10">
//                                 Bestseller
//                             </span>
//                             <div className="bg-[#CDECEC] p-2 rounded-full flex-shrink-0">
//                                 <FaTshirt className="text-[#004D4D] text-base" />
//                             </div>
//                             <div className="flex flex-col justify-center">
//                                 <h3 className="font-bold text-sm leading-tight">Essential Wash & Fold</h3>
//                                 <p className="text-xs mt-1">Starting from AED 11/kg</p>
//                             </div>
//                         </div>
//                         <div className="bg-white text-black rounded-xl p-4 flex items-center gap-3 shadow-md min-h-[80px]">
//                             <div className="bg-[#CDECEC] p-2 rounded-full">
//                                 <FaSprayCan className="text-[#004D4D] text-base" />
//                             </div>
//                             <div>
//                                 <h3 className="font-bold text-sm leading-tight">Steam & Iron Finish</h3>
//                                 <p className="text-xs mt-1">AED 17/shirt</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Text Section (right side on large screens) */}
//                     <div className="w-full flex flex-col justify-center gap-4 sm:gap-6 order-1 lg:order-2 text-center lg:text-left">
//                         <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
//                             Premium Laundry,
//                             <br className="hidden sm:block" /> Hassle-Free Convenience
//                         </h2>
//                         <p className="text-sm sm:text-lg text-[#D1FAE5] leading-relaxed max-w-2xl mx-auto lg:mx-0">
//                             Enjoy spotless clothes without lifting a finger. We pick up, clean with care, and deliver fresh — all at unbeatable prices.
//                         </p>
//                         <div className="flex justify-center lg:justify-start">
//                             <button className="bg-[#F4B400] text-black font-semibold px-5 py-2.5 rounded-md hover:bg-yellow-400 transition duration-300 text-sm sm:text-base">
//                                 Explore Pricing
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Icon Buttons */}
//                 <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-md lg:max-w-3xl mx-auto">
//                     <button className="flex items-center gap-2 bg-white text-black rounded-full px-4 py-2 shadow-md hover:shadow-lg transition text-sm mx-auto">
//                         <FaSoap className="text-base text-[#004D4D]" />
//                         <span className="font-semibold">Deep Cleaning</span>
//                     </button>
//                     <button className="flex items-center gap-2 bg-white text-black rounded-full px-4 py-2 shadow-md hover:shadow-lg transition text-sm mx-auto">
//                         <FaSprayCan className="text-base text-[#004D4D]" />
//                         <span className="font-semibold">Delicate Garments</span>
//                     </button>
//                     <button className="flex items-center gap-2 bg-white text-black rounded-full px-4 py-2 shadow-md hover:shadow-lg transition text-sm mx-auto col-span-1 sm:col-span-2 lg:col-span-1">
//                         <FaTruck className="text-base text-[#004D4D]" />
//                         <span className="font-semibold">Free Doorstep Delivery</span>
//                     </button>
//                 </div>

//                 {/* Bottom Link */}
//                 <div className="mt-6 text-center">
//                     <a href="#" className="text-[#8ED6C6] font-semibold text-sm inline-flex items-center gap-1 hover:underline">
//                         View all services <FaArrowRight className="text-xs" />
//                     </a>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default LaundryServices;



import React from 'react';
import { FaTshirt, FaSoap, FaTruck, FaArrowRight, FaSprayCan } from 'react-icons/fa';

const LaundryServices = () => {
    return (
        <div className="bg-[#F0FAF9] py-10 px-4 sm:px-6 lg:px-8">
            <section className="max-w-[80rem] mx-auto bg-[#004D4D] rounded-2xl p-5 sm:p-8 md:p-12 text-white relative overflow-hidden shadow-lg">
                
                

                <div className="flex flex-col-reverse lg:flex-row items-center lg:items-stretch lg:justify-between gap-10 z-10 relative">
                    
                    {/* Cards */}
                    <div className="flex flex-col gap-4 w-full max-w-md mx-auto lg:mx-0 order-2 lg:order-1">
                        <div className="bg-white text-black rounded-xl p-4 flex items-center gap-3 relative shadow-md min-h-[80px]">
                            <span className="absolute top-2 right-2 bg-[#FFD700] text-black text-[10px] font-semibold px-2 py-1 rounded z-10">
                                Bestseller
                            </span>
                            <div className="bg-[#CDECEC] p-2 rounded-full flex-shrink-0">
                                <FaTshirt className="text-[#004D4D] text-base" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className="font-bold text-sm leading-tight">Essential Wash & Fold</h3>
                                <p className="text-xs mt-1">Starting from AED 11/kg</p>
                            </div>
                        </div>

                        <div className="bg-white text-black rounded-xl p-4 flex items-center gap-3 shadow-md min-h-[80px]">
                            <div className="bg-[#CDECEC] p-2 rounded-full">
                                <FaSprayCan className="text-[#004D4D] text-base" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm leading-tight">Steam & Iron Finish</h3>
                                <p className="text-xs mt-1">AED 17/shirt</p>
                            </div>
                        </div>
                    </div>

                    {/* Text */}
                    <div className="w-full flex flex-col justify-center gap-4 sm:gap-6 order-1 lg:order-2 text-center lg:text-left">
                        <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                            Premium Laundry,<br className="hidden sm:block" /> Hassle-Free Convenience
                        </h2>
                        <p className="text-sm sm:text-lg text-[#D1FAE5] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            Enjoy spotless clothes without lifting a finger. We pick up, clean with care, and deliver fresh — all at unbeatable prices.
                        </p>
                        <div className="flex justify-center lg:justify-start">
                            <button className="bg-[#F4B400] text-black font-semibold px-5 py-2.5 rounded-md hover:bg-yellow-400 transition duration-300 text-sm sm:text-base shadow-md">
                                Explore Pricing
                            </button>
                        </div>
                    </div>
                </div>

                {/* Icon Buttons */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-md lg:max-w-3xl mx-auto">
                    <button className="flex items-center gap-2 bg-white text-black rounded-full px-4 py-2 shadow hover:shadow-lg transition text-sm mx-auto">
                        <FaSoap className="text-base text-[#004D4D]" />
                        <span className="font-semibold">Deep Cleaning</span>
                    </button>
                    <button className="flex items-center gap-2 bg-white text-black rounded-full px-4 py-2 shadow hover:shadow-lg transition text-sm mx-auto">
                        <FaSprayCan className="text-base text-[#004D4D]" />
                        <span className="font-semibold">Delicate Garments</span>
                    </button>
                    <button className="flex items-center gap-2 bg-white text-black rounded-full px-4 py-2 shadow hover:shadow-lg transition text-sm mx-auto col-span-1 sm:col-span-2 lg:col-span-1">
                        <FaTruck className="text-base text-[#004D4D]" />
                        <span className="font-semibold">Free Doorstep Delivery</span>
                    </button>
                </div>

                {/* Link */}
                <div className="mt-6 text-center">
                    <a href="#" className="text-[#8ED6C6] font-semibold text-sm inline-flex items-center gap-1 hover:underline">
                        View all services <FaArrowRight className="text-xs" />
                    </a>
                </div>

                {/* Decorative background (optional) */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <circle cx="30" cy="30" r="30" fill="white" />
                        <circle cx="70" cy="70" r="20" fill="white" />
                    </svg>
                </div>
            </section>
        </div>
    );
};

export default LaundryServices;
