import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Coffee, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-purple-darker border-b border-white/10 backdrop-blur-sm py-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center gap-2">
          <Coffee className="h-6 w-6 text-purple-light" />
          <span className="font-bold text-xl text-gradient">BrewDash</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-300 hover:text-purple-light transition-colors"
          >
            Home
          </Link>
          <Link
            to="/statistics"
            className="text-gray-300 hover:text-purple-light transition-colors"
          >
            Statistics
          </Link>
          <Link
            to="/create-recipe"
            className="text-gray-300 hover:text-purple-light transition-colors"
          >
            Create Recipe
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* Auth state UI */}
          {user && (
            <Button
              variant="ghost"
              asChild
              className="hover:bg-white/5 relative"
            >
              <Link to="/account" className="flex items-center gap-2">
                <User className="h-5 w-5 text-purple-light" />
                <span className="ml-2 text-purple-light text-sm font-semibold max-w-[120px] truncate hidden sm:inline-block">
                  {user.name}
                </span>
              </Link>
            </Button>
          )}

          {user ? (
            <Button
              className="bg-purple-medium hover:bg-purple-light text-white"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Button
              className="bg-purple-medium hover:bg-purple-light text-white"
              asChild
            >
              <Link to="/auth">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
