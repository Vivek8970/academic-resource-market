
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  FileText, 
  Presentation, 
  Briefcase,
  Search,
  TrendingUp,
  Star,
  Download,
  Users,
  ArrowRight,
  Play
} from "lucide-react";

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredListings = [
    {
      id: 1,
      title: "Advanced Calculus - Complete Notes Package",
      category: "Notes",
      price: 25.00,
      rating: 4.8,
      downloads: 156,
      image: "/placeholder.svg",
      seller: "Sarah M.",
      university: "MIT",
      badge: "Best Seller"
    },
    {
      id: 2,
      title: "Introduction to Psychology Textbook",
      category: "Textbooks",
      price: 45.00,
      rating: 4.9,
      downloads: 89,
      image: "/placeholder.svg",
      seller: "Dr. Johnson",
      university: "Harvard",
      badge: "Featured"
    },
    {
      id: 3,
      title: "Machine Learning Presentation Set",
      category: "Presentations",
      price: 30.00,
      rating: 4.7,
      downloads: 134,
      image: "/placeholder.svg",
      seller: "Alex Chen",
      university: "Stanford",
      badge: "New"
    },
    {
      id: 4,
      title: "Web Development Final Project",
      category: "Projects",
      price: 35.00,
      rating: 4.6,
      downloads: 67,
      image: "/placeholder.svg",
      seller: "Emma Davis",
      university: "Berkeley",
      badge: "Popular"
    }
  ];

  const categories = [
    {
      name: "Textbooks",
      icon: BookOpen,
      count: "2,847",
      color: "bg-blue-500",
      description: "Academic textbooks and reference materials"
    },
    {
      name: "Notes",
      icon: FileText,
      count: "1,234",
      color: "bg-green-500",
      description: "Class notes and study guides"
    },
    {
      name: "Presentations",
      icon: Presentation,
      count: "892",
      color: "bg-purple-500",
      description: "PowerPoint slides and presentations"
    },
    {
      name: "Projects",
      icon: Briefcase,
      count: "456",
      color: "bg-orange-500",
      description: "Academic projects and assignments"
    }
  ];

  const stats = [
    { label: "Active Students", value: "10,000+", icon: Users },
    { label: "Materials Available", value: "50,000+", icon: BookOpen },
    { label: "Universities", value: "500+", icon: TrendingUp },
    { label: "Downloads", value: "1M+", icon: Download }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
              Your Academic 
              <span className="text-blue-600"> Marketplace</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Buy and sell educational materials including textbooks, notes, presentations, and projects. 
              Connect with students from top universities worldwide.
            </p>
            
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search for textbooks, notes, presentations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg rounded-xl shadow-lg border-0"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                  Search
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/marketplace">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4 rounded-xl animate-scale-in">
                  Explore Marketplace
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/upload">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 rounded-xl border-2 hover:bg-blue-50">
                  Start Selling
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Browse by Category</h2>
            <p className="text-lg text-slate-600">Find exactly what you need for your studies</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} to={`/marketplace?category=${category.name.toLowerCase()}`}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${category.color} rounded-full mb-4 group-hover:scale-110 transition-transform`}>
                      <category.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">{category.name}</h3>
                    <p className="text-slate-600 text-sm mb-3">{category.description}</p>
                    <Badge variant="secondary" className="text-blue-600 bg-blue-50">
                      {category.count} items
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Featured Materials</h2>
              <p className="text-lg text-slate-600">Top-rated content from verified sellers</p>
            </div>
            <Link to="/marketplace">
              <Button variant="outline" className="hover:bg-blue-50">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredListings.map((listing, index) => (
              <Link key={listing.id} to={`/product/${listing.id}`}>
                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
                  <div className="relative">
                    <img 
                      src={listing.image} 
                      alt={listing.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className={`absolute top-3 left-3 ${
                      listing.badge === 'Best Seller' ? 'bg-orange-500' :
                      listing.badge === 'Featured' ? 'bg-purple-500' :
                      listing.badge === 'New' ? 'bg-green-500' : 'bg-blue-500'
                    }`}>
                      {listing.badge}
                    </Badge>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-t-lg flex items-center justify-center">
                      <Play className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {listing.category}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-slate-600">{listing.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {listing.title}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-blue-600">${listing.price}</span>
                      <div className="flex items-center space-x-1 text-slate-500">
                        <Download className="h-4 w-4" />
                        <span className="text-sm">{listing.downloads}</span>
                      </div>
                    </div>
                    <div className="text-sm text-slate-600">
                      <p>by {listing.seller}</p>
                      <p>{listing.university}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Selling?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Turn your academic materials into income. Join thousands of students already earning on EduMarket.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/upload">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4">
                Upload Your First Material
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
