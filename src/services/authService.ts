
import { toast } from "@/components/ui/sonner";

// Mock user data - in a real application, this would come from a database
const users = [
  {
    id: "seller1",
    email: "seller@seller.com",
    password: "seller321", // In a real app, passwords would be hashed
    name: "Artisanal Creations",
    role: "seller",
    avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
  },
  {
    id: "admin1",
    email: "admin@admin.com",
    password: "admin321",
    name: "Admin User",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79"
  },
  {
    id: "learner1",
    email: "learner@learner.com",
    password: "learner321",
    name: "Emma Johnson",
    role: "learner",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  {
    id: "instructor1",
    email: "instructor@instructor.com",
    password: "instructor321",
    name: "Sarah Williams",
    role: "instructor",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    bio: "Master craftsperson with over 15 years of experience in traditional weaving and textile arts. Passionate about preserving cultural techniques while innovating with sustainable approaches.",
    expertise: ["Traditional Weaving", "Sustainable Textiles", "Cultural Crafts"]
  },
  {
    id: "customer1",
    email: "customer@customer.com",
    password: "customer321",
    name: "Alex Rivera",
    role: "customer",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    phoneNumber: "+1 (555) 123-4567",
    address: "123 Main Street, Anytown, USA"
  }
];

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  phoneNumber?: string;
  address?: string;
  bio?: string;
  expertise?: string[];
}

export const authService = {
  login: (email: string, password: string): Promise<User | null> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        const user = users.find(
          (u) => u.email === email && u.password === password
        );
        
        if (user) {
          // We need to ensure we're not including the password but keeping all other properties
          const { password: _, ...userWithoutPassword } = user;
          
          // Store user in local storage - make sure role is included
          console.log("Storing user in localStorage:", userWithoutPassword);
          localStorage.setItem("user", JSON.stringify(userWithoutPassword));
          resolve(userWithoutPassword);
        } else {
          resolve(null);
        }
      }, 300);
    });
  },
  
  logout: (): void => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  },
  
  getCurrentUser: (): User | null => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
  
  isAuthenticated: (): boolean => {
    return localStorage.getItem("user") !== null;
  },
  
  isSeller: (): boolean => {
    const user = authService.getCurrentUser();
    return user?.role === "seller";
  },
  
  isAdmin: (): boolean => {
    const user = authService.getCurrentUser();
    return user?.role === "admin";
  },
  
  isLearner: (): boolean => {
    const user = authService.getCurrentUser();
    return user?.role === "learner";
  },
  
  isInstructor: (): boolean => {
    const user = authService.getCurrentUser();
    return user?.role === "instructor";
  },
  
  isCustomer: (): boolean => {
    const user = authService.getCurrentUser();
    return user?.role === "customer";
  }
};
