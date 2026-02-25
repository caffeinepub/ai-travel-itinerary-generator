import { useGetReviews, useGetUserProfile } from '../hooks/useQueries';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, MessageSquare } from 'lucide-react';

interface ReviewsListProps {
  itemId: string;
}

export default function ReviewsList({ itemId }: ReviewsListProps) {
  const { data: reviews = [], isLoading } = useGetReviews(itemId);

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading reviews...</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <MessageSquare className="w-4 h-4" />
        No reviews yet. Be the first to share your experience!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold flex items-center gap-2">
        <MessageSquare className="w-4 h-4" />
        Community Reviews ({reviews.length})
      </h4>
      <div className="space-y-2">
        {reviews.map((review, index) => (
          <ReviewItem key={index} review={review} />
        ))}
      </div>
    </div>
  );
}

function ReviewItem({ review }: { review: any }) {
  const { data: userProfile } = useGetUserProfile(review.author);

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-3 space-y-2">
        <div className="flex items-start gap-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="text-xs">
              {userProfile?.name?.charAt(0).toUpperCase() || '?'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{userProfile?.name || 'Anonymous'}</p>
              {review.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-sunset-yellow text-sunset-yellow" />
                  <span className="text-xs">{review.rating.toString()}</span>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{review.comment}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
