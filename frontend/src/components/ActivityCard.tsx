import type { Activity } from '../backend';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import ReviewsList from './ReviewsList';
import AddReviewForm from './AddReviewForm';

interface ActivityCardProps {
  activity: Activity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <Card className="border-l-4 border-l-sunset-coral">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{activity.name}</CardTitle>
          <Badge variant="outline">{activity.type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{activity.description}</p>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          {activity.location}
        </div>

        <div className="pt-4 space-y-4">
          <ReviewsList itemId={activity.name} />
          <AddReviewForm itemId={activity.name} />
        </div>
      </CardContent>
    </Card>
  );
}
