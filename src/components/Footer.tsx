
import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-purple-darker border-t border-white/10 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="h-6 w-6 text-purple-light" />
              <span className="font-bold text-xl text-gradient">BrewDash</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your personal coffee dashboard for ordering and tracking your favorite brews.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-purple-light">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link to="/" className="hover:text-purple-light transition-colors">Home</Link></li>
              <li><Link to="/statistics" className="hover:text-purple-light transition-colors">Statistics</Link></li>
              <li><Link to="/create-recipe" className="hover:text-purple-light transition-colors">Create Recipe</Link></li>
              <li><Link to="/account" className="hover:text-purple-light transition-colors">Account</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-purple-light">Coffee Help</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="#" className="hover:text-purple-light transition-colors">Coffee Guide</a></li>
              <li><a href="#" className="hover:text-purple-light transition-colors">Brewing Tips</a></li>
              <li><a href="#" className="hover:text-purple-light transition-colors">Machine Maintenance</a></li>
              <li><a href="#" className="hover:text-purple-light transition-colors">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-purple-light">Contact</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>support@brewdash.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Coffee Street, Brewville</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-sm text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} BrewDash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
