
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import ProductCard from '@/components/shop/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ChevronLeft, 
  Filter, 
  Star, 
  MessageCircle, 
  Calendar, 
  ShoppingBag,
  Search
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from '@/components/ui/separator';

const SellerShop: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedSort, setSelectedSort] = useState('newest');
  
  // Find seller information
  const seller = products.find(p => p.seller.id === id)?.seller;
  
  if (!seller) {
    return (
      <div className="min-h-screen flex flex-col bg-empower-ivory">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4 text-empower-brown">Seller Not Found</h1>
          <p className="mb-8">The seller you're looking for doesn't exist or has been removed.</p>
          <Link to="/shop">
            <Button>Return to Shop</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Filter products by this seller
  const sellerProducts = products.filter(p => p.seller.id === id);
  
  // Further filter based on search and filters
  const filteredProducts = sellerProducts.filter(product => {
    // Filter by search query
    if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    
    // Filter by price
    if (selectedPrice !== 'all') {
      if (selectedPrice === 'under50' && product.price >= 50) {
        return false;
      } else if (selectedPrice === '50to100' && (product.price < 50 || product.price > 100)) {
        return false;
      } else if (selectedPrice === 'over100' && product.price <= 100) {
        return false;
      }
    }
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (selectedSort === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (selectedSort === 'priceAsc') {
      return (a.discountedPrice || a.price) - (b.discountedPrice || b.price);
    } else if (selectedSort === 'priceDesc') {
      return (b.discountedPrice || b.price) - (a.discountedPrice || a.price);
    } else if (selectedSort === 'popular') {
      return b.rating - a.rating;
    }
    return 0;
  });
  
  // Get unique categories for this seller's products
  const categories = [...new Set(sellerProducts.map(p => p.category))];
  
  return (
    <div className="min-h-screen flex flex-col bg-empower-ivory">
      <Navbar />
      
      <main className="flex-1">
        {/* Seller Banner */}
        <div className="relative h-64 bg-gradient-to-r from-[#B56E4D] to-[#F3F1EE]">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=2574&auto=format&fit=crop)`,
            opacity: 0.3
          }}></div>
          
          <div className="container mx-auto px-4 relative h-full flex items-center">
            <div className="flex items-center">
              <div className="mr-6">
                <img 
                  src={seller.avatar} 
                  alt={seller.name} 
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover animate-fade-in"
                />
              </div>
              <div className="text-focus-in">
                <h1 className="text-4xl font-bold text-white mb-2">{seller.name}</h1>
                <div className="flex items-center text-white">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < Math.floor(seller.rating) ? "fill-empower-gold text-empower-gold" : "text-white/50"} 
                      />
                    ))}
                  </div>
                  <span className="text-white/90">{seller.rating.toFixed(1)}</span>
                </div>
                <p className="text-white/80 mt-2 max-w-xl">
                  Passionate artisan creating handcrafted products with care and attention to detail. Every piece tells a story.
                </p>
              </div>
            </div>
          </div>
          
          {/* Back to shop button */}
          <Link to="/shop" className="absolute top-4 left-4">
            <Button variant="secondary" size="sm" className="bg-white/80 hover:bg-white">
              <ChevronLeft size={16} className="mr-1" /> Back to Shop
            </Button>
          </Link>
        </div>
        
        {/* Shop info and stats */}
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-sm p-6 -mt-12 mb-8 animate-fade-in">
            <div className="flex flex-wrap gap-6 justify-between">
              <div className="flex items-center">
                <Calendar className="text-empower-terracotta mr-2" size={20} />
                <div>
                  <p className="text-sm text-empower-brown/70">Joined</p>
                  <p className="font-medium">January 2023</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <ShoppingBag className="text-empower-terracotta mr-2" size={20} />
                <div>
                  <p className="text-sm text-empower-brown/70">Products</p>
                  <p className="font-medium">{sellerProducts.length} items</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Star className="text-empower-terracotta mr-2" size={20} />
                <div>
                  <p className="text-sm text-empower-brown/70">Avg. Rating</p>
                  <p className="font-medium">{seller.rating.toFixed(1)}/5.0</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <MessageCircle className="text-empower-terracotta mr-2" size={20} />
                <div>
                  <p className="text-sm text-empower-brown/70">Response Time</p>
                  <p className="font-medium">Under 24 hours</p>
                </div>
              </div>
              
              <Button className="bg-empower-terracotta hover:bg-empower-terracotta/80 text-white">
                <MessageCircle size={18} className="mr-2" /> Contact Seller
              </Button>
            </div>
          </div>
        </div>
        
        {/* Products section */}
        <div className="container mx-auto px-4 pb-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold text-empower-brown mb-4 md:mb-0">Products by {seller.name}</h2>
              
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full md:w-60"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="under50">Under $50</SelectItem>
                    <SelectItem value="50to100">$50 - $100</SelectItem>
                    <SelectItem value="over100">Over $100</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedSort} onValueChange={setSelectedSort}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                    <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Separator className="mb-6" />
            
            {/* Products grid */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-empower-brown text-lg">No products match your search criteria. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellerShop;
