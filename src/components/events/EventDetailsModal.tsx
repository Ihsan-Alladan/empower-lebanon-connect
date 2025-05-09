
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, Share2, Facebook, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/lib/utils';
import { Event } from '@/types/event';
import { useToast } from '@/hooks/use-toast';

interface EventDetailsModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, isOpen, onClose }) => {
  const { toast } = useToast();
  const [isRegistering, setIsRegistering] = useState(false);
  
  if (!event) return null;
  
  const isUpcoming = new Date(event.date) >= new Date();
  const isFullyBooked = event.registeredAttendees >= event.capacity;
  
  const handleRegister = () => {
    setIsRegistering(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRegistering(false);
      toast({
        title: "Registration successful!",
        description: `You've registered for ${event.title}. Check your email for details.`,
        variant: "default",
      });
      onClose();
    }, 1500);
  };
  
  const handleShare = (platform: 'facebook' | 'whatsapp' | 'email') => {
    const message = `Check out this event: ${event.title}`;
    let url = '';
    
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(message + ' ' + window.location.href)}`;
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent(event.title)}&body=${encodeURIComponent(message + ' ' + window.location.href)}`;
        break;
    }
    
    window.open(url, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>
            <Badge className="mt-1">{event.category}</Badge>
          </DialogDescription>
        </DialogHeader>
        
        {/* Event Images */}
        <Carousel className="w-full">
          <CarouselContent>
            {event.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="overflow-hidden rounded-lg">
                    <img 
                      src={image} 
                      alt={`${event.title} - image ${index + 1}`} 
                      className="h-56 w-full object-cover"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center gap-2 mt-2">
            <CarouselPrevious className="relative -left-0" />
            <CarouselNext className="relative -right-0" />
          </div>
        </Carousel>
        
        {/* Event Details */}
        <div className="space-y-4">
          <p>{event.description}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-empower-terracotta" />
              <span>{formatDate(new Date(event.date))}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-empower-terracotta" />
              <span>{event.time}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-empower-terracotta" />
              <span>{event.location}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-empower-terracotta" />
              <span>
                {event.registeredAttendees} / {event.capacity} registered
              </span>
            </div>
          </div>
          
          {/* Speakers */}
          <div className="pt-2">
            <h4 className="text-lg font-semibold mb-2">Speakers</h4>
            <div className="space-y-4">
              {event.speakers.map((speaker, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <img 
                    src={speaker.imageUrl || 'https://via.placeholder.com/50'} 
                    alt={speaker.name} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{speaker.name}</p>
                    <p className="text-sm text-muted-foreground">{speaker.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {isUpcoming && (
            <>
              <Separator />
              
              {/* Registration */}
              <div>
                <Button 
                  className="w-full" 
                  disabled={isFullyBooked || isRegistering}
                  onClick={handleRegister}
                >
                  {isRegistering ? 'Registering...' : isFullyBooked ? 'Fully Booked' : 'Register Now'}
                </Button>
              </div>
            </>
          )}
          
          {/* Share buttons */}
          <div className="flex justify-center gap-2 pt-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleShare('facebook')}
            >
              <Facebook className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleShare('whatsapp')}
            >
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.18 2.095 3.195 5.076 4.483.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleShare('email')}
            >
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsModal;
