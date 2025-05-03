
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import ProductCard from '@/components/shop/ProductCard';
import ShopFilters from '@/components/shop/ShopFilters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Heart, ShoppingCart } from 'lucide-react';

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  
  const categories = ['Home Decor', 'Home Textiles', 'Kitchen & Dining'];
  
  const filteredProducts = products.filter(product => {
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

  return (
    <div className="min-h-screen flex flex-col bg-empower-ivory">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-gradient text-shadow-pop font-poppins mb-4">EmpowEra Handcrafts</h1>
          <p className="text-lg max-w-3xl mx-auto text-empower-brown text-shimmer">
            Discover unique, handcrafted treasures from talented artisans across Lebanon and beyond. 
            Each piece tells a story and supports a community.
          </p>
        </div>
        
        {/* Featured Products */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-empower-brown text-focus-in">Featured Treasures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.filter(p => p.featured).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        
        {/* Filters */}
        <ShopFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          categories={categories}
        />
        
        {/* All Products */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-empower-brown">All Products</h2>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-empower-ivory/50 mb-6">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-empower-gold data-[state=active]:text-empower-brown"
              >
                <Package className="mr-2" size={18} />
                All Items
              </TabsTrigger>
              <TabsTrigger 
                value="newest" 
                className="data-[state=active]:bg-empower-gold data-[state=active]:text-empower-brown"
              >
                Latest Arrivals
              </TabsTrigger>
              <TabsTrigger 
                value="popular" 
                className="data-[state=active]:bg-empower-gold data-[state=active]:text-empower-brown"
              >
                Most Popular
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="animate-fade-in">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-empower-brown text-lg">No products match your search criteria. Try adjusting your filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="newest">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 8)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="popular">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts
                  .sort((a, b) => b.rating - a.rating)
                  .slice(0, 8)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
