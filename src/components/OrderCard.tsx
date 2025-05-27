import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Coffee } from "lucide-react";
import OrderStatus from "@/components/OrderStatus";

const OrderCard = ({ order }: { order: any }) => {
  return (
    <Card className="animate-slide-in glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between">
          <span className="flex items-center gap-2">
            <Coffee size={18} className="text-purple-light" />
            {order.name}
          </span>
          <OrderStatus status={order.status} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-400">{order.date}</p>
      </CardContent>
    </Card>
  );
};
export default OrderCard;
