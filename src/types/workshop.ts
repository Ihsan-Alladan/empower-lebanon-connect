
export type WorkshopCategory = 'handmade' | 'tech' | 'cooking' | 'art' | 'business' | 'language';

export interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string;
  timeSlots?: string[];
  location: string;
  instructor: string;
  category: WorkshopCategory;
  imageUrl: string;
  availableSeats: number;
}
