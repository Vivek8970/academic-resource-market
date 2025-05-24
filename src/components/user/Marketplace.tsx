
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Star, 
  Download, 
  BookOpen,
  FileText,
  Presentation,
  Briefcase,
  SortAsc
} from "lucide-react";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("recent");

  const listings = [
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
      description: "Comprehensive calculus notes covering all topics from limits to integration",
      uploadDate: "2024-01-15"
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
      description: "Latest edition psychology textbook in excellent condition",
      uploadDate: "2024-01-14"
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
      description: "Professional ML presentations for algorithms and neural networks",
      uploadDate: "2024-01-13"
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
      description: "Full-stack web application with React and Node.js",
      uploadDate: "2024-01-12"
    },
    {
      id: 5,
      title: "Organic Chemistry Lab Manual",
      category: "Textbooks",
      price: 20.00,
      rating: 4.5,
      downloads: 92,
      image: "/placeholder.svg",
      seller: "Michael R.",
      university: "CalTech",
      description: "Complete lab manual with procedures and safety guidelines",
      uploadDate: "2024-01-11"
    },
    {
      id: 6,
      title: "Data Structures Study Guide",
      category: "Notes",
      price: 15.00,
      rating: 4.7,
      downloads: 203,
      image: "/placeholder.svg",
      seller: "Lisa K.",
      university: "CMU",
      description: "Detailed study guide covering all major data structures",
      uploadDate: "2024-01-10"
    }
  ];

  const categories = [
    { value: "all", label: "All Categories", icon: Grid3X3 },
    { value: "textbooks", label: "Textbooks", icon: BookOpen },
    { value: "notes", label: "Notes", icon: FileText },
    { value: "presentations", label: "Presentations", icon: Presentation },
    { value: "projects", label: "Projects", icon: Briefcase }
  ];

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           listing.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Educational Marketplace</h1>
            <p className="text-lg text-slate-600">Find the perfect study materials for your academic journey</p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search for textbooks, notes, presentations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>
            
            <div className="flex gap-4 items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 h-12">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center space-x-2">
                        <category.icon className="h-4 w-4" />
                        <span>{category.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 h-12">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border border-slate-200 rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-slate-800">
            {filteredListings.length} Results Found
          </h2>
          <div className="flex items-center space-x-2 text-slate-600">
            <SortAsc className="h-4 w-4" />
            <span>Sorted by {sortBy}</span>
          </div>
        </div>

        {/* Listings Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        }`}>
          {filteredListings.map((listing) => (
            <Link key={listing.id} to={`/product/${listing.id}`}>
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <div className="relative">
                  <img 
                    src={listing.image} 
                    alt={listing.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-3 left-3 bg-blue-600">
                    {listing.category}
                  </Badge>
                  <div className="absolute top-3 right-3 flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs font-medium">{listing.rating}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {listing.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">{listing.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-blue-600">${listing.price}</span>
                    <div className="flex items-center space-x-1 text-slate-500">
                      <Download className="h-4 w-4" />
                      <span className="text-sm">{listing.downloads}</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-slate-600 border-t pt-2">
                    <p>by {listing.seller}</p>
                    <p>{listing.university}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No results found</h3>
            <p className="text-slate-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
