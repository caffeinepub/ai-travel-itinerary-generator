import { useNavigate } from '@tanstack/react-router';
import { useGetTravelGuides } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, MapPin } from 'lucide-react';

interface TravelGuidesGridProps {
  limit?: number;
}

export default function TravelGuidesGrid({ limit }: TravelGuidesGridProps) {
  const { data: guides = [], isLoading } = useGetTravelGuides();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-sunset-coral" />
      </div>
    );
  }

  const displayGuides = limit ? guides.slice(0, limit) : guides;

  if (displayGuides.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No travel guides available yet. Check back soon!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayGuides.map((guide) => (
        <Card
          key={guide.id}
          className="h-full hover:border-sunset-coral/50 transition-colors cursor-pointer"
          onClick={() => navigate({ to: '/guides/$id', params: { id: guide.id } })}
        >
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-xl">{guide.title}</CardTitle>
              {guide.season && (
                <Badge variant="secondary" className="shrink-0">
                  {guide.season}
                </Badge>
              )}
            </div>
            <CardDescription className="line-clamp-3">{guide.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {guide.exampleItineraries.length} example itineraries
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
