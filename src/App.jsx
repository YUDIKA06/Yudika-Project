import React, { useState, useEffect } from 'react';
import { 
  Search, ChevronDown, Share2, 
  Mail, Phone, MapPin, Menu, X, Camera, Video, Radio, MessageCircle 
} from 'lucide-react';

// Dictionary for Bilingual support
const content = {
  id: {
    nav: {
      home: "Beranda", about: "Tentang Kami", portfolio: "Portofolio", 
      services: "Layanan", search: "Cari foto...", langToggle: "EN"
    },
    servicesMenu: {
      doc: "Dokumentasi", multi: "Multicam", stream: "Sistem Streaming"
    },
    home: {
      heroTitle: "Mengabadikan Momen, Menciptakan Kenangan",
      heroSub: "Fotografi & Videografi Profesional untuk setiap kebutuhan Anda.",
      productTitle: "Produk Kami",
      testiTitle: "Apa Kata Klien?",
    },
    about: {
      title: "Tentang Kami",
      desc: "Kami adalah tim fotografer dan videografer profesional yang berdedikasi untuk menceritakan kisah Anda melalui lensa. Berbasis di Indonesia, kami telah berpengalaman lebih dari 10 tahun dalam menangani berbagai event mulai dari pernikahan, konser, hingga dokumentasi korporat. Kami percaya setiap momen memiliki emosi yang layak untuk diabadikan secara sempurna."
    },
    footer: {
      contact: "Hubungi Kami",
      follow: "Ikuti Kami",
      rights: "Hak Cipta Dilindungi."
    }
  },
  en: {
    nav: {
      home: "Home", about: "About Us", portfolio: "Portfolio", 
      services: "Services", search: "Search photos...", langToggle: "ID"
    },
    servicesMenu: {
      doc: "Documentation", multi: "Multicam", stream: "Streaming System"
    },
    home: {
      heroTitle: "Capturing Moments, Creating Memories",
      heroSub: "Professional Photography & Videography for all your needs.",
      productTitle: "Our Products",
      testiTitle: "What Do Clients Say?",
    },
    about: {
      title: "About Us",
      desc: "We are a team of professional photographers and videographers dedicated to telling your story through the lens. Based in Indonesia, we have over 10 years of experience handling various events from weddings, concerts, to corporate documentation. We believe every moment holds an emotion that deserves to be captured perfectly."
    },
    footer: {
      contact: "Contact Us",
      follow: "Follow Us",
      rights: "All Rights Reserved."
    }
  }
};

// Mock Data
const heroImages = [
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1920&q=80"
];

