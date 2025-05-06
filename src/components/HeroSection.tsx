
import React from 'react';
import { Button } from '@/components/ui/button';
import { Coffee, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-coffee-dark to-coffee-darker text-white">
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center"></div>
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Your Perfect Coffee, <br />
            Just One Click Away
          </h1>
          <p className="text-lg mb-8 text-coffee-light opacity-90">
            Discover and order your favorite coffee recipes, create your own blends,
            and track your coffee preferences with our smart dashboard.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-accent-orange hover:bg-accent-orange/90 text-white flex items-center gap-2">
              <Coffee size={18} />
              Order Now
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10 flex items-center gap-2">
              <Link to="/create-recipe">
                Create Your Own <ChevronRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
