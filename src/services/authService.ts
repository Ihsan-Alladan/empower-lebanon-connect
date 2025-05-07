
import { toast } from "sonner";

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
    id: "seller2",
    email: "seller22@gmail.com",
    password: "seller1234",
    name: "Handmade Treasures",
    role: "seller",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04"
  },
  {
    id: "instructor1",
    email: "instructor@instructor.com",
    password: "instructor321",
    name: "Jane Smith",
    role: "instructor",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  }
];

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
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
  
  isInstructor: (): boolean => {
    const user = authService.getCurrentUser();
    return user?.role === "instructor";
  }
};
