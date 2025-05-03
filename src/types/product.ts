
export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice?: number;
  currency: string;
  images: ProductImage[];
  category: string;
  subcategory?: string;
  tags: string[];
  seller: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
  };
  stock: number;
  colors?: string[];
  sizes?: string[];
  materials?: string[];
  rating: number;
  reviewsCount: number;
  reviews?: ProductReview[];
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
  isHandmade: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  color?: string;
  size?: string;
  material?: string;
}

export interface FavoriteItem {
  productId: string;
  dateAdded: string;
}
