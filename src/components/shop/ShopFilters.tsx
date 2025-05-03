
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';

interface ShopFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedPrice: string;
  setSelectedPrice: (price: string) => void;
  categories: string[];
}

const ShopFilters: React.FC<ShopFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedPrice,
  setSelectedPrice,
  categories
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="search" className="text-sm font-medium text-empower-brown mb-2 block">
            Search Products
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-empower-brown/60" size={18} />
            <Input
              id="search"
              type="text"
              placeholder="Search handcrafts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-empower-ivory/50 border-empower-olive/20"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="category" className="text-sm font-medium text-empower-brown mb-2 block">
            Category
          </Label>
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger id="category" className="bg-empower-ivory/50 border-empower-olive/20">
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
        
        <div>
          <Label htmlFor="price" className="text-sm font-medium text-empower-brown mb-2 block">
            Price Range
          </Label>
          <Select
            value={selectedPrice}
            onValueChange={setSelectedPrice}
          >
            <SelectTrigger id="price" className="bg-empower-ivory/50 border-empower-olive/20">
              <SelectValue placeholder="All Prices" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="under50">Under $50</SelectItem>
              <SelectItem value="50to100">$50 to $100</SelectItem>
              <SelectItem value="over100">Over $100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex items-center justify-end mt-4">
        <Filter size={16} className="mr-2 text-empower-brown" />
        <span className="text-sm text-empower-brown font-medium">
          Active Filters: {selectedCategory !== 'all' || selectedPrice !== 'all' || searchQuery ? 
            [
              selectedCategory !== 'all' ? selectedCategory : null,
              selectedPrice !== 'all' ? (
                selectedPrice === 'under50' ? 'Under $50' : 
                selectedPrice === '50to100' ? '$50 to $100' : 'Over $100'
              ) : null,
              searchQuery ? `"${searchQuery}"` : null
            ].filter(Boolean).join(', ') : 
            'None'}
        </span>
      </div>
    </div>
  );
};

export default ShopFilters;
