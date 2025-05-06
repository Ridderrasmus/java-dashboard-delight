
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coffee } from 'lucide-react';

const RECENT_ORDERS = [
  {
    id: 1,
    name: "Vanilla Latte",
    date: "Today, 8:45 AM",
    status: "Completed"
  },
  {
    id: 2,
    name: "Double Espresso",
    date: "Yesterday, 3:20 PM",
    status: "Completed"
  },
  {
    id: 3,
    name: "Custom Mocha",
    date: "May 5, 9:15 AM",
    status: "Completed"
  }
];

const RecentOrders = () => {
  return (
    <section className="py-12 bg-coffee-light/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-coffee-darker mb-6">Your Recent Orders</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RECENT_ORDERS.map((order) => (
            <Card key={order.id} className="animate-slide-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between">
                  <span className="flex items-center gap-2">
                    <Coffee size={18} className="text-coffee-dark" />
                    {order.name}
                  </span>
                  <span className="text-sm bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    {order.status}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{order.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentOrders;
