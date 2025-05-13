
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';

interface CoursePriceInputProps {
  control: Control<any>;
}

const CoursePriceInput: React.FC<CoursePriceInputProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="price"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Price</FormLabel>
          <FormControl>
            <div className="flex space-x-4">
              <Select 
                onValueChange={(value) => {
                  if (value === 'free') {
                    field.onChange('free');
                  } else if (value === 'paid') {
                    field.onChange('');
                  }
                }}
                defaultValue={field.value === 'free' ? 'free' : 'paid'}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
              
              {field.value !== 'free' && (
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                  <Input 
                    type="number" 
                    className="pl-7" 
                    placeholder="29.99" 
                    min="0" 
                    step="0.01"
                    value={field.value === 'free' ? '' : field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CoursePriceInput;
