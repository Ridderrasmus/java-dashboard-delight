import React, { useState, useEffect } from "react";
import WaterLevelDisplay from "./WaterLevelDisplay";
import CoffeeLevelDisplay from "./CoffeeLevelDisplay";
import { CoffeeApi } from "@/apis/CoffeeApi";

const MachineLevels = () => {
  const [waterLevel, setWaterLevel] = useState(75); // Default value
  const [coffeeLevel, setCoffeeLevel] = useState(60); // Default value
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const api = new CoffeeApi();

        // Try to fetch actual levels from API
        // Replace with actual API endpoints when available
        try {
          const waterData = await api.get<number>(
            "/api/Measurements/WaterLevel"
          );
          setWaterLevel(waterData);
        } catch (error) {
          console.log("Water level API not available, using mock data");
          // Mock data for demonstration - simulate varying levels
          setWaterLevel(Math.floor(Math.random() * 40) + 60);
        }

        try {
          const coffeeData = await api.get<number>(
            "/api/Measurements/CoffeeLevel"
          );
          setCoffeeLevel(coffeeData);
        } catch (error) {
          console.log("Coffee level API not available, using mock data");
          // Mock data for demonstration - simulate varying levels
          setCoffeeLevel(Math.floor(Math.random() * 50) + 40);
        }
      } catch (error) {
        console.error("Failed to fetch machine levels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLevels();

    // Refresh levels every 30 seconds
    const interval = setInterval(fetchLevels, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-lg text-muted-foreground">
              Loading machine status...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gradient mb-6 text-center">
          Machine Status
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md mx-auto">
          <WaterLevelDisplay level={waterLevel} />
          <CoffeeLevelDisplay level={coffeeLevel} />
        </div>

        {(waterLevel < 20 || coffeeLevel < 20) && (
          <div className="mt-6 text-center">
            <p className="text-red-400 font-medium">
              ⚠️ Machine needs attention - low levels detected
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MachineLevels;
