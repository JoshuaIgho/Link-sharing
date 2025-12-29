import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Link, ExternalLink, Zap, BarChart3, Palette, ArrowRight, Check, Star, Users, TrendingUp, Shield, Sparkles, Eye, MousePointerClick, Menu, X, Globe, Clock, Smartphone } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDemoLink, setActiveDemoLink] = useState(0);
  const [stats, setStats] = useState({ users: 0, links: 0, clicks: 0 });
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setStats({
        users: Math.floor(50000 * progress),
        links: Math.floor(250000 * progress),
        clicks: Math.floor(5000000 * progress)
      });
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const demoInterval = setInterval(() => {
      setActiveDemoLink(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(demoInterval);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      scrollPositionRef.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPositionRef.current);
    }
  }, [mobileMenuOpen]);

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: Link,
      title: 'Unlimited Links',
      description: 'Add as many links as you need. No artificial limits on your creativity.',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: Zap,
      title: 'Instant Setup',
      description: 'Launch your page in under 60 seconds. Zero coding or technical skills needed.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Palette,
      title: 'Custom Branding',
      description: 'Full design control with themes, colors, fonts, and custom domains.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Track clicks, views, and engagement with detailed real-time insights.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Perfect experience on any device. Fully responsive and lightning fast.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Globe,
      title: 'SEO Friendly',
      description: 'Optimized for search engines to help people discover your content.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: '99.9% uptime guarantee. Your links are always accessible and protected.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Clock,
      title: 'Schedule Links',
      description: 'Set links to appear or disappear at specific times automatically.',
      color: 'from-teal-500 to-green-500'
    },
  ];

  const demoLinks = [
    { title: 'My Latest YouTube Video', icon: '🎥', color: 'from-red-500 to-pink-500' },
    { title: 'Shop My Store', icon: '🛍️', color: 'from-primary-500 to-primary-700' },
    { title: 'Book a Consultation', icon: '📅', color: 'from-blue-500 to-cyan-500' },
    { title: 'Join My Newsletter', icon: '✉️', color: 'from-green-500 to-teal-500' },
  ];

  const testimonials = [
    {
      name: 'Emily Watson',
      role: 'Influencer',
      image: '👩‍🎨',
      content: 'Beautiful, fast, and easy to use. My followers love the clean design. Highly recommend!',
      rating: 5
    },
    {
      name: 'Lisa Thompson',
      role: 'Podcaster',
      image: '👩‍🎤',
      content: 'My listeners can now find all my episodes, sponsors, and social links in one place. Game changer!',
      rating: 5
    },
    {
      name: 'David Kim',
      role: 'Digital Marketer',
      image: '👨‍💼',
      content: 'Best link-in-bio tool I\'ve used. The customization options are endless and the support is amazing.',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'How long does it take to set up?',
      answer: 'You can have your LinkShare page live in under 60 seconds. Simply sign up, add your links, and customize your page.'
    },
    {
      question: 'Can I use my own domain?',
      answer: 'Yes! Pro users can connect their custom domain for a fully branded experience.'
    },
    {
      question: 'Is there a limit on the number of links?',
      answer: 'No limits! Add as many links as you need on both Free and Pro plans.'
    },
    {
      question: 'Can I track my link performance?',
      answer: 'Absolutely! Get detailed analytics on views, clicks, and engagement for all your links.'
    },
    {
      question: 'Is LinkShare mobile-friendly?',
      answer: 'Yes! All LinkShare pages are fully responsive and optimized for mobile devices.'
    },
   
  ];

  const useCases = [
    { icon: '🎨', title: 'Creators', description: 'Share your latest content, merch, and social profiles' },
    { icon: '💼', title: 'Entrepreneurs', description: 'Promote your services, products, and booking links' },
    { icon: '🎵', title: 'Musicians', description: 'Connect fans to your music, tour dates, and merch' },
    { icon: '📚', title: 'Educators', description: 'Share courses, resources, and student materials' },
    { icon: '🏋️', title: 'Coaches', description: 'Display programs, schedules, and client testimonials' },
    { icon: '📸', title: 'Photographers', description: 'Showcase portfolio, pricing, and booking info' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 overflow-hidden">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute top-40 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.15}px)`, animationDelay: '1s' }}
        />
        <div 
          className="absolute -bottom-8 left-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.05}px)`, animationDelay: '2s' }}
        />
      </div>

      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white shadow-lg' : 'bg-white shadow-lg'}`}>
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <RouterLink to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                <Link size={16} className="sm:w-5 sm:h-5 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                LinkShare
              </h1>
            </RouterLink>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                FAQ
              </button>
              <button 
                onClick={handleSignIn}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={handleGetStarted}
                className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 text-sm sm:text-base"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="lg:hidden fixed inset-0 bg-black/50 z-[60] animate-fade-in"
                onClick={() => setMobileMenuOpen(false)}
              />
              
              {/* Slide-in Menu */}
              <div className="lg:hidden fixed top-0 bottom-0 right-0 w-64 bg-white shadow-2xl z-[70] animate-slide-in-right">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b">
                    <span className="font-bold text-gray-900">Menu</span>
                    <button 
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  {/* Menu Items */}
                  <div className="flex-1 px-4 py-6 flex flex-col gap-1">
                      <a href="#features" className="py-3 px-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      Features
                    </a>
                    <a href="#testimonials" className="py-3 px-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      Testimonials
                    </a>
                    <a href="#faq" className="py-3 px-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      FAQ
                    </a>
                    <button 
                      onClick={handleSignIn}
                      className="py-3 px-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg font-medium text-left transition-colors"
                    >
                      Sign In
                    </button>
                  </div>
                  
                  {/* Bottom CTA */}
                  <div className="p-4 border-t">
                    <button 
                      onClick={handleGetStarted}
                      className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-12 sm:pb-20 text-center">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-100 text-primary-700 rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8 animate-bounce">
            <Sparkles size={14} className="sm:w-4 sm:h-4" />
            <span>Trusted by 50,000+ creators worldwide</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
            One Link for
            <br />
            <span className="bg-gradient-to-r from-primary-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Everything You Are
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4">
            The ultimate link-in-bio tool for creators, entrepreneurs, and brands. 
            Beautiful, fast, and built to convert.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-4">
            <button 
              onClick={handleGetStarted}
              className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold text-base sm:text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Start Free Today
              <ArrowRight size={18} className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600 px-4">
            <div className="flex items-center gap-2">
              <Check size={14} className="sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
              <span>Setup in 60 seconds</span>
            </div>
          </div>
        </div>

        {/* Interactive Demo Preview */}
        <div className="mt-12 sm:mt-20 max-w-5xl mx-auto relative z-10 px-4">
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-blue-500/10 to-cyan-500/10 animate-pulse" />
            
            <div className="relative">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 bg-gray-100 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white rounded-md sm:rounded-lg px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 flex items-center gap-1 sm:gap-2 shadow-sm">
                  <ExternalLink size={12} className="sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                  <span className="font-mono truncate">linkshare.app/yourname</span>
                </div>
              </div>

              {/* Profile Section */}
              <div className="mb-6 sm:mb-8 flex flex-col items-center">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full mb-3 sm:mb-4 flex items-center justify-center text-2xl sm:text-4xl shadow-lg">
                  👋
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Your Name</h3>
                <p className="text-sm sm:text-base text-gray-600">Creator • Entrepreneur • Dreamer</p>
              </div>

              {/* Demo Links */}
              <div className="space-y-2 sm:space-y-3">
                {demoLinks.map((link, index) => (
                  <div
                    key={index}
                    className={`relative bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-md border-2 transition-all duration-500 cursor-pointer group ${
                      activeDemoLink === index
                        ? 'border-primary-500 scale-105 shadow-xl'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${link.color} rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-lg flex-shrink-0`}>
                        {link.icon}
                      </div>
                      <span className="flex-1 text-sm sm:text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors truncate">
                        {link.title}
                      </span>
                      <ArrowRight 
                        size={16}
                        className={`sm:w-5 sm:h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0 ${
                          activeDemoLink === index ? 'text-primary-600' : ''
                        }`}
                      />
                    </div>
                    {activeDemoLink === index && (
                      <div className="absolute -right-1 -top-1 sm:-right-2 sm:-top-2">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <MousePointerClick size={10} className="sm:w-3 sm:h-3 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Stats Preview */}
              <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                  <Eye size={18} className="sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-blue-600" />
                  <div className="text-lg sm:text-2xl font-bold text-gray-900">1.2K</div>
                  <div className="text-xs sm:text-sm text-gray-600">Views</div>
                </div>
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                  <MousePointerClick size={18} className="sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-primary-600" />
                  <div className="text-lg sm:text-2xl font-bold text-gray-900">847</div>
                  <div className="text-xs sm:text-sm text-gray-600">Clicks</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                  <TrendingUp size={18} className="sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-green-600" />
                  <div className="text-lg sm:text-2xl font-bold text-gray-900">68%</div>
                  <div className="text-xs sm:text-sm text-gray-600">CTR</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-100 text-primary-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            Perfect For
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3 sm:mb-4 px-4">
            Built for Everyone
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            No matter your profession, LinkShare helps you connect with your audience.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center border border-gray-100 hover:scale-105"
            >
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{useCase.icon}</div>
              <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">{useCase.title}</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{useCase.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-100 text-primary-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            Features
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3 sm:mb-4 px-4">
            Everything You Need to Succeed
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Powerful tools designed to help you grow your audience and maximize engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                <feature.icon size={24} className="sm:w-7 sm:h-7 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                {feature.title}
              </h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-6 py-20 bg-gradient-to-b from-primary-50 to-white rounded-3xl">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
            Testimonials
          </div>
          <h3 className="text-5xl font-black text-gray-900 mb-4">
            Loved by Creators Worldwide
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who've transformed their online presence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (<div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="text-4xl">{testimonial.image}</div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
  {/* FAQ Section */}
  <section id="faq" className="container mx-auto px-6 py-20">
    <div className="text-center mb-16">
      <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
        FAQ
      </div>
      <h3 className="text-5xl font-black text-gray-900 mb-4">
        Frequently Asked Questions
      </h3>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Everything you need to know about LinkShare
      </p>
    </div>

    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
        >
          <h4 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h4>
          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
        </div>
      ))}
    </div>
  </section>

  {/* Final CTA */}
  <section className="container mx-auto px-6 py-20">
    <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-900 via-primary-900 to-blue-900 rounded-3xl p-16 text-center text-white shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-blue-600/20 animate-pulse" />
      <div className="relative z-10">
        <h3 className="text-5xl font-black mb-6">
          Ready to Stand Out?
        </h3>
        <p className="text-2xl mb-10 text-primary-100">
          Join 50,000+ creators who've already transformed their online presence
        </p>
        <button 
          onClick={handleGetStarted}
          className="px-12 py-5 bg-white text-gray-900 rounded-xl font-black text-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
        >
          Create Your Free Account
        </button>
        <p className="mt-6 text-primary-200">No credit card required • Setup in 60 seconds</p>
      </div>
    </div>
  </section>

  
</div>
);
};
export default Landing;