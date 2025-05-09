
import { Event } from '@/types/event';

// Function to get a random date in the future (for upcoming events)
const getRandomFutureDate = (daysAhead = 60) => {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + Math.floor(Math.random() * daysAhead) + 1);
  return futureDate.toISOString().split('T')[0];
};

// Function to get a random date in the past (for past events)
const getRandomPastDate = (daysBefore = 60) => {
  const today = new Date();
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - Math.floor(Math.random() * daysBefore) - 1);
  return pastDate.toISOString().split('T')[0];
};

export const events: Event[] = [
  {
    id: "evt-001",
    title: "Women in Tech Conference",
    description: "Join us for an inspiring day of talks, networking, and workshops focused on empowering women in the technology sector. Hear from industry leaders, participate in skill-building sessions, and connect with peers.",
    date: getRandomFutureDate(30),
    time: "9:00 AM - 5:00 PM",
    location: "Beirut Digital District, Lebanon",
    capacity: 150,
    registeredAttendees: 120,
    category: "educational",
    imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    speakers: [
      {
        name: "Sarah Johnson",
        title: "CTO, Tech Innovations",
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Mariam Khalil",
        title: "Lead Developer, Cloud Solutions",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "evt-002",
    title: "Community Cleanup Day",
    description: "Join EmpowEra for our monthly community cleanup initiative. Together, we'll work to beautify local neighborhoods, collect recyclables, and make our community a cleaner place for everyone.",
    date: getRandomFutureDate(15),
    time: "8:00 AM - 12:00 PM",
    location: "Raouche Beach, Beirut",
    capacity: 50,
    registeredAttendees: 50,
    category: "community",
    imageUrl: "https://images.unsplash.com/photo-1618477462397-5f8e2490a63a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1618477462397-5f8e2490a63a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1554224155-8d04cb21ed1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    ],
    speakers: [
      {
        name: "Omar Farid",
        title: "Environmental Activist",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "evt-003",
    title: "Entrepreneurship Summit",
    description: "A dynamic gathering of entrepreneurs, investors, and business leaders discussing innovation, funding strategies, and growth opportunities in Lebanon's startup ecosystem.",
    date: getRandomFutureDate(45),
    time: "10:00 AM - 6:00 PM",
    location: "Four Seasons Hotel, Beirut",
    capacity: 200,
    registeredAttendees: 145,
    category: "networking",
    imageUrl: "https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1545239351-ef35f43d514b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    speakers: [
      {
        name: "Hassan Malaeb",
        title: "Founder & CEO, TechLeap",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Nour Amiri",
        title: "Partner, Venture Capital Fund",
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "David Chen",
        title: "International Business Consultant",
        imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "evt-004",
    title: "Traditional Crafts Festival",
    description: "Celebrate Lebanon's rich cultural heritage through a showcase of traditional crafts, including pottery, weaving, and woodwork. Meet local artisans and learn about their techniques.",
    date: getRandomPastDate(30),
    time: "11:00 AM - 8:00 PM",
    location: "Byblos Old Souks",
    capacity: 300,
    registeredAttendees: 280,
    category: "social",
    imageUrl: "https://images.unsplash.com/photo-1604145559206-e3bce0040e2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1604145559206-e3bce0040e2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1529066792305-5e4efa40fde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1606722590198-d3e7671382be?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    speakers: [
      {
        name: "Fatima Khoury",
        title: "Master Weaver",
        imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      }
    ],
    highlights: [
      "Over 30 artisans showcased their work",
      "Hands-on workshops attended by 150+ participants",
      "Traditional music performances throughout the event"
    ]
  },
  {
    id: "evt-005",
    title: "Youth Leadership Workshop",
    description: "Empower the next generation of leaders through interactive workshops focused on leadership skills, community engagement, and personal development. For students aged 16-22.",
    date: getRandomFutureDate(10),
    time: "2:00 PM - 5:00 PM",
    location: "American University of Beirut",
    capacity: 40,
    registeredAttendees: 25,
    category: "educational",
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    speakers: [
      {
        name: "Dr. Ahmad Nabil",
        title: "Youth Development Specialist",
        imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "evt-006",
    title: "Charity Gala Dinner",
    description: "Join us for an elegant evening of dining and entertainment to raise funds for EmpowEra's educational initiatives in underserved communities across Lebanon.",
    date: getRandomFutureDate(60),
    time: "7:00 PM - 11:00 PM",
    location: "Phoenicia Hotel, Beirut",
    capacity: 180,
    registeredAttendees: 120,
    category: "fundraising",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1470753937643-efeb931202a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    speakers: [
      {
        name: "Leila Haddad",
        title: "Founder, EmpowEra Foundation",
        imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "evt-007",
    title: "Digital Marketing Masterclass",
    description: "Enhance your digital marketing skills with this comprehensive masterclass covering social media strategy, content creation, SEO, and analytics. Suitable for beginners and intermediates.",
    date: getRandomPastDate(15),
    time: "9:00 AM - 3:00 PM",
    location: "Online (Zoom)",
    capacity: 100,
    registeredAttendees: 100,
    category: "workshop",
    imageUrl: "https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    speakers: [
      {
        name: "Rami Safadi",
        title: "Digital Marketing Consultant",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      }
    ],
    highlights: [
      "100% attendance rate with participants from 5 countries",
      "92% satisfaction rate based on post-event survey",
      "20+ businesses implemented strategies from the workshop"
    ]
  },
  {
    id: "evt-008",
    title: "Career Fair: Tech & Creative Industries",
    description: "Connect with leading employers in technology and creative fields. Attend resume workshops, networking sessions, and interview practice to boost your career prospects.",
    date: getRandomFutureDate(20),
    time: "10:00 AM - 4:00 PM",
    location: "Le Gray Hotel, Beirut",
    capacity: 250,
    registeredAttendees: 180,
    category: "career",
    imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1559523182-a284c3fb7cff?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    speakers: [
      {
        name: "Tala Aoun",
        title: "HR Director, Tech Solutions Inc.",
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Maya Zeineddine",
        title: "Career Coach",
        imageUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "evt-009",
    title: "Children's Book Drive",
    description: "Help promote literacy by donating new or gently used children's books. All collected books will be distributed to schools and community centers in rural Lebanon.",
    date: getRandomPastDate(45),
    time: "9:00 AM - 6:00 PM",
    location: "Hamra Street, Beirut",
    capacity: 0, // No capacity limit for donations
    registeredAttendees: 0, // Not applicable
    category: "community",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    speakers: [],
    highlights: [
      "Over 1,500 books collected",
      "Distributed to 12 schools and 5 community centers",
      "Benefited approximately 800 children"
    ]
  },
  {
    id: "evt-010",
    title: "Sustainable Agriculture Workshop",
    description: "Learn practical techniques for sustainable farming and gardening, including organic practices, water conservation, and growing food in small spaces.",
    date: getRandomFutureDate(30),
    time: "8:30 AM - 2:30 PM",
    location: "EcoPark Farm, Batroun",
    capacity: 35,
    registeredAttendees: 28,
    category: "workshop",
    imageUrl: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    speakers: [
      {
        name: "Karim Nassar",
        title: "Agricultural Engineer",
        imageUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      }
    ]
  }
];
