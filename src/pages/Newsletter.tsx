
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Award, Users, Calendar, Bell, Heart, GraduationCap, Quote, Info, Image } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/sonner';

// Type definitions for our content
interface NewsletterPost {
  id: number;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  author?: string;
  authorImage?: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  speakers: { name: string; title: string }[];
  image: string;
}

interface SuccessStory {
  id: number;
  name: string;
  role: string;
  avatar: string;
  story: string;
  achievement: string;
}

interface Metric {
  id: number;
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
}

// Mock data
const successStories: SuccessStory[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Artisan Seller",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    story: "After joining EmpowEra, I was able to transform my hobby into a sustainable business. The platform gave me access to a global market I never knew existed.",
    achievement: "Increased monthly revenue by 300% within first year"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Online Learner",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    story: "I completed three courses on sustainable crafting, which completely changed my approach to production. Now I create beautiful products while minimizing environmental impact.",
    achievement: "Launched eco-friendly product line"
  },
  {
    id: 3,
    name: "Aisha Rahman",
    role: "Workshop Instructor",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    story: "Teaching on EmpowEra has connected me with passionate learners worldwide. It's incredible to see how my traditional weaving techniques are being preserved and reimagined.",
    achievement: "Taught over 500 students from 20 countries"
  }
];

const impactMetrics: Metric[] = [
  { id: 1, title: "Learners Empowered", value: 15680, icon: <GraduationCap className="text-empower-terracotta" /> },
  { id: 2, title: "Artisans Supported", value: 478, icon: <Users className="text-empower-terracotta" /> },
  { id: 3, title: "Workshops Completed", value: 325, icon: <Award className="text-empower-terracotta" /> },
  { id: 4, title: "Donations Received", value: 250000, prefix: "$", icon: <Heart className="text-empower-terracotta" /> }
];

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "Sustainable Craft Workshop",
    date: "June 15, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "EmpowEra Community Center, Beirut",
    description: "Learn how to create beautiful crafts using sustainable materials. This hands-on workshop will teach you techniques for reducing waste while maximizing creativity.",
    speakers: [
      { name: "Maya Khalil", title: "Master Artisan" },
      { name: "David Rodriguez", title: "Sustainability Expert" }
    ],
    image: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2"
  },
  {
    id: 2,
    title: "Digital Marketing for Artisans",
    date: "June 22, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Online (Zoom)",
    description: "Discover how to effectively market your handmade products online. This webinar covers social media strategies, photography tips, and e-commerce best practices.",
    speakers: [
      { name: "Leila Hassan", title: "Digital Marketing Specialist" }
    ],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
  },
  {
    id: 3,
    title: "Community Fundraising Gala",
    date: "July 8, 2025",
    time: "7:00 PM - 10:00 PM",
    location: "Grand Hotel, Beirut",
    description: "Join us for an elegant evening celebrating the achievements of our community. All proceeds will support artisan training programs in rural communities.",
    speakers: [
      { name: "Omar Farooq", title: "EmpowEra Founder" },
      { name: "Yasmine Abboud", title: "Community Leader" }
    ],
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329"
  }
];

const announcements: NewsletterPost[] = [
  {
    id: 1,
    title: "New Seller Tools Launched",
    summary: "Discover our latest shop features designed to boost your sales.",
    content: "We're excited to announce a suite of new seller tools designed to help you manage inventory, track sales, and connect with customers more effectively. The new dashboard includes analytics, automated messaging, and customizable product displays. Log in to your seller account to explore these new features today!",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44",
    date: "May 15, 2025",
    author: "Tech Team"
  },
  {
    id: 2,
    title: "Platform Update: New Course Features",
    summary: "Enhanced learning experience with interactive elements.",
    content: "Our learning platform now includes interactive quizzes, progress tracking, and downloadable resources for all courses. Students can now earn certificates upon completion and share their achievements directly to LinkedIn. Instructors can monitor student engagement with new analytics tools.",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66",
    date: "May 8, 2025",
    author: "Education Team"
  },
  {
    id: 3,
    title: "Community Guidelines Refresh",
    summary: "Updated policies to ensure a positive experience for all users.",
    content: "We've updated our community guidelines to foster an even more inclusive and supportive environment. These changes highlight our commitment to respectful communication, authentic content, and ethical business practices. All users are encouraged to review the updated guidelines in their account settings.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
    date: "May 1, 2025",
    author: "Community Team"
  }
];

