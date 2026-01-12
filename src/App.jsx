import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Phone, MapPin, Instagram, Facebook, Calendar, 
  Clock, ArrowRight, Check, Star, Heart, Scissors, 
  Sparkles, Zap, ChevronDown, ChevronUp, MoveRight, User, Feather
} from 'lucide-react';

/* --- ASSETS & DATA --- */

// Brand Palette: Cream, Sage, Charcoal
const THEME = {
  bg: "bg-[#FAFAF9]", // Stone-50
  text: "text-[#1C1917]", // Stone-900
  accent: "bg-[#57534E]", // Stone-600
  highlight: "text-[#D97706]", // Amber-600
  soft: "bg-[#E7E5E4]", // Stone-200
};

const IMAGES = {
  hero_main: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2000&auto=format&fit=crop",
  hero_sub: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=800",
  interior: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&q=80&w=800",
  hair: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=800",
  makeup: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800",
  spa: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800",
  nails: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?auto=format&fit=crop&q=80&w=800",
  men: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=800"
};

const CONTACT_INFO = {
  phone: "+91 99967 39543",
  address: "First floor, At Saini Chowk, Railway Station Rd, near Italian Master, Ram Nagar, Tohana",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d271.55799985399454!2d75.90174899025142!3d29.716459280812526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391197cb56a39d37%3A0xcfe1a280ca979ae5!2sAnju's%20Alex%20Salon!5e1!3m2!1sen!2sin!4v1768228451566!5m2!1sen!2sin"
};

const SERVICES_DATA = [
  {
    category: "Hair Artistry",
    image: IMAGES.hair,
    description: "Precision cuts and vibrant colors tailored to your unique style.",
    items: [
      { name: "Creative Haircut & Styling", price: "from ₹499" },
      { name: "Global Hair Color & Highlights", price: "from ₹2499" },
      { name: "Keratin & Smoothening", price: "from ₹3999" },
      { name: "Hair Spa Rituals", price: "from ₹999" },
      { name: "Nano Plastia Treatment", price: "from ₹4999" }
    ]
  },
  {
    category: "Bridal Studio",
    image: IMAGES.makeup,
    description: "Making your special day unforgettable with flawless HD makeup.",
    items: [
      { name: "HD Bridal Makeup", price: "Consult for Price" },
      { name: "Airbrush Makeup", price: "Consult for Price" },
      { name: "Engagement Look", price: "from ₹4999" },
      { name: "Party Makeup (Kryolan/MAC)", price: "from ₹1499" },
      { name: "Pre-Bridal Packages", price: "from ₹9999" }
    ]
  },
  {
    category: "Skin & Aesthetics",
    image: IMAGES.spa,
    description: "Advanced facials and skin treatments for a radiant glow.",
    items: [
      { name: "Hydra Facial (7-Step)", price: "from ₹1999" },
      { name: "O3+ Whitening Facial", price: "from ₹1499" },
      { name: "Anti-Ageing Treatment", price: "from ₹2499" },
      { name: "Detan & Clean Up", price: "from ₹599" },
      { name: "Under Eye Treatment", price: "from ₹799" }
    ]
  },
  {
    category: "Men's Grooming",
    image: IMAGES.men,
    description: "Sophisticated styling and grooming services for the modern man.",
    items: [
      { name: "Stylish Haircut & Fade", price: "from ₹249" },
      { name: "Beard Shaping & Spa", price: "from ₹199" },
      { name: "Hair Color (Ammonia Free)", price: "from ₹999" },
      { name: "Men's Facial & Detan", price: "from ₹899" }
    ]
  },
  {
    category: "Nail Bar",
    image: IMAGES.nails,
    description: "Express yourself with intricate nail art and extensions.",
    items: [
      { name: "Gel Extensions", price: "from ₹1499" },
      { name: "Acrylic Extensions", price: "from ₹1999" },
      { name: "Nail Art (Per Finger)", price: "from ₹99" },
      { name: "Gel Polish", price: "from ₹499" }
    ]
  }
];

const TESTIMONIALS = [
  { name: "Priya Malik", role: "Bride", text: "I booked my bridal makeup here and Anju ma'am did magic! The HD makeup was flawless and stayed till the end of the ceremony." },
  { name: "Rahul Saini", role: "Regular Customer", text: "Best salon in Tohana for men. The fade haircut is always precise. Great vibe and professional staff." },
  { name: "Meera Gupta", role: "Skin Care", text: "The Hydra facial was amazing. My skin feels so fresh and glowing. Highly recommend their O3+ packages." }
];

/* --- COMPONENTS --- */

const Logo = () => (
  <div className="flex flex-col items-start leading-none cursor-pointer" onClick={() => window.scrollTo(0,0)}>
    <span className="font-serif text-2xl font-bold tracking-widest text-stone-900">ALEX</span>
    <span className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-medium ml-0.5">Salon & Studio</span>
  </div>
);

