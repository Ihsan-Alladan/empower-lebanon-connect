
import { Course } from '@/types/course';

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
      id: 'instructor-4', // Added instructor ID
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
      id: 'instructor-5', // Added instructor ID
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
        comment: 'Amazing free resource! I\'ve tried other coding courses before but always got stuck. The step-by-step approach here really worked for me, and I\'m proud of the website I created.',
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
      id: 'instructor-6', // Added instructor ID
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
