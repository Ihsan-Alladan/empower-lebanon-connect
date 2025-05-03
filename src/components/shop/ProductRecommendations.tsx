
import React from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/shop/ProductCard';

interface ProductRecommendationsProps {
  currentProductId: string;
  category?: string;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ 
  currentProductId, 
  category 
}) => {
  // Get recommendations from same category, excluding current product
  const recommendations = products
    .filter(p => p.id !== currentProductId && (!category || p.category === category))
    .slice(0, 4);
  
  if (recommendations.length === 0) return null;
  
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold text-empower-brown mb-6 text-focus-in">
        You May Also Like
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductRecommendations;
