import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
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
    const y = el.getBoundingClientRect().top + window.pageYOffset - 96;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

const CategoryButton = ({ label, isActive, onClick, targetId }) => (
  <motion.button
    className={`px-2 py-1 text-xs font-semibold rounded-full transition-all duration-300 mr-1 ${
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
  <div className="flex justify-between items-start py-3 border-b border-[#008080]/10 sm:flex-row flex-col">
    <span className="text-sm text-[#64748B] mb-2 sm:mb-0 sm:flex-1">{title}</span>
    <div className="flex flex-col items-end sm:items-center sm:flex-row sm:gap-4 sm:w-auto w-full">
      <div className="text-right">
        <span className="text-base font-medium text-[#1E293B]">{price}</span>
        {note && (
          <div className="text-[10px] text-[#64748B] mt-1">{note}</div>
        )}
      </div>
      <motion.button
        className="w-8 h-8 rounded-full bg-[#F4B400]/10 text-[#1E293B] flex items-center justify-center hover:bg-[#F4B400]/20 transition-colors mt-2 sm:mt-0"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onAdd}
        aria-label={`Add ${title}`}
      >
        +
      </motion.button>
    </div>
  </div>
);

const Sidebar = ({ cart, onSchedulePickup, isOpen, onClose, onRemoveItem }) => {
  const navigate = useNavigate();

  const handleSchedulePickup = () => {
    const branch = JSON.parse(localStorage.getItem('selectedBranch'));
    if (branch) {
      navigate('/booking', { state: { cart, branch } });
    } else {
      alert('Unable to determine nearest branch. Please try again.');
      navigate('/booking', { state: { cart, branch: { name: 'Main Branch' } } });
    }
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 right-0 w-80 bg-white p-6 rounded-l-2xl shadow-lg border-l border-[#008080]/10 z-50 h-screen sm:static sm:max-w-sm sm:w-full sm:p-6 sm:bg-white sm:rounded-none sm:shadow-none sm:border-0 sm:h-auto sm:mt-0 sm:ml-auto"
    >
      <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Your Cart</h3>
      {cart.length === 0 ? (
        <p className="text-sm text-[#64748B] mb-4">No items selected yet. Start adding!</p>
      ) : (
        <div className="mb-4">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 text-sm">
              <span className="text-[#1E293B]">{item.title}</span>
              <div className="flex items-center gap-2">
                <span className="text-[#64748B]">{item.price}</span>
                <motion.button
                  className="w-6 h-6 text-[#64748B] hover:text-[#1E293B] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRemoveItem(index)}
                  aria-label={`Remove ${item.title}`}
                >
                  &times;
                </motion.button>
              </div>
            </div>
          ))}
          <p className="text-sm text-[#64748B] mt-2">
            Total: AED{' '}
            {cart
              .reduce((sum, item) => {
                const priceStr = item.calculatedPrice || item.price;
                const price = priceStr.includes('-')
                  ? parseFloat(priceStr.replace('AED ', '').split('-')[0])
                  : parseFloat(priceStr.replace('AED ', ''));
                return sum + (isNaN(price) ? 0 : price);
              }, 0)
              .toFixed(2)}
          </p>
        </div>
      )}
      <motion.button
        className="w-full bg-[#008080] text-white font-semibold py-3 rounded-lg hover:bg-[#008080]/90 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSchedulePickup}
      >
        Schedule Pickup
      </motion.button>
      {isOpen && (
        <motion.button
          className="absolute top-2 right-2 text-[#64748B] text-xl sm:hidden"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          &times;
        </motion.button>
      )}
    </motion.div>
  );
};

const LaundryServices = () => {
  const [activeTab, setActiveTab] = useState('Wash & Fold');
  const [cart, setCart] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const serviceFromBooking = location.state?.service;

  useEffect(() => {
    if (serviceFromBooking) {
      setActiveTab(serviceFromBooking);
    }
  }, [serviceFromBooking]);

  const handleAddToCart = (title, price, quantity = 1) => {
    let calculatedPrice = price;
    if (title.includes('30kg Bulk')) {
      calculatedPrice = `AED ${30 * 7.5}`;
    } else if (title.includes('60kg Bulk')) {
      calculatedPrice = `AED ${60 * 7.25}`;
    } else if (title.includes('120kg Bulk')) {
      calculatedPrice = `AED ${120 * 7}`;
    }
    setCart([...cart, { title, price, calculatedPrice }]);
  };

  const handleRemoveFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const tabs = [
    { label: 'Wash & Fold', icon: 'fas fa-shirt' },
    { label: 'Clean & Iron', icon: 'fas fa-ironing' },
    { label: 'Ironing', icon: 'fas fa-steam-iron' },
    { label: 'Duvets & Bulky', icon: 'fas fa-bed' },
    { label: 'Dry Cleaning', icon: 'fas fa-tint' },
  ];

  const washAndFoldContent = (
    <ServiceCard icon="fas fa-shirt" title="Wash & Fold" description="Fresh cleaning for your daily laundry needs.">
      <nav className="flex gap-6 mb-6 text-sm">
        <a className="text-[#1E293B] font-medium hover:text-[#008080]" href="#">
          Pricing
        </a>
        <a className="text-[#64748B] hover:text-[#008080]" href="#">
          Details
        </a>
      </nav>
      <div>
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Wash Plans</h3>
        <PriceItem
          title="Mixed Load (up to 6kg)"
          price="AED 48"
          onAdd={() => handleAddToCart('Mixed Load (6kg)', 'AED 48')}
        />
        <PriceItem
          title="Separate Load (up to 12kg)"
          price="AED 96"
          onAdd={() => handleAddToCart('Separate Load (12kg)', 'AED 96')}
        />
        <PriceItem
          title="Each Additional 1kg"
          price="AED 8"
          onAdd={() => handleAddToCart('Additional 1kg', 'AED 8')}
        />
        <div className="grid grid-cols-3 gap-4 mt-6">
          <PriceItem
            title="30kg Bulk"
            price="AED 7.5/kg (AED 225)"
            onAdd={() => handleAddToCart('30kg Bulk', 'AED 7.5/kg')}
          />
          <PriceItem
            title="60kg Bulk"
            price="AED 7.25/kg (AED 435)"
            onAdd={() => handleAddToCart('60kg Bulk', 'AED 7.25/kg')}
          />
          <PriceItem
            title="120kg Bulk"
            price="AED 7/kg (AED 840)"
            onAdd={() => handleAddToCart('120kg Bulk', 'AED 7/kg')}
          />
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
      <div className="flex overflow-x-auto gap-1 mb-6 pb-1 sm:grid sm:grid-cols-3 sm:gap-2 sm:mb-6 sm:pb-0">
        {[
          'Shirts',
          'Tops',
          'Bottoms',
          'Suits',
          'Dresses',
          'Traditional Items',
          'Outerwear',
          'Accessories & Homewear',
          'Accessories',
          'Bed Sheets',
          'Duvet Covers',
          'Pillow Cases & Cushion Covers',
          'Bathroom Items',
          'Carpets & Curtains',
        ].map((cat) => (
          <CategoryButton
            key={cat}
            label={cat}
            targetId={cat.replace(/ & /g, '').replace(/ /g, '-').toLowerCase()}
            isActive={false}
          />
        ))}
      </div>
      <div id="shirts">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Shirts</h3>
        <PriceItem title="Shirt" price="AED 5" onAdd={() => handleAddToCart('Shirt', 'AED 5')} />
        <PriceItem title="T Shirt" price="AED 5" onAdd={() => handleAddToCart('T Shirt', 'AED 5')} />
        <PriceItem
          title="Under T Shirt"
          price="AED 3"
          onAdd={() => handleAddToCart('Under T Shirt', 'AED 3')}
        />
      </div>
      <div id="tops" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Tops</h3>
        <PriceItem title="Top" price="AED 6" onAdd={() => handleAddToCart('Top', 'AED 6')} />
        <PriceItem title="Blouse" price="AED 5" onAdd={() => handleAddToCart('Blouse', 'AED 5')} />
        <PriceItem title="Sweater" price="AED 10" onAdd={() => handleAddToCart('Sweater', 'AED 10')} />
      </div>
      <div id="bottoms" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Bottoms</h3>
        <PriceItem title="Trouser" price="AED 5" onAdd={() => handleAddToCart('Trouser', 'AED 5')} />
        <PriceItem title="Pajama" price="AED 5" onAdd={() => handleAddToCart('Pajama', 'AED 5')} />
        <PriceItem title="Half Pant" price="AED 5" onAdd={() => handleAddToCart('Half Pant', 'AED 5')} />
        <PriceItem title="Skirt" price="AED 6" onAdd={() => handleAddToCart('Skirt', 'AED 6')} />
        <PriceItem title="Lungi" price="AED 4" onAdd={() => handleAddToCart('Lungi', 'AED 4')} />
      </div>
      <div id="suits" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Suits</h3>
        <PriceItem title="Suit" price="AED 20" onAdd={() => handleAddToCart('Suit', 'AED 20')} />
        <PriceItem title="Army Suit" price="AED 15" onAdd={() => handleAddToCart('Army Suit', 'AED 15')} />
        <PriceItem
          title="Pakistani Men Suit"
          price="AED 10"
          onAdd={() => handleAddToCart('Pakistani Men Suit', 'AED 10')}
        />
        <PriceItem
          title="Pakistani Ladies Suit"
          price="AED 15"
          onAdd={() => handleAddToCart('Pakistani Ladies Suit', 'AED 15')}
        />
        <PriceItem title="Coverall" price="AED 10" onAdd={() => handleAddToCart('Coverall', 'AED 10')} />
      </div>
      <div id="dresses" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Dresses</h3>
        <PriceItem title="Baby Dress" price="AED 10" onAdd={() => handleAddToCart('Baby Dress', 'AED 10')} />
        <PriceItem title="Ladies Dress" price="AED 15" onAdd={() => handleAddToCart('Ladies Dress', 'AED 15')} />
        <PriceItem
          title="Ladies Dress Big"
          price="AED 20"
          onAdd={() => handleAddToCart('Ladies Dress Big', 'AED 20')}
        />
        <PriceItem title="Sari" price="AED 10" onAdd={() => handleAddToCart('Sari', 'AED 10')} />
      </div>
      <div id="traditional-items" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Traditional Items</h3>
        <PriceItem
          title="Summer Kandoora"
          price="AED 10"
          onAdd={() => handleAddToCart('Summer Kandoora', 'AED 10')}
        />
        <PriceItem title="Hot Kandoora" price="AED 15" onAdd={() => handleAddToCart('Hot Kandoora', 'AED 15')} />
        <PriceItem title="Tarbooj" price="AED 2" onAdd={() => handleAddToCart('Tarbooj', 'AED 2')} />
        <PriceItem title="Ghutra" price="AED 5" onAdd={() => handleAddToCart('Ghutra', 'AED 5')} />
        <PriceItem title="Hot Ghutra" price="AED 6" onAdd={() => handleAddToCart('Hot Ghutra', 'AED 6')} />
        <PriceItem title="Shimagh" price="AED 5" onAdd={() => handleAddToCart('Shimagh', 'AED 5')} />
        <PriceItem title="Ghafia" price="AED 2" onAdd={() => handleAddToCart('Ghafia', 'AED 2')} />
        <PriceItem title="Abaya" price="AED 10" onAdd={() => handleAddToCart('Abaya', 'AED 10')} />
        <PriceItem title="Shella" price="AED 5" onAdd={() => handleAddToCart('Shella', 'AED 5')} />
      </div>
      <div id="outerwear" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Outerwear</h3>
        <PriceItem title="Jacket" price="AED 10" onAdd={() => handleAddToCart('Jacket', 'AED 10')} />
      </div>
      <div id="accessories-homewear" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Accessories & Homewear</h3>
        <PriceItem title="Under Wear" price="AED 3" onAdd={() => handleAddToCart('Under Wear', 'AED 3')} />
        <PriceItem title="Socks" price="AED 3" onAdd={() => handleAddToCart('Socks', 'AED 3')} />
      </div>
      <div id="accessories" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Accessories</h3>
        <PriceItem title="Tie" price="AED 6" onAdd={() => handleAddToCart('Tie', 'AED 6')} />
        <PriceItem title="Cap" price="AED 5" onAdd={() => handleAddToCart('Cap', 'AED 5')} />
      </div>
      <div id="bed-sheets" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Bed Sheets</h3>
        <PriceItem title="Bed Sheet Big" price="AED 10" onAdd={() => handleAddToCart('Bed Sheet Big', 'AED 10')} />
        <PriceItem title="Bed Sheet Small" price="AED 8" onAdd={() => handleAddToCart('Bed Sheet Small', 'AED 8')} />
        <PriceItem title="Bed Spread" price="AED 25" onAdd={() => handleAddToCart('Bed Spread', 'AED 25')} />
        <PriceItem
          title="Bed Spread Big"
          price="AED 25"
          onAdd={() => handleAddToCart('Bed Spread Big', 'AED 25')}
        />
      </div>
      <div id="duvet-covers" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Duvet Covers</h3>
        <PriceItem title="Blanket" price="AED 20" onAdd={() => handleAddToCart('Blanket', 'AED 20')} />
        <PriceItem title="Blanket Big" price="AED 25" onAdd={() => handleAddToCart('Blanket Big', 'AED 25')} />
      </div>
      <div id="pillow-cases-cushion-covers" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Pillow Cases & Cushion Covers</h3>
        <PriceItem title="Pillow Cover" price="AED 4" onAdd={() => handleAddToCart('Pillow Cover', 'AED 4')} />
        <PriceItem title="Pillow" price="AED 10" onAdd={() => handleAddToCart('Pillow', 'AED 10')} />
      </div>
      <div id="bathroom-items" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Bathroom Items</h3>
        <PriceItem title="Towel" price="AED 6" onAdd={() => handleAddToCart('Towel', 'AED 6')} />
        <PriceItem title="Towel Small" price="AED 5" onAdd={() => handleAddToCart('Towel Small', 'AED 5')} />
        <PriceItem title="Bath Towel" price="AED 10" onAdd={() => handleAddToCart('Bath Towel', 'AED 10')} />
      </div>
      <div id="carpets-curtains" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Carpets & Curtains</h3>
        <PriceItem
          title="Curtains"
          price="AED 15-20"
          note="* Price varies by size"
          onAdd={() => handleAddToCart('Curtains', 'AED 15-20')}
        />
        <PriceItem
          title="Curtain Rubber"
          price="AED 40"
          note="* Per meter"
          onAdd={() => handleAddToCart('Curtain Rubber', 'AED 40')}
        />
        <PriceItem title="Carpet" price="AED 15" onAdd={() => handleAddToCart('Carpet', 'AED 15')} />
      </div>
    </ServiceCard>
  );

  const ironingContent = (
    <ServiceCard icon="fas fa-steam-iron" title="Ironing" description="Crisp finish for clean clothes.">
      <div className="flex gap-4 mb-4 text-sm">
        <button className="text-[#1E293B] font-medium hover:text-[#008080]">Pricing</button>
        <button className="text-[#64748B] hover:text-[#008080]">Details</button>
      </div>
      <div className="flex overflow-x-auto gap-1 mb-6 pb-1 sm:grid sm:grid-cols-5 sm:gap-2 sm:mb-6 sm:pb-0">
        {[
          'Shirts',
          'Tops',
          'Bottoms',
          'Suits',
          'Dresses',
          'Traditional Items',
          'Outerwear',
          'Accessories',
          'Bed Sheets',
          'Pillow Cases & Cushion Covers',
        ].map((cat) => (
          <CategoryButton
            key={cat}
            label={cat}
            targetId={cat.replace(/ & /g, '').replace(/ /g, '-').toLowerCase()}
            isActive={false}
          />
        ))}
      </div>
      <div id="shirts">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Shirts</h3>
        <PriceItem title="Shirt" price="AED 2" onAdd={() => handleAddToCart('Shirt', 'AED 2')} />
        <PriceItem title="T Shirt" price="AED 2" onAdd={() => handleAddToCart('T Shirt', 'AED 2')} />
        <PriceItem
          title="Under T Shirt"
          price="AED 1.5"
          onAdd={() => handleAddToCart('Under T Shirt', 'AED 1.5')}
        />
      </div>
      <div id="tops" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Tops</h3>
        <PriceItem title="Top" price="AED 3" onAdd={() => handleAddToCart('Top', 'AED 3')} />
        <PriceItem title="Blouse" price="AED 3" onAdd={() => handleAddToCart('Blouse', 'AED 3')} />
        <PriceItem title="Sweater" price="AED 5" onAdd={() => handleAddToCart('Sweater', 'AED 5')} />
      </div>
      <div id="bottoms" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Bottoms</h3>
        <PriceItem title="Trouser" price="AED 2" onAdd={() => handleAddToCart('Trouser', 'AED 2')} />
        <PriceItem title="Pajama" price="AED 2" onAdd={() => handleAddToCart('Pajama', 'AED 2')} />
        <PriceItem title="Half Pant" price="AED 2" onAdd={() => handleAddToCart('Half Pant', 'AED 2')} />
        <PriceItem title="Skirt" price="AED 3" onAdd={() => handleAddToCart('Skirt', 'AED 3')} />
        <PriceItem title="Lungi" price="AED 2" onAdd={() => handleAddToCart('Lungi', 'AED 2')} />
      </div>
      <div id="suits" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Suits</h3>
        <PriceItem title="Suit" price="AED 8" onAdd={() => handleAddToCart('Suit', 'AED 8')} />
        <PriceItem title="Army Suit" price="AED 6" onAdd={() => handleAddToCart('Army Suit', 'AED 6')} />
        <PriceItem
          title="Pakistani Men Suit"
          price="AED 4"
          onAdd={() => handleAddToCart('Pakistani Men Suit', 'AED 4')}
        />
        <PriceItem
          title="Pakistani Ladies Suit"
          price="AED 6"
          onAdd={() => handleAddToCart('Pakistani Ladies Suit', 'AED 6')}
        />
        <PriceItem title="Coverall" price="AED 4" onAdd={() => handleAddToCart('Coverall', 'AED 4')} />
      </div>
      <div id="dresses" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Dresses</h3>
        <PriceItem title="Baby Dress" price="AED 5" onAdd={() => handleAddToCart('Baby Dress', 'AED 5')} />
        <PriceItem title="Ladies Dress" price="AED 6" onAdd={() => handleAddToCart('Ladies Dress', 'AED 6')} />
        <PriceItem
          title="Ladies Dress Big"
          price="AED 7"
          onAdd={() => handleAddToCart('Ladies Dress Big', 'AED 7')}
        />
        <PriceItem title="Sari" price="AED 5" onAdd={() => handleAddToCart('Sari', 'AED 5')} />
      </div>
      <div id="traditional-items" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Traditional Items</h3>
        <PriceItem
          title="Summer Kandoora"
          price="AED 3"
          onAdd={() => handleAddToCart('Summer Kandoora', 'AED 3')}
        />
        <PriceItem title="Hot Kandoora" price="AED 5" onAdd={() => handleAddToCart('Hot Kandoora', 'AED 5')} />
        <PriceItem title="Tarbooj" price="AED 0" onAdd={() => handleAddToCart('Tarbooj', 'AED 0')} />
        <PriceItem title="Ghutra" price="AED 3" onAdd={() => handleAddToCart('Ghutra', 'AED 3')} />
        <PriceItem title="Hot Ghutra" price="AED 4" onAdd={() => handleAddToCart('Hot Ghutra', 'AED 4')} />
        <PriceItem title="Shimagh" price="AED 3" onAdd={() => handleAddToCart('Shimagh', 'AED 3')} />
        <PriceItem title="Ghafia" price="AED 1" onAdd={() => handleAddToCart('Ghafia', 'AED 1')} />
        <PriceItem title="Abaya" price="AED 5" onAdd={() => handleAddToCart('Abaya', 'AED 5')} />
        <PriceItem title="Shella" price="AED 2" onAdd={() => handleAddToCart('Shella', 'AED 2')} />
      </div>
      <div id="outerwear" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Outerwear</h3>
        <PriceItem title="Jacket" price="AED 5" onAdd={() => handleAddToCart('Jacket', 'AED 5')} />
      </div>
      <div id="accessories" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Accessories</h3>
        <PriceItem title="Tie" price="AED 3" onAdd={() => handleAddToCart('Tie', 'AED 3')} />
        <PriceItem title="Cap" price="AED 2" onAdd={() => handleAddToCart('Cap', 'AED 2')} />
        <PriceItem title="Under Wear" price="AED 1.5" onAdd={() => handleAddToCart('Under Wear', 'AED 1.5')} />
        <PriceItem title="Socks" price="AED 1.5" onAdd={() => handleAddToCart('Socks', 'AED 1.5')} />
      </div>
      <div id="bed-sheets" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Bed Sheets</h3>
        <PriceItem title="Bed Sheet Big" price="AED 6" onAdd={() => handleAddToCart('Bed Sheet Big', 'AED 6')} />
        <PriceItem title="Bed Sheet Small" price="AED 5" onAdd={() => handleAddToCart('Bed Sheet Small', 'AED 5')} />
        <PriceItem title="Bed Spread" price="AED 0" onAdd={() => handleAddToCart('Bed Spread', 'AED 0')} />
        <PriceItem
          title="Bed Spread Big"
          price="AED 0"
          onAdd={() => handleAddToCart('Bed Spread Big', 'AED 0')}
        />
      </div>
      <div id="pillow-cases-cushion-covers" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Pillow Cases & Cushion Covers</h3>
        <PriceItem
          title="Pillow Cover"
          price="AED 1.5"
          onAdd={() => handleAddToCart('Pillow Cover', 'AED 1.5')}
        />
      </div>
    </ServiceCard>
  );

  const duvetsContent = (
    <ServiceCard icon="fas fa-bed" title="Duvets & Bulky" description="Care for larger household items.">
      <div className="flex overflow-x-auto gap-1 mb-6 pb-1 sm:grid sm:grid-cols-3 sm:gap-2 sm:mb-6 sm:pb-0">
        {['Blankets & Bedspreads', 'Pillows', 'Curtains', 'Carpets'].map((cat) => (
          <CategoryButton
            key={cat}
            label={cat}
            targetId={cat.replace(/ & /g, '').replace(/ /g, '-').toLowerCase()}
            isActive={false}
          />
        ))}
      </div>
      <div id="blankets-bedspreads">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Blankets & Bedspreads</h3>
        <PriceItem title="Blanket" price="AED 20" onAdd={() => handleAddToCart('Blanket', 'AED 20')} />
        <PriceItem title="Blanket Big" price="AED 25" onAdd={() => handleAddToCart('Blanket Big', 'AED 25')} />
        <PriceItem title="Bed Spread" price="AED 25" onAdd={() => handleAddToCart('Bed Spread', 'AED 25')} />
        <PriceItem
          title="Bed Spread Big"
          price="AED 25"
          onAdd={() => handleAddToCart('Bed Spread Big', 'AED 25')}
        />
      </div>
      <div id="pillows" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Pillows</h3>
        <PriceItem title="Pillow" price="AED 10" onAdd={() => handleAddToCart('Pillow', 'AED 10')} />
        <PriceItem title="Pillow Cover" price="AED 4" onAdd={() => handleAddToCart('Pillow Cover', 'AED 4')} />
      </div>
      <div id="curtains" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Curtains</h3>
        <PriceItem
          title="Curtains"
          price="AED 15-20"
          note="* Price varies by size"
          onAdd={() => handleAddToCart('Curtains', 'AED 15-20')}
        />
        <PriceItem
          title="Curtain Rubber"
          price="AED 40"
          note="* Per meter"
          onAdd={() => handleAddToCart('Curtain Rubber', 'AED 40')}
        />
      </div>
      <div id="carpets" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Carpets</h3>
        <PriceItem title="Carpet" price="AED 15" onAdd={() => handleAddToCart('Carpet', 'AED 15')} />
      </div>
    </ServiceCard>
  );

  const dryCleaningContent = (
    <ServiceCard icon="fas fa-tint" title="Dry Cleaning" description="Professional dry cleaning for delicate items.">
      <div className="flex gap-4 mb-4 text-sm">
        <button className="text-[#1E293B] font-medium hover:text-[#008080]">Pricing</button>
        <button className="text-[#64748B] hover:text-[#008080]">Info</button>
      </div>
      <div className="flex overflow-x-auto gap-1 mb-6 pb-1 sm:grid sm:grid-cols-3 sm:gap-2 sm:mb-6 sm:pb-0">
        {[
          'Shirts',
          'Tops',
          'Bottoms',
          'Suits',
          'Dresses',
          'Traditional Items',
          'Outerwear',
          'Accessories & Homewear',
          'Accessories',
          'Bed Sheets',
          'Duvet Covers',
          'Pillow Cases & Cushion Covers',
          'Bathroom Items',
          'Carpets & Curtains',
        ].map((cat) => (
          <CategoryButton
            key={cat}
            label={cat}
            targetId={cat.replace(/ & /g, '').replace(/ /g, '-').toLowerCase()}
            isActive={false}
          />
        ))}
      </div>
      <div id="shirts">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Shirts</h3>
        <PriceItem title="Shirt" price="AED 5" onAdd={() => handleAddToCart('Shirt', 'AED 5')} />
        <PriceItem title="T Shirt" price="AED 5" onAdd={() => handleAddToCart('T Shirt', 'AED 5')} />
        <PriceItem
          title="Under T Shirt"
          price="AED 3"
          onAdd={() => handleAddToCart('Under T Shirt', 'AED 3')}
        />
      </div>
      <div id="tops" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Tops</h3>
        <PriceItem title="Top" price="AED 6" onAdd={() => handleAddToCart('Top', 'AED 6')} />
        <PriceItem title="Blouse" price="AED 5" onAdd={() => handleAddToCart('Blouse', 'AED 5')} />
        <PriceItem title="Sweater" price="AED 10" onAdd={() => handleAddToCart('Sweater', 'AED 10')} />
      </div>
      <div id="bottoms" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Bottoms</h3>
        <PriceItem title="Trouser" price="AED 5" onAdd={() => handleAddToCart('Trouser', 'AED 5')} />
        <PriceItem title="Pajama" price="AED 5" onAdd={() => handleAddToCart('Pajama', 'AED 5')} />
        <PriceItem title="Half Pant" price="AED 5" onAdd={() => handleAddToCart('Half Pant', 'AED 5')} />
        <PriceItem title="Skirt" price="AED 6" onAdd={() => handleAddToCart('Skirt', 'AED 6')} />
        <PriceItem title="Lungi" price="AED 4" onAdd={() => handleAddToCart('Lungi', 'AED 4')} />
      </div>
      <div id="suits" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Suits</h3>
        <PriceItem title="Suit" price="AED 20" onAdd={() => handleAddToCart('Suit', 'AED 20')} />
        <PriceItem title="Army Suit" price="AED 15" onAdd={() => handleAddToCart('Army Suit', 'AED 15')} />
        <PriceItem
          title="Pakistani Men Suit"
          price="AED 10"
          onAdd={() => handleAddToCart('Pakistani Men Suit', 'AED 10')}
        />
        <PriceItem
          title="Pakistani Ladies Suit"
          price="AED 15"
          onAdd={() => handleAddToCart('Pakistani Ladies Suit', 'AED 15')}
        />
        <PriceItem title="Coverall" price="AED 10" onAdd={() => handleAddToCart('Coverall', 'AED 10')} />
      </div>
      <div id="dresses" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Dresses</h3>
        <PriceItem title="Baby Dress" price="AED 10" onAdd={() => handleAddToCart('Baby Dress', 'AED 10')} />
        <PriceItem title="Ladies Dress" price="AED 15" onAdd={() => handleAddToCart('Ladies Dress', 'AED 15')} />
        <PriceItem
          title="Ladies Dress Big"
          price="AED 20"
          onAdd={() => handleAddToCart('Ladies Dress Big', 'AED 20')}
        />
        <PriceItem title="Sari" price="AED 10" onAdd={() => handleAddToCart('Sari', 'AED 10')} />
      </div>
      <div id="traditional-items" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Traditional Items</h3>
        <PriceItem
          title="Summer Kandoora"
          price="AED 10"
          onAdd={() => handleAddToCart('Summer Kandoora', 'AED 10')}
        />
        <PriceItem title="Hot Kandoora" price="AED 15" onAdd={() => handleAddToCart('Hot Kandoora', 'AED 15')} />
        <PriceItem title="Tarbooj" price="AED 2" onAdd={() => handleAddToCart('Tarbooj', 'AED 2')} />
        <PriceItem title="Ghutra" price="AED 5" onAdd={() => handleAddToCart('Ghutra', 'AED 5')} />
        <PriceItem title="Hot Ghutra" price="AED 6" onAdd={() => handleAddToCart('Hot Ghutra', 'AED 6')} />
        <PriceItem title="Shimagh" price="AED 5" onAdd={() => handleAddToCart('Shimagh', 'AED 5')} />
        <PriceItem title="Ghafia" price="AED 2" onAdd={() => handleAddToCart('Ghafia', 'AED 2')} />
        <PriceItem title="Abaya" price="AED 10" onAdd={() => handleAddToCart('Abaya', 'AED 10')} />
        <PriceItem title="Shella" price="AED 5" onAdd={() => handleAddToCart('Shella', 'AED 5')} />
      </div>
      <div id="outerwear" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Outerwear</h3>
        <PriceItem title="Jacket" price="AED 10" onAdd={() => handleAddToCart('Jacket', 'AED 10')} />
      </div>
      <div id="accessories-homewear" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Accessories & Homewear</h3>
        <PriceItem title="Under Wear" price="AED 3" onAdd={() => handleAddToCart('Under Wear', 'AED 3')} />
        <PriceItem title="Socks" price="AED 3" onAdd={() => handleAddToCart('Socks', 'AED 3')} />
      </div>
      <div id="accessories" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Accessories</h3>
        <PriceItem title="Tie" price="AED 6" onAdd={() => handleAddToCart('Tie', 'AED 6')} />
        <PriceItem title="Cap" price="AED 5" onAdd={() => handleAddToCart('Cap', 'AED 5')} />
      </div>
      <div id="bed-sheets" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Bed Sheets</h3>
        <PriceItem title="Bed Sheet Big" price="AED 10" onAdd={() => handleAddToCart('Bed Sheet Big', 'AED 10')} />
        <PriceItem title="Bed Sheet Small" price="AED 8" onAdd={() => handleAddToCart('Bed Sheet Small', 'AED 8')} />
        <PriceItem title="Bed Spread" price="AED 25" onAdd={() => handleAddToCart('Bed Spread', 'AED 25')} />
        <PriceItem
          title="Bed Spread Big"
          price="AED 25"
          onAdd={() => handleAddToCart('Bed Spread Big', 'AED 25')}
        />
      </div>
      <div id="duvet-covers" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Duvet Covers</h3>
        <PriceItem title="Blanket" price="AED 20" onAdd={() => handleAddToCart('Blanket', 'AED 20')} />
        <PriceItem title="Blanket Big" price="AED 25" onAdd={() => handleAddToCart('Blanket Big', 'AED 25')} />
      </div>
      <div id="pillow-cases-cushion-covers" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Pillow Cases & Cushion Covers</h3>
        <PriceItem title="Pillow Cover" price="AED 4" onAdd={() => handleAddToCart('Pillow Cover', 'AED 4')} />
        <PriceItem title="Pillow" price="AED 10" onAdd={() => handleAddToCart('Pillow', 'AED 10')} />
      </div>
      <div id="bathroom-items" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Bathroom Items</h3>
        <PriceItem title="Towel" price="AED 6" onAdd={() => handleAddToCart('Towel', 'AED 6')} />
        <PriceItem title="Towel Small" price="AED 5" onAdd={() => handleAddToCart('Towel Small', 'AED 5')} />
        <PriceItem title="Bath Towel" price="AED 10" onAdd={() => handleAddToCart('Bath Towel', 'AED 10')} />
      </div>
      <div id="carpets-curtains" className="mt-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-4">Carpets & Curtains</h3>
        <PriceItem
          title="Curtains"
          price="AED 15-20"
          note="* Price varies by size"
          onAdd={() => handleAddToCart('Curtains', 'AED 15-20')}
        />
        <PriceItem
          title="Curtain Rubber"
          price="AED 40"
          note="* Per meter"
          onAdd={() => handleAddToCart('Curtain Rubber', 'AED 40')}
        />
        <PriceItem title="Carpet" price="AED 15" onAdd={() => handleAddToCart('Carpet', 'AED 15')} />
      </div>
    </ServiceCard>
  );

  const contentMap = {
    'Wash & Fold': washAndFoldContent,
    'Clean & Iron': cleanAndIronContent,
    'Ironing': ironingContent,
    'Duvets & Bulky': duvetsContent,
    'Dry Cleaning': dryCleaningContent,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F5F9] to-[#E0F2F7] font-sans pt-24">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1E293B] mb-4">Laundry & Care Services</h1>
          <p className="text-lg text-[#64748B] mb-6">
            Affordable laundry services with no surprises. Choose the plan that fits your needs!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
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
            <div className="bg-white shadow rounded-lg p-6">{contentMap[activeTab]}</div>
          </div>

          <div className="hidden sm:block w-80">
            <Sidebar
              cart={cart}
              onSchedulePickup={() => {
                navigate('/booking', { state: { cart } });
              }}
              isOpen={true}
              onClose={() => {}}
              onRemoveItem={handleRemoveFromCart}
            />
          </div>
        </div>
      </div>

      <motion.button
        className="fixed bottom-4 right-4 bg-[#008080] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl hover:bg-[#008080]/90 transition-colors sm:hidden z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <div className="relative">
          <i className="fas fa-shopping-cart"></i>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </div>
      </motion.button>

      <div className="sm:hidden">
        <Sidebar
          cart={cart}
          onSchedulePickup={() => {
            navigate('/booking', { state: { cart } });
            setSidebarOpen(false);
          }}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onRemoveItem={handleRemoveFromCart}
        />
      </div>
    </div>
  );
};

const PricingListPage = () => <LaundryServices />;

export default PricingListPage;