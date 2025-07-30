import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Plus,
  MessageCircle,
  Eye,
  MapPin,
  Clock,
  User,
  Star,
  Zap,
  Shield,
  Users,
  ArrowRight,
  Heart,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfileDropdown from "./components/ProfileDropdown";
import authService from "./services/authService";

const LostFoundHomepage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("lost");
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState("home"); // "home", "login", "signup"
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);

    // Check for existing user session
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const recentItems = [
    {
      id: 1,
      type: "lost",
      item: "iPhone 13 Pro",
      location: "Library 2nd Floor",
      time: "2 hours ago",
      image: "📱",
      priority: "high",
    },
    {
      id: 2,
      type: "found",
      item: "Blue Backpack",
      location: "Cafeteria",
      time: "4 hours ago",
      image: "🎒",
      priority: "medium",
    },
    {
      id: 3,
      type: "lost",
      item: "Car Keys",
      location: "Parking Lot B",
      time: "6 hours ago",
      image: "🔑",
      priority: "urgent",
    },
    {
      id: 4,
      type: "found",
      item: "Textbook - Physics",
      location: "Room 204",
      time: "1 day ago",
      image: "📚",
      priority: "low",
    },
  ];

  const stats = [
    { icon: Users, count: "2,847", label: "Active Students" },
    { icon: Search, count: "1,234", label: "Items Recovered" },
    { icon: Zap, count: "89%", label: "Success Rate" },
    { icon: Shield, count: "24/7", label: "Support" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const floatingVariants = {
    float: {
      y: [0, -20, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const ParallaxElement = ({ children, speed = 0.5, className = "" }) => (
    <div className={className}>{children}</div>
  );

  const MagneticButton = ({ children, className = "", onClick, ...props }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const buttonRef = useRef(null);

    const handleMouseMove = (e) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.1;
      const deltaY = (e.clientY - centerY) * 0.1;
      setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    return (
      <button
        ref={buttonRef}
        className={className}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: "transform 0.2s ease-out",
        }}
        {...props}
      >
        {children}
      </button>
    );
  };

  // Authentication handlers
  const handleGoToLogin = () => {
    setCurrentPage("login");
    setIsMobileMenuOpen(false);
  };

  const handleGoToSignup = () => {
    setCurrentPage("signup");
    setIsMobileMenuOpen(false);
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
  };

  const handleLoginSuccess = () => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    setCurrentPage("home");
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setCurrentPage("home");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Render different pages based on current page state
  if (currentPage === "login") {
    return (
      <LoginPage
        onBack={handleBackToHome}
        onSwitchToSignup={handleGoToSignup}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  if (currentPage === "signup") {
    return (
      <SignupPage
        onBack={handleBackToHome}
        onSwitchToLogin={handleGoToLogin}
        onSignupSuccess={handleLoginSuccess}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gray-950 text-white overflow-hidden relative"
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />

        <ParallaxElement speed={0.1} className="absolute">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        </ParallaxElement>
        <ParallaxElement speed={-0.2} className="absolute">
          <div className="absolute bottom-40 right-32 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl" />
        </ParallaxElement>
        <ParallaxElement speed={0.15} className="absolute">
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gray-600/6 rounded-full blur-3xl" />
        </ParallaxElement>

        <ParallaxElement
          speed={0.05}
          className="absolute inset-0 opacity-[0.02]"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          />
        </ParallaxElement>
      </div>

      <nav className="relative z-20 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-md bg-white/5 rounded-2xl p-3 sm:p-4 border border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white z-10" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              CampusFind
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {["How it Works", "Community", "Contact"].map((item, index) => (
              <a
                key={item}
                href="#"
                className="relative text-gray-300 hover:text-white transition-colors duration-300 group"
              >
                {item}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}

            {/* Show Profile Dropdown when logged in, otherwise show Sign In button */}
            {currentUser ? (
              <ProfileDropdown user={currentUser} onLogout={handleLogout} />
            ) : (
              <MagneticButton
                onClick={handleGoToLogin}
                className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 py-2 rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Sign In</span>
              </MagneticButton>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 z-30">
            <div className="flex flex-col space-y-4">
              {["How it Works", "Community", "Contact"].map((item, index) => (
                <a
                  key={item}
                  href="#"
                  onClick={closeMobileMenu}
                  className="text-gray-300 hover:text-white transition-colors duration-300 py-2"
                >
                  {item}
                </a>
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-700/50">
                {/* Show Profile info and logout when logged in, otherwise show Sign In/Up buttons */}
                {currentUser ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {currentUser.fullName
                          .split(" ")
                          .map((word) => word.charAt(0))
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {currentUser.fullName}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {currentUser.email}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="bg-red-600/20 border border-red-500/30 hover:bg-red-600/30 px-6 py-3 rounded-full text-red-300 font-semibold transition-all duration-300 w-full"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={handleGoToLogin}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={handleGoToSignup}
                      className="bg-gray-700/50 hover:bg-gray-600/50 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-16 pb-10">
        <div className="text-center">
          {/* Hero Title with individual parallax elements */}
          <div className="mb-6 sm:mb-8">
            <ParallaxElement speed={-0.05}>
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-2 sm:mb-4 leading-none tracking-tight">
                <span className="inline-block">Never</span>{" "}
                <span className="inline-block text-blue-400">Lose</span>
              </h2>
            </ParallaxElement>
            <ParallaxElement speed={-0.08}>
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight">
                <span className="inline-block relative">
                  Anything
                  <ParallaxElement
                    speed={0.2}
                    className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2"
                  >
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                  </ParallaxElement>
                </span>{" "}
                <span className="inline-block text-purple-400">Again</span>
              </h2>
            </ParallaxElement>
          </div>

          <ParallaxElement speed={-0.02}>
            <div className="mb-8 sm:mb-12">
              <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
                <span className="text-blue-400 font-semibold">
                  Smart matching
                </span>
                ,
                <span className="text-purple-400 font-semibold">
                  {" "}
                  instant notifications
                </span>
                , and
                <span className="text-gray-200 font-semibold">
                  {" "}
                  secure messaging
                </span>{" "}
                - reuniting students with their belongings in record time.
              </p>
            </div>
          </ParallaxElement>

          <ParallaxElement speed={0.02}>
            <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />

                <div className="relative flex flex-col sm:flex-row bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-3 group-hover:border-gray-600/50 transition-all duration-300 gap-3 sm:gap-0">
                  <input
                    type="text"
                    placeholder="🔍 Search for lost items... (backpack, keys)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent px-4 sm:px-6 py-4 sm:py-5 text-white placeholder-gray-400 outline-none text-base sm:text-lg"
                  />
                  <MagneticButton className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-3 group relative overflow-hidden">
                    <Search className="w-5 h-5 z-10" />
                    <span className="z-10">Search</span>
                    <ArrowRight className="w-5 h-5 z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  </MagneticButton>
                </div>
              </div>
            </div>
          </ParallaxElement>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16 sm:mb-20 px-4">
            <MagneticButton
              onClick={currentUser ? () => {} : handleGoToSignup} // If logged in, handle action; otherwise go to signup
              className="group bg-gradient-to-r from-red-600 to-red-500 px-6 sm:px-10 py-4 sm:py-6 rounded-3xl font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-500 flex items-center justify-center space-x-4 relative overflow-hidden"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-2xl flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 z-10">
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="z-10">Report Lost Item</span>
            </MagneticButton>

            <MagneticButton
              onClick={currentUser ? () => {} : handleGoToSignup} // If logged in, handle action; otherwise go to signup
              className="group bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 sm:px-10 py-4 sm:py-6 rounded-3xl font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 flex items-center justify-center space-x-4 relative overflow-hidden"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-2xl flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 z-10">
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="z-10">Report Found Item</span>
            </MagneticButton>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-16 sm:mb-24 px-4">
          {stats.map((stat, index) => (
            <div key={index} className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
              <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center group-hover:border-gray-600/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl flex items-center justify-center bg-gradient-to-r from-gray-700 to-gray-600">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white z-10" />
                </div>
                <div className="text-2xl sm:text-4xl font-black mb-1 sm:mb-2 text-white">
                  {stat.count}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mb-16 sm:mb-20 px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 text-white">
              Live Activity
            </h3>
            <p className="text-lg sm:text-xl text-gray-400">
              Real-time updates from your campus community
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-2 border border-gray-700/50 w-full max-w-md">
              <div className="grid grid-cols-2">
                {["lost", "found"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg transition-all duration-500 relative overflow-hidden ${
                      activeTab === tab
                        ? "text-white shadow-xl"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {activeTab === tab && (
                      <div
                        className={`absolute inset-0 ${
                          tab === "lost"
                            ? "bg-gradient-to-r from-red-600 to-red-500"
                            : "bg-gradient-to-r from-emerald-600 to-emerald-500"
                        } rounded-xl sm:rounded-2xl`}
                      />
                    )}
                    <span className="relative z-10 capitalize">
                      {tab} Items
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-8">
            {recentItems
              .filter((item) => activeTab === "all" || item.type === activeTab)
              .map((item, index) => (
                <div key={item.id} className="relative group cursor-pointer">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl sm:rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                  <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 group-hover:border-gray-600/50 transition-all duration-300 group-hover:transform group-hover:scale-105 group-hover:-translate-y-2">
                    {/* Priority indicator */}
                    <div
                      className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
                        item.priority === "urgent"
                          ? "bg-red-500 animate-pulse"
                          : item.priority === "high"
                          ? "bg-yellow-500"
                          : item.priority === "medium"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                    />
                    <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                      <div className="text-3xl sm:text-5xl group-hover:scale-110 transition-transform duration-300">
                        {item.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-base sm:text-lg mb-1 truncate">
                          {item.item}
                        </h4>
                        <div
                          className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                            item.type === "lost"
                              ? "bg-red-500/20 text-red-400 border border-red-500/30"
                              : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          }`}
                        >
                          {item.type}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
                        </div>
                        <span className="font-medium truncate">
                          {item.location}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
                        </div>
                        <span className="font-medium">{item.time}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2 sm:space-x-3">
                      <MagneticButton className="flex-1 bg-gray-700/50 hover:bg-gray-600/50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center space-x-1 sm:space-x-2 group/btn">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                        <span>View</span>
                      </MagneticButton>
                      <MagneticButton className="flex-1 bg-blue-600/30 hover:bg-blue-600/50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center space-x-1 sm:space-x-2 group/btn border border-blue-500/30">
                        <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                        <span>Contact</span>
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Features */}
        <div className="text-center mb-16 sm:mb-20 px-4">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-white">
            Why CampusFind?
          </h3>
          <p className="text-lg sm:text-xl text-gray-400 mb-12 sm:mb-16">
            Experience the future of campus lost & found
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {[
              {
                icon: Zap,
                title: "Quick Results",
                desc: "Most items are reunited within 24 hours. Get notifications when someone finds your stuff.",
              },
              {
                icon: Shield,
                title: "Safe & Trusted",
                desc: "Your contact info stays private until you decide to connect with someone.",
              },
              {
                icon: Users,
                title: "Campus Community",
                desc: "Connect with fellow students who actually care about helping each other out.",
              },
            ].map((feature, index) => (
              <div key={index} className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl sm:rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center group-hover:border-gray-600/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-gray-700 to-gray-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                    <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">
                    {feature.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ParallaxElement speed={0.2}>
        <footer className="relative z-10 border-t border-gray-800/50 mt-5 py-12 sm:py-16 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-white">
                CampusFind
              </span>
            </div>
            <p className="text-gray-400 mb-6 sm:mb-8 text-base sm:text-lg">
              Reuniting students with their belongings, one find at a time
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm mb-8 sm:mb-12">
              {["Privacy Policy", "Terms of Service", "Support", "About"].map(
                (link, index) => (
                  <a
                    key={link}
                    href="#"
                    className="text-gray-400 hover:text-white transition-all duration-300 relative group"
                  >
                    {link}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                  </a>
                )
              )}
            </div>

            <div className="pt-6 sm:pt-8 border-t border-gray-800/50">
              <p className="text-gray-500 text-xs sm:text-sm">
                © 2024 CampusFind. Made by students, for students.
              </p>
            </div>
          </div>
        </footer>
      </ParallaxElement>
    </div>
  );
};

export default LostFoundHomepage;
