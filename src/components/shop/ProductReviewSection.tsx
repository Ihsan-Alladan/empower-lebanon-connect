
import React, { useState } from 'react';
import { Star, MessageCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/sonner';
import { Product } from '@/types/product';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ProductReviewSectionProps {
  product: Product;
}

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, {
    message: "Review comment must be at least 10 characters.",
  }),
});

const ProductReviewSection: React.FC<ProductReviewSectionProps> = ({ product }) => {
  const [selectedRating, setSelectedRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      comment: "",
    },
  });
  
  const handleSubmitReview = (values: z.infer<typeof reviewSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setDialogOpen(false);
      
      toast.success('Review submitted!', {
        description: 'Thank you for sharing your feedback.'
      });
      
      form.reset();
    }, 1000);
  };
  
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < Math.floor(rating) ? "fill-empower-gold text-empower-gold" : "text-gray-300"} 
      />
    ));
  };
  
  // Calculate rating breakdown percentages
  const ratingBreakdown = [];
  for (let i = 5; i >= 1; i--) {
    const count = product.reviews ? product.reviews.filter(r => Math.floor(r.rating) === i).length : 0;
    const percentage = product.reviewsCount > 0 ? (count / product.reviewsCount) * 100 : 0;
    ratingBreakdown.push({ rating: i, percentage, count });
  }
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Rating overview */}
        <div className="md:col-span-1 bg-empower-ivory/30 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-empower-brown mb-4">Customer Reviews</h3>
          
          <div className="flex items-center mb-6">
            <div className="text-4xl font-bold text-empower-brown mr-4">{product.rating.toFixed(1)}</div>
            <div>
              <div className="flex mb-1">
                {renderStars(product.rating)}
              </div>
              <div className="text-sm text-gray-500">Based on {product.reviewsCount} reviews</div>
            </div>
          </div>
          
          {/* Rating breakdown */}
          <div className="space-y-3">
            {ratingBreakdown.map((item) => (
              <div key={item.rating} className="flex items-center">
                <div className="flex items-center w-12">
                  {item.rating} <Star size={12} className="ml-1 fill-empower-gold text-empower-gold" />
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mx-2">
                  <div 
                    className="bg-empower-gold h-2 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 w-8">{item.count}</div>
              </div>
            ))}
          </div>
          
          {/* Write review button */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-8 w-full bg-empower-terracotta hover:bg-empower-terracotta/80 text-white">
                <MessageCircle size={16} className="mr-2" />
                Write a Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Write Your Review</DialogTitle>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmitReview)} className="space-y-4 py-4">
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Rating</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <button
                                key={rating}
                                type="button"
                                onClick={() => {
                                  setSelectedRating(rating);
                                  field.onChange(rating);
                                }}
                              >
                                <Star 
                                  size={24} 
                                  className={`cursor-pointer ${
                                    rating <= selectedRating 
                                      ? "fill-empower-gold text-empower-gold" 
                                      : "text-gray-300"
                                  }`}
                                />
                              </button>
                            ))}
                            <span className="ml-2 text-sm">{selectedRating} star{selectedRating !== 1 ? 's' : ''}</span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Review</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Share your experience with this product..." 
                            className="resize-none"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button 
                      type="submit"
                      className="bg-empower-terracotta hover:bg-empower-terracotta/80 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Reviews list */}
        <div className="md:col-span-2">
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="bg-empower-ivory/20 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      {review.userAvatar ? (
                        <img 
                          src={review.userAvatar} 
                          alt={review.userName} 
                          className="w-10 h-10 rounded-full object-cover mr-3" 
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-empower-olive/30 flex items-center justify-center mr-3">
                          <User size={20} className="text-empower-olive" />
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium text-empower-brown">{review.userName}</h4>
                        <div className="flex items-center text-sm">
                          <div className="flex mr-2">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-gray-500">{review.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="mt-3 text-empower-brown">
                    <p>{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <MessageCircle className="mx-auto text-empower-olive/50 mb-3" size={40} />
              <h4 className="text-lg font-medium text-empower-brown mb-2">No Reviews Yet</h4>
              <p className="text-gray-500 mb-6">Be the first to review this product</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-empower-terracotta hover:bg-empower-terracotta/80 text-white">
                    Write a Review
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  {/* Same review form as above */}
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviewSection;
