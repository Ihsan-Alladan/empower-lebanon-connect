
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import ProductCard from '@/components/shop/ProductCard';
import ShopFilters from '@/components/shop/ShopFilters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Heart, ShoppingCart, SlidersHorizontal } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  
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

  const sliderImages = [
    "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=2574&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1561571994-3c61c554181a?q=80&w=2574&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1635982990938-856392a399b3?q=80&w=2574&auto=format&fit=crop"
  ];

  // Automatic slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  return (
    <div className="min-h-screen flex flex-col bg-empower-ivory">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Slider */}
        <section className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {sliderImages.map((image, index) => (
                <CarouselItem key={index} className={currentSlide === index ? "block" : "hidden"}>
                  <div className="relative h-[60vh] w-full">
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${image})` }}
                    >
                      <div className="absolute inset-0 bg-black/50"></div>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center animate-fade-in">
                        EmpowEra Shop
                      </h1>
                      <p className="text-lg md:text-xl max-w-3xl text-center animate-fade-in">
                        Discover unique, handcrafted treasures from talented artisans across Lebanon and beyond.
                        Each piece tells a story and supports a community. We also offer high-quality raw materials at competitive prices.
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
              {sliderImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 w-3 rounded-full transition-all ${
                    currentSlide === index ? "bg-white w-6" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
            <CarouselPrevious 
              className="left-4" 
              onClick={() => setCurrentSlide(prev => (prev === 0 ? sliderImages.length - 1 : prev - 1))}
            />
            <CarouselNext 
              className="right-4" 
              onClick={() => setCurrentSlide(prev => (prev === sliderImages.length - 1 ? 0 : prev + 1))}
            />
          </Carousel>
        </section>
        
        {/* Reduced space before filters - moved up */}
        <div className="h-4"></div>
        
        {/* Search and Filters */}
        <div className="container mx-auto px-4 mt-2 relative z-10">
          <ShopFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            categories={categories}
          />
        </div>
        
        <div className="container mx-auto px-4 py-4">
          {/* All Products - pushed up by reducing py value */}
          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-empower-brown">All Products</h2>
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
