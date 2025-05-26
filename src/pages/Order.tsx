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
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

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

  const handleOrderClick = (recipe: Recipe) => {
    // Check if user is logged in
    if (!user || !accessToken) {
      toast.error("You must be logged in to place an order.");
      navigate("/auth");
      return;
    }

    setSelectedRecipe(recipe);
    setShowConfirmDialog(true);
  };

  const handleConfirmOrder = async () => {
    if (!selectedRecipe || !accessToken) return;

    setIsPlacingOrder(true);
    try {
      const api = new CoffeeApi();
      await api.post(
        "/api/Orders/Create",
        {
          recipeId: selectedRecipe.id,
        },
        accessToken
      );

      toast.success(`Order placed for ${selectedRecipe.name}!`);
      setShowConfirmDialog(false);
      setSelectedRecipe(null);
    } catch (error) {
      console.error("Failed to place order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

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
              <Card
                key={recipe.id}
                className="glass-card hover:shadow-lg transition-all duration-300"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Coffee size={18} className="text-purple-light" />
                    {recipe.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recipe.description && (
                    <p className="text-sm text-gray-400">
                      {recipe.description}
                    </p>
                  )}
                  <Button
                    onClick={() => handleOrderClick(recipe)}
                    className="w-full bg-purple-medium hover:bg-purple-light"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Order Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Order Confirmation Dialog */}
        <AlertDialog
          open={showConfirmDialog}
          onOpenChange={setShowConfirmDialog}
        >
          <AlertDialogContent className="glass-card">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gradient">
                Confirm Your Order
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-300">
                Are you sure you want to order "{selectedRecipe?.name}"?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => setShowConfirmDialog(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
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
      </div>
    </div>
  );
};

export default Order;
