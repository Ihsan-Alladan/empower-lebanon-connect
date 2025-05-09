
import React from 'react';
import { motion } from 'framer-motion';
import { EventCategory } from '@/types/event';
import { Badge } from '@/components/ui/badge';

interface EventFiltersProps {
  selectedCategory: EventCategory | 'all';
  setSelectedCategory: (category: EventCategory | 'all') => void;
}

const categories: Array<{ value: EventCategory | 'all'; label: string }> = [
  { value: 'all', label: 'All Categories' },
  { value: 'social', label: 'Social' },
  { value: 'educational', label: 'Educational' },
  { value: 'fundraising', label: 'Fundraising' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'networking', label: 'Networking' },
  { value: 'community', label: 'Community' },
  { value: 'career', label: 'Career' },
];

const EventFilters: React.FC<EventFiltersProps> = ({
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

export default EventFilters;
