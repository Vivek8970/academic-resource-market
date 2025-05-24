
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, AlertTriangle, Eye, CheckCircle, X, Flag, MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const ReportsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const reports = [
    {
      id: 1,
      type: "Content Violation",
      reportedItem: "Advanced Calculus Textbook - 10th Edition",
      reportedBy: "John Doe",
      reportedUser: "Sarah Johnson",
      reason: "Copyright infringement - this textbook is still under copyright",
      status: "pending",
      priority: "high",
      submitDate: "2024-05-22",
      description: "This textbook appears to be a copyrighted material being sold without permission from the publisher."
    },
    {
      id: 2,
      type: "Inappropriate Content",
      reportedItem: "Biology Lab Notes - Spring 2024",
      reportedBy: "Emily Davis",
      reportedUser: "Mike Chen",
      reason: "Contains inappropriate language and offensive content",
      status: "resolved",
      priority: "medium",
      submitDate: "2024-05-20",
      description: "The notes contain unprofessional language that is not suitable for academic sharing."
    },
    {
      id: 3,
      type: "Spam/Fake Content",
      reportedItem: "Machine Learning Course Complete",
      reportedBy: "Admin System",
      reportedUser: "Anonymous User",
      reason: "Automated detection of duplicate/fake content",
      status: "investigating",
      priority: "low",
      submitDate: "2024-05-21",
      description: "System detected this content has been uploaded multiple times with different titles."
    },
    {
      id: 4,
      type: "User Behavior",
      reportedItem: "User Profile",
      reportedBy: "Multiple Users",
      reportedUser: "James Wilson",
      reason: "Harassment and inappropriate messaging",
      status: "pending",
      priority: "high",
      submitDate: "2024-05-23",
      description: "Multiple reports of this user sending inappropriate messages to other users."
    },
    {
      id: 5,
      type: "Technical Issue",
      reportedItem: "Chemistry Presentation PPT",
      reportedBy: "Lisa Anderson",
      reportedUser: "Emma Davis",
      reason: "File is corrupted and cannot be downloaded",
      status: "resolved",
      priority: "medium",
      submitDate: "2024-05-19",
      description: "Users reported that the uploaded file is corrupted and cannot be properly downloaded."
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.reportedItem.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reportedUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || report.status === filterStatus;
    const matchesType = filterType === "all" || report.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case "investigating":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Investigating</Badge>;
      case "resolved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resolved</Badge>;
      case "dismissed":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Dismissed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>;
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Content Violation":
        return <Flag className="h-4 w-4 text-red-500" />;
      case "Inappropriate Content":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "Spam/Fake Content":
        return <X className="h-4 w-4 text-purple-500" />;
      case "User Behavior":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "Technical Issue":
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Reports & Flagged Content</h1>
          <p className="text-slate-600 mt-1">Review and manage reported content and user behavior</p>
        </div>
        <div className="flex space-x-2">
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            {reports.filter(r => r.status === 'pending').length} Pending
          </Badge>
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            {reports.filter(r => r.priority === 'high').length} High Priority
          </Badge>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="bg-white border-slate-200">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search reports by content, user, or reason..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Content Violation">Content Violation</SelectItem>
                <SelectItem value="Inappropriate Content">Inappropriate Content</SelectItem>
                <SelectItem value="Spam/Fake Content">Spam/Fake Content</SelectItem>
                <SelectItem value="User Behavior">User Behavior</SelectItem>
                <SelectItem value="Technical Issue">Technical Issue</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="dismissed">Dismissed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
            All Reports ({filteredReports.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Details</TableHead>
                  <TableHead>Reported Item</TableHead>
                  <TableHead>Reported User</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submit Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div className="flex items-start space-x-3">
                        {getTypeIcon(report.type)}
                        <div>
                          <p className="font-medium text-slate-800">{report.type}</p>
                          <p className="text-sm text-slate-600">by {report.reportedBy}</p>
                          <p className="text-xs text-slate-500 mt-1 max-w-[200px] truncate">{report.reason}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600 max-w-[150px] truncate block">
                        {report.reportedItem}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-800 font-medium">{report.reportedUser}</span>
                    </TableCell>
                    <TableCell>{getPriorityBadge(report.priority)}</TableCell>
                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600">{report.submitDate}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle className="flex items-center space-x-2">
                                {getTypeIcon(report.type)}
                                <span>Report Details - {report.type}</span>
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-slate-700">Reported Item:</p>
                                  <p className="text-sm text-slate-600">{report.reportedItem}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-slate-700">Reported User:</p>
                                  <p className="text-sm text-slate-600">{report.reportedUser}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-slate-700">Reported By:</p>
                                  <p className="text-sm text-slate-600">{report.reportedBy}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-slate-700">Priority:</p>
                                  {getPriorityBadge(report.priority)}
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-700 mb-2">Reason:</p>
                                <p className="text-sm text-slate-600">{report.reason}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-700 mb-2">Description:</p>
                                <p className="text-sm text-slate-600">{report.description}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-700 mb-2">Admin Notes:</p>
                                <Textarea placeholder="Add admin notes..." className="min-h-[80px]" />
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline">Dismiss</Button>
                                <Button className="bg-blue-600 hover:bg-blue-700">Take Action</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        {report.status === "pending" && (
                          <>
                            <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsManagement;
