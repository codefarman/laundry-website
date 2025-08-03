// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import Navbar from '../Components/Navbar';
// import { Link } from "react-router-dom";

// const HeroSection = () => {
//     return (
//         <section className="relative bg-gradient-to-b from-[#F0FDF4] to-white pt-32 pb-16 text-center">
//             <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className="max-w-4xl mx-auto px-4"
//             >
//                 <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] mb-4">
//                     Transparent Pricing, Made Simple
//                 </h1>
//                 <p className="text-lg md:text-xl text-[#111827]/80 mb-8">
//                     Affordable laundry services with no surprises. Choose the plan that fits your needs!
//                 </p>
//                 <Link to="/pricing-List">
//                     <motion.a
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="inline-flex items-center gap-3 bg-[#008080] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[#008080]/90 transition duration-300"
//                     >
//                         <i className="fas fa-wallet text-lg"></i> View Plans
//                     </motion.a>
//                 </Link>
                
//             </motion.div>
//         </section>
//     );
// };

// const PricingFeature = ({ icon, text }) => (
//     <div className="flex items-center space-x-3 font-semibold text-[#111827] text-base">
//         <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-[#F4B400]">
//             <i className={`${icon} text-lg`}></i>
//         </div>
//         <span>{text}</span>
//     </div>
// );

// const PricingCard = ({ icon, title, description, details, price, unit }) => (
//     <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         whileHover={{ scale: 1.03, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)', transition: { duration: 0.2 } }}
//         className="border border-[#008080]/20 rounded-xl bg-white flex flex-col"
//     >
//         <div className="p-6 flex flex-col items-center text-center">
//             <div className="bg-[#008080] rounded-full w-20 h-20 flex items-center justify-center mb-4 text-white">
//                {typeof icon === "string" ? <i className={`${icon} text-3xl`}></i> : icon}
//             </div>
//             <h3 className="text-lg font-semibold text-[#111827] mb-2">{title}</h3>
//             <p className="text-sm text-[#111827]/80 mb-3">{description}</p>
//             <span className="text-xs bg-[#F0FDF4] rounded px-2 py-1 font-mono font-medium text-[#111827]">
//                 {details}
//             </span>
//         </div>
//         <div className="bg-[#F0FDF4] border-t border-[#008080]/20 px-6 py-4 flex justify-between items-center text-xs text-[#111827]/70 uppercase tracking-wide">
//             <div>
//                 <div className="text-[10px] font-semibold">Price {unit}</div>
//                 <div className="mt-1 text-sm font-normal">
//                     from <strong className="font-bold text-[#111827]">{price}</strong>{unit === 'per item' ? '/item' : '/6kg'}
//                 </div>
//             </div>
//             <i className="fas fa-chevron-right text-[#008080]"></i>
//         </div>
//     </motion.div>
// );

// const FAQItem = ({ question, answer }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     return (
//         <div className="border-b border-[#008080]/20 py-4">
//             <button
//                 className="flex justify-between items-center w-full text-left text-[#111827] font-semibold text-lg"
//                 onClick={() => setIsOpen(!isOpen)}
//             >
//                 <span>{question}</span>
//                 <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-[#008080]`}></i>
//             </button>
//             {isOpen && <p className="mt-2 text-[#111827]/80 text-sm">{answer}</p>}
//         </div>
//     );
// };

