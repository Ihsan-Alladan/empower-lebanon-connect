
export type EventCategory = 'social' | 'educational' | 'fundraising' | 'workshop' | 'networking' | 'community' | 'career';

export interface Speaker {
  name: string;
  title: string;
  bio?: string;
  imageUrl?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registeredAttendees: number;
  category: EventCategory;
  imageUrl: string;
  images: string[];
  speakers: Speaker[];
  highlights?: string[];
}
