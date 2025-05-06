
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coffee } from 'lucide-react';

interface CoffeeCardProps {
  name: string;
  description: string;
  timesOrdered: number;
  imageUrl: string;
}

const CoffeeCard = ({ name, description, timesOrdered, imageUrl }: CoffeeCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in glass-card">
      <div className="h-40 overflow-hidden">
        <img 
          src={imageUrl} 
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
        <p className="text-xs mt-2 text-purple-light">Ordered {timesOrdered} times</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-purple-medium hover:bg-purple-light">
          Order Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CoffeeCard;