const workshopAchievements: NewsletterPost[] = [
  {
    id: 1,
    title: "Textile Arts Workshop Success",
    summary: "50 participants learned traditional weaving techniques.",
    content: "Our recent Textile Arts Workshop brought together beginners and experienced crafters to learn traditional Lebanese weaving techniques. The three-day event included hands-on practice, cultural history lessons, and a community exhibition. Participants created beautiful wall hangings and functional textiles while preserving cultural heritage.",
    image: "https://images.unsplash.com/photo-1615796036738-0ee8059c7b90",
    date: "April 22, 2025",
    author: "Workshop Team"
  },
  {
    id: 2,
    title: "Digital Skills Bootcamp Completion",
    summary: "30 artisans now equipped with essential online business skills.",
    content: "The first cohort of our Digital Skills Bootcamp has graduated! Over four weeks, 30 artisans learned website building, digital photography, social media marketing, and online shop management. Many participants have already implemented their new skills, with several reporting increased online sales within days.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    date: "April 15, 2025",
    author: "Digital Team"
  }
];

const NewsletterPage: React.FC = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedPost, setSelectedPost] = useState<NewsletterPost | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) {
      toast.error("Please enter your name and email");
      return;
    }

    // In a real app, this would call an API to subscribe the user
    toast.success("Thank you for subscribing to our newsletter!");
    setEmail('');
    setName('');
  };

  // Counter animation effect for metrics
  const [counters, setCounters] = useState<number[]>(impactMetrics.map(() => 0));
  
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const intervals = impactMetrics.map((metric, index) => {
          const finalValue = metric.value;
          const duration = 2000; // 2 seconds
          const frames = 100;
          const increment = finalValue / frames;
          let count = 0;
          
          return setInterval(() => {
            count++;
            if (count <= frames) {
              setCounters(prev => {
                const newCounters = [...prev];
                newCounters[index] = Math.min(Math.ceil(increment * count), finalValue);
                return newCounters;
              });
            } else {
              clearInterval(intervals[index]);
            }
          }, duration / frames);
        });
        
        return () => intervals.forEach(interval => clearInterval(interval));
      }
    });
    
    const metricsSection = document.querySelector('#metrics-section');
    if (metricsSection) {
      observer.observe(metricsSection);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageTransition route={location.pathname}>
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-16 bg-gradient-to-r from-empower-terracotta/10 to-empower-gold/10">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins mb-4 text-empower-brown">
                  EmpowEra Journal: Impact, Growth & Inspiration
                </h1>
                <p className="text-lg text-empower-brown/80 mb-8">
                  Stay connected with the heart of EmpowEra. Discover how learning, giving, and creativity are changing lives.
                </p>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-8 flex flex-wrap justify-center">
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Overview</span>
                  </TabsTrigger>
                  <TabsTrigger value="impact" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    <span>Impact</span>
                  </TabsTrigger>
                  <TabsTrigger value="stories" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Success Stories</span>
                  </TabsTrigger>
                  <TabsTrigger value="workshops" className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    <span>Workshop Achievements</span>
                  </TabsTrigger>
                  <TabsTrigger value="events" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Upcoming Events</span>
                  </TabsTrigger>
                  <TabsTrigger value="announcements" className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <span>Announcements</span>
                  </TabsTrigger>
                </TabsList>

                {/* Website Overview */}
                <TabsContent value="overview" className="animate-fade-in">
                  <Card className="overflow-hidden transition-all hover:shadow-lg">
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src="/lovable-uploads/22a31812-0de9-4dde-9442-b766171923c5.png" 
                        alt="EmpowEra"
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardContent className="pt-6">
                      <h2 className="text-2xl font-bold font-poppins text-empower-brown mb-4">Welcome to EmpowEra</h2>
                      <p className="text-empower-brown/80">
                        EmpowEra is a platform dedicated to empowering communities through education, enterprise, 
                        and charitable initiatives. Our mission is to create opportunities for artisans, 
                        educators, and learners to connect, grow, and make a positive impact.
                      </p>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                        <div className="bg-empower-ivory p-6 rounded-lg shadow-sm transition-transform hover:scale-105">
                          <GraduationCap className="h-8 w-8 text-empower-terracotta mb-4" />
                          <h3 className="font-semibold mb-2 text-empower-brown">Learning</h3>
                          <p className="text-sm text-empower-brown/80">Access courses, workshops and resources to develop new skills</p>
                        </div>
                        
                        <div className="bg-empower-ivory p-6 rounded-lg shadow-sm transition-transform hover:scale-105">
                          <Image className="h-8 w-8 text-empower-terracotta mb-4" />
                          <h3 className="font-semibold mb-2 text-empower-brown">Shop</h3>
                          <p className="text-sm text-empower-brown/80">Discover and purchase unique handmade products from talented artisans</p>
                        </div>
                        
                        <div className="bg-empower-ivory p-6 rounded-lg shadow-sm transition-transform hover:scale-105">
                          <Heart className="h-8 w-8 text-empower-terracotta mb-4" />
                          <h3 className="font-semibold mb-2 text-empower-brown">Donate</h3>
                          <p className="text-sm text-empower-brown/80">Support our mission and help fund community development initiatives</p>
                        </div>
                        
                        <div className="bg-empower-ivory p-6 rounded-lg shadow-sm transition-transform hover:scale-105">
                          <Calendar className="h-8 w-8 text-empower-terracotta mb-4" />
                          <h3 className="font-semibold mb-2 text-empower-brown">Events</h3>
                          <p className="text-sm text-empower-brown/80">Join workshops, webinars, and community gatherings</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Positive Impact */}
                <TabsContent value="impact" className="animate-fade-in">
                  <div id="metrics-section" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {impactMetrics.map((metric, index) => (
                      <Card key={metric.id} className="overflow-hidden hover:shadow-lg transition-all">
                        <CardHeader className="bg-gradient-to-r from-empower-terracotta/5 to-empower-gold/5">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg text-empower-brown">{metric.title}</CardTitle>
                            <div className="p-2 rounded-full bg-white shadow-sm">
                              {metric.icon}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <p className="text-4xl font-bold text-empower-brown">
                            {metric.prefix || ''}{counters[index].toLocaleString()}{metric.suffix || ''}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <Card className="overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center text-2xl">
                        <Award className="mr-2 text-empower-terracotta" />
                        2025 Impact Report Highlights
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <p>Our community continues to grow and make a meaningful difference. Over the past year:</p>
                        <ul>
                          <li>Provided training for 150+ artisans in sustainable production methods</li>
                          <li>Facilitated over $125,000 in sales for small-scale producers</li>
                          <li>Launched 3 new scholarship programs for underserved communities</li>
                          <li>Reduced carbon footprint by 15% through sustainable packaging initiatives</li>
                          <li>Expanded our reach to 5 new regions</li>
                        </ul>
                      </div>
                      
                      <div className="mt-6">
                        <Button className="bg-empower-gold hover:bg-empower-gold/90 text-empower-brown">
                          Read Full Impact Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Success Stories */}
                <TabsContent value="stories" className="animate-fade-in">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {successStories.map((story) => (
                      <Card 
                        key={story.id} 
                        className="overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                        onClick={() => setSelectedStory(story)}
                      >
                        <div className="aspect-[4/3] w-full overflow-hidden">
                          <img 
                            src={story.avatar} 
                            alt={story.name}
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <CardContent className="pt-6">
                          <div className="mb-4">
                            <h3 className="font-bold text-xl text-empower-brown">{story.name}</h3>
                            <p className="text-empower-terracotta">{story.role}</p>
                          </div>
                          <p className="text-empower-brown/80 line-clamp-3">{story.story}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-0 pb-4">
                          <p className="text-sm font-medium text-empower-gold">{story.achievement}</p>
                          <Button variant="link" className="text-empower-terracotta">Read Story</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Success Story Modal */}
                  <Dialog open={!!selectedStory} onOpenChange={(open) => !open && setSelectedStory(null)}>
                    <DialogContent className="max-w-2xl">
                      {selectedStory && (
                        <>
                          <DialogHeader>
                            <DialogTitle className="text-2xl">{selectedStory.name}'s Story</DialogTitle>
                            <DialogDescription className="text-empower-terracotta">{selectedStory.role}</DialogDescription>
                          </DialogHeader>
                          <div className="grid md:grid-cols-3 gap-6">
                            <div className="md:col-span-1">
                              <div className="rounded-lg overflow-hidden">
                                <img 
                                  src={selectedStory.avatar} 
                                  alt={selectedStory.name}
                                  className="w-full aspect-square object-cover"
                                />
                              </div>
                            </div>
                            <div className="md:col-span-2">
                              <div className="prose max-w-none">
                                <p className="text-lg">{selectedStory.story}</p>
                                <div className="mt-6 bg-empower-ivory rounded-lg p-4">
                                  <h4 className="font-semibold text-empower-brown">Key Achievement:</h4>
                                  <p className="text-empower-terracotta">{selectedStory.achievement}</p>
                                </div>
                                <blockquote className="italic border-l-4 border-empower-gold pl-4 mt-6">
                                  "Being part of the EmpowEra community has transformed not just my business, but my life."
                                </blockquote>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                </TabsContent>

                {/* Workshop Achievements */}
                <TabsContent value="workshops" className="animate-fade-in">
                  <div className="grid md:grid-cols-2 gap-6">
                    {workshopAchievements.map((post) => (
                      <Card 
                        key={post.id} 
                        className="overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                        onClick={() => setSelectedPost(post)}
                      >
                        <div className="aspect-video w-full overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <CardContent className="pt-6">
                          <h3 className="font-bold text-xl text-empower-brown mb-2">{post.title}</h3>
                          <p className="text-empower-brown/80">{post.summary}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-0 pb-4">
                          <p className="text-sm text-empower-brown/60">{post.date}</p>
                          <Button variant="link" className="text-empower-terracotta">Read More</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Upcoming Events */}
                <TabsContent value="events" className="animate-fade-in">
                  <div className="grid lg:grid-cols-3 gap-6">
                    {upcomingEvents.map((event) => (
                      <Card 
                        key={event.id} 
                        className="overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="aspect-[3/2] w-full overflow-hidden">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <CardContent className="pt-6">
                          <h3 className="font-bold text-xl text-empower-brown mb-2">{event.title}</h3>
                          
                          <div className="flex items-center gap-2 mb-2 text-sm text-empower-brown/70">
                            <Calendar className="h-4 w-4 text-empower-terracotta" />
                            <span>{event.date}</span>
                          </div>
                          
                          <div className="flex items-start gap-2 mb-4 text-sm text-empower-brown/70">
                            <Users className="h-4 w-4 text-empower-terracotta mt-1" />
                            <div>
                              {event.speakers.map((speaker, index) => (
                                <div key={index} className="mb-1">
                                  <span className="font-medium">{speaker.name}</span>
                                  <span className="text-xs"> · {speaker.title}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0 pb-4">
                          <Button className="w-full bg-empower-gold hover:bg-empower-gold/90 text-empower-brown">
                            Register Now
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Event Modal */}
                  <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
                    <DialogContent className="max-w-2xl">
                      {selectedEvent && (
                        <>
                          <DialogHeader>
                            <DialogTitle className="text-2xl">{selectedEvent.title}</DialogTitle>
                            <DialogDescription>{selectedEvent.date} at {selectedEvent.time}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div className="rounded-lg overflow-hidden">
                              <img 
                                src={selectedEvent.image} 
                                alt={selectedEvent.title}
                                className="w-full aspect-video object-cover"
                              />
                            </div>
                            
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="md:col-span-2">
                                <h4 className="font-semibold text-empower-brown mb-2">About This Event</h4>
                                <p className="text-empower-brown/80">{selectedEvent.description}</p>
                              </div>
                              
                              <div>
                                <div className="bg-empower-ivory rounded-lg p-4 space-y-4">
                                  <div>
                                    <h5 className="text-sm font-medium text-empower-brown mb-1">Date & Time</h5>
                                    <p className="text-empower-brown/80 text-sm">
                                      {selectedEvent.date}<br />
                                      {selectedEvent.time}
                                    </p>
                                  </div>
                                  
                                  <div>
                                    <h5 className="text-sm font-medium text-empower-brown mb-1">Location</h5>
                                    <p className="text-empower-brown/80 text-sm">{selectedEvent.location}</p>
                                  </div>
                                  
                                  <div>
                                    <h5 className="text-sm font-medium text-empower-brown mb-1">Speakers</h5>
                                    <ul className="text-empower-brown/80 text-sm">
                                      {selectedEvent.speakers.map((speaker, index) => (
                                        <li key={index}>{speaker.name} — {speaker.title}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex justify-end gap-4 mt-4">
                              <Button variant="outline">Learn More</Button>
                              <Button className="bg-empower-gold hover:bg-empower-gold/90 text-empower-brown">Register Now</Button>
                            </div>
                          </div>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                </TabsContent>

                {/* Announcements */}
                <TabsContent value="announcements" className="animate-fade-in">
                  <div className="grid md:grid-cols-3 gap-6">
                    {announcements.map((post) => (
                      <Card 
                        key={post.id} 
                        className="overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                        onClick={() => setSelectedPost(post)}
                      >
                        <div className="aspect-[3/2] w-full overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-empower-brown/60">{post.date}</span>
                            <span className="text-xs bg-empower-terracotta/10 text-empower-terracotta px-2 py-1 rounded-full">
                              Announcement
                            </span>
                          </div>
                          <h3 className="font-bold text-xl text-empower-brown mb-2">{post.title}</h3>
                          <p className="text-empower-brown/80 line-clamp-2">{post.summary}</p>
                        </CardContent>
                        <CardFooter className="pt-0 pb-4">
                          <Button variant="link" className="ml-auto text-empower-terracotta">Read More</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              {/* Post Modal */}
              <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
                <DialogContent className="max-w-2xl">
                  {selectedPost && (
                    <>
                      <DialogHeader>
                        <DialogTitle className="text-2xl">{selectedPost.title}</DialogTitle>
                        <DialogDescription>Posted on {selectedPost.date}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div className="rounded-lg overflow-hidden">
                          <img 
                            src={selectedPost.image} 
                            alt={selectedPost.title}
                            className="w-full aspect-video object-cover"
                          />
                        </div>
                        <div className="prose max-w-none">
                          <p className="text-lg">{selectedPost.content}</p>
                        </div>
                        {selectedPost.author && (
                          <div className="flex items-center gap-3 pt-4 border-t">
                            <div className="w-10 h-10 rounded-full bg-empower-terracotta/20 flex items-center justify-center">
                              <span className="text-empower-terracotta font-medium">
                                {selectedPost.author[0]}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-sm">Written by</p>
                              <p className="text-empower-brown/80">{selectedPost.author}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </section>

          {/* Newsletter Subscription */}
          <section className="py-16 bg-gradient-to-r from-empower-terracotta/10 to-empower-olive/10">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center animate-fade-in">
                <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-4 text-empower-brown">
                  Stay Connected With Our Mission!
                </h2>
                <p className="text-empower-brown mb-8">
                  Join our newsletter to receive updates on new courses, products, events, and ways to contribute to our cause.
                </p>

                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    className="flex-grow"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-grow"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button 
                    type="submit"
                    className="bg-empower-gold hover:bg-empower-gold/90 text-empower-brown font-medium hover-zoom"
                  >
                    Subscribe
                  </Button>
                </form>

                <p className="text-sm text-empower-brown/70 mt-4">
                  We respect your privacy and will never share your information.
                </p>
              </div>
            </div>
          </section>
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default NewsletterPage;
