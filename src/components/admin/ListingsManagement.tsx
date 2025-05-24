
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Plus, MoreHorizontal, Eye, Edit, Trash, CheckCircle, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const ListingsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const listings = [
    {
      id: 1,
      title: "Advanced Calculus Textbook - 10th Edition",
      category: "Textbooks",
      author: "Dr. Sarah Johnson",
      price: "$45.00",
      status: "approved",
      uploadDate: "2024-05-20",
      downloads: 23,
      fileType: "PDF",
      institution: "MIT"
    },
    {
      id: 2,
      title: "Machine Learning Lecture Notes - CS229",
      category: "Notes",
      author: "Mike Chen",
      price: "$15.00",
      status: "pending",
      uploadDate: "2024-05-22",
      downloads: 0,
      fileType: "PDF",
      institution: "Stanford"
    },
    {
      id: 3,
      title: "Introduction to Psychology PowerPoint",
      category: "Presentations",
      author: "Emma Davis",
      price: "$20.00",
      status: "approved",
      uploadDate: "2024-05-18",
      downloads: 45,
      fileType: "PPT",
      institution: "Harvard"
    },
    {
      id: 4,
      title: "Web Development Final Project",
      category: "Projects",
      author: "James Wilson",
      price: "$30.00",
      status: "rejected",
      uploadDate: "2024-05-19",
      downloads: 2,
      fileType: "ZIP",
      institution: "Yale"
    },
    {
      id: 5,
      title: "Organic Chemistry Lab Manual",
      category: "Textbooks",
      author: "Dr. Lisa Anderson",
      price: "$35.00",
      status: "approved",
      uploadDate: "2024-05-15",
      downloads: 67,
      fileType: "PDF",
      institution: "Princeton"
    }
  ];

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.institution.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || listing.category === filterCategory;
    const matchesStatus = filterStatus === "all" || listing.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Textbooks":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Textbooks</Badge>;
      case "Notes":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Notes</Badge>;
      case "Presentations":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Presentations</Badge>;
      case "Projects":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Projects</Badge>;
      default:
        return <Badge variant="outline">{category}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Listings Management</h1>
          <p className="text-slate-600 mt-1">Manage educational materials and approve submissions</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Listing
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="bg-white border-slate-200">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search listings by title, author, or institution..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Textbooks">Textbooks</SelectItem>
                <SelectItem value="Notes">Notes</SelectItem>
                <SelectItem value="Presentations">Presentations</SelectItem>
                <SelectItem value="Projects">Projects</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Listings Table */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800">All Listings ({filteredListings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredListings.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-slate-800 max-w-[200px] truncate">{listing.title}</p>
                        <p className="text-sm text-slate-500">{listing.fileType} • {listing.institution}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getCategoryBadge(listing.category)}</TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600">{listing.author}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-slate-800">{listing.price}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(listing.status)}</TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600">{listing.downloads}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600">{listing.uploadDate}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {listing.status === "pending" && (
                          <>
                            <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Listing
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="h-4 w-4 mr-2" />
                              Delete Listing
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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

export default ListingsManagement;
