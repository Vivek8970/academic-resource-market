
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, FileText, Presentation, FolderOpen, TrendingUp, Download, Upload } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Active Listings",
      value: "1,234",
      change: "+8%",
      changeType: "positive", 
      icon: BookOpen,
      color: "bg-green-500"
    },
    {
      title: "Total Downloads",
      value: "15,678",
      change: "+23%",
      changeType: "positive",
      icon: Download,
      color: "bg-purple-500"
    },
    {
      title: "Revenue",
      value: "$8,945",
      change: "+15%",
      changeType: "positive",
      icon: TrendingUp,
      color: "bg-yellow-500"
    }
  ];

  const categoryStats = [
    { name: "Textbooks", count: 456, percentage: 37, color: "bg-blue-600" },
    { name: "Notes", count: 389, percentage: 32, color: "bg-green-600" },
    { name: "Presentations", count: 234, percentage: 19, color: "bg-purple-600" },
    { name: "Projects", count: 155, percentage: 12, color: "bg-yellow-600" }
  ];

  const recentActivity = [
    { action: "New user registration", user: "Sarah Johnson", time: "2 mins ago", type: "user" },
    { action: "Textbook uploaded", user: "Mike Chen", time: "5 mins ago", type: "upload" },
    { action: "Report submitted", user: "Emma Davis", time: "12 mins ago", type: "report" },
    { action: "Category created", user: "Admin", time: "1 hour ago", type: "category" },
    { action: "Bulk upload completed", user: "David Wilson", time: "2 hours ago", type: "upload" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
          <p className="text-slate-600 mt-1">Welcome back! Here's what's happening with your marketplace.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center">
              <FolderOpen className="h-5 w-5 mr-2 text-blue-600" />
              Category Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryStats.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">{category.name}</span>
                  <span className="text-sm text-slate-500">{category.count} items</span>
                </div>
                <Progress value={category.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 py-2">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'user' ? 'bg-blue-100' :
                    activity.type === 'upload' ? 'bg-green-100' :
                    activity.type === 'report' ? 'bg-red-100' : 'bg-yellow-100'
                  }`}>
                    {activity.type === 'user' && <Users className="h-4 w-4 text-blue-600" />}
                    {activity.type === 'upload' && <Upload className="h-4 w-4 text-green-600" />}
                    {activity.type === 'report' && <FileText className="h-4 w-4 text-red-600" />}
                    {activity.type === 'category' && <FolderOpen className="h-4 w-4 text-yellow-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                    <p className="text-xs text-slate-500">by {activity.user}</p>
                  </div>
                  <span className="text-xs text-slate-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
