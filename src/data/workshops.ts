
import { Workshop } from '@/types/workshop';

// Helper to generate dates
const getDate = (daysFromNow: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString();
};

export const workshops: Workshop[] = [
  {
    id: '1',
    title: 'Traditional Lebanese Embroidery',
    description: 'Learn the art of traditional Lebanese embroidery techniques that have been passed down through generations. Create your own beautiful embroidered piece to take home.',
    date: getDate(7), // 7 days from now
    timeSlots: ['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM'],
    location: 'Beirut Cultural Center',
    instructor: 'Maria Khoury',
    category: 'handmade',
    imageUrl: '/lovable-uploads/9ccc3dc6-1453-4e2f-8240-babd3b2a121d.png',
    availableSeats: 8,
  },
  {
    id: '2',
    title: 'Web Development Basics',
    description: 'Get started with web development! Learn HTML, CSS, and basic JavaScript to build your first responsive website. Perfect for complete beginners.',
    date: getDate(14), // 14 days from now
    timeSlots: ['6:00 PM - 8:00 PM'],
    location: 'Online',
    instructor: 'Ahmed Hassan',
    category: 'tech',
    imageUrl: '/lovable-uploads/88cb08a3-5df1-4252-b772-5ebb5ed8b0d5.png',
    availableSeats: 15,
  },
  {
    id: '3',
    title: 'Lebanese Cuisine Masterclass',
    description: 'Learn to prepare authentic Lebanese dishes from scratch. This hands-on cooking workshop will cover popular favorites like tabbouleh, hummus, and kibbeh.',
    date: getDate(5), // 5 days from now
    timeSlots: ['11:00 AM - 2:00 PM'],
    location: 'Culinary Arts Center, Downtown',
    instructor: 'Chef Rania Abou',
    category: 'cooking',
    imageUrl: '/lovable-uploads/dccc32b9-798a-4692-9816-6e03d3cfedf2.png',
    availableSeats: 0, // Fully booked
  },
  {
    id: '4',
    title: 'Digital Marketing Strategy',
    description: 'Develop effective digital marketing strategies for your business. Learn about social media marketing, content creation, SEO basics, and digital advertising.',
    date: getDate(21), // 21 days from now
    timeSlots: ['9:00 AM - 4:00 PM'],
    location: 'Business Hub, Mar Mikhael',
    instructor: 'Layla Chehab',
    category: 'business',
    imageUrl: '/lovable-uploads/57514e04-8524-41e5-8cbd-c63693884459.png',
    availableSeats: 12,
  },
  {
    id: '5',
    title: 'Watercolor Painting Techniques',
    description: 'Explore various watercolor techniques in this relaxing art workshop. Suitable for all skill levels, materials provided.',
    date: getDate(3), // 3 days from now
    timeSlots: ['3:00 PM - 6:00 PM'],
    location: 'Art Space Gallery',
    instructor: 'Nour Karam',
    category: 'art',
    imageUrl: '/lovable-uploads/47bed620-a187-4c7f-aa12-2920437fa02a.png',
    availableSeats: 6,
  },
  {
    id: '6',
    title: 'Introduction to Arabic Calligraphy',
    description: 'Learn the basics of Arabic calligraphy in this hands-on workshop. Discover the beauty of Arabic script and create your own calligraphy piece.',
    date: getDate(-14), // 14 days ago (past workshop)
    timeSlots: ['10:00 AM - 1:00 PM'],
    location: 'Cultural Heritage Center',
    instructor: 'Karim Nassar',
    category: 'art',
    imageUrl: '/lovable-uploads/c9caa428-0f2f-4648-8934-29a619641101.png',
    availableSeats: 0,
  },
  {
    id: '7',
    title: 'Urban Photography Walk',
    description: 'Join us for a guided photography walk through the streets of Beirut. Learn composition techniques and capture the unique urban landscape.',
    date: getDate(10), // 10 days from now
    timeSlots: ['4:00 PM - 7:00 PM'],
    location: 'Meeting point: Martyrs\' Square',
    instructor: 'Ziad Doumani',
    category: 'art',
    imageUrl: '/lovable-uploads/f6ddb42e-7197-483b-b428-24ce8a62075d.png',
    availableSeats: 10,
  },
  {
    id: '8',
    title: 'Conversational Arabic for Beginners',
    description: 'Learn practical, everyday Arabic phrases and conversation skills in this interactive language workshop.',
    date: getDate(12), // 12 days from now
    timeSlots: ['5:30 PM - 7:30 PM', '8:00 PM - 10:00 PM'],
    location: 'Language Institute, Hamra',
    instructor: 'Yasmine Fakhry',
    category: 'language',
    imageUrl: '/lovable-uploads/22a31812-0de9-4dde-9442-b766171923c5.png',
    availableSeats: 8,
  },
  {
    id: '9',
    title: 'Sustainable Crafting: Upcycled Home Decor',
    description: 'Create beautiful home decor items using upcycled and repurposed materials. Learn sustainable crafting techniques that are good for the planet.',
    date: getDate(-7), // 7 days ago (past workshop)
    timeSlots: ['1:00 PM - 4:00 PM'],
    location: 'EcoSpace Workshop Center',
    instructor: 'Sarah Jaber',
    category: 'handmade',
    imageUrl: '/lovable-uploads/20ce0643-5492-4294-888b-72a0795637e8.png',
    availableSeats: 0,
  },
];
