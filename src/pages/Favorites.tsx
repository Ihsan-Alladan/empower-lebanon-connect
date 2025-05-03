
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Package, ChevronLeft } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { useCart } from '@/hooks/useCart';
import { products } from '@/data/products';
import { toast } from '@/components/ui/sonner';
import ProductCard from '@/components/shop/ProductCard';

const Favorites: React.FC = () => {
  const { favorites, clearFavorites } = useFavorites();
  
  const favoriteProducts = favorites.map(fav => {
    const product = products.find(p => p.id === fav.productId);
    return { ...fav, product };
  }).filter(item => item.product);
  
  if (favoriteProducts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-empower-ivory">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <div className="text-center max-w-md">
            <Heart size={64} className="mx-auto text-empower-terracotta/60 mb-6" />
            <h1 className="text-3xl font-bold text-empower-brown mb-4">Your Wishlist is Empty</h1>
            <p className="mb-8 text-empower-brown/70">Looks like you haven't added any items to your wishlist yet. Start exploring to find items you love!</p>
            <Link to="/shop">
              <Button className="bg-empower-terracotta hover:bg-empower-terracotta/80 text-white">
                <Package size={18} className="mr-2" />
                Explore Products
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-empower-ivory">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-empower-brown text-focus-in">My Wishlist</h1>
          
          <Button
            variant="ghost"
            className="text-empower-terracotta hover:text-empower-terracotta/80"
            onClick={() => {
              clearFavorites();
              toast.success('Wishlist cleared', {
                description: 'All items have been removed from your wishlist'
              });
            }}
          >
            <Heart size={18} className="mr-2" />
            Clear Wishlist
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteProducts.map(({ product }) => (
            product && <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-12">
          <Link to="/shop" className="inline-flex items-center text-empower-brown hover:text-empower-terracotta transition-colors">
            <ChevronLeft size={16} className="mr-1" />
            Continue Shopping
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Favorites;
