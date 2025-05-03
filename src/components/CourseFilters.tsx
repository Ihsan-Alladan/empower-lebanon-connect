
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";

interface CourseFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedPrice: string;
  setSelectedPrice: (price: string) => void;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const CourseFilters: React.FC<CourseFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedLevel,
  setSelectedLevel,
  selectedPrice,
  setSelectedPrice,
  selectedTab,
  setSelectedTab
}) => {
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLevel('all');
    setSelectedPrice('all');
    setSelectedTab('all');
  };
  
  return (
    <div className="bg-empower-ivory/30 p-4 rounded-lg mb-8 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          {searchQuery && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={() => setSearchQuery('')}
            >
              <X size={16} />
            </Button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedPrice} onValueChange={setSelectedPrice}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
          </Select>
          
          {(searchQuery || selectedLevel !== 'all' || selectedPrice !== 'all') && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearFilters} 
              className="flex items-center gap-1"
            >
              <X size={14} /> Clear All
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseFilters;
