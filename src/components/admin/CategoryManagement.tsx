import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash, FolderOpen, BookOpen, FileText, Presentation, Briefcase } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CategoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    {
      id: 1,
      name: "Textbooks",
      description: "Academic textbooks for all subjects and levels",
      icon: BookOpen,
      itemCount: 456,
      status: "active",
      createdDate: "2023-08-15",
      color: "bg-blue-500"
    },
    {
      id: 2,
      name: "Lecture Notes",
      description: "Student and professor notes from various courses",
      icon: FileText,
      itemCount: 389,
      status: "active",
      createdDate: "2023-08-15",
      color: "bg-purple-500"
    },
    {
      id: 3,
      name: "Presentations",
      description: "PowerPoint presentations and slides",
      icon: Presentation,
      itemCount: 234,
      status: "active",
      createdDate: "2023-08-15",
      color: "bg-green-500"
    },
    {
      id: 4,
      name: "Academic Projects",
      description: "Student projects, assignments, and research work",
      icon: Briefcase,
      itemCount: 155,
      status: "active",
      createdDate: "2023-08-15",
      color: "bg-orange-500"
    },
    {
      id: 5,
      name: "Research Papers",
      description: "Academic research papers and publications",
      icon: FileText,
      itemCount: 89,
      status: "draft",
      createdDate: "2024-05-20",
      color: "bg-indigo-500"
    }
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Draft</Badge>;
      case "inactive":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Category Management</h1>
          <p className="text-slate-600 mt-1">Organize and manage educational material categories</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Category Name</Label>
                <Input id="name" placeholder="Enter category name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter category description" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Create Category</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="bg-white border-slate-200">
        <CardContent className="p-6">
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="bg-white border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${category.color}`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                {getStatusBadge(category.status)}
              </div>
              
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{category.name}</h3>
              <p className="text-sm text-slate-600 mb-4">{category.description}</p>
              
              <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                <span>{category.itemCount} items</span>
                <span>Created: {category.createdDate}</span>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Categories Table */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800 flex items-center">
            <FolderOpen className="h-5 w-5 mr-2 text-blue-600" />
            All Categories ({filteredCategories.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${category.color}`}>
                          <category.icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium text-slate-800">{category.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600 max-w-[200px] truncate block">
                        {category.description}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600">{category.itemCount}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(category.status)}</TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600">{category.createdDate}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                          <Trash className="h-4 w-4" />
                        </Button>
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

export default CategoryManagement;