const Button = ({ children, variant = 'primary', className = "", onClick, icon: Icon }) => {
  const styles = {
    primary: "bg-stone-900 text-stone-50 hover:bg-stone-800",
    outline: "border border-stone-300 text-stone-900 hover:bg-stone-100",
    text: "text-stone-900 hover:text-stone-600 underline-offset-4 hover:underline p-0 h-auto"
  };

  return (
    <button 
      onClick={onClick}
      className={`
        relative px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-3
        ${styles[variant]} ${className}
      `}
    >
      {children}
      {Icon && <Icon className="w-4 h-4" />}
    </button>
  );
};

/* --- BOOKING DRAWER (Side Panel) --- */
const BookingDrawer = ({ isOpen, onClose, initialService = '' }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ service: '', date: '', time: '', name: '', phone: '' });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (initialService) setFormData(prev => ({ ...prev, service: initialService }));
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, initialService]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(4);
    // Reset after success animation
    setTimeout(() => { onClose(); setStep(1); setFormData({ service: '', date: '', time: '', name: '', phone: '' }); }, 3000);
  };

  const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-stone-900/30 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="font-serif text-2xl text-stone-900">Book Appointment</h2>
              <p className="text-xs text-stone-500 uppercase tracking-widest mt-1">Step {step} of 3</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors"><X className="w-6 h-6 text-stone-500" /></button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            {step === 1 && (
              <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Select Service</label>
                  <div className="grid grid-cols-1 gap-2">
                    {SERVICES_DATA.map((cat) => (
                      <button 
                        key={cat.category}
                        onClick={() => setFormData({...formData, service: cat.category})}
                        className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${formData.service === cat.category ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-200 text-stone-600 hover:border-stone-400'}`}
                      >
                        <span>{cat.category}</span>
                        {formData.service === cat.category && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Preferred Date</label>
                  <input 
                    type="date" 
                    className="w-full p-4 rounded-xl border border-stone-200 focus:outline-none focus:border-stone-900 transition-colors text-stone-900 bg-stone-50"
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Select Time Slot</label>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((slot) => (
                      <button 
                        key={slot}
                        onClick={() => setFormData({...formData, time: slot})}
                        className={`p-3 rounded-lg border text-center text-sm transition-all ${formData.time === slot ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-200 text-stone-600 hover:border-stone-400'}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Personal Details</label>
                  <input 
                    type="text" 
                    placeholder="Your Full Name" 
                    className="w-full p-4 rounded-xl border border-stone-200 focus:outline-none focus:border-stone-900 transition-colors bg-stone-50"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number (+91)" 
                    className="w-full p-4 rounded-xl border border-stone-200 focus:outline-none focus:border-stone-900 transition-colors bg-stone-50"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="p-6 bg-stone-100 rounded-xl space-y-3">
                  <h4 className="font-serif text-lg border-b border-stone-200 pb-2 mb-2">Booking Summary</h4>
                  <p className="text-stone-600 text-sm flex justify-between"><span>Service:</span> <span className="text-stone-900 font-medium">{formData.service}</span></p>
                  <p className="text-stone-600 text-sm flex justify-between"><span>Date:</span> <span className="text-stone-900 font-medium">{formData.date}</span></p>
                  <p className="text-stone-600 text-sm flex justify-between"><span>Time:</span> <span className="text-stone-900 font-medium">{formData.time}</span></p>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-lg shadow-green-100">
                  <Check className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif text-stone-900 mb-2">Booking Confirmed!</h3>
                <p className="text-stone-500 max-w-xs mx-auto">Thank you, {formData.name}. We have sent a confirmation to your phone.</p>
              </div>
            )}
          </div>

          {step < 4 && (
            <div className="pt-6 border-t border-stone-100 flex gap-4">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)} className="px-4">Back</Button>
              )}
              <Button 
                className="w-full justify-center" 
                onClick={() => {
                  if (step === 1 && formData.service && formData.date) setStep(2);
                  else if (step === 2 && formData.time) setStep(3);
                  else if (step === 3 && formData.name && formData.phone) handleSubmit({preventDefault:()=>{}});
                }}
                disabled={
                  (step === 1 && (!formData.service || !formData.date)) || 
                  (step === 2 && !formData.time) || 
                  (step === 3 && (!formData.name || !formData.phone))
                }
              >
                {step === 3 ? 'Confirm Booking' : 'Continue'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [openAccordion, setOpenAccordion] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openBooking = (serviceName = '') => {
    setSelectedService(serviceName);
    setIsDrawerOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <div className={`min-h-screen ${THEME.bg} ${THEME.text} font-sans selection:bg-stone-200`}>
      
      <BookingDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} initialService={selectedService} />

      {/* --- NAVBAR --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Logo />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'About', 'Services', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:text-stone-500 transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
             <a href={`tel:${CONTACT_INFO.phone}`} className="text-sm font-medium mr-2 hover:text-stone-600 transition-colors">{CONTACT_INFO.phone}</a>
             <Button variant="primary" onClick={() => openBooking()}>Book Now</Button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-stone-200 p-6 md:hidden shadow-xl animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-4">
              {['Home', 'About', 'Services', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-lg font-serif text-stone-900 border-b border-stone-100 pb-2">
                  {item}
                </a>
              ))}
              <Button className="w-full justify-center mt-4" onClick={() => openBooking()}>Book Appointment</Button>
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <header id="home" className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            <div className="flex-1 z-10 animate-in slide-in-from-bottom-10 duration-700">
              <div className="inline-block px-3 py-1 bg-stone-200 rounded-full text-xs font-bold uppercase tracking-widest text-stone-600 mb-6">
                Premium Unisex Salon in Tohana
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-medium leading-[1.1] mb-8 text-stone-900">
                Beauty, <br/>
                <span className="italic text-stone-500 font-serif">Reimagined.</span>
              </h1>
              <p className="text-stone-600 text-lg mb-10 max-w-md leading-relaxed">
                Step into Anju's Alex Salon. Where modern techniques meet timeless elegance. Experience luxury hair, skin, and bridal services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => openBooking()} icon={ArrowRight}>Book Appointment</Button>
                <Button variant="outline" onClick={() => window.location.href='#services'}>Explore Menu</Button>
              </div>
            </div>

            <div className="flex-1 relative w-full h-[500px] lg:h-[600px] animate-in fade-in duration-1000">
              <img 
                src={IMAGES.hero_main} 
                alt="Salon Interior" 
                className="absolute right-0 top-0 w-4/5 h-4/5 object-cover rounded-tr-[100px] rounded-bl-[100px] z-10 shadow-2xl"
              />
              <img 
                src={IMAGES.hero_sub} 
                alt="Styling" 
                className="absolute left-0 bottom-0 w-1/2 h-1/2 object-cover rounded-tl-[80px] rounded-br-[80px] z-20 shadow-xl border-8 border-[#FAFAF9]"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-stone-200 rounded-full z-0 opacity-50 animate-spin-slow" />
            </div>

          </div>
        </div>
      </header>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">The Alex Experience</h2>
            <p className="text-stone-500 leading-relaxed text-lg mb-8">
              "We believe that beauty is personal. At Anju's Alex Salon, we combine artistry with the world's finest products to create a look that is uniquely yours. Located conveniently at Saini Chowk, we are Tohana's destination for luxury self-care."
            </p>
            <div className="flex justify-center gap-12">
               <div className="text-center">
                 <h4 className="text-3xl font-serif text-stone-900">10+</h4>
                 <span className="text-xs uppercase tracking-widest text-stone-400">Years</span>
               </div>
               <div className="text-center">
                 <h4 className="text-3xl font-serif text-stone-900">2k+</h4>
                 <span className="text-xs uppercase tracking-widest text-stone-400">Happy Clients</span>
               </div>
               <div className="text-center">
                 <h4 className="text-3xl font-serif text-stone-900">15+</h4>
                 <span className="text-xs uppercase tracking-widest text-stone-400">Experts</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES (Accordion Style) --- */}
      <section id="services" className="py-24 bg-[#FAFAF9]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16">
            
            {/* Left: Heading */}
            <div className="md:w-1/3 sticky top-32 h-fit">
              <h2 className="text-4xl font-serif mb-6 leading-tight">Curated <br/>Service Menu</h2>
              <p className="text-stone-500 mb-8 leading-relaxed">
                Explore our comprehensive range of services. We use only premium products to ensure the health and shine of your hair and skin.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['L\'Oreal Professional', 'Schwarzkopf', 'O3+', 'MAC', 'Kryolan'].map(brand => (
                  <span key={brand} className="px-3 py-1 bg-white border border-stone-200 text-xs text-stone-500 rounded-full">{brand}</span>
                ))}
              </div>
              <Button variant="outline" onClick={() => openBooking()} className="w-full justify-center">Download Rate Card</Button>
            </div>

            {/* Right: Accordion */}
            <div className="md:w-2/3 space-y-4">
              {SERVICES_DATA.map((service, index) => (
                <div 
                  key={index} 
                  className={`bg-white border border-stone-200 rounded-2xl overflow-hidden transition-all duration-500 ${openAccordion === index ? 'shadow-xl ring-1 ring-stone-900/5' : 'hover:border-stone-300'}`}
                >
                  <button 
                    onClick={() => setOpenAccordion(index === openAccordion ? -1 : index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${openAccordion === index ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600'}`}>
                        {index === 0 ? <Scissors className="w-5 h-5" /> : index === 1 ? <Heart className="w-5 h-5" /> : index === 3 ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                      </div>
                      <span className="text-xl font-serif font-medium text-stone-900">{service.category}</span>
                    </div>
                    {openAccordion === index ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
                  </button>

                  <div className={`px-6 overflow-hidden transition-all duration-500 ${openAccordion === index ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="flex flex-col md:flex-row gap-6 pt-2 border-t border-stone-100">
                      <img src={service.image} alt={service.category} className="w-full md:w-1/3 h-40 object-cover rounded-xl" />
                      <div className="flex-1">
                        <p className="text-stone-500 text-sm mb-4">{service.description}</p>
                        <ul className="space-y-3">
                          {service.items.map((item, i) => (
                            <li key={i} className="flex justify-between items-center text-sm border-b border-stone-100 pb-2 last:border-0 group">
                              <span className="font-medium text-stone-800">{item.name}</span>
                              <div className="flex items-center gap-4">
                                <span className="text-stone-500">{item.price}</span>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); openBooking(item.name); }}
                                  className="opacity-0 group-hover:opacity-100 text-[10px] uppercase font-bold tracking-wider text-stone-900 hover:underline transition-opacity"
                                >
                                  Book
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-20 bg-stone-900 text-stone-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif mb-4">Client Love</h2>
            <div className="w-24 h-1 bg-stone-700 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-stone-800 p-8 rounded-2xl relative">
                <div className="text-stone-600 mb-4"><Feather className="w-8 h-8 opacity-20" /></div>
                <p className="text-stone-300 mb-6 italic leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-stone-700 rounded-full flex items-center justify-center font-serif font-bold text-stone-400">
                    {t.name[0]}
                  </div>
                  <div>
                    <h5 className="font-medium text-stone-100">{t.name}</h5>
                    <span className="text-xs uppercase tracking-widest text-stone-500">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INFO BANNER --- */}
      <section className="py-20 bg-white relative overflow-hidden border-b border-stone-200">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-serif mb-10 text-stone-900">Visit Anju's Alex Salon Today</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-stone-600">
            <div className="flex flex-col items-center gap-3 group hover:text-stone-900 transition-colors">
              <div className="p-4 bg-stone-50 rounded-full group-hover:bg-stone-100 transition-colors"><Clock className="w-6 h-6" /></div>
              <div className="flex flex-col">
                <span className="font-bold text-sm uppercase tracking-wider">Open 7 Days</span>
                <span className="text-sm">9:00 AM - 8:00 PM</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 group hover:text-stone-900 transition-colors">
              <div className="p-4 bg-stone-50 rounded-full group-hover:bg-stone-100 transition-colors"><MapPin className="w-6 h-6" /></div>
              <div className="flex flex-col">
                 <span className="font-bold text-sm uppercase tracking-wider">Location</span>
                 <span className="text-sm">Near Saini Chowk, Tohana</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 group hover:text-stone-900 transition-colors">
              <div className="p-4 bg-stone-50 rounded-full group-hover:bg-stone-100 transition-colors"><Phone className="w-6 h-6" /></div>
              <div className="flex flex-col">
                 <span className="font-bold text-sm uppercase tracking-wider">Bookings</span>
                 <span className="text-sm">{CONTACT_INFO.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT & FOOTER --- */}
      <footer id="contact" className="bg-[#FAFAF9] pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
            
            <div className="space-y-8">
              <Logo />
              <h2 className="text-4xl font-serif leading-tight text-stone-900">
                Ready for a <br/>
                <span className="italic text-stone-500">New Look?</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-700 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-stone-900 mb-1">Address</h5>
                    <p className="text-stone-500 max-w-xs">{CONTACT_INFO.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-700 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-stone-900 mb-1">Phone</h5>
                    <p className="text-stone-500">{CONTACT_INFO.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Styled Map */}
            <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl shadow-stone-200 border border-white relative group transform hover:-translate-y-2 transition-transform duration-500">
              <iframe 
                src={CONTACT_INFO.mapUrl}
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-700"
              ></iframe>
              <div className="absolute bottom-6 left-6 bg-white px-6 py-3 rounded-full shadow-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none text-stone-900">
                Get Directions
              </div>
            </div>

          </div>

          <div className="border-t border-stone-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-stone-400">
            <p>&copy; 2026 Alex Salon. All Rights Reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-stone-900 transition-colors">Instagram</a>
              <a href="#" className="hover:text-stone-900 transition-colors">Facebook</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button (Mobile Only) */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden animate-in zoom-in duration-500">
        <button 
          onClick={() => openBooking()}
          className="w-14 h-14 bg-stone-900 rounded-full flex items-center justify-center text-white shadow-xl shadow-stone-900/30 active:scale-90 transition-transform"
        >
          <Calendar className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
}