// const Prices = () => {
//     return (
//         <div className="bg-[#F0FDF4] font-sans">
//             <Navbar />
//             <HeroSection />
//             <section className="bg-[#008080] py-8">
//                 <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-4 px-4 sm:px-6">
//                     <PricingFeature icon="fas fa-truck" text="Free 24h Delivery" />
//                     <PricingFeature icon="fas fa-wallet" text="AED 5 Minimum Order" />
//                     <PricingFeature icon="fas fa-star" text="Service Fee from AED 8" />
//                     <PricingFeature icon="fas fa-percentage" text="Prices Exclude 5% VAT" />
//                 </div>
//             </section>
//             <section className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <PricingCard
//                     icon="fas fa-tshirt"
//                     title="Wash & Fold"
//                     description="Perfect for everyday laundry, bed sheets, and towels."
//                     details="Wash, tumble-dry, folded, bagged"
//                     price="AED 65"
//                     unit="per weight"
//                 />
//                 <PricingCard
//                     icon={
//                         <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
//                             <path d="M3 17h18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2zm0 0V7a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                         </svg>
//                     }
//                     title="Clean & Iron"
//                     description="For clothes needing a crisp, ironed finish or dry cleaning."
//                     details="Wash/dry clean, ironed, on hangers"
//                     price="AED 4"
//                     unit="per item"
//                 />
//                 <PricingCard
//                     icon={
//                         <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
//                             <path d="M3 17h18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2zm0 0V7a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                         </svg>
//                     }
//                     title="Ironing Only"
//                     description="For pre-cleaned items needing a professional press."
//                     details="Ironed, on hangers"
//                     price="AED 7"
//                     unit="per item"
//                 />
//                 <PricingCard
//                     icon="fas fa-bed"
//                     title="Duvets & Bulky Items"
//                     description="Special care for large items like comforters."
//                     details="Custom cleaning"
//                     price="AED 18"
//                     unit="per item"
//                 />
//                 <PricingCard
//                     icon="fas fa-shoe-prints"
//                     title="Sneaker Cleaning"
//                     description="Expert cleaning for your favorite sneakers."
//                     details="Custom cleaning"
//                     price="AED 89"
//                     unit="per item"
//                 />
//             </section>
//             <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//                 <h2 className="text-2xl font-extrabold text-[#111827] mb-6 text-center">Frequently Asked Questions</h2>
//                 <FAQItem
//                     question="What is included in the service fee?"
//                     answer="The service fee covers pickup, processing, and delivery of your laundry. It starts at AED 8 and may vary based on order size."
//                 />
//                 <FAQItem
//                     question="How is pricing calculated?"
//                     answer="Pricing depends on the service type. Wash & Fold is priced per weight (e.g., AED 65/6kg), while Clean & Iron and others are per item."
//                 />
//                 <FAQItem
//                     question="Can I schedule a same-day pickup?"
//                     answer="Yes, we offer flexible scheduling, including same-day pickups, subject to availability. Book via our app or website!"
//                 />
//             </section>
//             <section className="bg-[#008080] text-white py-12 text-center">
//                 <div className="max-w-4xl mx-auto px-4">
//                     <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
//                     <p className="text-white mb-6">Experience hassle-free laundry with our simple pricing and fast service.</p>
//                     <motion.a
//                         href="#schedule"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="inline-flex items-center gap-3 bg-white text-[#111827] font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[#F4B400] transition duration-300"
//                     >
//                         <i className="fas fa-calendar-check text-lg"></i> Book Now
//                     </motion.a>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default Prices;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar';

