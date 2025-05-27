
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBar, Coffee, User, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import { CoffeeApi } from "@/apis/CoffeeApi";
import { useAuth } from "@/lib/auth";

interface CoffeeData {
  name: string;
  totalNumberOfUses: number;
}

interface TimeSeriesData {
  date: string;
  orders: number;
  users: number;
}

const Statistics = () => {
  const { user, accessToken } = useAuth();
  const [coffeeData, setCoffeeData] = useState<CoffeeData[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
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

      // Get time series data (mock data for now since API endpoint doesn't exist)
      try {
        // This would be replaced with actual API call when endpoint is available
        // const api = new CoffeeApi();
        // const timeData = await api.get<TimeSeriesData[]>("/api/Statistics/TimeSeries");
        
        // Mock data for demonstration
        const mockTimeSeriesData: TimeSeriesData[] = [
          { date: "2024-01-01", orders: 45, users: 12 },
          { date: "2024-01-02", orders: 52, users: 15 },
          { date: "2024-01-03", orders: 38, users: 10 },
          { date: "2024-01-04", orders: 61, users: 18 },
          { date: "2024-01-05", orders: 55, users: 16 },
          { date: "2024-01-06", orders: 67, users: 20 },
          { date: "2024-01-07", orders: 43, users: 13 },
        ];
        setTimeSeriesData(mockTimeSeriesData);
      } catch (error) {
        console.error("Failed to fetch time series data:", error);
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
          <CardTitle>Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="popular" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="popular" className="flex items-center gap-2">
                <ChartBar className="h-4 w-4" />
                Most Ordered Types
              </TabsTrigger>
              <TabsTrigger value="trends" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Trends Over Time
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="popular" className="mt-6">
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
            </TabsContent>
            
            <TabsContent value="trends" className="mt-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={timeSeriesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#9b87f5"
                      tickFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <YAxis stroke="#9b87f5" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1A1F2C",
                        borderColor: "#9b87f5",
                        color: "#fff",
                      }}
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <Area
                      type="monotone"
                      dataKey="orders"
                      stackId="1"
                      stroke="#9b87f5"
                      fill="#9b87f5"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stackId="1"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;
