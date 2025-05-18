
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { ProductReview } from '@/types/product';

interface DashboardFeedbackProps {
  reviews?: ProductReview[];
  avgRating?: number;
}

const DashboardFeedback: React.FC<DashboardFeedbackProps> = ({ reviews = [], avgRating = 0 }) => {
  const [activeTab, setActiveTab] = useState('all');
  
  const reviewsArray = Array.isArray(reviews) ? reviews : [];
  
  // Filter reviews based on active tab
  const filteredReviews = activeTab === 'all' 
    ? reviewsArray 
    : reviewsArray.filter(review => {
        if (activeTab === 'positive') return review.rating >= 4;
        if (activeTab === 'neutral') return review.rating === 3;
        if (activeTab === 'negative') return review.rating <= 2;
        return true;
      });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <CardTitle>Customer Feedback</CardTitle>
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  size={16}
                  className={`${
                    star <= avgRating
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold">{avgRating.toFixed(1)}</span>
            <span className="text-muted-foreground">
              ({reviewsArray.length} {reviewsArray.length === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="positive">Positive</TabsTrigger>
            <TabsTrigger value="neutral">Neutral</TabsTrigger>
            <TabsTrigger value="negative">Negative</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            {filteredReviews.length > 0 ? (
              <div className="space-y-4">
                {filteredReviews.map((review, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{review.userName}</h3>
                        <div className="flex items-center space-x-2 my-1">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star
                                key={star}
                                size={14}
                                className={`${
                                  star <= review.rating
                                    ? 'text-yellow-500 fill-yellow-500'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Badge
                        variant={
                          review.rating >= 4 ? "success" : 
                          review.rating === 3 ? "warning" : 
                          "destructive"
                        }
                      >
                        {review.rating >= 4 ? "Positive" : 
                         review.rating === 3 ? "Neutral" : 
                         "Negative"}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                No {activeTab !== 'all' ? activeTab : ''} reviews yet.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DashboardFeedback;
