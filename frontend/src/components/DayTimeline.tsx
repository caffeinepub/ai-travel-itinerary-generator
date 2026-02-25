import type { ItineraryDay, RestaurantSuggestion, TransportSuggestion } from '../backend';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ActivityCard from './ActivityCard';
import { Sunrise, Sun, Moon } from 'lucide-react';

interface DayTimelineProps {
  dayNumber: number;
  day: ItineraryDay;
  restaurants: RestaurantSuggestion[];
  transport: TransportSuggestion[];
}

export default function DayTimeline({ dayNumber, day, restaurants, transport }: DayTimelineProps) {
  const timeBlocks = [
    { title: 'Morning', icon: Sunrise, activities: day.morning, color: 'text-sunset-yellow' },
    { title: 'Afternoon', icon: Sun, activities: day.afternoon, color: 'text-sunset-orange' },
    { title: 'Evening', icon: Moon, activities: day.evening, color: 'text-sunset-coral' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Day {dayNumber}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {timeBlocks.map((block, blockIndex) => (
          <div key={block.title}>
            <div className="flex items-center gap-2 mb-4">
              <block.icon className={`w-5 h-5 ${block.color}`} />
              <h3 className="font-semibold text-lg">{block.title}</h3>
            </div>

            {block.activities.length === 0 ? (
              <p className="text-sm text-muted-foreground ml-7">No activities planned</p>
            ) : (
              <div className="space-y-3 ml-7">
                {block.activities.map((activity, activityIndex) => (
                  <ActivityCard key={activityIndex} activity={activity} />
                ))}
              </div>
            )}

            {blockIndex < timeBlocks.length - 1 && <Separator className="mt-6" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
