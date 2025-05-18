
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Star, ThumbsUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ProductReview } from '@/types/product';

interface Rating {
  stars: number;
  percentage: number;
}

interface ProductReviewSectionProps {
  productId: string;
  averageRating: number;
  reviews: ProductReview[];
  totalReviews: number;
}

const ProductReviewSection = ({
  productId,
  averageRating = 0,
  reviews = [],
  totalReviews = 0,
}: ProductReviewSectionProps) => {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState<'all' | number>('all');
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [review, setReview] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [page, setPage] = useState(1);
  const reviewsPerPage = 3;
  
  const reviewsArray = Array.isArray(reviews) ? reviews : [];
  
  // Calculate rating breakdown
  const ratingBreakdown: Rating[] = [5, 4, 3, 2, 1].map(stars => {
    let count = 0;
    if (Array.isArray(reviewsArray)) {
      count = reviewsArray.filter(review => review.rating === stars).length;
    }
    
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { stars, percentage };
  });

  // Filter reviews based on active filter
  const filteredReviews = activeFilter === 'all' 
    ? reviewsArray
    : reviewsArray.filter(review => review.rating === activeFilter);

  // Paginate reviews
  const paginatedReviews = filteredReviews.slice(
    (page - 1) * reviewsPerPage,
    page * reviewsPerPage
  );

  // Total pages for pagination
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  const handleRatingClick = (rating: number) => {
    setUserRating(rating);
  };

  const handleRatingHover = (rating: number) => {
    setHoveredRating(rating);
  };

  const handleSubmit = () => {
    if (!user) {
      toast.error('Please sign in to leave a review');
      return;
    }

    if (userRating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (!review.trim()) {
      toast.error('Please write a review');
      return;
    }

    // Submit review to server
    toast.success('Thank you for your review!');
    setReview('');
    setUserRating(0);
    setShowWriteReview(false);
  };

  return (
    <div className="mt-8 border-t pt-8">
      <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>
      
      <div className="grid md:grid-cols-12 gap-8">
        {/* Overview */}
        <div className="md:col-span-4">
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
            <div className="text-5xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="flex items-center my-2">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  size={18}
                  className={`${
                    star <= averageRating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500">
              Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
            </div>
            
            <div className="w-full mt-4 space-y-2">
              {ratingBreakdown.map(rating => (
                <div key={rating.stars} className="flex items-center gap-2">
                  <div className="w-12 text-sm">{rating.stars} star</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-yellow-400 h-full"
                      style={{ width: `${rating.percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-8 text-xs text-gray-500">{rating.percentage.toFixed(0)}%</div>
                </div>
              ))}
            </div>
          </div>
          
          {!showWriteReview && (
            <Button 
              className="w-full mt-4 bg-empower-terracotta hover:bg-empower-terracotta/90"
              onClick={() => setShowWriteReview(true)}
            >
              Write a Review
            </Button>
          )}
        </div>
        
        {/* Review list */}
        <div className="md:col-span-8">
          {showWriteReview && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-3">Write a Review</h3>
              
              <div className="mb-4">
                <p className="text-sm mb-2">Your Rating *</p>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <Star
                      key={rating}
                      size={24}
                      className={`cursor-pointer ${
                        rating <= (hoveredRating || userRating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                      onClick={() => handleRatingClick(rating)}
                      onMouseEnter={() => handleRatingHover(rating)}
                      onMouseLeave={() => handleRatingHover(0)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm mb-2">Your Review *</p>
                <Textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your review here..."
                  rows={5}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleSubmit}
                  className="bg-empower-terracotta hover:bg-empower-terracotta/90"
                >
                  Submit Review
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowWriteReview(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          
          {/* Filter controls */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('all')}
              className={activeFilter === 'all' ? 'bg-empower-terracotta hover:bg-empower-terracotta/90' : ''}
            >
              All Reviews
            </Button>
            {[5, 4, 3, 2, 1].map(stars => (
              <Button
                key={stars}
                variant={activeFilter === stars ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(stars)}
                className={activeFilter === stars ? 'bg-empower-terracotta hover:bg-empower-terracotta/90' : ''}
              >
                {stars} Star
              </Button>
            ))}
          </div>
          
          {/* Reviews */}
          {reviewsArray && reviewsArray.length > 0 ? (
            <div className="space-y-6">
              {paginatedReviews.map((review, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.userAvatar} alt={review.userName} />
                      <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-semibold">{review.userName}</h4>
                        <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center my-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            size={16}
                            className={`${
                              star <= review.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <p className="text-gray-700 mt-2">{review.comment}</p>
                      
                      <div className="mt-3">
                        <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
                          <ThumbsUp size={14} /> Helpful
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </Button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                    <Button
                      key={pageNum}
                      variant={pageNum === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(pageNum)}
                      className={pageNum === page ? 'bg-empower-terracotta hover:bg-empower-terracotta/90' : ''}
                    >
                      {pageNum}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviewSection;
