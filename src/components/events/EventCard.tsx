
import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Event } from '@/types/event';

interface EventCardProps {
  event: Event;
  onViewDetails: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onViewDetails }) => {
  const isUpcoming = new Date(event.date) >= new Date();
  const isPastEvent = new Date(event.date) < new Date();
  const isFullyBooked = event.registeredAttendees >= event.capacity;

  return (
    <Card className={`h-full overflow-hidden transition-all duration-300 ${isPastEvent ? 'opacity-80' : ''}`}>
      <div className="relative">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-48 object-cover"
        />
        {isPastEvent && (
          <div className="absolute top-0 inset-0 bg-black/30 flex items-center justify-center">
            <Badge variant="secondary" className="absolute top-2 right-2 bg-black/70 text-white">
              Event Completed
            </Badge>
          </div>
        )}
        <Badge 
          className={`absolute top-2 left-2 ${isUpcoming ? 'bg-empower-terracotta' : 'bg-gray-500'}`}
        >
          {event.category}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold line-clamp-2">{event.title}</h3>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pb-2">
        <p className="text-muted-foreground line-clamp-2">{event.description}</p>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4 text-empower-terracotta" />
          <span>{formatDate(new Date(event.date))}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4 text-empower-terracotta" />
          <span>{event.location}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {event.speakers.slice(0, 2).map((speaker, index) => (
            <Badge key={index} variant="outline" className="flex items-center gap-1">
              {speaker.name}
            </Badge>
          ))}
          {event.speakers.length > 2 && 
            <Badge variant="outline">+{event.speakers.length - 2} more</Badge>
          }
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="h-4 w-4 text-empower-terracotta" />
          <div className="w-full">
            {isFullyBooked ? (
              <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">
                Fully Booked
              </Badge>
            ) : (
              <div className="flex justify-between">
                <span>{event.registeredAttendees} / {event.capacity} registered</span>
                <span className="text-xs">
                  {Math.round((event.registeredAttendees / event.capacity) * 100)}% full
                </span>
              </div>
            )}
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
              <div 
                className="bg-empower-terracotta h-1.5 rounded-full" 
                style={{ width: `${Math.min(100, Math.round((event.registeredAttendees / event.capacity) * 100))}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          onClick={onViewDetails} 
          className="w-full"
          variant={isPastEvent ? "outline" : "default"}
        >
          {isPastEvent ? 'View Highlights' : 'View Details'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
