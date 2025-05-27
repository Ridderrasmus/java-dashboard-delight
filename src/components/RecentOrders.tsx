import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee } from "lucide-react";
import { CoffeeApi } from "@/apis/CoffeeApi";
import OrderCard from "./OrderCard";

const RecentOrders = () => {
  const [orders, setOrders] = useState<
    { id: number; name: string; date: string; status: number }[]
  >([]);

  useEffect(() => {
    const api = new CoffeeApi();
    api.get("/api/Orders/Index").then((data: any[]) => {
      setOrders(
        data.map((order: any) => ({
          id: order.id,
          name: order.recipe.name,
          date: new Date(order.orderDate).toLocaleString("da-DK", {
            timeZoneName: "short",
          }),
          status: order.hasBeenServed,
        }))
      );
    });
  }, []);

  return (
    <section className="py-12 bg-black/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gradient mb-6">
          Your Recent Orders
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentOrders;
