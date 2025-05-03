
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
    thumbnail: 'https://images.unsplash.com/photo-1607006344380-b6775a0824ce?q=80&w=1000',
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
        comment: 'I appreciated the cultural context and science behind the soap making. My family loves the soaps I've made from these recipes.',
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
        comment: 'This course changed my entire approach to jewelry making. The techniques are challenging but Nadia breaks everything down so well. My final piece is something I'm truly proud of.',
        date: 'April 23, 2023'
      },
      {
        name: 'Robert K.',
        avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
        rating: 5,
        comment: 'Worth every penny. The level of detail in the instructions and the cultural context make this course exceptional. I've taken many jewelry courses online and this is by far the best.',
        date: 'March 17, 2023'
      }
    ],
    isTrending: true
  }
];

export const digitalCourses: Course[] = [
  {
    id: 'digital-1',
    title: 'Digital Marketing for Local Businesses',
    description: 'Learn practical digital marketing skills tailored for small local businesses. This course covers social media strategy, content creation, email marketing, and basic SEO to help you establish an effective online presence without a big budget.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000',
    category: 'digital',
    level: 'beginner',
    price: 59.99,
    duration: '5 weeks',
    instructor: {
      name: 'Karim Fadel',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      title: 'Digital Marketing Consultant & Entrepreneur',
      bio: 'Karim has helped over 100 small businesses in Lebanon develop their digital presence. With a background in business and technology, he specializes in practical, affordable marketing strategies for local companies with limited resources.',
      coursesCount: 4,
      studentsCount: 978,
      reviewsCount: 432
    },
    rating: 4.7,
    reviews: 143,
    updatedAt: 'February 2023',
    studentsEnrolled: 354,
    learningObjectives: [
      'Build a complete digital marketing strategy for a small business',
      'Create engaging social media content for local audiences',
      'Set up and manage email marketing campaigns',
      'Implement basic SEO for local search visibility',
      'Measure results and adjust strategies with limited resources'
    ],
    requirements: [
      'Basic computer skills',
      'Access to a smartphone with camera',
      'Social media accounts (personal or business)',
      'No prior marketing experience needed'
    ],
    targetAudience: 'This course is ideal for small business owners, entrepreneurs, crafters selling products, or anyone managing marketing for a local business with limited resources who wants to establish an effective online presence.',
    modules: [
      {
        id: 'dg1-mod1',
        title: 'Digital Marketing Foundations',
        lessons: [
          { title: 'Understanding Your Local Market Online', type: 'video', duration: '25 min' },
          { title: 'Setting Clear Marketing Goals', type: 'video', duration: '20 min' },
          { title: 'Creating Your Customer Persona', type: 'assignment', duration: '45 min' }
        ],
        duration: '1 hour 30 min'
      },
      {
        id: 'dg1-mod2',
        title: 'Social Media for Local Businesses',
        lessons: [
          { title: 'Choosing the Right Platforms', type: 'video', duration: '30 min' },
          { title: 'Creating Engaging Local Content', type: 'video', duration: '40 min' },
          { title: 'Photography Tips for Products and Services', type: 'video', duration: '35 min' },
          { title: 'Building a Content Calendar', type: 'assignment', duration: '50 min' }
        ],
        duration: '2 hours 35 min'
      },
      {
        id: 'dg1-mod3',
        title: 'Email Marketing Essentials',
        lessons: [
          { title: 'Building Your First Email List', type: 'video', duration: '25 min' },
          { title: 'Email Marketing Tools on a Budget', type: 'video', duration: '20 min' },
          { title: 'Creating Effective Newsletters', type: 'video', duration: '35 min' },
          { title: 'Setting Up Automated Campaigns', type: 'video', duration: '30 min' }
        ],
        duration: '1 hour 50 min'
      },
      {
        id: 'dg1-mod4',
        title: 'Local SEO Fundamentals',
        lessons: [
          { title: 'Google My Business Setup', type: 'video', duration: '25 min' },
          { title: 'Local Keywords Research', type: 'video', duration: '30 min' },
          { title: 'Optimizing Your Website for Local Search', type: 'video', duration: '35 min' },
          { title: 'Online Reviews Management', type: 'video', duration: '20 min' }
        ],
        duration: '1 hour 50 min'
      }
    ],
    totalLessons: 15,
    ratingBreakdown: [
      { stars: 5, percentage: 75 },
      { stars: 4, percentage: 20 },
      { stars: 3, percentage: 4 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 0 }
    ],
    studentReviews: [
      {
        name: 'Hiba A.',
        avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
        rating: 5,
        comment: 'This course transformed my small bakery business! The social media strategy alone has increased my customers by 40%. Karim explains everything in simple terms that anyone can follow.',
        date: 'January 15, 2023'
      },
      {
        name: 'George M.',
        avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
        rating: 4,
        comment: 'Very practical course with immediately applicable advice. I especially appreciated the sections on budget-friendly tools and local SEO. Would recommend to any small business owner.',
        date: 'December 7, 2022'
      }
    ]
  },
  {
    id: 'digital-2',
    title: 'Web Design Fundamentals: Build Your First Website',
    description: 'Learn the essentials of web design and build your own responsive website from scratch. This course covers HTML, CSS, and basic principles of user experience design to help you create a professional-looking site without prior coding experience.',
    thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000',
    category: 'digital',
    level: 'beginner',
    price: 0,
    duration: '6 weeks',
    instructor: {
      name: 'Yasmine Nasrallah',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      title: 'Front-End Developer & Design Educator',
      bio: 'Yasmine has worked as a web developer for over 8 years and now focuses on teaching coding skills to beginners. She believes in making technology accessible to everyone and specializes in breaking down complex concepts into approachable lessons.',
      coursesCount: 7,
      studentsCount: 1245,
      reviewsCount: 687
    },
    rating: 4.8,
    reviews: 203,
    updatedAt: 'April 2023',
    studentsEnrolled: 542,
    learningObjectives: [
      'Understand the fundamentals of HTML and CSS',
      'Build a responsive website that works on mobile and desktop',
      'Learn basic design principles for effective web pages',
      'Create navigation, layouts, and incorporate images',
      'Publish your website online for free'
    ],
    requirements: [
      'A computer with internet access',
      'No prior coding experience necessary',
      'Text editor (free recommendations provided)',
      'Enthusiasm to learn new skills'
    ],
    targetAudience: 'This free course is perfect for complete beginners who want to learn web design, small business owners looking to create their own website, and anyone interested in understanding how websites work and are built.',
    modules: [
      {
        id: 'dg2-mod1',
        title: 'Web Design Basics',
        lessons: [
          { title: 'How Websites Work', type: 'video', duration: '20 min' },
          { title: 'Planning Your First Website', type: 'video', duration: '25 min' },
          { title: 'Design Principles for the Web', type: 'video', duration: '30 min' },
          { title: 'Website Planning Exercise', type: 'assignment', duration: '40 min' }
        ],
        duration: '1 hour 55 min'
      },
      {
        id: 'dg2-mod2',
        title: 'HTML Fundamentals',
        lessons: [
          { title: 'HTML Structure and Syntax', type: 'video', duration: '35 min' },
          { title: 'Creating Your First HTML Page', type: 'video', duration: '30 min' },
          { title: 'Working with Text and Links', type: 'video', duration: '25 min' },
          { title: 'Adding Images and Media', type: 'video', duration: '20 min' },
          { title: 'HTML Practice Project', type: 'assignment', duration: '1 hour' }
        ],
        duration: '2 hours 50 min'
      },
      {
        id: 'dg2-mod3',
        title: 'CSS Styling',
        lessons: [
          { title: 'CSS Basics and Syntax', type: 'video', duration: '35 min' },
          { title: 'Colors, Fonts and Text Styling', type: 'video', duration: '30 min' },
          { title: 'Layout and Positioning', type: 'video', duration: '40 min' },
          { title: 'Creating Responsive Designs', type: 'video', duration: '45 min' },
          { title: 'CSS Styling Exercise', type: 'assignment', duration: '1 hour' }
        ],
        duration: '3 hours 30 min'
      },
      {
        id: 'dg2-mod4',
        title: 'Building Your Complete Website',
        lessons: [
          { title: 'Creating a Navigation Menu', type: 'video', duration: '30 min' },
          { title: 'Building the Main Pages', type: 'video', duration: '45 min' },
          { title: 'Adding a Contact Form', type: 'video', duration: '25 min' },
          { title: 'Testing and Troubleshooting', type: 'video', duration: '20 min' },
          { title: 'Publishing Your Website', type: 'video', duration: '15 min' },
          { title: 'Final Project Submission', type: 'assignment', duration: '2 hours' }
        ],
        duration: '4 hours 15 min'
      }
    ],
    totalLessons: 20,
    ratingBreakdown: [
      { stars: 5, percentage: 85 },
      { stars: 4, percentage: 10 },
      { stars: 3, percentage: 3 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 1 }
    ],
    studentReviews: [
      {
        name: 'Rami S.',
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
        rating: 5,
        comment: 'I never thought I could build a website myself until I took this course! Yasmine explains everything so clearly, and I now have a professional-looking website for my small business.',
        date: 'March 18, 2023'
      },
      {
        name: 'Lina H.',
        avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
        rating: 5,
        comment: 'Amazing free resource! I've tried other coding courses before but always got stuck. The step-by-step approach here really worked for me, and I'm proud of the website I created.',
        date: 'February 5, 2023'
      }
    ],
    isTrending: true
  },
  {
    id: 'digital-3',
    title: 'UI/UX Design for Mobile Apps',
    description: 'Master the principles and practices of modern UI/UX design for mobile applications. Learn design thinking, wireframing, prototyping, and usability testing to create intuitive and engaging mobile experiences.',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000',
    category: 'digital',
    level: 'intermediate',
    price: 79.99,
    duration: '8 weeks',
    instructor: {
      name: 'Fadi Abou-Rizk',
      avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
      title: 'Senior UX Designer & App Developer',
      bio: 'Fadi has designed interfaces for over 30 mobile apps, including several award-winning applications. With 10+ years in the industry, he combines practical experience with a passion for teaching the next generation of designers.',
      coursesCount: 3,
      studentsCount: 753,
      reviewsCount: 329
    },
    rating: 4.9,
    reviews: 118,
    updatedAt: 'May 2023',
    studentsEnrolled: 267,
    learningObjectives: [
      'Understand core principles of mobile UI/UX design',
      'Master the design thinking process for mobile applications',
      'Create wireframes and interactive prototypes',
      'Conduct effective usability testing',
      'Build a professional UI/UX design portfolio'
    ],
    requirements: [
      'Basic design knowledge recommended but not required',
      'Access to a computer with internet',
      'Figma account (free version is sufficient)',
      'Smartphone for testing designs'
    ],
    targetAudience: 'This course is designed for aspiring UI/UX designers, web designers wanting to transition to mobile design, developers looking to improve their design skills, and entrepreneurs planning to create mobile apps.',
    modules: [
      {
        id: 'dg3-mod1',
        title: 'Foundations of Mobile UI/UX Design',
        lessons: [
          { title: 'Mobile Design: History and Evolution', type: 'video', duration: '25 min' },
          { title: 'UI vs. UX: Understanding the Difference', type: 'video', duration: '30 min' },
          { title: 'Mobile Design Principles', type: 'video', duration: '35 min' },
          { title: 'Platform Guidelines: iOS and Android', type: 'video', duration: '40 min' }
        ],
        duration: '2 hours 10 min'
      },
      {
        id: 'dg3-mod2',
        title: 'User Research & Design Thinking',
        lessons: [
          { title: 'Introduction to Design Thinking', type: 'video', duration: '30 min' },
          { title: 'User Research Methods for Mobile', type: 'video', duration: '45 min' },
          { title: 'Creating User Personas', type: 'video', duration: '25 min' },
          { title: 'User Journey Mapping', type: 'video', duration: '40 min' },
          { title: 'Design Challenge Exercise', type: 'assignment', duration: '1 hour 30 min' }
        ],
        duration: '3 hours 50 min'
      },
      {
        id: 'dg3-mod3',
        title: 'Wireframing & Information Architecture',
        lessons: [
          { title: 'Mobile Navigation Patterns', type: 'video', duration: '35 min' },
          { title: 'Information Architecture for Apps', type: 'video', duration: '40 min' },
          { title: 'Low-Fidelity Wireframing', type: 'video', duration: '30 min' },
          { title: 'Wireframing with Figma', type: 'video', duration: '45 min' },
          { title: 'App Wireframing Project', type: 'assignment', duration: '2 hours' }
        ],
        duration: '4 hours 30 min'
      },
      {
        id: 'dg3-mod4',
        title: 'UI Design & Visual Elements',
        lessons: [
          { title: 'Typography for Mobile Interfaces', type: 'video', duration: '30 min' },
          { title: 'Color Theory in Mobile Design', type: 'video', duration: '35 min' },
          { title: 'Iconography and Visual Elements', type: 'video', duration: '40 min' },
          { title: 'Design Systems for Mobile', type: 'video', duration: '50 min' },
          { title: 'UI Design Exercise', type: 'assignment', duration: '1 hour 30 min' }
        ],
        duration: '4 hours 5 min'
      },
      {
        id: 'dg3-mod5',
        title: 'Prototyping & User Testing',
        lessons: [
          { title: 'Interactive Prototyping in Figma', type: 'video', duration: '50 min' },
          { title: 'Micro-interactions and Animation', type: 'video', duration: '45 min' },
          { title: 'Usability Testing Methods', type: 'video', duration: '35 min' },
          { title: 'Analyzing Test Results', type: 'video', duration: '30 min' },
          { title: 'Final App Design Project', type: 'assignment', duration: '3 hours' }
        ],
        duration: '5 hours 40 min'
      }
    ],
    totalLessons: 24,
    ratingBreakdown: [
      { stars: 5, percentage: 90 },
      { stars: 4, percentage: 8 },
      { stars: 3, percentage: 2 },
      { stars: 2, percentage: 0 },
      { stars: 1, percentage: 0 }
    ],
    studentReviews: [
      {
        name: 'Zeina K.',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
        rating: 5,
        comment: 'This course took my design skills to another level. The practical approach and real-world examples helped me understand not just how to design mobile interfaces, but why certain designs work better than others.',
        date: 'April 12, 2023'
      },
      {
        name: 'Hassan M.',
        avatar: 'https://randomuser.me/api/portraits/men/18.jpg',
        rating: 5,
        comment: 'As a developer with little design experience, this course was exactly what I needed. Fadi breaks down complex concepts and provides actionable techniques. The portfolio project helped me land my first design job!',
        date: 'March 30, 2023'
      }
    ]
  }
];

export const trendingCourses: Course[] = [
  ...handmadeCourses.filter(course => course.isTrending),
  ...digitalCourses.filter(course => course.isTrending),
];
