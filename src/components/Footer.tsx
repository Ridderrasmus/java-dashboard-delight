
import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-coffee-darker text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="h-6 w-6" />
              <span className="font-bold text-xl">BrewDash</span>
            </div>
            <p className="text-coffee-light text-sm">
              Your personal coffee dashboard for ordering and tracking your favorite brews.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-coffee-light text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/statistics" className="hover:text-white transition-colors">Statistics</Link></li>
              <li><Link to="/create-recipe" className="hover:text-white transition-colors">Create Recipe</Link></li>
              <li><Link to="/account" className="hover:text-white transition-colors">Account</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Coffee Help</h3>
            <ul className="space-y-2 text-coffee-light text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Coffee Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Brewing Tips</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Machine Maintenance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <ul className="space-y-2 text-coffee-light text-sm">
              <li>support@brewdash.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Coffee Street, Brewville</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-coffee-medium/30 mt-8 pt-8 text-sm text-center text-coffee-light">
          <p>&copy; {new Date().getFullYear()} BrewDash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
