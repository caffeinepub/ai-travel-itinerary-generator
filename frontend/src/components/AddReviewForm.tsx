import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useAddReview } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface AddReviewFormProps {
  itemId: string;
}

export default function AddReviewForm({ itemId }: AddReviewFormProps) {
  const { identity } = useInternetIdentity();
  const addReview = useAddReview();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const isAuthenticated = !!identity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identity) {
      toast.error('Please log in to add a review');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    try {
      await addReview.mutateAsync({
        user: identity.getPrincipal(),
        author: identity.getPrincipal(),
        comment: comment.trim(),
        rating: rating ? BigInt(rating) : undefined,
        associatedItem: itemId,
      });

      toast.success('Review added successfully!');
      setComment('');
      setRating(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error('Failed to add review');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (!showForm) {
    return (
      <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
        Add Your Review
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-3 border rounded-lg bg-card">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="focus:outline-none"
          >
            <Star
              className={`w-5 h-5 transition-colors ${
                rating && star <= rating
                  ? 'fill-sunset-yellow text-sunset-yellow'
                  : 'text-muted-foreground'
              }`}
            />
          </button>
        ))}
      </div>

      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience..."
        rows={3}
      />

      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={addReview.isPending}>
          {addReview.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Posting...
            </>
          ) : (
            'Post Review'
          )}
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => setShowForm(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
