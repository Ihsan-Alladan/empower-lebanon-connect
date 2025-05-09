
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Workshop } from '@/types/workshop';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface WorkshopCardProps {
  workshop: Workshop;
  onRegisterClick: () => void;
}

const WorkshopCard: React.FC<WorkshopCardProps> = ({ workshop, onRegisterClick }) => {
  const isFullyBooked = workshop.availableSeats === 0;
  const isPast = new Date(workshop.date) < new Date();
  
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="aspect-video w-full overflow-hidden relative">
        <img 
          src={workshop.imageUrl} 
          alt={workshop.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 z-10">
          <Badge 
            variant="outline"
            className={`
              ${isFullyBooked ? 'bg-red-100 text-red-800 border-red-200' : 
                isPast ? 'bg-gray-100 text-gray-800 border-gray-200' : 
                'bg-green-100 text-green-800 border-green-200'}
            `}
          >
            {isFullyBooked ? 'Fully Booked' : isPast ? 'Completed' : `${workshop.availableSeats} seats left`}
          </Badge>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <Badge className="bg-empower-terracotta border-none">{workshop.category}</Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{workshop.title}</CardTitle>
        <CardDescription className="flex items-center gap-1 mt-2">
          <User size={16} className="text-muted-foreground" />
          <span>{workshop.instructor}</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-0 flex-grow">
        <p className="text-sm line-clamp-2 mb-4">{workshop.description}</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar size={16} />
            <span>{formatDate(new Date(workshop.date))}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={16} />
            <span>{workshop.location}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4">
        <Button 
          className="w-full bg-empower-terracotta hover:bg-empower-terracotta/90 transition-all duration-300"
          disabled={isFullyBooked || isPast}
          onClick={onRegisterClick}
        >
          {isFullyBooked ? 'Fully Booked' : isPast ? 'Workshop Ended' : 'Register Now'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkshopCard;
