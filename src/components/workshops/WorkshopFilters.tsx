
import React from 'react';
import { motion } from 'framer-motion';
import { WorkshopCategory } from '@/types/workshop';
import { Badge } from '@/components/ui/badge';

interface WorkshopFiltersProps {
  selectedCategory: WorkshopCategory | 'all';
  setSelectedCategory: (category: WorkshopCategory | 'all') => void;
}

const categories: Array<{ value: WorkshopCategory | 'all'; label: string }> = [
  { value: 'all', label: 'All Categories' },
  { value: 'handmade', label: 'Handmade' },
  { value: 'tech', label: 'Tech' },
  { value: 'cooking', label: 'Cooking' },
  { value: 'art', label: 'Art' },
  { value: 'business', label: 'Business' },
  { value: 'language', label: 'Language' },
];

const WorkshopFilters: React.FC<WorkshopFiltersProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <motion.div
          key={category.value}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Badge
            variant={selectedCategory === category.value ? "default" : "outline"}
            className={`
              cursor-pointer text-sm py-1.5 px-3
              ${selectedCategory === category.value ? 
                'bg-empower-terracotta hover:bg-empower-terracotta/90' : 
                'hover:bg-muted'}
            `}
            onClick={() => setSelectedCategory(category.value)}
          >
            {category.label}
          </Badge>
        </motion.div>
      ))}
    </div>
  );
};

export default WorkshopFilters;
