
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Coffee } from 'lucide-react';

const CreateRecipe = () => {
  const [recipeName, setRecipeName] = useState('');
  const [coffeeStrength, setCoffeeStrength] = useState([50]);
  const [milkAmount, setMilkAmount] = useState([30]);
  const [temperature, setTemperature] = useState([80]);
  const [addSugar, setAddSugar] = useState(false);
  const [sugarAmount, setSugarAmount] = useState([20]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the recipe creation
    console.log({
      recipeName,
      coffeeStrength: coffeeStrength[0],
      milkAmount: milkAmount[0],
      temperature: temperature[0],
      addSugar,
      sugarAmount: addSugar ? sugarAmount[0] : 0
    });
    alert('Recipe saved! You can now find it in your recipes.');
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
                <Label>Coffee Strength ({coffeeStrength}%)</Label>
                <Slider 
                  value={coffeeStrength} 
                  onValueChange={setCoffeeStrength} 
                  max={100} 
                  step={1}
                  className="[&>[data-active]]:bg-purple-light"
                />
                <p className="text-sm text-muted-foreground">
                  {coffeeStrength[0] < 30 ? 'Mild' : coffeeStrength[0] < 60 ? 'Medium' : 'Strong'}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Milk Amount ({milkAmount}%)</Label>
                <Slider 
                  value={milkAmount} 
                  onValueChange={setMilkAmount} 
                  max={100} 
                  step={1}
                  className="[&>[data-active]]:bg-purple-light"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Temperature ({temperature}°C)</Label>
                <Slider 
                  value={temperature} 
                  onValueChange={setTemperature} 
                  min={60} 
                  max={95} 
                  step={1}
                  className="[&>[data-active]]:bg-purple-light"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="add-sugar" 
                  checked={addSugar}
                  onCheckedChange={setAddSugar}
                  className="data-[state=checked]:bg-purple-light"
                />
                <Label htmlFor="add-sugar">Add Sugar</Label>
              </div>
              
              {addSugar && (
                <div className="space-y-2 pl-6">
                  <Label>Sugar Amount ({sugarAmount}%)</Label>
                  <Slider 
                    value={sugarAmount} 
                    onValueChange={setSugarAmount} 
                    max={100} 
                    step={1}
                    disabled={!addSugar}
                    className="[&>[data-active]]:bg-purple-light"
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" className="border-white/10 hover:bg-white/5">Cancel</Button>
              <Button 
                type="submit" 
                className="bg-purple-medium hover:bg-purple-light"
                disabled={!recipeName}
              >
                Save Recipe
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateRecipe;
