
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, 
  Download, 
  Heart, 
  Share2, 
  ShoppingCart,
  FileText,
  Calendar,
  User,
  GraduationCap,
  Shield,
  MessageSquare,
  ChevronLeft,
  Play,
  Eye
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const [isInCart, setIsInCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock data - in real app this would come from API
  const product = {
    id: 1,
    title: "Advanced Calculus - Complete Notes Package",
    category: "Notes",
    price: 25.00,
    originalPrice: 35.00,
    rating: 4.8,
    totalReviews: 124,
    downloads: 156,
    description: "Comprehensive calculus notes covering all major topics including limits, derivatives, integrals, and series. These notes have been carefully compiled from lectures at MIT and include solved examples, practice problems, and detailed explanations.",
    features: [
      "300+ pages of detailed notes",
      "50+ solved examples",
      "Practice problems with solutions",
      "Downloadable PDF format",
      "Printable with high quality"
    ],
    image: "/placeholder.svg",
    seller: {
      name: "Sarah Mitchell",
      avatar: "/placeholder.svg",
      university: "MIT",
      rating: 4.9,
      totalSales: 89,
      memberSince: "2023",
      verified: true
    },
    uploadDate: "2024-01-15",
    fileSize: "12.5 MB",
    fileType: "PDF",
    pages: 324,
    language: "English",
    tags: ["Calculus", "Mathematics", "MIT", "Derivatives", "Integrals"]
  };

  const relatedProducts = [
    {
      id: 2,
      title: "Linear Algebra Notes",
      price: 20.00,
      rating: 4.7,
      image: "/placeholder.svg",
      seller: "John D."
    },
    {
      id: 3,
      title: "Differential Equations Guide",
      price: 30.00,
      rating: 4.6,
      image: "/placeholder.svg",
      seller: "Maria S."
    },
    {
      id: 4,
      title: "Statistics & Probability",
      price: 22.00,
      rating: 4.8,
      image: "/placeholder.svg",
      seller: "David L."
    }
  ];

  const reviews = [
    {
      id: 1,
      user: "Alex Chen",
      avatar: "/placeholder.svg",
      rating: 5,
      date: "2024-01-10",
      comment: "Excellent notes! Very detailed and well-organized. Helped me ace my calculus exam."
    },
    {
      id: 2,
      user: "Emma Wilson",
      avatar: "/placeholder.svg",
      rating: 4,
      date: "2024-01-08",
      comment: "Good quality notes with clear explanations. Some sections could be more detailed."
    },
    {
      id: 3,
      user: "Michael Brown",
      avatar: "/placeholder.svg",
      rating: 5,
      date: "2024-01-05",
      comment: "These notes saved my semester! Clear, comprehensive, and well worth the price."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-slate-600 mb-6">
          <Link to="/marketplace" className="hover:text-blue-600 flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Marketplace
          </Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-slate-800">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Product Header */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full md:w-64 h-64 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center cursor-pointer group">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-3">
                        <Eye className="h-6 w-6 text-slate-800" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <Badge className="mb-2">{product.category}</Badge>
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">{product.title}</h1>
                        <div className="flex items-center space-x-4 text-sm text-slate-600">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{product.rating}</span>
                            <span>({product.totalReviews} reviews)</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Download className="h-4 w-4" />
                            <span>{product.downloads} downloads</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsWishlisted(!isWishlisted)}
                          className={isWishlisted ? "text-red-500" : "text-slate-500"}
                        >
                          <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <FileText className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                        <p className="text-xs text-slate-600">File Type</p>
                        <p className="font-medium">{product.fileType}</p>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <Calendar className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                        <p className="text-xs text-slate-600">Pages</p>
                        <p className="font-medium">{product.pages}</p>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <Download className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                        <p className="text-xs text-slate-600">Size</p>
                        <p className="font-medium">{product.fileSize}</p>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <GraduationCap className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                        <p className="text-xs text-slate-600">Language</p>
                        <p className="font-medium">{product.language}</p>
                      </div>
                    </div>

                    <p className="text-slate-700 mb-4">{product.description}</p>

                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">What's Included:</h3>
                      <ul className="space-y-1">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Reviews ({product.totalReviews})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-slate-200 pb-4 last:border-b-0">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={review.avatar} alt={review.user} />
                          <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-sm">{review.user}</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < review.rating ? "text-yellow-400 fill-current" : "text-slate-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-slate-500">{review.date}</span>
                          </div>
                          <p className="text-sm text-slate-600">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-3xl font-bold text-blue-600">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-slate-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">Instant download after purchase</p>
                </div>

                <div className="space-y-3">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                    onClick={() => setIsInCart(!isInCart)}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {isInCart ? "Remove from Cart" : "Add to Cart"}
                  </Button>
                  <Button variant="outline" className="w-full">
                    Buy Now
                  </Button>
                </div>

                <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-slate-600">
                  <div className="flex items-center space-x-1">
                    <Shield className="h-4 w-4" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="h-4 w-4" />
                    <span>Instant Access</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Seller Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={product.seller.avatar} alt={product.seller.name} />
                    <AvatarFallback>{product.seller.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{product.seller.name}</h3>
                      {product.seller.verified && (
                        <Shield className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{product.seller.university}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{product.seller.rating}</p>
                    <p className="text-xs text-slate-600">Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{product.seller.totalSales}</p>
                    <p className="text-xs text-slate-600">Sales</p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-4">
                  Member since {product.seller.memberSince}
                </p>

                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Seller
                </Button>
              </CardContent>
            </Card>

            {/* Related Products */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatedProducts.map((item) => (
                    <Link key={item.id} to={`/product/${item.id}`}>
                      <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-2">{item.title}</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-blue-600 font-semibold">${item.price}</span>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-xs">{item.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
