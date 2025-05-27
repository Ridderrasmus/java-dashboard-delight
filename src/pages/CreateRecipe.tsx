import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Coffee } from "lucide-react";
import { CoffeeApi } from "@/apis/CoffeeApi";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateRecipe = () => {
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();
  const [recipeName, setRecipeName] = useState("");
  const [coffeeStrength, setCoffeeStrength] = useState([50]);
  const [waterAmount, setWaterAmount] = useState([30]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const api = new CoffeeApi();
      await api.post(
        "/api/Recipe/Create",
        {
          name: recipeName,
          ingredients: {
            1: coffeeStrength[0],
            3: waterAmount[0],
          },
        },
        accessToken
      );
      toast.success("Recipe created successfully!");
      setTimeout(() => navigate("/"), 1200);
    } catch (error) {
      toast.error("Failed to create recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gradient mb-8 flex items-center gap-3">
        <Coffee className="h-8 w-8 text-purple-light" />
        Create Your Custom Coffee Recipe
      </h1>

      <div className="max-w-2xl mx-auto">
        <Card className="glass-card">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-gradient">Recipe Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="recipe-name">Recipe Name</Label>
                <Input
                  id="recipe-name"
                  placeholder="My Perfect Coffee"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  required
                  className="bg-white/5 border-white/10 focus:border-purple-light"
                />
              </div>

              <div className="space-y-2">
                <Label>Instant Coffee Amount: ({coffeeStrength}g)</Label>
                <Slider
                  value={coffeeStrength}
                  onValueChange={setCoffeeStrength}
                  max={100}
                  step={5}
                  className="[&>[data-active]]:bg-purple-light"
                />
                <p className="text-sm text-muted-foreground">
                  {coffeeStrength[0] < 30
                    ? "Mild"
                    : coffeeStrength[0] < 60
                    ? "Medium"
                    : "Strong"}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Water Amount ({waterAmount}mL)</Label>
                <Slider
                  value={waterAmount}
                  onValueChange={setWaterAmount}
                  max={100}
                  step={1}
                  className="[&>[data-active]]:bg-purple-light"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                type="button"
                className="border-white/10 hover:bg-white/5"
                onClick={() => navigate("/")}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-medium hover:bg-purple-light"
                disabled={!recipeName || loading}
              >
                {loading ? "Saving..." : "Save Recipe"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateRecipe;
