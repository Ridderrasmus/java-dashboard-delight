
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedCoffees from '@/components/FeaturedCoffees';
import RecentOrders from '@/components/RecentOrders';
import MachineLevels from '@/components/MachineLevels';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-purple-darker">
      <Navbar />
      <main className="flex-grow pt-24"> {/* Added padding-top to account for fixed navbar */}
        <HeroSection />
        <MachineLevels />
        <FeaturedCoffees />
        <RecentOrders />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
