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
} from "lucide-react";

const LostFoundHomepage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("lost");
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);

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

  const MagneticButton = ({ children, className = "" }) => {
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
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        {children}
      </button>
    );
  };

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

      <nav className="relative z-20 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-md bg-white/5 rounded-2xl p-4 border border-white/10">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-white">CampusFind</h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
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
            <MagneticButton className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 relative overflow-hidden group">
              <span className="relative z-10">Sign In</span>
            </MagneticButton>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24">
        <div className="text-center">
          {/* Hero Title with individual parallax elements */}
          <div className="mb-8">
            <ParallaxElement speed={-0.05}>
              <h2 className="text-7xl md:text-8xl font-black mb-4 leading-none tracking-tight">
                <span className="inline-block">Never</span>{" "}
                <span className="inline-block text-blue-400">Lose</span>
              </h2>
            </ParallaxElement>
            <ParallaxElement speed={-0.08}>
              <h2 className="text-7xl md:text-8xl font-black leading-none tracking-tight">
                <span className="inline-block relative">
                  Anything
                  <ParallaxElement
                    speed={0.2}
                    className="absolute -top-2 -right-2"
                  >
                    <Sparkles className="w-8 h-8 text-yellow-400" />
                  </ParallaxElement>
                </span>{" "}
                <span className="inline-block text-purple-400">Again</span>
              </h2>
            </ParallaxElement>
          </div>

          <ParallaxElement speed={-0.02}>
            <div className="mb-12">
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Revolutionary AI-powered platform connecting college
                communities.
                <span className="text-blue-400 font-semibold">
                  {" "}
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

          {/* Interactive Search Bar with parallax */}
          <ParallaxElement speed={0.02}>
            <div className="max-w-3xl mx-auto mb-16">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />

                <div className="relative flex bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-3 group-hover:border-gray-600/50 transition-all duration-300">
                  <input
                    type="text"
                    placeholder="🔍 Search for lost items... (iPhone, backpack, keys)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent px-6 py-5 text-white placeholder-gray-400 outline-none text-lg"
                  />
                  <MagneticButton className="bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-5 rounded-2xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-3 group relative overflow-hidden">
                    <Search className="w-5 h-5 z-10" />
                    <span className="z-10">Search</span>
                    <ArrowRight className="w-5 h-5 z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  </MagneticButton>
                </div>
              </div>
            </div>
          </ParallaxElement>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <MagneticButton className="group bg-gradient-to-r from-red-600 to-red-500 px-10 py-6 rounded-3xl font-bold text-lg hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-500 flex items-center justify-center space-x-4 relative overflow-hidden">
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 z-10">
                <Search className="w-5 h-5" />
              </div>
              <span className="z-10">Report Lost Item</span>
            </MagneticButton>

            <MagneticButton className="group bg-gradient-to-r from-emerald-600 to-emerald-500 px-10 py-6 rounded-3xl font-bold text-lg hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 flex items-center justify-center space-x-4 relative overflow-hidden">
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 z-10">
                <Plus className="w-5 h-5" />
              </div>
              <span className="z-10">Report Found Item</span>
            </MagneticButton>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <div key={index} className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
              <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 text-center group-hover:border-gray-600/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-gradient-to-r from-gray-700 to-gray-600">
                  <stat.icon className="w-8 h-8 text-white z-10" />
                </div>
                <div className="text-4xl font-black mb-2 text-white">
                  {stat.count}
                </div>
                <div className="text-sm text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-5xl font-black mb-4 text-white">
              Live Activity
            </h3>
            <p className="text-xl text-gray-400">
              Real-time updates from your campus community
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-800/40 backdrop-blur-xl rounded-3xl p-2 border border-gray-700/50">
              {["lost", "found"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 relative overflow-hidden ${
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
                      } rounded-2xl`}
                    />
                  )}
                  <span className="relative z-10 capitalize">{tab} Items</span>
                </button>
              ))}
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {recentItems
              .filter((item) => activeTab === "all" || item.type === activeTab)
              .map((item, index) => (
                <div key={item.id} className="relative group cursor-pointer">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                  <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 group-hover:border-gray-600/50 transition-all duration-300 group-hover:transform group-hover:scale-105 group-hover:-translate-y-2">
                    {/* Priority indicator */}
                    <div
                      className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
                        item.priority === "urgent"
                          ? "bg-red-500 animate-pulse"
                          : item.priority === "high"
                          ? "bg-yellow-500"
                          : item.priority === "medium"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                    />
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                        {item.image}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-lg mb-1">
                          {item.item}
                        </h4>
                        <div
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                            item.type === "lost"
                              ? "bg-red-500/20 text-red-400 border border-red-500/30"
                              : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          }`}
                        >
                          {item.type}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-gray-400 mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-gray-300" />
                        </div>
                        <span className="font-medium">{item.location}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
                          <Clock className="w-4 h-4 text-gray-300" />
                        </div>
                        <span className="font-medium">{item.time}</span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <MagneticButton className="flex-1 bg-gray-700/50 hover:bg-gray-600/50 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center space-x-2 group/btn">
                        <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                        <span>View</span>
                      </MagneticButton>
                      <MagneticButton className="flex-1 bg-blue-600/30 hover:bg-blue-600/50 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center space-x-2 group/btn border border-blue-500/30">
                        <MessageCircle className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                        <span>Contact</span>
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Features */}
        <div className="text-center mb-20">
          <h3 className="text-5xl font-black mb-6 text-white">
            Why CampusFind?
          </h3>
          <p className="text-xl text-gray-400 mb-16">
            Experience the future of campus lost & found
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "AI-powered matching connects you with your items in minutes, not days.",
              },
              {
                icon: Shield,
                title: "Secure & Private",
                desc: "Your personal information is protected with end-to-end encryption.",
              },
              {
                icon: Users,
                title: "Community Driven",
                desc: "Built by students, for students. Join thousands helping each other.",
              },
            ].map((feature, index) => (
              <div key={index} className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-10 text-center group-hover:border-gray-600/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <div className="w-20 h-20 bg-gradient-to-r from-gray-700 to-gray-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold mb-4 text-white">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer with final parallax layer */}
      <ParallaxElement speed={0.2}>
        <footer className="relative z-10 border-t border-gray-800/50 mt-24 py-16 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-black text-white">CampusFind</span>
            </div>
            <p className="text-gray-400 mb-8 text-lg">
              Reuniting students with their belongings, one find at a time
            </p>
            <div className="flex justify-center space-x-8 text-sm">
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

            <div className="mt-12 pt-8 border-t border-gray-800/50">
              <p className="text-gray-500 text-sm">
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
