import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Coffee, ShoppingCart } from "lucide-react";
import { CoffeeApi } from "@/apis/CoffeeApi";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import CoffeeCard from "@/components/CoffeeCard";

interface Recipe {
  id: number;
  name: string;
  description?: string;
}

const Order = () => {
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch recipes from API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const api = new CoffeeApi();
        const data = await api.get<Recipe[]>("/api/Recipe/Index");
        setRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
        toast.error("Failed to load recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-darker via-black to-purple-darker flex items-center justify-center">
        <div className="text-center">
          <Coffee className="h-12 w-12 text-purple-light mx-auto mb-4 animate-spin" />
          <p className="text-gray-300">Loading recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-darker via-black to-purple-darker py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient mb-4">
            Place Your Order
          </h1>
          <p className="text-gray-300 text-lg">
            Choose from our delicious coffee recipes
          </p>
        </div>

        {recipes.length === 0 ? (
          <div className="text-center py-12">
            <Coffee className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No recipes available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <CoffeeCard
                key={recipe.id}
                id={recipe.id}
                name={recipe.name}
                description={recipe.description || ""}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
