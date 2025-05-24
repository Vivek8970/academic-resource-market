
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Upload, 
  Download, 
  Star, 
  Eye, 
  Heart,
  Settings,
  FileText,
  TrendingUp,
  MessageSquare,
  Edit,
  Trash2,
  Plus,
  Loader2
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [myListings, setMyListings] = useState<any[]>([]);
  const [myDownloads, setMyDownloads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        navigate('/auth');
        return;
      }

      setUser(session.user);
      await fetchUserData(session.user.id);
    } catch (error: any) {
      console.error('Auth error:', error);
      navigate('/auth');
    }
  };

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      setProfile(profileData);

      // Fetch user's listings
      const { data: listingsData } = await supabase
        .from('listings')
        .select(`
          *,
          categories(name)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      setMyListings(listingsData || []);

      // Fetch user's downloads
      const { data: downloadsData } = await supabase
        .from('downloads')
        .select(`
          *,
          listings(
            id,
            title,
            profiles(full_name)
          )
        `)
        .eq('user_id', userId)
        .order('downloaded_at', { ascending: false });

      setMyDownloads(downloadsData || []);
    } catch (error: any) {
      console.error('Error fetching user data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteListing = async (listingId: string) => {
    try {
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', listingId);

      if (error) throw error;

      setMyListings(prev => prev.filter(listing => listing.id !== listingId));
      
      toast({
        title: "Listing Deleted",
        description: "Your listing has been removed successfully",
      });
    } catch (error: any) {
      console.error('Error deleting listing:', error);
      toast({
        title: "Error",
        description: "Failed to delete listing",
        variant: "destructive",
      });
    }
  };

  const downloadFile = async (listing: any) => {
    if (!listing.main_file_url) return;

    try {
      const { data, error } = await supabase.storage
        .from('listings')
        .download(listing.main_file_url);

      if (error) throw error;

      // Update download count
      await supabase
        .from('listings')
        .update({ download_count: (listing.download_count || 0) + 1 })
        .eq('id', listing.id);

      // Create download record
      await supabase
        .from('downloads')
        .insert({
          user_id: user.id,
          listing_id: listing.id
        });

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = listing.title;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error('Error downloading file:', error);
      toast({
        title: "Download Failed",
        description: "Failed to download file",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500 text-white">Live</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Under Review</Badge>;
      case "rejected":
        return <Badge className="bg-red-500 text-white">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const stats = [
    { 
      label: "Total Uploads", 
      value: myListings.length.toString(), 
      icon: Upload, 
      color: "text-blue-600" 
    },
    { 
      label: "Approved Materials", 
      value: myListings.filter(l => l.status === 'approved').length.toString(), 
      icon: FileText, 
      color: "text-green-600" 
    },
    { 
      label: "Total Downloads", 
      value: myListings.reduce((sum, l) => sum + (l.download_count || 0), 0).toString(), 
      icon: Download, 
      color: "text-purple-600" 
    },
    { 
      label: "Materials Downloaded", 
      value: myDownloads.length.toString(), 
      icon: Heart, 
      color: "text-red-600" 
    }
  ];

  const recentActivity = [
    ...myListings.slice(0, 2).map(listing => ({
      type: "upload",
      message: `You uploaded "${listing.title}"`,
      time: new Date(listing.created_at).toLocaleDateString()
    })),
    ...myDownloads.slice(0, 2).map(download => ({
      type: "download",
      message: `You downloaded "${download.listings?.title}"`,
      time: new Date(download.downloaded_at).toLocaleDateString()
    }))
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 4);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-slate-600">Welcome back, {profile?.full_name || 'User'}!</p>
            </div>
            <Link to="/upload">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Share Knowledge
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
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
              <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="listings">My Materials</TabsTrigger>
                <TabsTrigger value="downloads">Downloaded</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                          <div className={`p-2 rounded-full ${
                            activity.type === 'upload' ? 'bg-blue-100 text-blue-600' :
                            'bg-green-100 text-green-600'
                          }`}>
                            {activity.type === 'upload' ? <Upload className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-slate-800">{activity.message}</p>
                            <p className="text-xs text-slate-500">{activity.time}</p>
                          </div>
                        </div>
                      )) : (
                        <p className="text-slate-500 text-center py-8">No recent activity</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-blue-600">{myListings.filter(l => l.status === 'approved').length}</p>
                        <p className="text-sm text-slate-600">Live Materials</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <Eye className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-600">{myListings.reduce((sum, l) => sum + (l.download_count || 0), 0)}</p>
                        <p className="text-sm text-slate-600">Total Downloads</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-purple-600">FREE</p>
                        <p className="text-sm text-slate-600">All Materials</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="listings" className="space-y-6">
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>My Materials ({myListings.length})</CardTitle>
                      <Link to="/upload">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Plus className="h-4 w-4 mr-2" />
                          Add New
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {myListings.length > 0 ? myListings.map((listing) => (
                        <div key={listing.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-slate-800">{listing.title}</h3>
                                {getStatusBadge(listing.status)}
                              </div>
                              <p className="text-sm text-slate-600 mb-2 capitalize">{listing.categories?.name || 'Uncategorized'}</p>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <p className="text-slate-500">Downloads</p>
                                  <p className="font-semibold">{listing.download_count || 0}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Uploaded</p>
                                  <p className="font-semibold">{new Date(listing.created_at).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Status</p>
                                  <p className="font-semibold capitalize">{listing.status}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-600 hover:text-red-700"
                                onClick={() => deleteListing(listing.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <div className="text-center py-8">
                          <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                          <p className="text-slate-500 mb-4">No materials uploaded yet</p>
                          <Link to="/upload">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                              <Plus className="h-4 w-4 mr-2" />
                              Upload Your First Material
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="downloads" className="space-y-6">
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Downloaded Materials ({myDownloads.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {myDownloads.length > 0 ? myDownloads.map((download) => (
                        <div key={download.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-slate-800 mb-1">{download.listings?.title}</h3>
                              <p className="text-sm text-slate-600 mb-2">by {download.listings?.profiles?.full_name || 'Unknown'}</p>
                              <div className="flex items-center space-x-4 text-sm">
                                <div>
                                  <p className="text-slate-500">Downloaded</p>
                                  <p className="font-semibold">{new Date(download.downloaded_at).toLocaleDateString()}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => downloadFile(download.listings)}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download Again
                              </Button>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <div className="text-center py-8">
                          <Download className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                          <p className="text-slate-500 mb-4">No downloads yet</p>
                          <Link to="/marketplace">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                              <Eye className="h-4 w-4 mr-2" />
                              Browse Materials
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/upload">
                  <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                    <Upload className="h-4 w-4 mr-2" />
                    Share New Material
                  </Button>
                </Link>
                <Link to="/marketplace">
                  <Button className="w-full justify-start" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Browse Materials
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {profile?.full_name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{profile?.full_name || 'User'}</h3>
                    <p className="text-slate-600 text-sm">{profile?.email}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>EduMarket Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800">100% Free</h4>
                    <p className="text-green-600">All educational materials are completely free to access and share.</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800">Help Others Learn</h4>
                    <p className="text-blue-600">Share your knowledge and help fellow students succeed in their studies.</p>
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
