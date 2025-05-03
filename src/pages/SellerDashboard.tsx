
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Package,
  ShoppingCart,
  Users,
  BarChart2,
  Settings,
  Edit,
  Trash2,
  Plus,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { products } from '@/data/products';
import { toast } from '@/components/ui/sonner';

const SellerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  
  const filteredProducts = products.filter(product => {
    // Filter by search query
    if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    
    return true;
  });
  
  const categories = [...new Set(products.map(p => p.category))];
  
  const handleDeleteProduct = () => {
    // Here you would delete the product
    toast.success('Product deleted', {
      description: 'The product has been removed from your inventory'
    });
    setIsDeleteDialogOpen(false);
  };
  
  const stats = [
    { title: 'Total Products', value: products.length, icon: Package },
    { title: 'Orders', value: 24, icon: ShoppingCart },
    { title: 'Customers', value: 18, icon: Users },
    { title: 'Revenue', value: '$2,450', icon: BarChart2 },
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-empower-ivory">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-empower-brown mb-2 text-focus-in">Seller Dashboard</h1>
        <p className="text-empower-brown/70 mb-8">Manage your products, orders, and store settings</p>
        
        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="mr-4 p-3 rounded-full bg-empower-terracotta/10">
                    <stat.icon className="text-empower-terracotta" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-empower-brown/70">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-empower-brown">{stat.value}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="products" className="data-[state=active]:text-empower-terracotta">
                <Package size={18} className="mr-2" />
                Products
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:text-empower-terracotta">
                <ShoppingCart size={18} className="mr-2" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="customers" className="data-[state=active]:text-empower-terracotta">
                <Users size={18} className="mr-2" />
                Customers
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:text-empower-terracotta">
                <Settings size={18} className="mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="products" className="animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-empower-brown">Product Management</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-empower-terracotta hover:bg-empower-terracotta/80 text-white">
                      <Plus size={16} className="mr-2" />
                      Add New Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                    </DialogHeader>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="title">Product Title</Label>
                        <Input id="title" placeholder="Enter product title" />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Describe your product" className="h-24" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="price">Price ($)</Label>
                        <Input id="price" type="number" placeholder="0.00" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="discountedPrice">Discounted Price ($)</Label>
                        <Input id="discountedPrice" type="number" placeholder="0.00" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                            <SelectItem value="new">+ Add New Category</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="stock">Stock Quantity</Label>
                        <Input id="stock" type="number" placeholder="0" />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="images">Images</Label>
                        <Input id="images" type="file" multiple />
                        <p className="text-xs text-gray-500 mt-1">Upload up to 5 images. First image will be the main product image.</p>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button 
                        className="bg-empower-terracotta hover:bg-empower-terracotta/80 text-white"
                        onClick={() => {
                          toast.success('Product created!', {
                            description: 'Your new product has been added to your inventory'
                          });
                        }}
                      >
                        Save Product
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="w-full md:w-60">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Products table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Product</th>
                      <th className="text-left py-3 px-4">Category</th>
                      <th className="text-left py-3 px-4">Price</th>
                      <th className="text-left py-3 px-4">Stock</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-empower-ivory/30">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <img 
                              src={product.images[0].url} 
                              alt={product.title} 
                              className="w-12 h-12 rounded object-cover mr-3" 
                            />
                            <span className="font-medium text-empower-brown">{product.title}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{product.category}</td>
                        <td className="py-3 px-4">
                          {product.discountedPrice ? (
                            <div>
                              <span className="font-medium">${product.discountedPrice.toFixed(2)}</span>
                              <span className="text-sm line-through text-gray-500 ml-2">
                                ${product.price.toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span className="font-medium">${product.price.toFixed(2)}</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className={product.stock < 5 ? "text-empower-terracotta" : ""}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-empower-brown">
                                  <Edit size={18} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Product</DialogTitle>
                                </DialogHeader>
                                {/* Similar form as Add New Product */}
                              </DialogContent>
                            </Dialog>
                            
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-empower-terracotta"
                              onClick={() => {
                                setProductToDelete(product.id);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 size={18} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-empower-brown/70">
                  Showing {filteredProducts.length} of {products.length} products
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" className="bg-empower-terracotta text-white">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="orders" className="animate-fade-in">
              <div className="text-center py-12">
                <ShoppingCart size={64} className="mx-auto text-empower-olive/60 mb-6" />
                <h2 className="text-2xl font-semibold text-empower-brown mb-2">Coming Soon</h2>
                <p className="text-empower-brown/70">The Orders management section is currently under development.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="customers" className="animate-fade-in">
              <div className="text-center py-12">
                <Users size={64} className="mx-auto text-empower-olive/60 mb-6" />
                <h2 className="text-2xl font-semibold text-empower-brown mb-2">Coming Soon</h2>
                <p className="text-empower-brown/70">The Customers management section is currently under development.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="animate-fade-in">
              <div className="text-center py-12">
                <Settings size={64} className="mx-auto text-empower-olive/60 mb-6" />
                <h2 className="text-2xl font-semibold text-empower-brown mb-2">Coming Soon</h2>
                <p className="text-empower-brown/70">The Shop settings section is currently under development.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
      
      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="py-4">Are you sure you want to delete this product? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteProduct}
            >
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SellerDashboard;
