
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Search, 
  ShoppingCart, 
  User, 
  Upload,
  Menu,
  X,
  Bell,
  Heart
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface UserHeaderProps {
  isAuthenticated: boolean;
}

const UserHeader = ({ isAuthenticated }: UserHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white shadow-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-2 hover-scale">
            <div className="p-2 bg-blue-100 rounded-lg">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-xl font-bold text-slate-800">EduMarket</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search textbooks, notes, presentations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-full"
              />
            </form>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/marketplace" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
              Marketplace
            </Link>
            <Link to="/marketplace?category=textbooks" className="text-slate-600 hover:text-blue-600 transition-colors">
              Textbooks
            </Link>
            <Link to="/marketplace?category=notes" className="text-slate-600 hover:text-blue-600 transition-colors">
              Notes
            </Link>
            <Link to="/marketplace?category=presentations" className="text-slate-600 hover:text-blue-600 transition-colors">
              PPTs
            </Link>
            <Link to="/marketplace?category=projects" className="text-slate-600 hover:text-blue-600 transition-colors">
              Projects
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm" className="relative">
                  <Heart className="h-5 w-5" />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-red-500">
                    3
                  </Badge>
                </Button>
                
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-blue-500">
                    2
                  </Badge>
                </Button>

                <Link to="/upload">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Sell
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-white">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="w-full">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard?tab=listings" className="w-full">My Listings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard?tab=purchases" className="w-full">My Purchases</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard?tab=settings" className="w-full">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.location.href = "/auth"}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/auth">
                  <Button variant="ghost" className="text-sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 animate-fade-in">
            <div className="space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </form>
              
              <div className="space-y-2">
                <Link to="/marketplace" className="block py-2 text-slate-600 hover:text-blue-600">
                  Marketplace
                </Link>
                <Link to="/marketplace?category=textbooks" className="block py-2 text-slate-600 hover:text-blue-600">
                  Textbooks
                </Link>
                <Link to="/marketplace?category=notes" className="block py-2 text-slate-600 hover:text-blue-600">
                  Notes
                </Link>
                <Link to="/marketplace?category=presentations" className="block py-2 text-slate-600 hover:text-blue-600">
                  PPTs
                </Link>
                <Link to="/marketplace?category=projects" className="block py-2 text-slate-600 hover:text-blue-600">
                  Projects
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default UserHeader;
