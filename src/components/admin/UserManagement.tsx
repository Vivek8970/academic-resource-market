
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, UserPlus, MoreHorizontal, Mail, Ban, CheckCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@university.edu",
      role: "Student",
      status: "active",
      joinDate: "2024-01-15",
      uploads: 12,
      downloads: 45,
      institution: "MIT"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      email: "m.chen@professor.edu",
      role: "Professor",
      status: "active",
      joinDate: "2023-09-20",
      uploads: 34,
      downloads: 89,
      institution: "Stanford University"
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma.davis@student.edu",
      role: "Student", 
      status: "suspended",
      joinDate: "2024-02-10",
      uploads: 3,
      downloads: 15,
      institution: "Harvard University"
    },
    {
      id: 4,
      name: "James Wilson",
      email: "j.wilson@university.edu",
      role: "Student",
      status: "active",
      joinDate: "2024-03-05",
      uploads: 8,
      downloads: 23,
      institution: "Yale University"
    },
    {
      id: 5,
      name: "Dr. Lisa Anderson",
      email: "l.anderson@professor.edu",
      role: "Professor",
      status: "active",
      joinDate: "2023-08-12",
      uploads: 67,
      downloads: 234,
      institution: "Princeton University"
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.institution.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Suspended</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Professor":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Professor</Badge>;
      case "Student":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Student</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">User Management</h1>
          <p className="text-slate-600 mt-1">Manage registered users and their account status</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="bg-white border-slate-200">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search users by name, email, or institution..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800">All Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Institution</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-slate-800">{user.name}</p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600">{user.institution}</span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="text-slate-800">{user.uploads} uploads</p>
                        <p className="text-slate-500">{user.downloads} downloads</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600">{user.joinDate}</span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Verify Account
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Ban className="h-4 w-4 mr-2" />
                            Suspend User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

export default UserManagement;
