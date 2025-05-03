
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Clock, 
  Check, 
  ChevronLeft, 
  Share, 
  MessageCircle 
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { toast } from '@/components/ui/sonner';
import ProductReviewSection from '@/components/shop/ProductReviewSection';
import ProductRecommendations from '@/components/shop/ProductRecommendations';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedMaterial, setSelectedMaterial] = useState(product?.materials?.[0] || '');
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-empower-ivory">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4 text-empower-brown">Product Not Found</h1>
          <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/shop">
            <Button>Return to Shop</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }
  
  const favoriteActive = isFavorite(product.id);
  
  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      quantity,
      color: selectedColor || undefined,
      size: selectedSize || undefined,
      material: selectedMaterial || undefined
    });
    
    toast.success('Added to cart!', {
      description: `${product.title} has been added to your cart`
    });
  };
  
  const handleToggleFavorite = () => {
    if (favoriteActive) {
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
  
  return (
    <div className="min-h-screen flex flex-col bg-empower-ivory">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/shop" className="flex items-center text-empower-brown hover:text-empower-terracotta transition-colors">
            <ChevronLeft size={16} className="mr-1" />
            Back to Shop
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Product Detail */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src={product.images[selectedImage].url} 
                  alt={product.images[selectedImage].alt} 
                  className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button 
                      key={image.id}
                      onClick={() => setSelectedImage(index)}
                      className={`rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-empower-terracotta' : 'border-transparent'}`}
                    >
                      <img 
                        src={image.url} 
                        alt={image.alt} 
                        className="w-20 h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="space-y-4 text-focus-in">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-xs bg-empower-ivory text-empower-brown px-2 py-1 rounded-full">
                  {product.category}
                </span>
                {product.subcategory && (
                  <span className="text-xs bg-empower-ivory text-empower-brown px-2 py-1 rounded-full">
                    {product.subcategory}
                  </span>
                )}
                {product.isHandmade && (
                  <span className="text-xs bg-empower-olive/20 text-empower-brown px-2 py-1 rounded-full">
                    Handmade
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-empower-brown">{product.title}</h1>
              
              {/* Rating */}
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={i < Math.floor(product.rating) ? "fill-empower-gold text-empower-gold" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-empower-brown">{product.rating.toFixed(1)}</span>
                <span className="mx-2 text-gray-400">|</span>
                <Link to="#reviews" className="text-empower-brown hover:text-empower-terracotta">
                  {product.reviewsCount} Reviews
                </Link>
              </div>
              
              {/* Price */}
              <div className="my-4">
                {product.discountedPrice ? (
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-empower-terracotta">${product.discountedPrice.toFixed(2)}</span>
                    <span className="text-gray-500 line-through text-xl">${product.price.toFixed(2)}</span>
                    <span className="bg-empower-terracotta text-white text-xs font-bold rounded-full px-3 py-1">
                      {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-empower-brown">${product.price.toFixed(2)}</span>
                )}
              </div>
              
              <Separator />
              
              {/* Description */}
              <div>
                <p className="text-empower-brown leading-relaxed">{product.description}</p>
              </div>
              
              {/* Options */}
              <div className="space-y-4">
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-empower-brown mb-2">Color:</label>
                    <div className="flex gap-2">
                      {product.colors.map(color => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 border rounded-md transition-all ${
                            selectedColor === color 
                              ? 'border-empower-terracotta bg-empower-terracotta/10 text-empower-terracotta' 
                              : 'border-gray-200 hover:border-empower-terracotta/50'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-empower-brown mb-2">Size:</label>
                    <div className="flex gap-2">
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border rounded-md transition-all ${
                            selectedSize === size 
                              ? 'border-empower-terracotta bg-empower-terracotta/10 text-empower-terracotta' 
                              : 'border-gray-200 hover:border-empower-terracotta/50'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {product.materials && product.materials.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-empower-brown mb-2">Material:</label>
                    <div className="flex flex-wrap gap-2">
                      {product.materials.map(material => (
                        <button
                          key={material}
                          onClick={() => setSelectedMaterial(material)}
                          className={`px-4 py-2 border rounded-md transition-all ${
                            selectedMaterial === material 
                              ? 'border-empower-terracotta bg-empower-terracotta/10 text-empower-terracotta' 
                              : 'border-gray-200 hover:border-empower-terracotta/50'
                          }`}
                        >
                          {material}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-empower-brown mb-2">Quantity:</label>
                  <div className="flex items-center">
                    <button 
                      className="border border-gray-200 px-3 py-1 rounded-l-md"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <input 
                      type="text" 
                      value={quantity} 
                      onChange={(e) => setQuantity(Number(e.target.value))} 
                      className="w-16 text-center border-y border-gray-200 py-1"
                      min="1"
                      max={product.stock}
                    />
                    <button 
                      className="border border-gray-200 px-3 py-1 rounded-r-md"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    >
                      +
                    </button>
                    
                    <span className="ml-4 text-sm text-empower-olive">
                      {product.stock > 0 ? 
                        (product.stock < 5 ? `Only ${product.stock} left` : `${product.stock} in stock`) : 
                        'Out of stock'}
                    </span>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-4 mt-6">
                  <Button 
                    onClick={handleAddToCart} 
                    className="flex-1 bg-empower-terracotta hover:bg-empower-terracotta/80 text-white"
                    disabled={product.stock === 0}
                    size="lg"
                  >
                    <ShoppingCart className="mr-2" size={20} />
                    Add to Cart
                  </Button>
                  
                  <Button
                    onClick={handleToggleFavorite}
                    variant="outline"
                    size="icon"
                    className={`rounded-full ${
                      favoriteActive ? 'bg-empower-terracotta text-white border-empower-terracotta' : 'text-empower-brown'
                    }`}
                  >
                    <Heart className={favoriteActive ? 'fill-current' : ''} size={20} />
                  </Button>
                </div>
              </div>
              
              {/* Seller info */}
              <div className="bg-empower-ivory/50 p-4 rounded-lg mt-6">
                <div className="flex items-center">
                  <img src={product.seller.avatar} alt={product.seller.name} className="w-12 h-12 rounded-full object-cover mr-3" />
                  <div>
                    <h4 className="font-medium">By {product.seller.name}</h4>
                    <div className="flex items-center text-sm">
                      <Star size={14} className="fill-empower-gold text-empower-gold mr-1" />
                      <span>{product.seller.rating} Seller Rating</span>
                    </div>
                  </div>
                  <Button variant="link" className="ml-auto text-empower-terracotta">
                    Visit Shop
                  </Button>
                </div>
              </div>
              
              {/* Shipping & Return */}
              <div className="flex items-center gap-2 text-sm text-empower-brown">
                <Clock size={16} />
                <span>Ships within 1-3 business days</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product details tabs */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="details" className="data-[state=active]:text-empower-terracotta">
                Product Details
              </TabsTrigger>
              <TabsTrigger value="shipping" className="data-[state=active]:text-empower-terracotta">
                Shipping & Returns
              </TabsTrigger>
              <TabsTrigger value="reviews" id="reviews" className="data-[state=active]:text-empower-terracotta">
                Customer Reviews ({product.reviewsCount})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="animate-fade-in">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-empower-brown">Product Specifications</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{product.category}</span>
                  </li>
                  {product.subcategory && (
                    <li className="flex justify-between">
                      <span className="text-gray-600">Subcategory:</span>
                      <span className="font-medium">{product.subcategory}</span>
                    </li>
                  )}
                  {product.materials && (
                    <li className="flex justify-between">
                      <span className="text-gray-600">Materials:</span>
                      <span className="font-medium">{product.materials.join(", ")}</span>
                    </li>
                  )}
                  <li className="flex justify-between">
                    <span className="text-gray-600">Handmade:</span>
                    <span className="font-medium">{product.isHandmade ? "Yes" : "No"}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="font-medium">{new Date(product.updatedAt).toLocaleDateString()}</span>
                  </li>
                </ul>
                
                <Separator className="my-4" />
                
                <div>
                  <h3 className="text-xl font-semibold text-empower-brown mb-3">Product Description</h3>
                  <p className="text-empower-brown leading-relaxed">{product.description}</p>
                </div>
                
                {product.tags && product.tags.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map(tag => (
                        <span key={tag} className="text-xs bg-empower-ivory text-empower-brown px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="animate-fade-in">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-empower-brown mb-3">Shipping Information</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Check size={20} className="text-empower-terracotta mr-2 mt-1" />
                      <div>
                        <span className="font-medium">Processing Time</span>
                        <p className="text-gray-600">Orders are typically processed within 1-3 business days.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-empower-terracotta mr-2 mt-1" />
                      <div>
                        <span className="font-medium">Shipping Methods</span>
                        <p className="text-gray-600">Standard shipping (5-7 business days) and express shipping (2-3 business days) available.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-empower-terracotta mr-2 mt-1" />
                      <div>
                        <span className="font-medium">International Shipping</span>
                        <p className="text-gray-600">We ship worldwide. International delivery times vary by location.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-xl font-semibold text-empower-brown mb-3">Return Policy</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Check size={20} className="text-empower-terracotta mr-2 mt-1" />
                      <div>
                        <span className="font-medium">30-Day Returns</span>
                        <p className="text-gray-600">If you're not completely satisfied, you can return most items within 30 days of delivery.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-empower-terracotta mr-2 mt-1" />
                      <div>
                        <span className="font-medium">Return Conditions</span>
                        <p className="text-gray-600">Items must be unused, unwashed, and in their original packaging with tags attached.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-empower-terracotta mr-2 mt-1" />
                      <div>
                        <span className="font-medium">Custom & Personalized Items</span>
                        <p className="text-gray-600">Custom and personalized items cannot be returned unless damaged or defective.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="animate-fade-in">
              <ProductReviewSection product={product} />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Product recommendations */}
        <ProductRecommendations currentProductId={product.id} category={product.category} />
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
