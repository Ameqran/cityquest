import React from 'react';
import { MapPin, Trophy, Gift, Star, Users, Camera, Utensils, Landmark, CheckCircle, Lock } from 'lucide-react';

export default function CityQuestWebsite() {

  const missions = [
    {
      id: 1,
      title: "Hidden Café Discovery",
      description: "Find and visit the century-old café in the Old Quarter",
      category: "food",
      points: 150,
      difficulty: "easy",
      icon: Utensils,
      status: "completed"
    },
    {
      id: 2,
      title: "Street Art Safari",
      description: "Take photos of 5 different street murals in the Arts District",
      category: "culture",
      points: 200,
      difficulty: "medium",
      icon: Camera,
      status: "active"
    },
    {
      id: 3,
      title: "Sunset at the Monument",
      description: "Visit the historic monument and snap a sunset photo",
      category: "adventure",
      points: 250,
      difficulty: "medium",
      icon: Landmark,
      status: "active"
    },
    {
      id: 4,
      title: "Local Market Challenge",
      description: "Chat with 3 vendors and taste 2 local specialties",
      category: "food",
      points: 300,
      difficulty: "hard",
      icon: Star,
      status: "locked"
    }
  ];

  const partners = [
    { name: "Aroma Boutique", category: "Perfumes", discount: "20% off" },
    { name: "Heritage Crafts", category: "Souvenirs", discount: "Buy 2 Get 1" },
    { name: "Photo Memories", category: "Photography", discount: "15% off" },
    { name: "Artisan Gifts", category: "Local Crafts", discount: "500 pts = $10" }
  ];

  const stats = [
    { label: "Active Users", value: "50K+", icon: Users },
    { label: "Cities", value: "25", icon: MapPin },
    { label: "Missions Created", value: "1,200+", icon: Trophy },
    { label: "Partner Shops", value: "500+", icon: Gift }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                CityQuest
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-purple-600 transition">Features</a>
              <a href="#missions" className="text-gray-700 hover:text-purple-600 transition">Missions</a>
              <a href="#partners" className="text-gray-700 hover:text-purple-600 transition">Partners</a>
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition">
                Download App
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Turn Your Journey Into an
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Epic Adventure</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Complete daily missions, explore hidden gems, earn points, and unlock exclusive rewards from local partners. Tourism has never been this exciting!
            </p>
            <div className="flex space-x-4">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition transform hover:scale-105">
                Start Your Quest
              </button>
              <button className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-purple-50 transition">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-400 to-blue-500 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition duration-300">
              <div className="bg-white rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-gray-500">Today&apos;s Mission</span>
                  <Trophy className="w-6 h-6 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Street Art Safari</h3>
                <p className="text-gray-600 mb-4">Find 5 murals in Arts District</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-bold text-purple-600">200 points</span>
                  </div>
                  <span className="text-sm text-gray-500">3/5 completed</span>
                </div>
                <div className="mt-4 bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full" style={{width: '60%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Missions Showcase */}
      <section id="missions" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Daily Missions</h2>
          <p className="text-xl text-gray-600">Complete challenges, explore the city, earn rewards</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {missions.map((mission) => {
            const Icon = mission.icon;
            return (
              <div
                key={mission.id}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:scale-105 ${
                  mission.status === 'locked' ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${
                    mission.status === 'completed' ? 'bg-green-100' :
                    mission.status === 'active' ? 'bg-purple-100' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      mission.status === 'completed' ? 'text-green-600' :
                      mission.status === 'active' ? 'text-purple-600' : 'text-gray-400'
                    }`} />
                  </div>
                  {mission.status === 'completed' && <CheckCircle className="w-6 h-6 text-green-600" />}
                  {mission.status === 'locked' && <Lock className="w-6 h-6 text-gray-400" />}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{mission.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{mission.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    mission.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                    mission.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {mission.difficulty}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-bold text-purple-600">{mission.points}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Exclusive Partner Rewards</h2>
            <p className="text-xl text-purple-100">Redeem your points at amazing local businesses</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition transform hover:scale-105">
                <Gift className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{partner.name}</h3>
                <p className="text-gray-600 mb-3">{partner.category}</p>
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-3">
                  <p className="text-purple-700 font-bold text-center">{partner.discount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Start earning rewards in three simple steps</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Choose Your Mission</h3>
            <p className="text-gray-600">Browse daily missions tailored to your interests and difficulty level</p>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Complete & Explore</h3>
            <p className="text-gray-600">Follow the quest, discover hidden gems, and collect proof of completion</p>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Earn & Redeem</h3>
            <p className="text-gray-600">Collect points and redeem exclusive rewards at partner locations</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-purple-900 to-blue-900 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Travel?</h2>
          <p className="text-xl text-purple-200 mb-8">
            Join thousands of explorers making every trip an unforgettable adventure
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:shadow-2xl transition transform hover:scale-105">
              Download for iOS
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-purple-600 transition">
              Download for Android
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="w-6 h-6 text-purple-400" />
                <span className="text-xl font-bold text-white">CityQuest</span>
              </div>
              <p className="text-sm">Making tourism an epic adventure, one mission at a time.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Missions</a></li>
                <li><a href="#" className="hover:text-white transition">Partners</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 CityQuest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
