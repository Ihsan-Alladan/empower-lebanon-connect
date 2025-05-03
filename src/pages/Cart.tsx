
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2, ChevronLeft, Package, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { products } from '@/data/products';
import { toast } from '@/components/ui/sonner';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal } = useCart();
  
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    const product = products.find(p => p.id === productId);
    if (product && quantity > product.stock) {
      toast.error('Quantity exceeds available stock', {
        description: `Only ${product.stock} items available`
      });
      return;
    }
    
    updateQuantity(productId, quantity);
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-empower-ivory">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <div className="text-center max-w-md">
            <ShoppingCart size={64} className="mx-auto text-empower-olive/60 mb-6" />
            <h1 className="text-3xl font-bold text-empower-brown mb-4">Your Cart is Empty</h1>
            <p className="mb-8 text-empower-brown/70">Looks like you haven't added any items to your cart yet. Start shopping to find unique handcrafted treasures!</p>
            <Link to="/shop">
              <Button className="bg-empower-terracotta hover:bg-empower-terracotta/80 text-white">
                <Package size={18} className="mr-2" />
                Browse Products
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
        <h1 className="text-3xl font-bold text-empower-brown mb-6 text-focus-in">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-empower-brown">
                {cartCount} {cartCount === 1 ? 'Item' : 'Items'}
              </h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-empower-terracotta hover:text-empower-terracotta/80"
                onClick={() => {
                  clearCart();
                  toast.success('Cart cleared', {
                    description: 'All items have been removed from your cart'
                  });
                }}
              >
                <Trash2 size={16} className="mr-2" /> Clear Cart
              </Button>
            </div>
            
            <Separator className="mb-6" />
            
            <div className="space-y-6">
              {cartItems.map(item => {
                const product = products.find(p => p.id === item.productId);
                if (!product) return null;
                
                return (
                  <div key={`${item.productId}-${item.color}-${item.size}`} className="flex flex-col md:flex-row gap-4">
                    <Link to={`/shop/product/${product.id}`} className="w-full md:w-24 h-24 rounded-md overflow-hidden">
                      <img 
                        src={product.images[0].url} 
                        alt={product.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <Link to={`/shop/product/${product.id}`}>
                            <h3 className="font-medium hover:text-empower-terracotta transition-colors text-empower-brown">
                              {product.title}
                            </h3>
                          </Link>
                          
                          <div className="flex flex-wrap gap-2 mt-1 text-sm text-gray-500">
                            {item.color && <span>Color: {item.color}</span>}
                            {item.size && (
                              <>
                                <span>•</span>
                                <span>Size: {item.size}</span>
                              </>
                            )}
                            {item.material && (
                              <>
                                <span>•</span>
                                <span>Material: {item.material}</span>
                              </>
                            )}
                          </div>
                          
                          <div className="mt-2 md:hidden">
                            <span className="font-semibold text-empower-brown">
                              ${((product.discountedPrice || product.price) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-3 md:mt-0">
                          <div className="flex items-center mr-4">
                            <button 
                              onClick={() => handleUpdateQuantity(product.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-l-md"
                            >
                              -
                            </button>
                            <input 
                              type="text" 
                              value={item.quantity} 
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (!isNaN(value)) {
                                  handleUpdateQuantity(product.id, value);
                                }
                              }} 
                              className="w-12 h-8 text-center border-y border-gray-200"
                            />
                            <button 
                              onClick={() => handleUpdateQuantity(product.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-r-md"
                            >
                              +
                            </button>
                          </div>
                          
                          <div className="hidden md:block">
                            <span className="font-semibold text-empower-brown">
                              ${((product.discountedPrice || product.price) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          
                          <button 
                            onClick={() => {
                              removeFromCart(product.id);
                              toast('Item removed', {
                                description: `${product.title} has been removed from your cart`
                              });
                            }}
                            className="ml-4 text-gray-400 hover:text-empower-terracotta"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8">
              <Link to="/shop" className="inline-flex items-center text-empower-brown hover:text-empower-terracotta transition-colors">
                <ChevronLeft size={16} className="mr-1" />
                Continue Shopping
              </Link>
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-empower-brown mb-4">Order Summary</h2>
              
              <div className="space-y-3 text-empower-brown">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-semibold text-lg text-empower-brown">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              
              <Button 
                className="w-full mt-6 bg-empower-terracotta hover:bg-empower-terracotta/80 text-white"
                size="lg"
              >
                Proceed to Checkout
                <ArrowRight size={16} className="ml-2" />
              </Button>
              
              <div className="mt-6">
                <div className="text-sm text-empower-brown/70 mb-3">Have a promo code?</div>
                <div className="flex">
                  <Input placeholder="Enter code" className="rounded-r-none" />
                  <Button className="rounded-l-none">Apply</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
