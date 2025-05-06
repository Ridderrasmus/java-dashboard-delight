
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedCoffees from '@/components/FeaturedCoffees';
import RecentOrders from '@/components/RecentOrders';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-purple-darker">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedCoffees />
        <RecentOrders />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
