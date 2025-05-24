
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Upload, 
  Download, 
  DollarSign, 
  Star, 
  Eye, 
  ShoppingCart,
  Heart,
  Settings,
  FileText,
  TrendingUp,
  Calendar,
  MessageSquare,
  Edit,
  Trash2,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "Total Earnings", value: "$1,245", icon: DollarSign, color: "text-green-600" },
    { label: "Items Sold", value: "23", icon: Upload, color: "text-blue-600" },
    { label: "Items Purchased", value: "15", icon: Download, color: "text-purple-600" },
    { label: "Average Rating", value: "4.8", icon: Star, color: "text-yellow-600" }
  ];

  const myListings = [
    {
      id: 1,
      title: "Advanced Calculus Notes",
      category: "Notes",
      price: 25.00,
      sales: 12,
      views: 156,
      rating: 4.8,
      status: "active",
      uploadDate: "2024-01-15"
    },
    {
      id: 2,
      title: "Web Development Project",
      category: "Projects",
      price: 35.00,
      sales: 8,
      views: 89,
      rating: 4.6,
      status: "active",
      uploadDate: "2024-01-10"
    },
    {
      id: 3,
      title: "Chemistry Lab Manual",
      category: "Textbooks",
      price: 20.00,
      sales: 3,
      views: 45,
      rating: 4.3,
      status: "pending",
      uploadDate: "2024-01-08"
    }
  ];

  const myPurchases = [
    {
      id: 1,
      title: "Machine Learning Algorithms",
      seller: "Dr. Smith",
      price: 30.00,
      purchaseDate: "2024-01-12",
      status: "completed"
    },
    {
      id: 2,
      title: "Data Structures Guide",
      seller: "Sarah M.",
      price: 15.00,
      purchaseDate: "2024-01-08",
      status: "completed"
    },
    {
      id: 3,
      title: "Physics Presentations",
      seller: "Alex K.",
      price: 25.00,
      purchaseDate: "2024-01-05",
      status: "completed"
    }
  ];

  const recentActivity = [
    { type: "sale", message: "Your 'Advanced Calculus Notes' was purchased", time: "2 hours ago" },
    { type: "review", message: "New 5-star review on 'Web Development Project'", time: "5 hours ago" },
    { type: "purchase", message: "You purchased 'Machine Learning Algorithms'", time: "1 day ago" },
    { type: "upload", message: "Your 'Chemistry Lab Manual' is under review", time: "2 days ago" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
              <p className="text-slate-600">Manage your educational marketplace account</p>
            </div>
            <Link to="/upload">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Upload New Item
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-slate-100 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="listings">My Listings</TabsTrigger>
                <TabsTrigger value="purchases">Purchases</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50">
                          <div className={`p-2 rounded-full ${
                            activity.type === 'sale' ? 'bg-green-100 text-green-600' :
                            activity.type === 'review' ? 'bg-yellow-100 text-yellow-600' :
                            activity.type === 'purchase' ? 'bg-blue-100 text-blue-600' :
                            'bg-purple-100 text-purple-600'
                          }`}>
                            {activity.type === 'sale' && <DollarSign className="h-4 w-4" />}
                            {activity.type === 'review' && <Star className="h-4 w-4" />}
                            {activity.type === 'purchase' && <ShoppingCart className="h-4 w-4" />}
                            {activity.type === 'upload' && <Upload className="h-4 w-4" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-slate-800">{activity.message}</p>
                            <p className="text-xs text-slate-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-blue-600">+15%</p>
                        <p className="text-sm text-slate-600">Sales Growth</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <Eye className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-600">2.4k</p>
                        <p className="text-sm text-slate-600">Total Views</p>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-yellow-600">4.7</p>
                        <p className="text-sm text-slate-600">Avg Rating</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="listings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>My Listings ({myListings.length})</CardTitle>
                      <Link to="/upload">
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add New
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {myListings.map((listing) => (
                        <div key={listing.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-slate-800">{listing.title}</h3>
                                <Badge 
                                  variant={listing.status === 'active' ? 'default' : 'secondary'}
                                  className={listing.status === 'active' ? 'bg-green-500' : ''}
                                >
                                  {listing.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-600 mb-2">{listing.category}</p>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <p className="text-slate-500">Price</p>
                                  <p className="font-semibold">${listing.price}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Sales</p>
                                  <p className="font-semibold">{listing.sales}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Views</p>
                                  <p className="font-semibold">{listing.views}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Rating</p>
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                    <span className="font-semibold">{listing.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="purchases" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Purchase History ({myPurchases.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {myPurchases.map((purchase) => (
                        <div key={purchase.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-slate-800 mb-1">{purchase.title}</h3>
                              <p className="text-sm text-slate-600 mb-2">by {purchase.seller}</p>
                              <div className="flex items-center space-x-4 text-sm">
                                <div>
                                  <p className="text-slate-500">Price</p>
                                  <p className="font-semibold">${purchase.price}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Purchase Date</p>
                                  <p className="font-semibold">{purchase.purchaseDate}</p>
                                </div>
                                <div>
                                  <Badge className="bg-green-500">
                                    {purchase.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                              <Button size="sm" variant="ghost">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src="/placeholder.svg" alt="Profile" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">John Doe</h3>
                          <p className="text-slate-600">john.doe@example.com</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Change Avatar
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">University</label>
                          <p className="text-slate-600">Stanford University</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Member Since</label>
                          <p className="text-slate-600">January 2024</p>
                        </div>
                      </div>

                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Settings className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/upload">
                  <Button className="w-full justify-start" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Material
                  </Button>
                </Link>
                <Link to="/marketplace">
                  <Button className="w-full justify-start" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Browse Marketplace
                  </Button>
                </Link>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tips & Help</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800">Boost Your Sales</h4>
                    <p className="text-blue-600">Add detailed descriptions and preview images to increase downloads.</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800">Quality Matters</h4>
                    <p className="text-green-600">High-quality materials get better ratings and more sales.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
