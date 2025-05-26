import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBar, Coffee, User } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CoffeeApi } from "@/apis/CoffeeApi";
import { useAuth } from "@/lib/auth";
import { set } from "date-fns";

interface CoffeeData {
  name: string;
  totalNumberOfUses: number;
}

const Statistics = () => {
  const { user, accessToken } = useAuth();
  const [coffeeData, setCoffeeData] = useState<CoffeeData[]>([]);
  const [coffeesOrdered, setCoffeesOrdered] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [mostPopularTime, setMostPopularTime] = useState("8-9 AM");
  const [loading, setLoading] = useState(true);

  // Fill data with data from the API
  useEffect(() => {
    const fetchData = async () => {
      // Get the number of coffees ordered for each recipe
      try {
        const api = new CoffeeApi();
        const data = await api.get<CoffeeData[]>("/api/Statistics/Index");
        setCoffeeData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }

      // Get the total number of coffees ordered
      try {
        const api = new CoffeeApi();
        const totalCoffees = await api.get<number>(
          "/api/Statistics/TotalCoffeesOrdered"
        );
        setCoffeesOrdered(totalCoffees);
      } catch (error) {
        console.error("Failed to fetch total coffees ordered:", error);
      }

      // Get the total number of users
      try {
        const api = new CoffeeApi();
        const totalUsers = await api.get<number>("/api/Statistics/TotalUsers");
        setUsersCount(totalUsers);
      } catch (error) {
        console.error("Failed to fetch total users:", error);
      }

      // Get the most popular time for coffee orders
      try {
        const api = new CoffeeApi();
        const popularTime = await api.get<string>(
          "/api/Statistics/MostPopularTimes"
        );
        setMostPopularTime(popularTime);
      } catch (error) {
        console.error("Failed to fetch most popular time:", error);
      }

      setLoading(false);
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gradient mb-8">
        Coffee Statistics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Coffee className="h-5 w-5 text-purple-light" />
              Total Coffees Ordered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gradient">{coffeesOrdered}</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-purple-light" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gradient">{usersCount}</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <ChartBar className="h-5 w-5 text-purple-light" />
              Most Popular Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gradient">
              {mostPopularTime}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8 glass-card">
        <CardHeader>
          <CardTitle>Most Ordered Coffee Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={coffeeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" stroke="#9b87f5" />
                <YAxis stroke="#9b87f5" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A1F2C",
                    borderColor: "#9b87f5",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="totalNumberOfUses" fill="#9b87f5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;
