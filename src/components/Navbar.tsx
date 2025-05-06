
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Coffee, ChartBar, Edit } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center gap-2">
          <Coffee className="h-6 w-6 text-coffee-darker" />
          <span className="font-bold text-xl text-coffee-darker">BrewDash</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-coffee-dark hover:text-coffee-darker transition-colors">
            Home
          </Link>
          <Link to="/statistics" className="text-coffee-dark hover:text-coffee-darker transition-colors">
            Statistics
          </Link>
          <Link to="/create-recipe" className="text-coffee-dark hover:text-coffee-darker transition-colors">
            Create Recipe
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/account">
              <User className="h-5 w-5 text-coffee-dark" />
            </Link>
          </Button>
          <Button className="bg-coffee-dark hover:bg-coffee-darker text-white">
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