const ServiceCard = ({ icon, title, description, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-md p-6 mb-6 border border-[#008080]/10 hover:shadow-lg transition-shadow duration-300"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="bg-[#008080] rounded-full w-12 h-12 flex items-center justify-center text-white">
        <i className={`${icon} text-2xl`}></i>
      </div>
      <div>
        <h2 className="text-xl font-bold text-[#1E293B]">{title}</h2>
        <p className="text-sm text-[#64748B]">{description}</p>
      </div>
    </div>
    {children}
  </motion.div>
);

const TabButton = ({ icon, label, isActive, onClick }) => (
  <motion.button
    className={`flex items-center gap-3 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
      isActive
        ? 'bg-gradient-to-r from-[#008080] to-[#F4B400] text-white shadow-md'
        : 'bg-white text-[#1E293B] border border-[#008080]/20 hover:bg-[#F1F5F9]'
    }`}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <i className={`${icon} text-lg`}></i> {label}
  </motion.button>
);

const scrollToWithOffset = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.pageYOffset - 96; // 96px = pt-24
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

const CategoryButton = ({ label, isActive, onClick, targetId }) => (
  <motion.button
    className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
      isActive
        ? 'bg-[#1E293B] text-white'
        : 'bg-[#F1F5F9] text-[#1E293B] border border-[#008080]/20 hover:bg-[#F4B400]/10'
    }`}
    onClick={() => {
      if (targetId) {
        scrollToWithOffset(targetId);
      }
      onClick?.();
    }}
    whileHover={{ scale: 1.1 }}
  >
    {label}
  </motion.button>
);

const PriceItem = ({ title, price, note, onAdd }) => (
  <div className="flex justify-between items-center py-3 border-b border-[#008080]/10">
    <span className="text-sm text-[#64748B]">{title}</span>
    <div className="flex items-center gap-4">
      <span className="text-base font-medium text-[#1E293B]">{price}</span>
      <motion.button
        className="w-8 h-8 rounded-full bg-[#F4B400]/10 text-[#1E293B] flex items-center justify-center hover:bg-[#F4B400]/20 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onAdd}
        aria-label={`Add ${title}`}
      >
        +
      </motion.button>
    </div>
    {note && <span className="text-xs text-[#64748B] ml-2">{note}</span>}
  </div>
);

const PriceOptions = ({ basePrice, options }) => (
  <div className="flex flex-wrap gap-3 p-3 bg-[#F1F5F9] rounded-lg mt-2">
    <div className="flex items-center gap-2 text-[#64748B] text-sm">
      <i className="fas fa-star text-[#F4B400]"></i>
      <span>Save up to 30%</span>
    </div>
    {options.map((opt, index) => (
      <div key={index} className="text-center text-sm">
        <span className="block text-[#64748B]">{opt.quantity}</span>
        <span className="block font-semibold text-[#1E293B]">{opt.price}</span>
        <span className="block text-[#64748B] text-xs">/ {opt.unit}</span>
      </div>
    ))}
  </div>
);

const Sidebar = ({ cart, onPlaceOrder, onSchedulePickup }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    className="w-full max-w-xs p-6 bg-white rounded-lg shadow-md border border-[#008080]/10"
  >
    <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Your Cart</h3>
    {cart.length === 0 ? (
      <p className="text-sm text-[#64748B] mb-4">No items selected yet. Start adding!</p>
    ) : (
      <div className="mb-4">
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-2 text-sm">
            <span className="text-[#1E293B]">{item.title}</span>
            <span className="text-[#64748B]">{item.price}</span>
          </div>
        ))}
        <p className="text-sm text-[#64748B] mt-2">Total: AED {cart.reduce((sum, item) => sum + parseFloat(item.price.replace('AED ', '')), 0).toFixed(2)}</p>
      </div>
    )}
    <motion.button
      className="w-full bg-[#F4B400] text-[#1E293B] font-semibold py-3 rounded-lg hover:bg-[#F4B400]/90 transition-colors mb-4"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onPlaceOrder}
    >
      Place Order
    </motion.button>
    <motion.button
      className="w-full bg-[#008080] text-white font-semibold py-3 rounded-lg hover:bg-[#008080]/90 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onSchedulePickup}
    >
      Schedule Pickup
    </motion.button>
  </motion.div>
);

const LaundryServices = () => {
  const [activeTab, setActiveTab] = useState('Wash & Fold');
  const [cart, setCart] = useState([]);

  const handleAddToCart = (title, price) => {
    setCart([...cart, { title, price }]);
  };

  const handlePlaceOrder = () => {
    alert(`Order placed with ${cart.length} items! Total: AED ${cart.reduce((sum, item) => sum + parseFloat(item.price.replace('AED ', '')), 0).toFixed(2)}`);
    setCart([]);
  };

  const handleSchedulePickup = () => {
    alert(`Pickup scheduled for ${cart.length} items! Total: AED ${cart.reduce((sum, item) => sum + parseFloat(item.price.replace('AED ', '')), 0).toFixed(2)}`);
    setCart([]);
  };

  const tabs = [
    { label: 'Wash & Fold', icon: 'fas fa-shirt' },
    { label: 'Clean & Iron', icon: 'fas fa-ironing' },
    { label: 'Ironing', icon: 'fas fa-steam-iron' },
    { label: 'Duvets & Bulky', icon: 'fas fa-bed' },
    { label: 'Sneaker Care', icon: 'fas fa-sneaker' },
  ];

  const washAndFoldContent = (
    <ServiceCard icon="fas fa-shirt" title="Wash & Fold" description="Fresh cleaning for your daily laundry needs.">
      <nav className="flex gap-6 mb-6 text-sm">
        <a className="text-[#1E293B] font-medium hover:text-[#008080]" href="#">Pricing</a>
        <a className="text-[#64748B] hover:text-[#008080]" href="#">Details</a>
      </nav>
      <div>
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Wash Plans</h3>
        <PriceItem title="Mixed Load (up to 6kg)" price="AED 65" onAdd={() => handleAddToCart("Mixed Load (6kg)", "AED 65")} />
        <PriceItem title="Separate Load (up to 12kg)" price="AED 130" onAdd={() => handleAddToCart("Separate Load (12kg)", "AED 130")} />
        <PriceItem title="Each Additional 1kg" price="AED 11.95" onAdd={() => handleAddToCart("Additional 1kg", "AED 11.95")} />
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="flex items-center gap-2 bg-[#F4B400]/10 p-2 rounded-lg">
            <i className="fas fa-percent text-[#F4B400]"></i>
            <span className="text-sm text-[#1E293B]">Save 30%</span>
          </div>
          <PriceItem title="30kg Bulk" price="AED 10.16/kg" originalPrice="AED 41.95" onAdd={() => handleAddToCart("30kg Bulk", "AED 10.16/kg")} />
          <PriceItem title="60kg Bulk" price="AED 9.65/kg" originalPrice="AED 41.95" onAdd={() => handleAddToCart("60kg Bulk", "AED 9.65/kg")} />
          <PriceItem title="120kg Bulk" price="AED 9.07/kg" originalPrice="AED 41.95" onAdd={() => handleAddToCart("120kg Bulk", "AED 9.07/kg")} />
        </div>
      </div>
    </ServiceCard>
  );

  const cleanAndIronContent = (
    <ServiceCard icon="fas fa-ironing" title="Clean & Iron" description="Perfect for pressed and pristine garments.">
      <div className="flex gap-4 mb-4 text-sm">
        <button className="text-[#1E293B] font-medium hover:text-[#008080]">Pricing</button>
        <button className="text-[#64748B] hover:text-[#008080]">Info</button>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {['Shirts', 'Tops', 'Bottoms', 'Suits', 'Dresses', 'Traditional Items', 'Outerwear', 'Accessories & Homewear', 'Accessories', 'Bed Sheets', 'Duvet Covers', 'Pillow Cases & Cushion Covers', 'Bathroom Items'].map((cat) => (
          <CategoryButton key={cat} label={cat} targetId={cat.replace(/ & /g, '').replace(/ /g, '-').toLowerCase()} isActive={false} />
        ))}
      </div>
      <div id="shirts">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Shirts</h3>
        <PriceItem title="Shirt on Hanger" price="AED 17" onAdd={() => handleAddToCart("Shirt on Hanger", "AED 17")} />
        <PriceOptions
          basePrice="AED 17"
          options={[
            { quantity: '20 Shirts on hangers', price: 'AED 14', unit: 'shirt' },
            { quantity: '30 Shirts on hangers', price: 'AED 13', unit: 'shirt' },
            { quantity: '100 Shirts on hangers', price: 'AED 11', unit: 'shirt' },
          ]}
        />
        <PriceItem title="Shirt Folded" price="AED 19" onAdd={() => handleAddToCart("Shirt Folded", "AED 19")} />
      </div>
      <div id="tops" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Tops</h3>
        <PriceItem title="T-Shirt on Hanger" price="AED 16" onAdd={() => handleAddToCart("T-Shirt on Hanger", "AED 16")} />
        <PriceOptions
          basePrice="AED 16"
          options={[
            { quantity: '20 T-Shirts on hangers', price: 'AED 13', unit: 't-shirt' },
            { quantity: '30 T-Shirts on hangers', price: 'AED 12', unit: 't-shirt' },
            { quantity: '100 T-Shirts on hangers', price: 'AED 10', unit: 't-shirt' },
          ]}
        />
        <PriceItem title="T-Shirt Folded" price="AED 18" onAdd={() => handleAddToCart("T-Shirt Folded", "AED 18")} />
        <PriceItem title="Polo Shirt on Hanger" price="AED 17" onAdd={() => handleAddToCart("Polo Shirt on Hanger", "AED 17")} />
        <PriceItem title="Polo Shirt Folded" price="AED 19" onAdd={() => handleAddToCart("Polo Shirt Folded", "AED 19")} />
        <PriceItem title="Pullover" price="AED 25" onAdd={() => handleAddToCart("Pullover", "AED 25")} />
        <PriceItem title="Cardigan" price="AED 25" onAdd={() => handleAddToCart("Cardigan", "AED 25")} />
        <PriceItem title="Top / Blouse" price="AED 17" onAdd={() => handleAddToCart("Top / Blouse", "AED 17")} />
        <PriceItem title="Top / Blouse - Silk" price="AED 20" onAdd={() => handleAddToCart("Top / Blouse - Silk", "AED 20")} />
      </div>
      <div id="bottoms" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Bottoms</h3>
        <PriceItem title="Shorts" price="AED 16" onAdd={() => handleAddToCart("Shorts", "AED 16")} />
        <PriceItem title="Skirt" price="AED 17" onAdd={() => handleAddToCart("Skirt", "AED 17")} />
        <PriceItem title="Skirt - Delicate" price="AED 18" note="* Silk or delicate material" onAdd={() => handleAddToCart("Skirt - Delicate", "AED 18")} />
        <PriceItem title="Trousers / Jeans" price="AED 18" onAdd={() => handleAddToCart("Trousers / Jeans", "AED 18")} />
        <PriceOptions
          basePrice="AED 18"
          options={[
            { quantity: '5 Trousers', price: 'AED 16.80', unit: 'trousers' },
            { quantity: '10 Trousers', price: 'AED 15.30', unit: 'trousers' },
            { quantity: '20 Trousers', price: 'AED 13.50', unit: 'trousers' },
          ]}
        />
      </div>
      <div id="suits" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Suits</h3>
        <PriceItem title="3-Piece Suit" price="AED 52" onAdd={() => handleAddToCart("3-Piece Suit", "AED 52")} />
        <PriceItem title="2-Piece Suit" price="AED 48" onAdd={() => handleAddToCart("2-Piece Suit", "AED 48")} />
      </div>
      <div id="dresses" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Dresses</h3>
        <PriceItem title="Dress" price="AED 23" onAdd={() => handleAddToCart("Dress", "AED 23")} />
        <PriceItem title="Dress - Delicate" price="AED 49" onAdd={() => handleAddToCart("Dress - Delicate", "AED 49")} />
        <PriceItem title="Dress - Evening" price="AED 55" onAdd={() => handleAddToCart("Dress - Evening", "AED 55")} />
        <PriceItem title="Jumpsuit" price="AED 26" onAdd={() => handleAddToCart("Jumpsuit", "AED 26")} />
      </div>
      <div id="traditional-items" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Traditional Items</h3>
        <PriceItem title="Abaya" price="AED 15" onAdd={() => handleAddToCart("Abaya", "AED 15")} />
        <PriceItem title="Dupatta - Shila" price="AED 15" onAdd={() => handleAddToCart("Dupatta - Shila", "AED 15")} />
        <PriceItem title="Ghutra" price="AED 10" onAdd={() => handleAddToCart("Ghutra", "AED 10")} />
        <PriceItem title="Kandura / Dishdasha" price="AED 15" onAdd={() => handleAddToCart("Kandura / Dishdasha", "AED 15")} />
        <PriceItem title="Lungi" price="AED 18" onAdd={() => handleAddToCart("Lungi", "AED 18")} />
        <PriceItem title="Serwe" price="AED 80" onAdd={() => handleAddToCart("Serwe", "AED 80")} />
        <PriceItem title="Shalwar/Kurta" price="AED 28" onAdd={() => handleAddToCart("Shalwar/Kurta", "AED 28")} />
      </div>
      <div id="outerwear" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Outerwear</h3>
        <PriceItem title="Jacket / Blazer" price="AED 47" onAdd={() => handleAddToCart("Jacket / Blazer", "AED 47")} />
        <PriceItem title="Overcoat / Raincoat" price="AED 75" onAdd={() => handleAddToCart("Overcoat / Raincoat", "AED 75")} />
        <PriceItem title="Waistcoat" price="AED 18" onAdd={() => handleAddToCart("Waistcoat", "AED 18")} />
      </div>
      <div id="accessories-homewear" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Accessories & Homewear</h3>
        <PriceItem title="Pair of Socks" price="AED 4" onAdd={() => handleAddToCart("Pair of Socks", "AED 4")} />
        <PriceItem title="Scarf" price="AED 15" onAdd={() => handleAddToCart("Scarf", "AED 15")} />
        <PriceItem title="Underwear" price="AED 4" onAdd={() => handleAddToCart("Underwear", "AED 4")} />
      </div>
      <div id="accessories" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Accessories</h3>
        <PriceItem title="Tie" price="AED 15" onAdd={() => handleAddToCart("Tie", "AED 15")} />
      </div>
      <div id="bed-sheets" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Bed Sheets</h3>
        <PriceItem title="Bed Sheet - All Sizes" price="AED 25" onAdd={() => handleAddToCart("Bed Sheet - All Sizes", "AED 25")} />
      </div>
      <div id="duvet-covers" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Duvet Covers</h3>
        <PriceItem title="Duvet Cover - All Sizes" price="AED 30" onAdd={() => handleAddToCart("Duvet Cover - All Sizes", "AED 30")} />
      </div>
      <div id="pillow-cases-cushion-covers" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Pillow Cases & Cushion Covers</h3>
        <PriceItem title="Pillow Case" price="AED 9" onAdd={() => handleAddToCart("Pillow Case", "AED 9")} />
      </div>
      <div id="bathroom-items" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Bathroom Items</h3>
        <PriceItem title="Bath Mat" price="AED 18" onAdd={() => handleAddToCart("Bath Mat", "AED 18")} />
        <PriceItem title="Bath Robe" price="AED 18" onAdd={() => handleAddToCart("Bath Robe", "AED 18")} />
        <PriceItem title="Bath Towel" price="AED 8" onAdd={() => handleAddToCart("Bath Towel", "AED 8")} />
        <PriceItem title="Face Towel" price="AED 8" onAdd={() => handleAddToCart("Face Towel", "AED 8")} />
        <PriceItem title="Beach / Pool Towel" price="AED 8" onAdd={() => handleAddToCart("Beach / Pool Towel", "AED 8")} />
        <PriceItem title="Hand Towel" price="AED 8" onAdd={() => handleAddToCart("Hand Towel", "AED 8")} />
      </div>
    </ServiceCard>
  );

  const ironingContent = (
    <ServiceCard icon="fas fa-steam-iron" title="Ironing" description="Crisp finish for clean clothes.">
      <div className="flex gap-4 mb-4 text-sm">
        <button className="text-[#1E293B] font-medium hover:text-[#008080]">Pricing</button>
        <button className="text-[#64748B] hover:text-[#008080]">Details</button>
      </div>
      <div className="grid grid-cols-5 gap-2 mb-6">
        {['Shirts', 'Tops', 'Bottoms', 'Dresses', 'Traditional Items', 'Outerwear', 'Bed Sheets', 'Duvet Covers', 'Pillow Cases & Cushion Covers', 'Others'].map((cat) => (
          <CategoryButton key={cat} label={cat} targetId={cat.replace(/ & /g, '').replace(/ /g, '-').toLowerCase()} isActive={false} />
        ))}
      </div>
      <div id="shirts">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Shirts</h3>
        <PriceItem title="Shirt on Hanger" price="AED 9" onAdd={() => handleAddToCart("Shirt on Hanger", "AED 9")} />
        <PriceItem title="Shirt Folded" price="AED 9" onAdd={() => handleAddToCart("Shirt Folded", "AED 9")} />
      </div>
      <div id="tops" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Tops</h3>
        <PriceItem title="T-Shirt on Hanger" price="AED 10" onAdd={() => handleAddToCart("T-Shirt on Hanger", "AED 10")} />
        <PriceItem title="T-Shirt Folded" price="AED 12" onAdd={() => handleAddToCart("T-Shirt Folded", "AED 12")} />
        <PriceItem title="Polo Shirt on Hanger" price="AED 10" onAdd={() => handleAddToCart("Polo Shirt on Hanger", "AED 10")} />
        <PriceItem title="Polo Shirt Folded" price="AED 12" onAdd={() => handleAddToCart("Polo Shirt Folded", "AED 12")} />
        <PriceItem title="Pullover" price="AED 18" onAdd={() => handleAddToCart("Pullover", "AED 18")} />
        <PriceItem title="Cardigan" price="AED 18" onAdd={() => handleAddToCart("Cardigan", "AED 18")} />
        <PriceItem title="Top / Blouse" price="AED 10" onAdd={() => handleAddToCart("Top / Blouse", "AED 10")} />
      </div>
      <div id="bottoms" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Bottoms</h3>
        <PriceItem title="Shorts" price="AED 14" onAdd={() => handleAddToCart("Shorts", "AED 14")} />
        <PriceItem title="Skirt" price="AED 17" onAdd={() => handleAddToCart("Skirt", "AED 17")} />
        <PriceItem title="Skirt - Delicate" price="AED 15" note="* Silk or other delicate material" onAdd={() => handleAddToCart("Skirt - Delicate", "AED 15")} />
        <PriceItem title="Trousers / Jeans" price="AED 15" onAdd={() => handleAddToCart("Trousers / Jeans", "AED 15")} />
      </div>
      <div id="dresses" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Dresses</h3>
        <PriceItem title="Dress" price="AED 28" onAdd={() => handleAddToCart("Dress", "AED 28")} />
        <PriceItem title="Dress - Delicate" price="AED 32" onAdd={() => handleAddToCart("Dress - Delicate", "AED 32")} />
        <PriceItem title="Dress - Evening" price="AED 35" onAdd={() => handleAddToCart("Dress - Evening", "AED 35")} />
        <PriceItem title="Jumpsuit" price="AED 35" onAdd={() => handleAddToCart("Jumpsuit", "AED 35")} />
      </div>
      <div id="traditional-items" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Traditional Items</h3>
        <PriceItem title="Abaya" price="AED 10" onAdd={() => handleAddToCart("Abaya", "AED 10")} />
        <PriceItem title="Dupatta - Shila" price="AED 10" onAdd={() => handleAddToCart("Dupatta - Shila", "AED 10")} />
        <PriceItem title="Ghutra" price="AED 7" onAdd={() => handleAddToCart("Ghutra", "AED 7")} />
        <PriceItem title="Kandura / Dishdasha" price="AED 9" onAdd={() => handleAddToCart("Kandura / Dishdasha", "AED 9")} />
        <PriceItem title="Lungi" price="AED 13" onAdd={() => handleAddToCart("Lungi", "AED 13")} />
        <PriceItem title="Saree" price="AED 40" onAdd={() => handleAddToCart("Saree", "AED 40")} />
        <PriceItem title="Shalwar/Kurta" price="AED 15" onAdd={() => handleAddToCart("Shalwar/Kurta", "AED 15")} />
      </div>
      <div id="outerwear" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Outerwear</h3>
        <PriceItem title="Jacket / Blazer" price="AED 34" onAdd={() => handleAddToCart("Jacket / Blazer", "AED 34")} />
        <PriceItem title="Waistcoat" price="AED 11" onAdd={() => handleAddToCart("Waistcoat", "AED 11")} />
      </div>
      <div id="bed-sheets" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Bed Sheets</h3>
        <PriceItem title="Bed Sheet - All Sizes" price="AED 17" onAdd={() => handleAddToCart("Bed Sheet - All Sizes", "AED 17")} />
      </div>
      <div id="duvet-covers" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Duvet Covers</h3>
        <PriceItem title="Duvet Cover - All Sizes" price="AED 25" onAdd={() => handleAddToCart("Duvet Cover - All Sizes", "AED 25")} />
      </div>
      <div id="pillow-cases-cushion-covers" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Pillow Cases & Cushion Covers</h3>
        <PriceItem title="Pillow Case" price="AED 7" onAdd={() => handleAddToCart("Pillow Case", "AED 7")} />
      </div>
    </ServiceCard>
  );

  const duvetsContent = (
    <ServiceCard icon="fas fa-bed" title="Duvets & Bulky" description="Care for larger household items.">
      <div className="grid grid-cols-3 gap-2 mb-6">
        {['Feather Duvets', 'Synthetic Duvets', 'Blankets & Bedspeads', 'Pillows', 'Mattress Protectors', 'Curtains'].map((cat) => (
          <CategoryButton key={cat} label={cat} targetId={cat.replace(/ & /g, '').replace(/ /g, '-').toLowerCase()} isActive={false} />
        ))}
      </div>
      <div id="feather-duvets">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Feather Duvets</h3>
        <PriceItem title="Single" price="AED 65" onAdd={() => handleAddToCart("Feather Duvet - Single", "AED 65")} />
        <PriceItem title="Double" price="AED 65" onAdd={() => handleAddToCart("Feather Duvet - Double", "AED 65")} />
        <PriceItem title="King" price="AED 70" onAdd={() => handleAddToCart("Feather Duvet - King", "AED 70")} />
        <PriceItem title="Super King" price="AED 70" onAdd={() => handleAddToCart("Feather Duvet - Super King", "AED 70")} />
      </div>
      <div id="synthetic-duvets" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Synthetic Duvets</h3>
        <PriceItem title="Single" price="AED 55" onAdd={() => handleAddToCart("Synthetic Duvet - Single", "AED 55")} />
        <PriceItem title="Double" price="AED 55" onAdd={() => handleAddToCart("Synthetic Duvet - Double", "AED 55")} />
        <PriceItem title="King" price="AED 65" onAdd={() => handleAddToCart("Synthetic Duvet - King", "AED 65")} />
        <PriceItem title="Super King" price="AED 65" onAdd={() => handleAddToCart("Synthetic Duvet - Super King", "AED 65")} />
      </div>
      <div id="blankets-bedspeads" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Blankets & Bedspeads</h3>
        <PriceItem title="Single - Washable" price="AED 25" onAdd={() => handleAddToCart("Blanket - Single - Washable", "AED 25")} />
        <PriceItem title="Double - Washable" price="AED 25" onAdd={() => handleAddToCart("Blanket - Double - Washable", "AED 25")} />
        <PriceItem title="King - Washable" price="AED 45" onAdd={() => handleAddToCart("Blanket - King - Washable", "AED 45")} />
      </div>
      <div id="pillows" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Pillows</h3>
        <PriceItem title="Feather" price="AED 18" onAdd={() => handleAddToCart("Pillow - Feather", "AED 18")} />
        <PriceItem title="Synthetic" price="AED 18" onAdd={() => handleAddToCart("Pillow - Synthetic", "AED 18")} />
      </div>
      <div id="mattress-protectors" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Mattress Protectors</h3>
        <PriceItem title="All Sizes" price="AED 25" onAdd={() => handleAddToCart("Mattress Protector - All Size", "AED 25")} />
      </div>
      <div id="curtains" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Curtains</h3>
        <PriceItem title="Standard - without blackout (per m²)" price="AED 18" onAdd={() => handleAddToCart("Standard Curtain - without blackout", "AED 18")} />
        <PriceItem title="Standard - with blackout (per m²)" price="AED 25" onAdd={() => handleAddToCart("Standard Curtain - with blackout", "AED 25")} />
      </div>
    </ServiceCard>
  );

  const sneakerCareContent = (
    <ServiceCard icon="fas fa-sneaker" title="Sneaker Care" description="Expert cleaning for your footwear.">
      <div className="flex gap-4 mb-4 text-sm">
        <button className="text-[#1E293B] font-medium hover:text-[#008080]">Pricing</button>
        <button className="text-[#64748B] hover:text-[#008080]">Details</button>
      </div>
      <div>
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Sneaker Cleaning</h3>
        <PriceItem title="Per Pair" price="AED 89" onAdd={() => handleAddToCart("Sneaker Pair", "AED 89")} />
      </div>
    </ServiceCard>
  );

  const contentMap = {
    'Wash & Fold': washAndFoldContent,
    'Clean & Iron': cleanAndIronContent,
    'Ironing': ironingContent,
    'Duvets & Bulky': duvetsContent,
    'Sneaker Care': sneakerCareContent,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F5F9] to-[#E0F2F7] font-sans pt-24">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1E293B] mb-4">Laundry & Care Services</h1>
          <p className="text-lg text-[#64748B] mb-6">Affordable laundry services with no surprises. Choose the plan that fits your needs!</p>
          
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex flex-wrap gap-4 mb-8">
              {tabs.map((tab) => (
                <TabButton
                  key={tab.label}
                  icon={tab.icon}
                  label={tab.label}
                  isActive={activeTab === tab.label}
                  onClick={() => setActiveTab(tab.label)}
                />
              ))}
            </div>
            {contentMap[activeTab]}
          </div>
          <Sidebar cart={cart} onPlaceOrder={handlePlaceOrder} onSchedulePickup={handleSchedulePickup} />
        </div>
      </div>
    </div>
  );
};

const PricingListPage = () => <LaundryServices />;

export default PricingListPage;