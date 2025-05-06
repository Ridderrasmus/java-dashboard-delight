
import React from 'react';
import CoffeeCard from './CoffeeCard';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const FEATURED_COFFEES = [
  {
    id: 1,
    name: "Classic Espresso",
    description: "Rich and intense with a perfect golden crema. The cornerstone of all coffee drinks.",
    timesOrdered: 1243,
    imageUrl: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Vanilla Latte",
    description: "Smooth espresso meets steamed milk and vanilla for a sweet, comforting classic.",
    timesOrdered: 986,
    imageUrl: "https://images.unsplash.com/photo-1561047029-3000c68339ca?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Caramel Macchiato",
    description: "Espresso marked with frothy milk and sweet caramel drizzle.",
    timesOrdered: 854,
    imageUrl: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Mocha",
    description: "The perfect blend of espresso, chocolate, and steamed milk for chocolate lovers.",
    timesOrdered: 732,
    imageUrl: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=500&auto=format&fit=crop"
  }
];

const FeaturedCoffees = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-coffee-darker">Most Popular Coffees</h2>
          <Button variant="ghost" className="flex items-center text-coffee-dark gap-1">
            See All <ChevronRight size={16} />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_COFFEES.map((coffee) => (
            <CoffeeCard 
              key={coffee.id}
              name={coffee.name}
              description={coffee.description}
              timesOrdered={coffee.timesOrdered}
              imageUrl={coffee.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoffees;
