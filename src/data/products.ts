
import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    title: "Handwoven Rustic Basket",
    description: "Beautiful handwoven basket made from sustainable materials, perfect for home decoration or storage.",
    price: 49.99,
    currency: "USD",
    images: [
      {
        id: "img1",
        url: "/lovable-uploads/lovable-uploads/download.jpg", // Updated image
        alt: "Handwoven basket front view"
      },
      {
        id: "img2",
        url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
        alt: "Handwoven basket with flowers"
      }
    ],
    category: "Home Decor",
    subcategory: "Baskets",
    tags: ["handwoven", "sustainable", "decoration", "storage"],
    seller: {
      id: "s1",
      name: "Artisanal Creations",
      avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      rating: 4.8
    },
    stock: 12,
    materials: ["Reed", "Bamboo", "Natural Dyes"],
    rating: 4.7,
    reviewsCount: 26,
    reviews: [
      {
        id: "r1",
        userId: "u123",
        userName: "Sarah M.",
        userAvatar: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151",
        rating: 5,
        comment: "Absolutely gorgeous basket! The craftsmanship is exceptional and it looks perfect in my living room.",
        date: "2023-02-15"
      },
      {
        id: "r2",
        userId: "u456",
        userName: "Michael T.",
        userAvatar: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
        rating: 4,
        comment: "Beautiful design and sturdy construction. Just slightly smaller than I expected.",
        date: "2023-01-20"
      }
    ],
    createdAt: "2022-12-01",
    updatedAt: "2023-02-20",
    featured: true,
    isHandmade: true
  },
  {
    id: "2",
    title: "Hand-Embroidered Table Runner",
    description: "Exquisite hand-embroidered table runner featuring traditional Lebanese patterns and motifs.",
    price: 35.50,
    currency: "USD",
    images: [
      {
        id: "img1",
        url: "/lovable-uploads/lovable-uploads/61CZQAhkk7L.jpg", // Updated image
        alt: "Embroidered table runner"
      }
    ],
    category: "Home Textiles",
    subcategory: "Table Linens",
    tags: ["embroidery", "table runner", "traditional", "Lebanese"],
    seller: {
      id: "s2",
      name: "Heritage Textiles",
      avatar: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151",
      rating: 4.9
    },
    stock: 8,
    materials: ["Cotton", "Silk Thread"],
    rating: 4.9,
    reviewsCount: 32,
    reviews: [],
    createdAt: "2023-01-05",
    updatedAt: "2023-02-18",
    featured: true,
    isHandmade: true
  },
  {
    id: "3",
    title: "Ceramic Coffee Mug Set",
    description: "Set of 4 handcrafted ceramic coffee mugs, each uniquely glazed with natural colors.",
    price: 65.00,
    discountedPrice: 52.00,
    currency: "USD",
    images: [
      {
        id: "img1",
        url: "/lovable-uploads/Sdaae16c91d874965b4929ed296d51c61Z.avif", // Updated image
        alt: "Ceramic mug set"
      }
    ],
    category: "Kitchen & Dining",
    subcategory: "Drinkware",
    tags: ["ceramic", "coffee mug", "handcrafted", "gift set"],
    seller: {
      id: "s3",
      name: "Clay & Fire Studio",
      avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      rating: 4.7
    },
    stock: 5,
    colors: ["Natural Beige", "Sage Green", "Terracotta", "Sky Blue"],
    rating: 4.6,
    reviewsCount: 18,
    reviews: [],
    createdAt: "2023-01-20",
    updatedAt: "2023-02-15",
    isHandmade: true
  },
  {
    id: "4",
    title: "Hand-Carved Olive Wood Serving Board",
    description: "Beautiful serving board hand-carved from Lebanese olive wood, perfect for cheese or appetizers.",
    price: 79.99,
    currency: "USD",
    images: [
      {
        id: "img1",
        url: "/lovable-uploads/lovable-uploads/IMG_20230304_111356.jpg", // Updated image
        alt: "Olive wood serving board"
      }
    ],
    category: "Kitchen & Dining",
    subcategory: "Serveware",
    tags: ["olive wood", "serving board", "handcrafted", "sustainable"],
    seller: {
      id: "s4",
      name: "Cedar Heritage Crafts",
      avatar: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151",
      rating: 4.9
    },
    stock: 7,
    materials: ["Olive Wood"],
    rating: 4.8,
    reviewsCount: 12,
    reviews: [],
    createdAt: "2023-01-10",
    updatedAt: "2023-02-10",
    isHandmade: true
  },
  {
    id: "5",
    title: "Traditional Crochet Throw Blanket",
    description: "Warm and cozy throw blanket hand-crocheted using traditional Lebanese patterns and premium wool.",
    price: 129.00,
    currency: "USD",
    images: [
      {
        id: "img1",
        url: "/lovable-uploads/lovable-uploads/il_fullxfull.5562158663_qmfa.webp", // Updated image
        alt: "Crochet throw blanket"
      }
    ],
    category: "Home Textiles",
    subcategory: "Blankets & Throws",
    tags: ["crochet", "throw blanket", "traditional", "wool"],
    seller: {
      id: "s2",
      name: "Heritage Textiles",
      avatar: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151",
      rating: 4.9
    },
    stock: 3,
    colors: ["Cream", "Gray", "Burgundy"],
    materials: ["Wool", "Cotton"],
    rating: 4.9,
    reviewsCount: 28,
    reviews: [],
    createdAt: "2022-11-15",
    updatedAt: "2023-02-05",
    featured: true,
    isHandmade: true
  },
  {
    id: "6",
    title: "Handmade Copper Turkish Coffee Set",
    description: "Traditional handmade copper Turkish coffee pot (cezve) with 4 matching coffee cups and saucers.",
    price: 89.50,
    currency: "USD",
    images: [
      {
        id: "img1",
        url: "/lovable-uploads/lovable-uploads/images.jpg", // Updated image
        alt: "Copper Turkish coffee set"
      }
    ],
    category: "Kitchen & Dining",
    subcategory: "Coffee & Tea",
    tags: ["copper", "turkish coffee", "handmade", "traditional"],
    seller: {
      id: "s5",
      name: "Artisan Metalworks",
      avatar: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      rating: 4.8
    },
    stock: 4,
    materials: ["Copper", "Wood"],
    rating: 4.9,
    reviewsCount: 42,
    reviews: [],
    createdAt: "2022-12-20",
    updatedAt: "2023-01-30",
    featured: true,
    isHandmade: true
  }
];
