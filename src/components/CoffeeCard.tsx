
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coffee, ShoppingCart } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { CoffeeApi } from "@/apis/CoffeeApi";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

interface CoffeeCardProps {
  id: number;
  name: string;
  description: string;
  timesOrdered?: number;
}

const IMAGES = [
  "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1561047029-3000c68339ca?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=500&auto=format&fit=crop",
];

const CoffeeCard = ({
  id,
  name,
  description,
  timesOrdered,
}: CoffeeCardProps) => {
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handleOrderClick = () => {
    if (!user || !accessToken) {
      toast.error("You must be logged in to place an order.");
      navigate("/auth");
      return;
    }
    setShowConfirmDialog(true);
  };

  const handleConfirmOrder = async () => {
    if (!accessToken) return;
    setIsPlacingOrder(true);
    try {
      const api = new CoffeeApi();
      await api.post("/api/Orders/Create", { recipeId: id }, accessToken);
      toast.success(`Order placed for ${name}!`);
      setShowConfirmDialog(false);
    } catch (error) {
      console.error("Failed to place order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in glass-card">
        <div className="h-40 overflow-hidden">
          <img
            src={IMAGES[Math.floor(Math.random() * IMAGES.length)]}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Coffee size={18} className="text-purple-light" />
            {name}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
          {typeof timesOrdered === "number" && (
            <p className="text-xs mt-2 text-purple-light">
              Ordered {timesOrdered} times
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-purple-medium hover:bg-purple-light"
            onClick={handleOrderClick}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Order Now
          </Button>
        </CardFooter>
      </Card>
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="bg-gray-900/95 backdrop-blur-lg border border-purple-light/20 shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gradient text-xl">
              Confirm Your Order
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300 text-base">
              Are you sure you want to order "{name}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setShowConfirmDialog(false)}
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-gray-800/50"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmOrder}
              disabled={isPlacingOrder}
              className="bg-purple-medium hover:bg-purple-light"
            >
              {isPlacingOrder ? "Placing Order..." : "Confirm Order"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CoffeeCard;
