
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, ShoppingCart, Heart, Package, DollarSign, 
  MessageCircle, LogOut, Trash2, ChevronDown, Edit, Camera 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { products } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, CardContent, CardDescription, 
  CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';

// Mock data for orders and donations
const orderHistory = [
  {
    id: 'ord123',
    date: '2025-05-01',
    total: 125.99,
    status: 'delivered',
    items: [
      {
        productId: '1',
        quantity: 2
      },
      {
        productId: '3',
        quantity: 1
      }
    ]
  },
  {
    id: 'ord456',
    date: '2025-04-20',
    total: 49.99,
    status: 'processing',
    items: [
      {
        productId: '2',
        quantity: 1
      }
    ]
  }
];

const donationHistory = [
  {
    id: 'don123',
    date: '2025-04-15',
    amount: 50.00,
    cause: 'Women Empowerment Initiative',
    impact: 'Provided training for 2 women entrepreneurs'
  },
  {
    id: 'don456',
    date: '2025-03-10',
    amount: 25.00,
    cause: 'Artisan Support Fund',
    impact: 'Helped sustain traditional craft making'
  }
];

const CustomerProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { favorites, removeFromFavorites, addToFavorites, isFavorite } = useFavorites();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile');
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || '',
  });

  // Check if user is authenticated, if not redirect to login
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'customer') {
      // If user is not a customer, redirect to home
      navigate('/');
      toast.error("Access denied. This page is for customers only.");
    }
  }, [user, navigate]);

  const handleUpdateProfile = () => {
    // In a real application, this would update the user's profile in the database
    toast.success("Profile updated successfully!");
    setEditProfileOpen(false);
  };

  const handleDeleteAccount = () => {
    // In a real application, this would delete the user's account from the database
    toast.success("Account deleted");
    logout();
    navigate('/');
  };

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      toast.success(`${product.title} added to cart!`);
    }
  };

  const handleDownloadReceipt = (donationId: string) => {
    toast.success(`Downloading receipt for donation #${donationId}`);
    // In a real app, this would generate and download a PDF receipt
  };

  if (!user) {
    return null; // Don't render anything if user is not authenticated
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-6 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-64 lg:w-80">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-empower-brown text-white text-xl">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold text-empower-brown">{user.name}</h2>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>
                
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-colors ${activeTab === 'profile' 
                      ? 'bg-empower-terracotta text-white' 
                      : 'hover:bg-gray-100'}`}
                  >
                    <User className="w-5 h-5 mr-3" />
                    <span>My Profile</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('cart')}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors ${activeTab === 'cart' 
                      ? 'bg-empower-terracotta text-white' 
                      : 'hover:bg-gray-100'}`}
                  >
                    <div className="flex items-center">
                      <ShoppingCart className="w-5 h-5 mr-3" />
                      <span>My Cart</span>
                    </div>
                    {cartItems.length > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${activeTab === 'cart' 
                        ? 'bg-white text-empower-terracotta' 
                        : 'bg-empower-terracotta text-white'}`}>
                        {cartItems.length}
                      </span>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('wishlist')}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors ${activeTab === 'wishlist' 
                      ? 'bg-empower-terracotta text-white' 
                      : 'hover:bg-gray-100'}`}
                  >
                    <div className="flex items-center">
                      <Heart className="w-5 h-5 mr-3" />
                      <span>Wishlist</span>
                    </div>
                    {favorites.length > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${activeTab === 'wishlist' 
                        ? 'bg-white text-empower-terracotta' 
                        : 'bg-empower-terracotta text-white'}`}>
                        {favorites.length}
                      </span>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-colors ${activeTab === 'orders' 
                      ? 'bg-empower-terracotta text-white' 
                      : 'hover:bg-gray-100'}`}
                  >
                    <Package className="w-5 h-5 mr-3" />
                    <span>Order History</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('donations')}
                    className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-colors ${activeTab === 'donations' 
                      ? 'bg-empower-terracotta text-white' 
                      : 'hover:bg-gray-100'}`}
                  >
                    <DollarSign className="w-5 h-5 mr-3" />
                    <span>Donations</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('support')}
                    className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-colors ${activeTab === 'support' 
                      ? 'bg-empower-terracotta text-white' 
                      : 'hover:bg-gray-100'}`}
                  >
                    <MessageCircle className="w-5 h-5 mr-3" />
                    <span>Customer Service</span>
                  </button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center px-4 py-2.5 text-gray-600 hover:text-empower-terracotta hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    <span>Sign Out</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('delete-account')}
                    className="w-full flex items-center px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2"
                  >
                    <Trash2 className="w-5 h-5 mr-3" />
                    <span>Delete Account</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Main content area */}
            <div className="flex-1">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="animate-fade-in">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl text-empower-brown">My Profile</CardTitle>
                        <CardDescription>View and update your personal information</CardDescription>
                      </div>
                      <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
                        <DialogTrigger asChild>
                          <Button className="bg-empower-terracotta hover:bg-empower-terracotta/90">
                            <Edit className="mr-2 h-4 w-4" /> Edit Profile
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="flex flex-col items-center mb-4">
                              <Avatar className="h-24 w-24 mb-2 relative group">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                  <Camera className="h-8 w-8 text-white" />
                                </div>
                              </Avatar>
                              <span className="text-sm text-empower-terracotta">Change Photo</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <Label htmlFor="firstName">First name</Label>
                                <Input 
                                  id="firstName" 
                                  value={userProfile.firstName} 
                                  onChange={(e) => setUserProfile({...userProfile, firstName: e.target.value})}
                                />
                              </div>
                              <div className="space-y-1">
                                <Label htmlFor="lastName">Last name</Label>
                                <Input 
                                  id="lastName" 
                                  value={userProfile.lastName} 
                                  onChange={(e) => setUserProfile({...userProfile, lastName: e.target.value})}
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <Label htmlFor="email">Email</Label>
                              <Input 
                                id="email" 
                                type="email" 
                                value={userProfile.email} 
                                onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                              />
                            </div>
                            
                            <div className="space-y-1">
                              <Label htmlFor="phone">Phone number</Label>
                              <Input 
                                id="phone" 
                                value={userProfile.phoneNumber} 
                                onChange={(e) => setUserProfile({...userProfile, phoneNumber: e.target.value})}
                              />
                            </div>
                            
                            <div className="space-y-1">
                              <Label htmlFor="address">Address</Label>
                              <Input 
                                id="address" 
                                value={userProfile.address} 
                                onChange={(e) => setUserProfile({...userProfile, address: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setEditProfileOpen(false)}>Cancel</Button>
                            <Button className="bg-empower-terracotta hover:bg-empower-terracotta/90" onClick={handleUpdateProfile}>
                              Save Changes
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Full Name</p>
                          <p>{user.name}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Email</p>
                          <p>{user.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Phone Number</p>
                          <p>{user.phoneNumber || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Address</p>
                          <p>{user.address || 'Not provided'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {/* Cart Tab */}
              {activeTab === 'cart' && (
                <div className="animate-fade-in">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl text-empower-brown">My Cart</CardTitle>
                      <CardDescription>Items you've added to your cart</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {cartItems.length === 0 ? (
                        <div className="text-center py-12">
                          <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-medium mb-1">Your cart is empty</h3>
                          <p className="text-gray-500 mb-6">Start shopping and add some items to your cart.</p>
                          <Button 
                            className="bg-empower-terracotta hover:bg-empower-terracotta/90"
                            onClick={() => navigate('/shop')}
                          >
                            Browse Products
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {cartItems.map((item) => {
                            const product = products.find(p => p.id === item.productId);
                            if (!product) return null;
                            
                            return (
                              <div key={item.productId} className="flex gap-4 pb-4 border-b last:border-0">
                                <div className="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                  <img 
                                    src={product.images[0].url} 
                                    alt={product.title} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between">
                                    <h4 className="font-medium text-empower-brown truncate">{product.title}</h4>
                                    <p className="font-medium text-empower-brown">${(product.discountedPrice || product.price) * item.quantity}</p>
                                  </div>
                                  <div className="flex justify-between items-end mt-2">
                                    <div className="flex items-center space-x-2">
                                      <button 
                                        className="w-7 h-7 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                                        onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                                      >
                                        -
                                      </button>
                                      <span>{item.quantity}</span>
                                      <button 
                                        className="w-7 h-7 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                      >
                                        +
                                      </button>
                                    </div>
                                    <button 
                                      className="text-sm text-red-500 hover:text-red-700"
                                      onClick={() => removeFromCart(item.productId)}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </CardContent>
                    {cartItems.length > 0 && (
                      <CardFooter className="flex flex-col">
                        <div className="w-full flex justify-between border-t pt-4">
                          <p className="text-lg font-medium">Total:</p>
                          <p className="text-lg font-bold text-empower-terracotta">${cartTotal.toFixed(2)}</p>
                        </div>
                        <Button 
                          className="w-full mt-4 py-6 text-lg bg-empower-terracotta hover:bg-empower-terracotta/90"
                          onClick={() => navigate('/checkout')}
                        >
                          Proceed to Checkout
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                </div>
              )}
              
              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div className="animate-fade-in">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl text-empower-brown">My Wishlist</CardTitle>
                      <CardDescription>Products you've saved for later</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {favorites.length === 0 ? (
                        <div className="text-center py-12">
                          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-medium mb-1">Your wishlist is empty</h3>
                          <p className="text-gray-500 mb-6">Save items you like so you can find them later.</p>
                          <Button 
                            className="bg-empower-terracotta hover:bg-empower-terracotta/90"
                            onClick={() => navigate('/shop')}
                          >
                            Browse Products
                          </Button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {favorites.map((item) => {
                            const product = products.find(p => p.id === item.productId);
                            if (!product) return null;
                            
                            const inStock = (product.stock || 0) > 0;
                            
                            return (
                              <div key={item.productId} className="border rounded-lg overflow-hidden group">
                                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                                  <img 
                                    src={product.images[0].url} 
                                    alt={product.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                  <button 
                                    className="absolute top-2 right-2 w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center"
                                    onClick={() => removeFromFavorites(product.id)}
                                  >
                                    <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                                  </button>
                                </div>
                                <div className="p-4">
                                  <h4 className="font-medium text-empower-brown truncate mb-1">{product.title}</h4>
                                  <div className="flex justify-between items-center">
                                    <p className="text-empower-terracotta font-medium">
                                      {product.discountedPrice ? (
                                        <>
                                          <span>${product.discountedPrice}</span>{" "}
                                          <span className="text-gray-400 line-through text-sm">${product.price}</span>
                                        </>
                                      ) : (
                                        `$${product.price}`
                                      )}
                                    </p>
                                    <div>
                                      {inStock ? (
                                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">In Stock</span>
                                      ) : (
                                        <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">Out of Stock</span>
                                      )}
                                    </div>
                                  </div>
                                  <Button 
                                    className={`w-full mt-3 ${inStock 
                                      ? 'bg-empower-terracotta hover:bg-empower-terracotta/90' 
                                      : 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed'}`}
                                    onClick={() => inStock && handleAddToCart(product.id)}
                                    disabled={!inStock}
                                  >
                                    {inStock ? 'Add to Cart' : 'Out of Stock'}
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {/* Order History Tab */}
              {activeTab === 'orders' && (
                <div className="animate-fade-in">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl text-empower-brown">Order History</CardTitle>
                      <CardDescription>View your previous orders and their status</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {orderHistory.length === 0 ? (
                        <div className="text-center py-12">
                          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-medium mb-1">No orders yet</h3>
                          <p className="text-gray-500 mb-6">When you place an order, it will show up here.</p>
                          <Button 
                            className="bg-empower-terracotta hover:bg-empower-terracotta/90"
                            onClick={() => navigate('/shop')}
                          >
                            Start Shopping
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {orderHistory.map((order) => (
                            <div key={order.id} className="border rounded-lg overflow-hidden">
                              <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between">
                                <div>
                                  <p className="font-medium">Order #{order.id}</p>
                                  <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center mt-2 sm:mt-0">
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="p-4">
                                {order.items.map((item) => {
                                  const product = products.find(p => p.id === item.productId);
                                  if (!product) return null;
                                  
                                  return (
                                    <div key={item.productId} className="flex gap-4 py-3 border-b last:border-0">
                                      <div className="w-16 h-16 rounded-md bg-gray-100 overflow-hidden">
                                        <img 
                                          src={product.images[0].url} 
                                          alt={product.title} 
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <div className="flex-1">
                                        <p className="font-medium">{product.title}</p>
                                        <div className="flex justify-between mt-1">
                                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                          <p>${(product.discountedPrice || product.price) * item.quantity}</p>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              
                              <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between items-center border-t">
                                <p className="font-medium">Total: <span className="text-empower-terracotta">${order.total}</span></p>
                                <div className="flex gap-2 mt-3 sm:mt-0">
                                  <Button size="sm" variant="outline">
                                    View Invoice
                                  </Button>
                                  <Button size="sm" className="bg-empower-terracotta hover:bg-empower-terracotta/90">
                                    Reorder
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {/* Donations Tab */}
              {activeTab === 'donations' && (
                <div className="animate-fade-in">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl text-empower-brown">Donation History</CardTitle>
                      <CardDescription>Your contributions to our causes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {donationHistory.length === 0 ? (
                        <div className="text-center py-12">
                          <DollarSign className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-medium mb-1">No donations yet</h3>
                          <p className="text-gray-500 mb-6">Your donations to our causes will appear here.</p>
                          <Button 
                            className="bg-empower-terracotta hover:bg-empower-terracotta/90"
                            onClick={() => navigate('/donate')}
                          >
                            Make a Donation
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {donationHistory.map((donation) => (
                            <div key={donation.id} className="border rounded-lg overflow-hidden">
                              <div className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-medium text-empower-brown">{donation.cause}</h4>
                                    <p className="text-sm text-gray-500">
                                      Donated on {new Date(donation.date).toLocaleDateString()}
                                    </p>
                                  </div>
                                  <p className="font-bold text-empower-terracotta">${donation.amount.toFixed(2)}</p>
                                </div>
                                
                                <div className="mt-4">
                                  <p className="text-sm font-medium text-gray-500">Impact</p>
                                  <p className="text-sm">{donation.impact}</p>
                                </div>
                                
                                <div className="mt-4 flex justify-end">
                                  <Button 
                                    className="flex items-center gap-1 bg-empower-terracotta hover:bg-empower-terracotta/90"
                                    onClick={() => handleDownloadReceipt(donation.id)}
                                  >
                                    <DollarSign className="h-4 w-4" />
                                    Download Receipt
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-empower-terracotta hover:bg-empower-terracotta/90"
                        onClick={() => navigate('/donate')}
                      >
                        Make Another Donation
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              )}
              
              {/* Customer Service Tab */}
              {activeTab === 'support' && (
                <div className="animate-fade-in">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl text-empower-brown">Customer Service</CardTitle>
                      <CardDescription>Get help with your orders and account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Frequently Asked Questions</h3>
                        <div>
                          {[
                            { 
                              question: 'How can I track my order?', 
                              answer: 'You can track your order by going to the Order History tab and clicking on the order you want to track.' 
                            },
                            { 
                              question: 'What is your return policy?', 
                              answer: 'We accept returns within 30 days of delivery. Items must be in original condition with tags attached.' 
                            },
                            { 
                              question: 'How do I change my shipping address?', 
                              answer: 'You can change your shipping address by editing your profile information.' 
                            }
                          ].map((faq, idx) => (
                            <div key={idx} className="border-b last:border-b-0 py-4">
                              <button className="w-full flex items-center justify-between text-left">
                                <p className="font-medium text-empower-brown">{faq.question}</p>
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                              </button>
                              <div className="mt-2 text-gray-600 text-sm">
                                {faq.answer}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Contact Us</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="mb-4">Need help with something not covered in the FAQs? Our team is ready to help!</p>
                          <div className="space-y-4">
                            <Button className="bg-empower-terracotta hover:bg-empower-terracotta/90">
                              <MessageCircle className="mr-2 h-4 w-4" />
                              Start Live Chat
                            </Button>
                            <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                              <Button variant="outline">
                                Email Support Team
                              </Button>
                              <Button variant="outline">
                                Raise a Support Ticket
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {/* Delete Account Tab */}
              {activeTab === 'delete-account' && (
                <div className="animate-fade-in">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl text-red-600">Delete Account</CardTitle>
                      <CardDescription>This action cannot be undone</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h3 className="font-medium text-red-600 mb-2">Warning: Permanent Action</h3>
                        <p className="text-gray-700">
                          Deleting your account will permanently remove all your data, including:
                        </p>
                        <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                          <li>Order history</li>
                          <li>Saved addresses</li>
                          <li>Saved payment methods</li>
                          <li>Wishlist items</li>
                          <li>Donation history</li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-medium mb-2">Enter your password to confirm</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Please enter your password to verify your identity and confirm account deletion.
                        </p>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="confirm-password">Password</Label>
                            <Input id="confirm-password" type="password" placeholder="Enter your password" />
                          </div>
                          <Button 
                            className="w-full bg-red-600 hover:bg-red-700 text-white"
                            onClick={handleDeleteAccount}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Permanently Delete My Account
                          </Button>
                          <Button 
                            className="w-full" 
                            variant="outline" 
                            onClick={() => setActiveTab('profile')}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CustomerProfile;
