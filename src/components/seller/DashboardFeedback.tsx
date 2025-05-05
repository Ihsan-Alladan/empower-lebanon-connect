
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Star, User } from 'lucide-react';
import { products } from '@/data/products';

// Collect all reviews from products
const allReviews = products.flatMap(product => 
  (product.reviews || []).map(review => ({
    ...review,
    productId: product.id,
    productTitle: product.title,
    productImage: product.images[0].url
  }))
);

const DashboardFeedback: React.FC = () => {
  // Sort reviews by date (most recent first)
  const sortedReviews = [...allReviews].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const getStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={14} 
            className={i < rating ? "fill-empower-gold text-empower-gold" : "text-gray-300"} 
          />
        ))}
      </div>
    );
  };
  
  // Calculate overall rating
  const overallRating = allReviews.length > 0
    ? allReviews.reduce((acc, review) => acc + review.rating, 0) / allReviews.length
    : 0;
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-empower-brown">Customer Feedback</h2>
      </div>
      
      {/* Rating summary */}
      <div className="bg-empower-ivory/50 rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#B56E4D]">{overallRating.toFixed(1)}</div>
            <div className="flex justify-center mt-1">
              {getStars(Math.round(overallRating))}
            </div>
            <div className="text-sm text-gray-500 mt-1">Overall Rating</div>
          </div>
          
          <div className="flex-1">
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(rating => {
                const count = allReviews.filter(r => Math.floor(r.rating) === rating).length;
                const percentage = allReviews.length > 0 ? (count / allReviews.length) * 100 : 0;
                
                return (
                  <div key={rating} className="flex items-center gap-2">
                    <div className="flex items-center w-12">
                      <span className="text-sm font-medium">{rating}</span>
                      <Star size={12} className="ml-1 fill-empower-gold text-empower-gold" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-empower-gold h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-sm text-gray-500">{count}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews */}
      <div className="space-y-4">
        <h3 className="font-medium text-lg text-empower-brown mb-2">Recent Reviews</h3>
        
        {sortedReviews.length > 0 ? (
          sortedReviews.map(review => (
            <Card key={review.id} className="bg-white animate-fade-in">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#B56E4D]/10 text-[#B56E4D]">
                      <User size={18} />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{review.userName}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex">
                        {getStars(review.rating)}
                      </div>
                    </div>
                    
                    <div className="mt-2">{review.comment}</div>
                    
                    <div className="flex items-center mt-3 pt-3 border-t border-gray-100">
                      <img 
                        src={review.productImage} 
                        alt={review.productTitle}
                        className="w-10 h-10 object-cover rounded mr-3"
                      />
                      <div className="text-sm text-gray-600">{review.productTitle}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <MessageCircle size={48} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-empower-brown mb-1">No reviews yet</h3>
            <p className="text-gray-500">When customers leave reviews, they'll appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardFeedback;
