
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/product';

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (url, alt, display_order),
      product_reviews (rating)
    `);

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  // Transform data to match Product interface
  return data.map(product => {
    // Get primary image or first available image
    const images = product.product_images || [];
    const primaryImage = images.length > 0 
      ? images.sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))[0].url 
      : '';
      
    // Calculate average rating
    const reviews = product.product_reviews || [];
    const rating = reviews.length > 0 
      ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviews.length 
      : 0;

    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      discountedPrice: product.discounted_price || undefined,
      category: product.category,
      rating: Math.round(rating * 10) / 10,
      reviews: reviews.length,
      inStock: product.stock > 0,
      isHandmade: product.is_handmade || false,
      isFeatured: product.featured || false,
      image: primaryImage,
      seller: {
        id: product.seller_id || '',
        name: 'Seller',
        rating: 5
      },
      createdAt: product.created_at
    };
  });
};

// Fetch featured products
export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (url, alt, display_order),
      product_reviews (rating)
    `)
    .eq('featured', true);

  if (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }

  // Transform data (same logic as fetchProducts)
  return data.map(product => {
    const images = product.product_images || [];
    const primaryImage = images.length > 0 
      ? images.sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))[0].url 
      : '';
      
    const reviews = product.product_reviews || [];
    const rating = reviews.length > 0 
      ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviews.length 
      : 0;

    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      discountedPrice: product.discounted_price || undefined,
      category: product.category,
      rating: Math.round(rating * 10) / 10,
      reviews: reviews.length,
      inStock: product.stock > 0,
      isHandmade: product.is_handmade || false,
      isFeatured: true,
      image: primaryImage,
      seller: {
        id: product.seller_id || '',
        name: 'Seller',
        rating: 5
      },
      createdAt: product.created_at
    };
  });
};

// Add product review
export const addProductReview = async (
  productId: string, 
  rating: number, 
  comment?: string
): Promise<boolean> => {
  const { data: userData } = await supabase.auth.getUser();
  
  if (!userData.user) {
    throw new Error('User not authenticated');
  }
  
  const { error } = await supabase
    .from('product_reviews')
    .insert([
      { 
        product_id: productId, 
        user_id: userData.user.id,
        rating,
        comment
      }
    ]);

  if (error) {
    console.error('Error adding product review:', error);
    throw error;
  }

  return true;
};
