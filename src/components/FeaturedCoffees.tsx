import React, { useState, useEffect } from "react";
import CoffeeCard from "./CoffeeCard";
import { ChevronRight } from "lucide-react";
import { CoffeeApi } from "@/apis/CoffeeApi";
import { Link } from "react-router-dom";

const IMAGES = [
  "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1561047029-3000c68339ca?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=500&auto=format&fit=crop",
];

const FEATURED_COFFEES = [
  {
    id: 1,
    name: "Classic Espresso",
    description:
      "Rich and intense with a perfect golden crema. The cornerstone of all coffee drinks.",
    timesOrdered: 1243,
    imageUrl:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=500&auto=format&fit=crop",
  },
];

const FeaturedCoffees = () => {
  const [coffees, setCoffees] = useState<any[]>([]);

  useEffect(() => {
    const api = new CoffeeApi();
    const fetchCoffees = async () => {
      const data = await api.get<any[]>("/api/Recipe/Index");
      const coffeesData = await Promise.all(
        data.map(async (coffee: any) => {
          let timesOrdered = 0;
          try {
            const resp = await api.get<{ totalNumberOfUses: number }>(
              `/api/Statistics/Details/${coffee.id}`
            );
            timesOrdered = resp.totalNumberOfUses || 0;
          } catch (e) {
            // Optionally handle error
          }
          return {
            id: coffee.id,
            name: coffee.name,
            description: `A ${coffee.name} coffee with a unique blend of flavors.`,
            imageUrl: IMAGES[Math.floor(Math.random() * IMAGES.length)],
            timesOrdered,
          };
        })
      );
      setCoffees(coffeesData);
    };
    fetchCoffees();
  }, []);

  return (
    <section className="py-12 px-4 bg-purple-darker/80">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gradient">
            Most Popular Coffees
          </h2>
          <Link
            to="/orders"
            className="flex items-center text-gray-300 hover:text-purple-light gap-1"
          >
            See All <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coffees.map((coffee) => (
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
