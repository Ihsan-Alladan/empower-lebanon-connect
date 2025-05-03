
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites();
  const [isHovering, setIsHovering] = useState(false);
  
  const handleAddToCart = () => {
    addToCart({ productId: product.id, quantity: 1 });
    toast.success('Added to cart!', {
      description: `${product.title} has been added to your cart`
    });
  };
  
  const handleToggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
      toast('Removed from favorites', {
        description: `${product.title} has been removed from your favorites`
      });
    } else {
      addToFavorites(product.id);
      toast.success('Added to favorites!', {
        description: `${product.title} has been added to your favorites`
      });
    }
  };
  
  const favoriteActive = isFavorite(product.id);
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
      <div 
        className="relative overflow-hidden" 
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Link to={`/shop/product/${product.id}`}>
          <img 
            src={product.images[0].url} 
            alt={product.images[0].alt} 
            className="w-full h-64 object-cover transition-transform duration-300 hover-zoom"
          />
        </Link>
        
        {/* Quick action buttons */}
        <div className={`absolute top-2 right-2 flex flex-col gap-2 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
          <Button 
            size="icon" 
            variant="secondary" 
            className={`rounded-full ${favoriteActive ? 'bg-empower-terracotta text-white' : 'bg-white text-empower-brown hover:bg-empower-gold'}`}
            onClick={handleToggleFavorite}
          >
            <Heart size={18} className={favoriteActive ? 'fill-current' : ''} />
          </Button>
          
          <Button 
            size="icon" 
            variant="secondary"
            className="rounded-full bg-white text-empower-brown hover:bg-empower-gold"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={18} />
          </Button>
        </div>
        
        {/* Discount badge */}
        {product.discountedPrice && (
          <div className="absolute top-2 left-2 bg-empower-terracotta text-white text-xs font-bold rounded-full px-3 py-1">
            {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
          </div>
        )}
      </div>
      
      <CardContent className="pt-4">
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-xs bg-empower-ivory text-empower-brown px-2 py-1 rounded-full">
            {product.category}
          </span>
          {product.isHandmade && (
            <span className="text-xs bg-empower-olive/20 text-empower-brown px-2 py-1 rounded-full">
              Handmade
            </span>
          )}
        </div>
        
        <Link to={`/shop/product/${product.id}`}>
          <h3 className="font-medium text-lg mb-1 hover:text-empower-terracotta transition-colors text-empower-brown">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center mb-2">
          <div className="flex mr-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={i < Math.floor(product.rating) ? "fill-empower-gold text-empower-gold" : "text-gray-300"} 
              />
            ))}
          </div>
          <span className="text-sm text-empower-brown">({product.reviewsCount})</span>
        </div>
        
        <div className="flex justify-between items-center text-focus-in">
          <div>
            {product.discountedPrice ? (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg text-empower-terracotta">${product.discountedPrice.toFixed(2)}</span>
                <span className="text-gray-500 line-through text-sm">${product.price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="font-semibold text-lg text-empower-brown">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <div className="text-sm text-empower-olive">
            {product.stock > 0 ? 
              (product.stock < 5 ? `Only ${product.stock} left` : 'In stock') : 
              'Out of stock'}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full bg-empower-terracotta hover:bg-empower-terracotta/80 text-white"
          disabled={product.stock === 0}
        >
          <ShoppingCart size={16} className="mr-2" />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
