import type { Itinerary } from '../backend';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface ItineraryMapProps {
  itinerary: Itinerary;
}

export default function ItineraryMap({ itinerary }: ItineraryMapProps) {
  // Collect all activities from all days
  const allActivities = itinerary.days.flatMap((day) => [
    ...day.morning,
    ...day.afternoon,
    ...day.evening,
  ]);

  return (
    <Card>
      <CardContent className="p-8">
        <div className="text-center space-y-4">
          <MapPin className="w-16 h-16 mx-auto text-muted-foreground" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Interactive Map Coming Soon</h3>
            <p className="text-muted-foreground">
              We're working on an interactive map to visualize your itinerary locations and routes.
            </p>
          </div>

          <div className="pt-4">
            <p className="text-sm font-medium mb-2">Locations in your itinerary:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {allActivities.slice(0, 10).map((activity, index) => (
                <span
                  key={index}
                  className="text-xs bg-accent/50 px-2 py-1 rounded-full"
                >
                  {activity.location}
                </span>
              ))}
              {allActivities.length > 10 && (
                <span className="text-xs text-muted-foreground px-2 py-1">
                  +{allActivities.length - 10} more
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
