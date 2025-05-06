
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
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in">
      <div className="h-40 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Coffee size={18} className="text-coffee-darker" />
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <p className="text-xs mt-2 text-coffee-dark">Ordered {timesOrdered} times</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-coffee-dark hover:bg-coffee-darker">
          Order Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CoffeeCard;
