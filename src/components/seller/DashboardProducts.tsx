import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import {
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Package
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const DashboardProducts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  
  const categories = [...new Set(products.map(p => p.category))];
  
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
  
  const handleDeleteProduct = () => {
    toast.success('Product deleted', {
      description: 'The product has been removed from your inventory'
    });
    setIsDeleteDialogOpen(false);
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-empower-brown">Product Management</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#B56E4D] hover:bg-[#B56E4D]/80 text-white">
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
              
              <div className="space-y-2">
                <Label htmlFor="isHandmade">Is this handmade?</Label>
                <Select>
                  <SelectTrigger id="isHandmade">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="featured">Feature this product?</Label>
                <Select>
                  <SelectTrigger id="featured">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button 
                className="bg-[#B56E4D] hover:bg-[#B56E4D]/80 text-white"
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
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
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
        {filteredProducts.length > 0 ? (
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
                <tr key={product.id} className="border-b hover:bg-empower-ivory/30 animate-fade-in">
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
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-blue-500">
                            <Edit size={16} className="mr-2" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Product: {product.title}</DialogTitle>
                          </DialogHeader>
                          {/* Similar form as Add New Product */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                            {/* Product edit form fields */}
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="edit-title">Product Title</Label>
                              <Input id="edit-title" defaultValue={product.title} />
                            </div>
                            {/* Other fields similar to Add Product */}
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button 
                              className="bg-[#B56E4D] hover:bg-[#B56E4D]/80 text-white"
                              onClick={() => {
                                toast.success('Product updated!', {
                                  description: 'Your product has been successfully updated'
                                });
                              }}
                            >
                              Update Product
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-500 border-red-200 hover:bg-red-50"
                        onClick={() => {
                          setProductToDelete(product.id);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 size={16} className="mr-2" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-empower-brown mb-1">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters or add new products</p>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-empower-brown/70">
            Showing {filteredProducts.length} of {products.length} products
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="bg-[#B56E4D] text-white">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      )}
      
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

export default DashboardProducts;
