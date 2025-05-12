import { Course } from '@/types/course';

export const handmadeCourses: Course[] = [
  {
    id: 'handmade-1',
    title: 'Traditional Lebanese Embroidery: Patterns & Techniques',
    description: 'Learn the art of traditional Lebanese embroidery with its intricate patterns and rich cultural history. This course will guide you through the techniques used for generations, helping you create beautiful pieces that tell stories of heritage.',
    thumbnail: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=1000',
    category: 'handmade',
    level: 'beginner',
    price: 49.99,
    duration: '6 weeks',
    instructor: {
      name: 'Layla Hakim',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      title: 'Master Artisan & Cultural Preservationist',
      bio: 'With over 20 years of experience in traditional Lebanese crafts, Layla has dedicated her life to preserving and teaching cultural handcrafts. Her work has been featured in national museums and international exhibitions.',
      coursesCount: 5,
      studentsCount: 847,
      reviewsCount: 423
    },
    rating: 4.8,
    reviews: 156,
    updatedAt: 'April 2023',
    studentsEnrolled: 312,
    learningObjectives: [
      'Master traditional Lebanese embroidery stitches and patterns',
      'Understand the cultural significance and history of the craft',
      'Create your own embroidered pieces using authentic techniques',
      'Apply modern touches to traditional designs',
      'Learn how to source and select quality materials'
    ],
    requirements: [
      'No prior experience required',
      'Basic sewing kit (list provided in first lesson)',
      'Enthusiasm for learning traditional crafts'
    ],
    targetAudience: 'This course is perfect for beginners interested in traditional crafts, cultural preservation enthusiasts, and anyone looking to connect with Lebanese heritage through hands-on creativity.',
    modules: [
      {
        id: 'hm1-mod1',
        title: 'Introduction to Lebanese Embroidery',
        lessons: [
          { title: 'The Cultural Heritage of Lebanese Needlework', type: 'video', duration: '15 min' },
          { title: 'Essential Tools and Materials', type: 'video', duration: '20 min' },
          { title: 'Setting Up Your Workspace', type: 'video', duration: '10 min' }
        ],
        duration: '45 min'
      },
      {
        id: 'hm1-mod2',
        title: 'Basic Stitches and Techniques',
        lessons: [
          { title: 'The Cross Stitch Fundamentals', type: 'video', duration: '25 min' },
          { title: 'Couching and Surface Stitches', type: 'video', duration: '30 min' },
          { title: 'Practice Session', type: 'assignment', duration: '1 hour' }
        ],
        duration: '1 hour 55 min'
      },
      {
        id: 'hm1-mod3',
        title: 'Traditional Patterns',
        lessons: [
          { title: 'Geometric Motifs of Mountain Villages', type: 'video', duration: '35 min' },
          { title: 'Floral Designs of Coastal Regions', type: 'video', duration: '30 min' },
          { title: 'Pattern Analysis and Practice', type: 'assignment', duration: '1 hour' }
        ],
        duration: '2 hours 5 min'
      }
    ],
    totalLessons: 9,
    ratingBreakdown: [
      { stars: 5, percentage: 75 },
      { stars: 4, percentage: 18 },
      { stars: 3, percentage: 5 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 1 }
    ],
    studentReviews: [
      {
        name: 'Sara K.',
        avatar: 'https://randomuser.me/api/portraits/women/34.jpg',
        rating: 5,
        comment: 'This course brought me closer to my Lebanese heritage! Layla is an amazing instructor who makes even the most complex stitches seem achievable.',
        date: 'March 15, 2023'
      },
      {
        name: 'Michael T.',
        avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
        rating: 4,
        comment: 'I had no experience with embroidery but wanted to learn about Lebanese crafts. This course was perfect - clear instructions and rich cultural context.',
        date: 'February 28, 2023'
      }
    ],
    isTrending: true
  },
  {
    id: 'handmade-2',
    title: 'Natural Soap Making with Lebanese Cedar',
    description: 'Create luxurious handmade soaps using traditional Lebanese ingredients like cedar oil, olive oil, and local herbs. Learn formulation, curing techniques, and packaging to create beautiful artisanal products.',
    thumbnail: '/lovable-uploads/lovable-uploads/2.webp', // Updated image
    category: 'handmade',
    level: 'intermediate',
    price: 39.99,
    duration: '4 weeks',
    instructor: {
      name: 'Omar Nassar',
      avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
      title: 'Artisanal Soap Maker & Herbalist',
      bio: 'Omar runs a successful natural soap business in the mountains of Lebanon. With a background in chemistry and traditional herbal medicine, he combines science and tradition to create effective, beautiful soaps using local ingredients.',
      coursesCount: 3,
      studentsCount: 561,
      reviewsCount: 248
    },
    rating: 4.7,
    reviews: 89,
    updatedAt: 'January 2023',
    studentsEnrolled: 214,
    learningObjectives: [
      'Understand the science behind natural soap making',
      'Master cold-process soap making techniques',
      'Work with Lebanese cedar oil and other local ingredients',
      'Create your own unique soap formulations',
      'Learn proper curing, cutting and packaging methods'
    ],
    requirements: [
      'Basic understanding of kitchen safety',
      'Soap making supplies (detailed list provided)',
      'Protective equipment for handling lye'
    ],
    targetAudience: 'This course is ideal for intermediate crafters looking to expand into natural body products, those interested in traditional Lebanese ingredients, and entrepreneurs considering starting a small soap business.',
    modules: [
      {
        id: 'hm2-mod1',
        title: 'Introduction to Natural Soap Making',
        lessons: [
          { title: 'The History of Soap Making in Lebanon', type: 'video', duration: '18 min' },
          { title: 'Understanding Ingredients and Safety', type: 'video', duration: '25 min' },
          { title: 'Equipment and Setup', type: 'video', duration: '15 min' }
        ],
        duration: '58 min'
      },
      {
        id: 'hm2-mod2',
        title: 'Cold Process Method',
        lessons: [
          { title: 'Preparing Oils and Lye Solution', type: 'video', duration: '30 min' },
          { title: 'Combining and Reaching Trace', type: 'video', duration: '25 min' },
          { title: 'Adding Lebanese Cedar Oil and Herbs', type: 'video', duration: '20 min' },
          { title: 'Molding and Initial Curing', type: 'video', duration: '15 min' }
        ],
        duration: '1 hour 30 min'
      },
      {
        id: 'hm2-mod3',
        title: 'Cutting, Curing and Packaging',
        lessons: [
          { title: 'When and How to Cut Your Soap', type: 'video', duration: '20 min' },
          { title: 'The Curing Process', type: 'video', duration: '15 min' },
          { title: 'Testing Your Soap', type: 'assignment', duration: '30 min' },
          { title: 'Artisanal Packaging Methods', type: 'video', duration: '25 min' }
        ],
        duration: '1 hour 30 min'
      }
    ],
    totalLessons: 11,
    ratingBreakdown: [
      { stars: 5, percentage: 80 },
      { stars: 4, percentage: 15 },
      { stars: 3, percentage: 3 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 1 }
    ],
    studentReviews: [
      {
        name: 'Diana L.',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        rating: 5,
        comment: 'The cedar soap I made from this course has become my signature product in my small business. Omar explains everything so clearly!',
        date: 'December 12, 2022'
      },
      {
        name: 'Ahmed R.',
        avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
        rating: 5,
        comment: 'I appreciated the cultural context and science behind the soap making. My family loves the soaps I\'ve made from these recipes.',
        date: 'November 5, 2022'
      }
    ]
  },
  {
    id: 'handmade-3',
    title: 'Lebanese Jewelry Making: Silver Filigree Techniques',
    description: 'Master the delicate art of silver filigree jewelry making, a traditional Lebanese craft dating back centuries. Learn to create intricate designs with fine silver wire through hands-on projects and expert guidance.',
    thumbnail: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=1000',
    category: 'handmade',
    level: 'advanced',
    price: 79.99,
    duration: '8 weeks',
    instructor: {
      name: 'Nadia Khoury',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      title: 'Master Silversmith & Jewelry Designer',
      bio: 'Nadia comes from a family of silversmiths with over three generations of expertise. Her work combines traditional Lebanese filigree techniques with contemporary designs, and she has exhibited her pieces internationally.',
      coursesCount: 4,
      studentsCount: 328,
      reviewsCount: 185
    },
    rating: 4.9,
    reviews: 67,
    updatedAt: 'May 2023',
    studentsEnrolled: 98,
    learningObjectives: [
      'Master the fundamentals of silver filigree technique',
      'Learn proper tool handling and safety for metalworking',
      'Create intricate patterns using fine silver wire',
      'Design and complete several jewelry pieces',
      'Understand finishing and polishing techniques'
    ],
    requirements: [
      'Previous experience with basic jewelry making',
      'Specialized tools (detailed list will be provided)',
      'Workspace with good ventilation',
      'Patience for detailed work'
    ],
    targetAudience: 'This advanced course is designed for experienced crafters, jewelry makers looking to expand their skills, and artists interested in preserving this traditional Lebanese craft while creating beautiful pieces.',
    modules: [
      {
        id: 'hm3-mod1',
        title: 'Introduction to Lebanese Filigree',
        lessons: [
          { title: 'Historical Context and Cultural Significance', type: 'video', duration: '22 min' },
          { title: 'Tools and Materials Overview', type: 'video', duration: '30 min' },
          { title: 'Workspace Setup for Metalworking', type: 'video', duration: '15 min' }
        ],
        duration: '1 hour 7 min'
      },
      {
        id: 'hm3-mod2',
        title: 'Silver Wire Preparation',
        lessons: [
          { title: 'Selecting and Testing Silver Quality', type: 'video', duration: '18 min' },
          { title: 'Drawing and Preparing Wire', type: 'video', duration: '35 min' },
          { title: 'Creating Filigree Elements', type: 'video', duration: '40 min' },
          { title: 'First Practice Project', type: 'assignment', duration: '1 hour 30 min' }
        ],
        duration: '3 hours 3 min'
      },
      {
        id: 'hm3-mod3',
        title: 'Traditional Patterns and Designs',
        lessons: [
          { title: 'Geometric Motifs in Lebanese Jewelry', type: 'video', duration: '25 min' },
          { title: 'Floral and Nature-Inspired Designs', type: 'video', duration: '30 min' },
          { title: 'Creating a Framework', type: 'video', duration: '45 min' },
          { title: 'Filling with Filigree', type: 'video', duration: '50 min' }
        ],
        duration: '2 hours 30 min'
      },
      {
        id: 'hm3-mod4',
        title: 'Completing Your Piece',
        lessons: [
          { title: 'Soldering Techniques for Filigree', type: 'video', duration: '40 min' },
          { title: 'Cleaning and Polishing', type: 'video', duration: '25 min' },
          { title: 'Adding Findings and Finishing', type: 'video', duration: '30 min' },
          { title: 'Final Project Submission', type: 'assignment', duration: '2 hours' }
        ],
        duration: '3 hours 35 min'
      }
    ],
    totalLessons: 15,
    ratingBreakdown: [
      { stars: 5, percentage: 92 },
      { stars: 4, percentage: 6 },
      { stars: 3, percentage: 2 },
      { stars: 2, percentage: 0 },
      { stars: 1, percentage: 0 }
    ],
    studentReviews: [
      {
        name: 'Julia M.',
        avatar: 'https://randomuser.me/api/portraits/women/52.jpg',
        rating: 5,
        comment: 'This course changed my entire approach to jewelry making. The techniques are challenging but Nadia breaks everything down so well. My final piece is something I\'m truly proud of.',
        date: 'April 23, 2023'
      },
      {
        name: 'Robert K.',
        avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
        rating: 5,
        comment: 'Worth every penny. The level of detail in the instructions and the cultural context make this course exceptional. I\'ve taken many jewelry courses online and this is by far the best.',
        date: 'March 17, 2023'
      }
    ],
    isTrending: true
  }
];
