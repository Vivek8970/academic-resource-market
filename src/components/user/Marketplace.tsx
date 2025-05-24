
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Grid3X3, 
  List, 
  Star, 
  Download, 
  BookOpen,
  FileText,
  Presentation,
  Briefcase,
  SortAsc,
  Heart,
  ShoppingCart,
  User,
  School
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Marketplace = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("recent");
  const [listings, setListings] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);

  useEffect(() => {
    checkUser();
    fetchCategories();
    fetchListings();
    loadUserPreferences();
  }, []);

  useEffect(() => {
    fetchListings();
  }, [selectedCategory, sortBy]);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setUser(session.user);
    }
  };

  const loadUserPreferences = () => {
    const savedWishlist = localStorage.getItem('wishlist');
    const savedCart = localStorage.getItem('cart');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedCart) setCart(JSON.parse(savedCart));
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      setCategories(data || []);
    }
  };

  const fetchListings = async () => {
    setLoading(true);
    let query = supabase
      .from('listings')
      .select(`
        *,
        profiles!listings_user_id_fkey(full_name),
        categories(name, icon)
      `)
      .eq('status', 'approved');

    if (selectedCategory !== "all") {
      const category = categories.find(c => c.name.toLowerCase() === selectedCategory);
      if (category) {
        query = query.eq('category_id', category.id);
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'popular':
        query = query.order('download_count', { ascending: false });
        break;
      case 'recent':
        query = query.order('created_at', { ascending: false });
        break;
      case 'rating':
        query = query.order('created_at', { ascending: false }); // Placeholder for rating
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching listings:', error);
      toast({
        title: "Error",
        description: "Failed to load marketplace items",
        variant: "destructive"
      });
    } else {
      setListings(data || []);
    }
    setLoading(false);
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const toggleWishlist = (listingId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newWishlist = wishlist.includes(listingId)
      ? wishlist.filter(id => id !== listingId)
      : [...wishlist, listingId];
    
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    
    toast({
      title: wishlist.includes(listingId) ? "Removed from wishlist" : "Added to wishlist",
      description: wishlist.includes(listingId) ? "Item removed from your wishlist" : "Item added to your wishlist",
    });
  };

  const toggleCart = (listingId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newCart = cart.includes(listingId)
      ? cart.filter(id => id !== listingId)
      : [...cart, listingId];
    
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    
    toast({
      title: cart.includes(listingId) ? "Removed from cart" : "Added to cart",
      description: cart.includes(listingId) ? "Item removed from your cart" : "Item added to your cart",
    });
  };

  const handleDownload = async (listingId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to download materials",
        variant: "destructive"
      });
      return;
    }

    try {
      // Record the download
      const { error: downloadError } = await supabase
        .from('downloads')
        .insert({
          user_id: user.id,
          listing_id: listingId
        });

      if (downloadError && !downloadError.message.includes('duplicate')) {
        throw downloadError;
      }

      // Update download count
      const { error: updateError } = await supabase
        .from('listings')
        .update({ download_count: supabase.sql`download_count + 1` })
        .eq('id', listingId);

      if (updateError) {
        console.error('Error updating download count:', updateError);
      }

      toast({
        title: "Download Started",
        description: "Your material is being downloaded",
      });

      // Refresh listings to show updated download count
      fetchListings();
    } catch (error: any) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "Failed to download material",
        variant: "destructive"
      });
    }
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return BookOpen;
      case 'FileText': return FileText;
      case 'Presentation': return Presentation;
      case 'Briefcase': return Briefcase;
      default: return FileText;
    }
  };

  const allCategories = [
    { value: "all", label: "All Categories", icon: Grid3X3 },
    ...categories.map(cat => ({
      value: cat.name.toLowerCase(),
      label: cat.name.charAt(0).toUpperCase() + cat.name.slice(1),
      icon: getCategoryIcon(cat.icon)
    }))
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Educational Marketplace</h1>
            <p className="text-lg text-slate-600">Find and share educational materials - completely free!</p>
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
                  {allCategories.map((category) => (
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
        {filteredListings.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {filteredListings.map((listing) => (
              <Link key={listing.id} to={`/product/${listing.id}`}>
                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group relative">
                  <div className="relative">
                    {listing.preview_images && listing.preview_images.length > 0 ? (
                      <img 
                        src={`${supabase.storage.from('listings').getPublicUrl(listing.preview_images[0]).data.publicUrl}`}
                        alt={listing.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    ) : (
                      <div className="w-full h-48 bg-slate-200 rounded-t-lg flex items-center justify-center">
                        <FileText className="h-12 w-12 text-slate-400" />
                      </div>
                    )}
                    
                    {listing.categories && (
                      <Badge className="absolute top-3 left-3 bg-blue-600">
                        {listing.categories.name}
                      </Badge>
                    )}
                    
                    <div className="absolute top-3 right-3 flex items-center space-x-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="p-1 h-8 w-8 bg-white/90 hover:bg-white"
                        onClick={(e) => toggleWishlist(listing.id, e)}
                      >
                        <Heart className={`h-4 w-4 ${wishlist.includes(listing.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {listing.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">{listing.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-green-600">FREE</span>
                      <div className="flex items-center space-x-1 text-slate-500">
                        <Download className="h-4 w-4" />
                        <span className="text-sm">{listing.download_count || 0}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm text-slate-600">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{listing.profiles?.full_name || 'Anonymous'}</span>
                        </div>
                        {listing.university && (
                          <div className="flex items-center space-x-1 mt-1">
                            <School className="h-3 w-3" />
                            <span>{listing.university}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        onClick={(e) => handleDownload(listing.id, e)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => toggleCart(listing.id, e)}
                        className={cart.includes(listing.id) ? 'bg-green-50 border-green-200' : ''}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No materials available</h3>
            <p className="text-slate-500 mb-4">
              {selectedCategory !== "all" 
                ? `No materials found in the ${selectedCategory} category.` 
                : "No materials match your search criteria."
              }
            </p>
            <p className="text-slate-500">
              Please contact the admin to request new materials or try a different search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
