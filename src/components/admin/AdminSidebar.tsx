
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  FolderOpen, 
  AlertTriangle,
  GraduationCap
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: BarChart3,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Listings",
    url: "/admin/listings",
    icon: BookOpen,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: FolderOpen,
  },
  {
    title: "Reports",
    url: "/admin/reports",
    icon: AlertTriangle,
  },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-slate-200 bg-white">
      <SidebarHeader className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <GraduationCap className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">EduMarket</h2>
            <p className="text-sm text-slate-500">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-600 font-medium">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={cn(
                      "w-full",
                      location.pathname === item.url && "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                    )}
                  >
                    <Link to={item.url} className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-50 transition-colors">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