const portfolioItems = [
  { id: 1, title: 'Wedding in Bali', category: 'Wedding', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'Corporate Summit', category: 'Event', img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'Nature Wildlife', category: 'Landscape', img: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Wildlife_at_Maasai_Mara_%28Lion%29.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original' },
  { id: 4, title: 'Music Festival', category: 'Concert', img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80' },
  { id: 5, title: 'Product Launch', category: 'Commercial', img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80' },
  { id: 6, title: 'Pre-wedding Shoot', category: 'Wedding', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' },
];

const testimonials = [
  { name: "Akmal Paseh", text: "Keren banget jir", role: "Wedding Client" },
  { name: "Farid Gondrong", text: "Mantap banget asli dah", role: "Corporate Client" },
  { name: "Heri Gemoy", text: "CINTA UNINDRA", role: "Art Collector" }
];

// Data untuk Popup Galeri di Halaman Utama
const serviceGalleries = {
  'doc': [
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'
  ],
  'multi': [
    'https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
  ],
  'stream': [
    'https://evio.id/wp-content/uploads/2025/01/SewaLEDSreenBali-BankMandiri-SewaSoundSystemBali-SewaLiveStreamingBali-SewaLiveVideoBali-EvioMultimedia.jpg',
    'https://images.unsplash.com/photo-1627914227361-cc7087754d58?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=800&q=80'
  ]
};

// Data untuk Popup Galeri di Halaman Portofolio
const portfolioGalleries = {
  1: [ // Wedding in Bali
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583939000340-c66619586118?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80'
  ],
  2: [ // Corporate Summit
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&w=800&q=80'
  ],
  3: [ // Nature Wildlife
    'https://upload.wikimedia.org/wikipedia/commons/7/7d/Wildlife_at_Maasai_Mara_%28Lion%29.jpg',
    'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1475809913362-28a064062cb8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=800&q=80'
  ],
  4: [ // Music Festival
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1533174000255-a63b453965d2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1470229722913-7c090be88051?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80'
  ],
  5: [ // Product Launch
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
  ],
  6: [ // Pre-wedding Shoot
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583939000340-c66619586118?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'
  ]
};

const Navbar = ({ lang, setLang, setPage, currentPage, searchQuery, setSearchQuery }) => {
  const t = content[lang];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleNavClick = (page) => {
    setPage(page);
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'portfolio', label: t.nav.portfolio },
  ];

  return (
    <nav className="fixed w-full z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <span className="text-2xl font-bold tracking-widest text-white uppercase">YUDIKA<span className="text-amber-500">.</span></span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <button 
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium uppercase tracking-wider transition-colors ${currentPage === link.id ? 'text-amber-500' : 'text-neutral-300 hover:text-white'}`}
              >
                {link.label}
              </button>
            ))}

            <div className="relative group" 
                 onMouseEnter={() => setIsServicesOpen(true)}
                 onMouseLeave={() => setIsServicesOpen(false)}>
              <button className={`flex items-center text-sm font-medium uppercase tracking-wider transition-colors ${currentPage.startsWith('service') ? 'text-amber-500' : 'text-neutral-300 hover:text-white'}`}>
                {t.nav.services} <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              
              <div className={`absolute top-full left-0 w-48 pt-4 transition-all duration-300 ${isServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl overflow-hidden py-2">
                  <button onClick={() => handleNavClick('service-doc')} className="block w-full text-left px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white">
                    {t.servicesMenu.doc}
                  </button>
                  <button onClick={() => handleNavClick('service-multi')} className="block w-full text-left px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white">
                    {t.servicesMenu.multi}
                  </button>
                  <button onClick={() => handleNavClick('service-stream')} className="block w-full text-left px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white">
                    {t.servicesMenu.stream}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="relative flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center bg-neutral-900 rounded-full px-3 py-1 border border-neutral-700">
                  <Search className="w-4 h-4 text-neutral-400 mr-2" />
                  <input 
                    type="text" 
                    placeholder={t.nav.search}
                    className="bg-transparent border-none outline-none text-sm text-white w-32 placeholder-neutral-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => { if(e.key === 'Enter') { handleNavClick('portfolio'); setIsSearchOpen(false); } }}
                    autoFocus
                  />
                  <X className="w-4 h-4 text-neutral-400 cursor-pointer hover:text-white" onClick={() => setIsSearchOpen(false)} />
                </div>
              ) : (
                <button onClick={() => setIsSearchOpen(true)} className="text-neutral-300 hover:text-amber-500 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            <button 
              onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
              className="px-3 py-1 border border-neutral-700 rounded-full text-xs font-bold text-neutral-300 hover:bg-white hover:text-black transition-colors"
            >
              {lang === 'id' ? 'EN' : 'ID'}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
              className="px-2 py-1 border border-neutral-700 rounded text-xs font-bold text-neutral-300"
            >
              {lang === 'id' ? 'EN' : 'ID'}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-neutral-300 hover:text-white">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-900 border-t border-neutral-800">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map(link => (
              <button 
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left px-3 py-3 text-base font-medium rounded-md ${currentPage === link.id ? 'bg-neutral-800 text-amber-500' : 'text-neutral-300 hover:bg-neutral-800'}`}
              >
                {link.label}
              </button>
            ))}
            
            <div className="px-3 py-2 text-sm font-bold text-neutral-500 uppercase">{t.nav.services}</div>
            <button onClick={() => handleNavClick('service-doc')} className="block w-full text-left pl-6 pr-3 py-2 text-base font-medium text-neutral-400 hover:bg-neutral-800 rounded-md">
              - {t.servicesMenu.doc}
            </button>
            <button onClick={() => handleNavClick('service-multi')} className="block w-full text-left pl-6 pr-3 py-2 text-base font-medium text-neutral-400 hover:bg-neutral-800 rounded-md">
              - {t.servicesMenu.multi}
            </button>
            <button onClick={() => handleNavClick('service-stream')} className="block w-full text-left pl-6 pr-3 py-2 text-base font-medium text-neutral-400 hover:bg-neutral-800 rounded-md">
              - {t.servicesMenu.stream}
            </button>
            
            <div className="mt-4 px-3">
               <div className="flex items-center bg-neutral-800 rounded-full px-4 py-2 border border-neutral-700">
                  <Search className="w-4 h-4 text-neutral-400 mr-2" />
                  <input 
                    type="text" 
                    placeholder={t.nav.search}
                    className="bg-transparent border-none outline-none text-sm text-white w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => { if(e.key === 'Enter') handleNavClick('portfolio'); }}
                  />
                </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = ({ lang }) => {
  const t = content[lang].footer;
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div>
            <span className="text-2xl font-bold tracking-widest text-white uppercase mb-6 block">YUDIKA<span className="text-amber-500">.</span></span>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              {lang === 'id' ? "Mengabadikan setiap detik menjadi cerita visual yang bermakna." : "Capturing every second into a meaningful visual story."}
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold tracking-wider uppercase mb-6">{t.contact}</h3>
            <ul className="space-y-4">
              <li className="flex items-start text-neutral-400">
                <MapPin className="w-5 h-5 mr-3 text-amber-500 shrink-0" />
                <span className="text-sm">Jl. Ciliwung, Gang Mawar, Jakarta Timur, Indonesia 12345</span>
              </li>
              <li>
                <a href="https://wa.me/6289503141919" target="_blank" rel="noopener noreferrer" className="flex items-center text-neutral-400 hover:text-amber-500 transition-colors">
                  <Phone className="w-5 h-5 mr-3 text-amber-500" />
                  <span className="text-sm">+62 895 0314 1919</span>
                </a>
              </li>
              <li className="flex items-center text-neutral-400">
                <Mail className="w-5 h-5 mr-3 text-amber-500" />
                <span className="text-sm">yudika3304@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold tracking-wider uppercase mb-6">{t.follow}</h3>
            <div className="flex space-x-4">
               {/* Tombol share dihapus sesuai permintaan */}
               <a href="https://www.instagram.com/yudika06_/" target="_blank" rel="noopener noreferrer" className="h-10 px-4 rounded-full bg-neutral-900 flex items-center justify-center text-sm font-bold text-neutral-400 hover:bg-amber-500 hover:text-white transition-colors">
                Instagram
              </a>
               <a href="#" target="_blank" rel="noopener noreferrer" className="h-10 px-4 rounded-full bg-neutral-900 flex items-center justify-center text-sm font-bold text-neutral-400 hover:bg-amber-500 hover:text-white transition-colors">
                Facebook
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-900 text-center text-neutral-500 text-sm">
          &copy; {new Date().getFullYear()} YUDIKA. {t.rights}
        </div>
      </div>
    </footer>
  );
};

const Home = ({ lang, setPage }) => {
  const t = content[lang].home;
  const tNav = content[lang].nav;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeModal, setActiveModal] = useState(null); // 'doc', 'multi', 'stream'

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-in fade-in duration-500">
      <section className="relative h-screen w-full overflow-hidden">
        {heroImages.map((img, index) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <img src={img} alt={`Slide ${index}`} className="object-cover w-full h-full scale-105" />
          </div>
        ))}
        
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto mt-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
            {t.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-200 mb-10 drop-shadow-md">
            {t.heroSub}
          </p>
          {/* Tombol Portofolio Sekarang Bisa Dipencet */}
          <button onClick={() => setPage('portfolio')} className="px-8 py-3 bg-amber-500 text-black font-bold tracking-wider uppercase text-sm rounded-full hover:bg-white hover:text-black transition-all transform hover:scale-105">
            {tNav.portfolio}
          </button>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {heroImages.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${idx === currentSlide ? 'bg-amber-500 w-8' : 'bg-white/50 hover:bg-white'}`}
            />
          ))}
        </div>
      </section>

      <section className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-widest">{t.productTitle}</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Box Dokumentasi */}
            <div onClick={() => setActiveModal('doc')} className="group relative overflow-hidden rounded-xl bg-neutral-900 aspect-[4/5] cursor-pointer">
              <img src={portfolioItems[0].img} alt="Product 1" className="object-cover w-full h-full opacity-60 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <Camera className="w-12 h-12 text-amber-500 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{content[lang].servicesMenu.doc}</h3>
                <p className="text-neutral-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                   {lang === 'id' ? "Abadikan setiap detail dengan sempurna." : "Capture every detail perfectly."}
                </p>
              </div>
            </div>

            {/* Box Multicam */}
            <div onClick={() => setActiveModal('multi')} className="group relative overflow-hidden rounded-xl bg-neutral-900 aspect-[4/5] cursor-pointer">
              <img src={portfolioItems[3].img} alt="Product 2" className="object-cover w-full h-full opacity-60 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <Video className="w-12 h-12 text-amber-500 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{content[lang].servicesMenu.multi}</h3>
                <p className="text-neutral-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                   {lang === 'id' ? "Produksi video multi-kamera kualitas siaran." : "Broadcast quality multi-camera production."}
                </p>
              </div>
            </div>

            {/* Box Streaming */}
            <div onClick={() => setActiveModal('stream')} className="group relative overflow-hidden rounded-xl bg-neutral-900 aspect-[4/5] cursor-pointer">
              <img src={portfolioItems[1].img} alt="Product 3" className="object-cover w-full h-full opacity-60 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <Radio className="w-12 h-12 text-amber-500 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{content[lang].servicesMenu.stream}</h3>
                <p className="text-neutral-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  {lang === 'id' ? "Siarkan event Anda ke seluruh dunia tanpa batas." : "Broadcast your event globally without limits."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPUP MODAL GALERI */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-neutral-950/95 backdrop-blur-md p-4 md:p-8 animate-in fade-in duration-300">
          <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 p-2 bg-neutral-900 rounded-full text-neutral-400 hover:text-white hover:bg-red-500 transition-colors z-50">
            <X className="w-8 h-8" />
          </button>
          
          <div className="w-full max-w-7xl max-h-[85vh] overflow-y-auto pr-2 custom-scrollbar">
            <div className="text-center mb-10 mt-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-widest">
                {content[lang].servicesMenu[activeModal]}
              </h2>
              <div className="w-20 h-1 bg-amber-500 mx-auto mt-6"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {serviceGalleries[activeModal].map((imgUrl, i) => (
                <div key={i} className="group relative overflow-hidden rounded-xl aspect-square bg-neutral-900">
                  <img src={imgUrl} alt={`Gallery ${i}`} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <section className="py-24 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-widest">{t.testiTitle}</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testi, idx) => (
              <div key={idx} className="bg-neutral-950 p-8 rounded-2xl border border-neutral-800 hover:border-amber-500/50 transition-colors">
                <div className="text-amber-500 text-4xl font-serif mb-4">"</div>
                <p className="text-neutral-300 italic mb-6">"{testi.text}"</p>
                <div>
                  <h4 className="text-white font-bold">{testi.name}</h4>
                  <p className="text-sm text-neutral-500">{testi.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const About = ({ lang }) => {
  const t = content[lang].about;
  return (
    <div className="pt-24 pb-20 min-h-screen bg-neutral-950 flex items-center animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src="foto gua.jpeg" alt="Photographer" className="rounded-2xl shadow-2xl object-cover aspect-[3/4]" />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-500 rounded-2xl -z-10 hidden md:block"></div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-widest mb-6">{t.title}</h2>
            <div className="w-20 h-1 bg-amber-500 mb-8"></div>
            <p className="text-lg text-neutral-300 leading-relaxed mb-8">
              {t.desc}
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-neutral-800 pt-8">
              <div>
                <h4 className="text-4xl font-bold text-amber-500 mb-2">10+</h4>
                <p className="text-neutral-400">{lang === 'id' ? 'Tahun Pengalaman' : 'Years Experience'}</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-amber-500 mb-2">500+</h4>
                <p className="text-neutral-400">{lang === 'id' ? 'Klien Puas' : 'Happy Clients'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Portfolio = ({ lang, searchQuery }) => {
  const t = content[lang].nav;
  const [activeModal, setActiveModal] = useState(null); // Tambahkan state untuk modal
  
  const filteredItems = portfolioItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-32 pb-24 min-h-screen bg-neutral-950 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white uppercase tracking-widest">{t.portfolio}</h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-6"></div>
          {searchQuery && (
            <p className="text-neutral-400 mt-4">
              {lang === 'id' ? `Menampilkan hasil untuk: "${searchQuery}"` : `Showing results for: "${searchQuery}"`}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredItems.length > 0 ? filteredItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setActiveModal(item.id)} // Fungsi klik untuk buka modal
              className="group relative overflow-hidden rounded-xl aspect-square bg-neutral-900 cursor-pointer"
            >
              <img src={item.img} alt={item.title} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-amber-500 text-sm font-bold uppercase tracking-wider mb-2">{item.category}</span>
                <h3 className="text-white text-xl font-bold">{item.title}</h3>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-20">
               <p className="text-neutral-500 text-xl">{lang === 'id' ? "Tidak ada foto yang cocok dengan pencarian Anda." : "No photos matched your search."}</p>
            </div>
          )}
        </div>
      </div>

      {/* POPUP MODAL GALERI UNTUK PORTOFOLIO */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-neutral-950/95 backdrop-blur-md p-4 md:p-8 animate-in fade-in duration-300">
          <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 p-2 bg-neutral-900 rounded-full text-neutral-400 hover:text-white hover:bg-red-500 transition-colors z-50">
            <X className="w-8 h-8" />
          </button>
          
          <div className="w-full max-w-7xl max-h-[85vh] overflow-y-auto pr-2 custom-scrollbar">
            <div className="text-center mb-10 mt-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-widest">
                {portfolioItems.find(item => item.id === activeModal)?.title}
              </h2>
              <div className="w-20 h-1 bg-amber-500 mx-auto mt-6"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {portfolioGalleries[activeModal]?.map((imgUrl, i) => (
                <div key={i} className="group relative overflow-hidden rounded-xl aspect-square bg-neutral-900">
                  <img src={imgUrl} alt={`Gallery ${i}`} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ServiceDetail = ({ type, lang }) => {
  const contentMap = {
    'doc': {
      title: content[lang].servicesMenu.doc,
      img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
      desc: lang === 'id' 
        ? "Kami menyediakan jasa dokumentasi foto dan video untuk berbagai acara, mulai dari pernikahan, ulang tahun, hingga acara perusahaan. Kami menangkap momen otentik dan mengubahnya menjadi kenangan abadi."
        : "We provide photo and video documentation services for various events, from weddings, birthdays, to corporate events. We capture authentic moments and turn them into lasting memories."
    },
    'multi': {
      title: content[lang].servicesMenu.multi,
      img: 'https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?auto=format&fit=crop&w=1200&q=80',
      desc: lang === 'id'
        ? "Tingkatkan produksi acara Anda dengan sistem Multicam kami. Sempurna untuk konser, konferensi, dan siaran langsung, memberikan berbagai sudut pandang yang dinamis dan profesional."
        : "Elevate your event production with our Multicam system. Perfect for concerts, conferences, and live broadcasts, providing dynamic and professional multiple viewing angles."
    },
    'stream': {
      title: content[lang].servicesMenu.stream,
      img: 'https://evio.id/wp-content/uploads/2025/01/SewaLEDSreenBali-BankMandiri-SewaSoundSystemBali-SewaLiveStreamingBali-SewaLiveVideoBali-EvioMultimedia.jpg',
      desc: lang === 'id'
        ? "Jangkau audiens global dengan solusi live streaming kami yang stabil dan berkualitas tinggi. Kami menangani seluruh kebutuhan teknis agar Anda bisa fokus pada konten acara."
        : "Reach a global audience with our stable and high-quality live streaming solutions. We handle all technical requirements so you can focus on the event content."
    }
  };

  const data = contentMap[type];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-neutral-950 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-widest">{data.title}</h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-6"></div>
        </div>
        
        <img src={data.img} alt={data.title} className="w-full rounded-2xl shadow-2xl mb-12 object-cover max-h-[500px]" />
        
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-neutral-300 leading-loose text-center md:text-left text-lg">
            {data.desc}
          </p>
        </div>
        
        <div className="mt-16 text-center">
           <a 
             href="https://wa.me/6289503141919" 
             target="_blank" 
             rel="noopener noreferrer"
             className="inline-block px-8 py-3 bg-amber-500 text-black font-bold tracking-wider uppercase text-sm rounded-full hover:bg-white hover:text-black transition-colors"
           >
              {lang === 'id' ? 'Pesan Sekarang' : 'Book Now'}
           </a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [lang, setLang] = useState('id'); 
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        // Kirim setCurrentPage ke komponen Home agar tombol portofolio bisa pindah halaman
        return <Home lang={lang} setPage={setCurrentPage} />;
      case 'about':
        return <About lang={lang} />;
      case 'portfolio':
        return <Portfolio lang={lang} searchQuery={searchQuery} />;
      case 'service-doc':
        return <ServiceDetail type="doc" lang={lang} />;
      case 'service-multi':
        return <ServiceDetail type="multi" lang={lang} />;
      case 'service-stream':
        return <ServiceDetail type="stream" lang={lang} />;
      default:
        return <Home lang={lang} setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 font-sans selection:bg-amber-500 selection:text-black relative">
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        setPage={setCurrentPage} 
        currentPage={currentPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main>
        {renderPage()}
      </main>

      <Footer lang={lang} />

      {/* FLOATING WHATSAPP BUTTON */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-black text-sm px-4 py-2 rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium">
          {lang === 'id' ? "Kamu butuh bantuan? Hubungi saya" : "Need help? Contact me"}
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white"></div>
        </div>
        
        <a
          href="https://wa.me/6289503141919"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform transform hover:scale-110 overflow-hidden"
        >
          <img src="/gambar wa.jpg" alt="WhatsApp" className="w-full h-full object-cover" />
        </a>
      </div>

    </div>
  );
}
