import React, { useState, useEffect, Component } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { getServices } from '../Utils/api';
import { itemToCategory, categoryGroups, categoryToItems } from '../Utils/serviceConfig';
import Navbar from '../Components/Navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Error Boundary Component
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-100 text-red-800 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Something went wrong</h3>
          <p className="text-sm">Please try again or contact support.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const ServiceCard = ({ icon, title, description, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-md p-6 mb-6 border border-[#008080]/10 hover:shadow-lg transition-shadow duration-300"
    role="region"
    aria-label={title}
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="bg-[#008080] rounded-full w-12 h-12 flex items-center justify-center text-white">
        <i className={`${icon} text-2xl`} aria-hidden="true"></i>
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
    role="tab"
    aria-selected={isActive}
    aria-label={`Select ${label} service`}
  >
    <i className={`${icon} text-lg`} aria-hidden="true"></i> {label}
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
    role="button"
    aria-label={`View ${label} category`}
  >
    {label}
  </motion.button>
);

const PriceItem = ({ title, price, note, onAdd }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  return (
    <div className="flex justify-between items-start py-3 border-b border-[#008080]/10 sm:flex-row flex-col">
      <span className="text-sm text-[#64748B] mb-2 sm:mb-0 sm:flex-1">{title}</span>
      <div className="flex flex-col items-end sm:items-center sm:flex-row sm:gap-4 sm:w-auto w-full">
        <div className="text-right">
          <span className="text-base font-medium text-[#1E293B]">{price}</span>
          {note && (
            <div className="text-[10px] text-[#64748B] mt-1">{note}</div>
          )}
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            className="w-16 p-1 border border-[#008080]/20 rounded text-sm text-[#1E293B]"
            aria-label={`Quantity for ${title}`}
          />
          <motion.button
            className="w-8 h-8 rounded-full bg-[#F4B400]/10 text-[#1E293B] flex items-center justify-center hover:bg-[#F4B400]/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onAdd(quantity)}
            aria-label={`Add ${quantity} ${title} to cart`}
          >
            +
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ cart, onSchedulePickup, isOpen, onClose, onRemoveItem }) => {
  const navigate = useNavigate();

  const handleSchedulePickup = () => {
    const branch = JSON.parse(localStorage.getItem('selectedBranch')) || { name: 'Main Branch' };
    navigate('/booking', { state: { cart, branch } });
  };

  // Validate and clean cart
  const validCart = cart.filter((item) => {
    const isValid = item && typeof item === 'object' && (item.price || item.calculatedPrice);
    if (!isValid) {
      console.warn('Invalid cart item:', item);
      toast.warn('Removed invalid item from cart', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
    return isValid;
  });

  // Update localStorage if cart was modified
  useEffect(() => {
    if (validCart.length !== cart.length) {
      localStorage.setItem('cart', JSON.stringify(validCart));
    }
  }, [validCart, cart]);

  return (
    <ErrorBoundary>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 right-0 w-80 bg-white p-6 rounded-l-2xl shadow-lg border-l border-[#008080]/10 z-50 h-screen sm:static sm:max-w-sm sm:w-full sm:p-6 sm:bg-white sm:rounded-none sm:shadow-none sm:border-0 sm:h-auto sm:mt-0 sm:ml-auto"
        role="complementary"
        aria-label="Cart"
      >
        <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Your Cart</h3>
        {validCart.length === 0 ? (
          <p className="text-sm text-[#64748B] mb-4">No items selected yet. Start adding!</p>
        ) : (
          <div className="mb-4">
            {validCart.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 text-sm">
                <span className="text-[#1E293B]">
                  {item.title} {item.quantity > 1 ? `x${item.quantity}` : ''}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[#64748B]">{item.calculatedPrice || item.price}</span>
                  <motion.button
                    className="w-6 h-6 text-[#64748B] hover:text-[#1E293B] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onRemoveItem(index)}
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    &times;
                  </motion.button>
                </div>
              </div>
            ))}
            <p className="text-sm text-[#64748B] mt-2">
              Total: AED{' '}
              {validCart
                .reduce((sum, item) => {
                  const priceStr = item.calculatedPrice || item.price;
                  if (!priceStr || typeof priceStr !== 'string') {
                    console.warn(`Invalid price for item: ${item.title}`, priceStr);
                    return sum;
                  }
                  const price = priceStr.includes('-')
                    ? parseFloat(priceStr.replace('AED ', '').split('-')[0])
                    : parseFloat(priceStr.replace('AED ', '')) || 0;
                  return sum + (isNaN(price) ? 0 : price * item.quantity);
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
          aria-label="Schedule Pickup"
        >
          Schedule Pickup
        </motion.button>
        {isOpen && (
          <motion.button
            className="absolute top-2 right-2 text-[#64748B] text-xl sm:hidden"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Close cart"
          >
            &times;
          </motion.button>
        )}
      </motion.div>
    </ErrorBoundary>
  );
};

const LaundryServices = () => {
  const [activeTab, setActiveTab] = useState('Wash & Fold');
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    // Validate cart items
    const validCart = storedCart.filter((item) => {
      const isValid = item && typeof item === 'object' && item.title && (item.price || item.calculatedPrice);
      if (!isValid) {
        console.warn('Invalid cart item on load:', item);
      }
      return isValid;
    });
    if (validCart.length !== storedCart.length) {
      localStorage.setItem('cart', JSON.stringify(validCart));
      toast.warn('Cleaned invalid items from cart', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
    return validCart;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const serviceFromBooking = location.state?.service;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await getServices();
        // Validate service data
        const validServices = data.filter((service) => {
          const isValid =
            service &&
            typeof service === 'object' &&
            service.category &&
            Array.isArray(service.items) &&
            service.items.every((item) => item.title && item.price);
          if (!isValid) {
            console.warn('Invalid service:', service);
          }
          return isValid;
        });
        setServices(validServices);
        if (validServices.length !== data.length) {
          toast.warn('Some services were invalid and filtered out', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load services. Please try again.');
        setLoading(false);
        toast.error('Failed to load services', {
          position: 'top-right',
          autoClose: 5000,
        });
      }
    };
    fetchServices();

    if (serviceFromBooking) {
      setActiveTab(serviceFromBooking);
    }
  }, [serviceFromBooking]);

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (title, price, quantity) => {
    if (!title || !price) {
      toast.error('Cannot add item: Invalid title or price', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }
    let calculatedPrice = price;
    if (title.includes('30kg Bulk')) {
      calculatedPrice = `AED ${30 * 7.5 * quantity}`;
    } else if (title.includes('60kg Bulk')) {
      calculatedPrice = `AED ${60 * 7.25 * quantity}`;
    } else if (title.includes('120kg Bulk')) {
      calculatedPrice = `AED ${120 * 7 * quantity}`;
    }
    setCart([...cart, { title, price, calculatedPrice, quantity }]);
    toast.success(`${title} added to cart`, {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const handleRemoveFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
    toast.info('Item removed from cart', {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const filteredItems = (items) =>
    items.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F1F5F9] to-[#E0F2F7] font-sans flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[#008080] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#1E293B] text-lg mt-4">Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F1F5F9] to-[#E0F2F7] font-sans flex items-center justify-center">
        <p className="text-[#1E293B] text-lg">{error}</p>
      </div>
    );
  }

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
              {services.map((service) => (
                <TabButton
                  key={service.category}
                  icon={service.icon}
                  label={service.category}
                  isActive={activeTab === service.category}
                  onClick={() => {
                    setActiveTab(service.category);
                    setSearchTerm(''); // Reset search when switching tabs
                  }}
                />
              ))}
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              {services.map(
                (service) =>
                  service.category === activeTab && (
                    <ServiceCard
                      key={service.category}
                      icon={service.icon}
                      title={service.category}
                      description={service.description}
                    >
                      <div className="flex gap-4 mb-4 text-sm">
                        <button className="text-[#1E293B] font-medium hover:text-[#008080]">
                          Pricing
                        </button>
                        <button className="text-[#64748B] hover:text-[#008080]">
                          Info
                        </button>
                      </div>
                      {service.category !== 'Wash & Fold' && (
                        <div className="mb-6">
                          <input
                            type="text"
                            placeholder="Search items..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 border border-[#008080]/20 rounded text-sm text-[#1E293B]"
                            aria-label="Search items"
                          />
                        </div>
                      )}
                      {service.category === 'Wash & Fold' ? (
                        <div>
                          <nav className="flex gap-6 mb-6 text-sm">
                            <a className="text-[#1E293B] font-medium hover:text-[#008080]" href="#">
                              Pricing
                            </a>
                            <a className="text-[#64748B] hover:text-[#008080]" href="#">
                              Details
                            </a>
                          </nav>
                          <h3 className="text-xl font-bold text-[#1E293B] mb-4">Wash Plans</h3>
                          {filteredItems(service.items).map((item, index) => (
                            <PriceItem
                              key={index}
                              title={item.title}
                              price={
                                item.title.includes('30kg Bulk')
                                  ? `${item.price} (AED 225)`
                                  : item.title.includes('60kg Bulk')
                                  ? `${item.price} (AED 435)`
                                  : item.title.includes('120kg Bulk')
                                  ? `${item.price} (AED 840)`
                                  : item.price
                              }
                              note={item.note}
                              onAdd={(quantity) => handleAddToCart(item.title, item.price, quantity)}
                            />
                          ))}
                        </div>
                      ) : (
                        <>
                          <div className="sticky top-0 z-10 bg-white flex overflow-x-auto gap-1 mb-6 pb-1 sm:grid sm:grid-cols-3 sm:gap-2 sm:mb-6 sm:pb-0">
                            {categoryGroups[service.category].map((cat) => (
                              <CategoryButton
                                key={cat}
                                label={cat}
                                targetId={cat.replace(/ & /g, '').replace(/ /g, '-').toLowerCase()}
                                isActive={false}
                              />
                            ))}
                          </div>
                          {categoryGroups[service.category].map((category) => {
                            const items =
                              service.category === 'Duvets & Bulky'
                                ? categoryToItems[category] || []
                                : service.items
                                    .filter((item) => itemToCategory[item.title] === category)
                                    .map((item) => item.title);
                            const filteredCategoryItems = filteredItems(
                              service.items.filter((item) => items.includes(item.title))
                            );
                            return filteredCategoryItems.length > 0 ? (
                              <div
                                key={category}
                                id={category.replace(/ & /g, '').replace(/ /g, '-').toLowerCase()}
                                className="mt-6"
                              >
                                <h3 className="text-xl font-bold text-[#1E293B] mb-4">{category}</h3>
                                {filteredCategoryItems.map((item, index) => (
                                  <PriceItem
                                    key={index}
                                    title={item.title}
                                    price={item.price}
                                    note={item.note}
                                    onAdd={(quantity) => handleAddToCart(item.title, item.price, quantity)}
                                  />
                                ))}
                              </div>
                            ) : null;
                          })}
                        </>
                      )}
                    </ServiceCard>
                  )
              )}
            </div>
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
        aria-label="Open cart"
      >
        <div className="relative">
          <i className="fas fa-shopping-cart" aria-hidden="true"></i>
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