import { useParams, useNavigate, Link } from '@tanstack/react-router';
import { useGetTravelGuides } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowLeft, MapPin } from 'lucide-react';

export default function GuideDetailPage() {
  const { id } = useParams({ from: '/guides/$id' });
  const { data: guides = [], isLoading } = useGetTravelGuides();
  const navigate = useNavigate();

  const guide = guides.find((g) => g.id === id);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-sunset-coral" />
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Guide Not Found</CardTitle>
            <CardDescription>This travel guide doesn't exist</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link to="/guides">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Guides
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <Button asChild variant="ghost" size="sm">
          <Link to="/guides">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Guides
          </Link>
        </Button>

        <Card className="border-2">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <CardTitle className="text-3xl">{guide.title}</CardTitle>
                {guide.season && <Badge variant="secondary">{guide.season}</Badge>}
              </div>
            </div>
            <CardDescription className="text-base mt-4">{guide.description}</CardDescription>
          </CardHeader>
        </Card>

        <div>
          <h2 className="text-2xl font-bold mb-6">Example Itineraries</h2>
          {guide.exampleItineraries.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No example itineraries available yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {guide.exampleItineraries.map((itinerary) => (
                <Card
                  key={itinerary.id}
                  className="hover:border-sunset-coral/50 transition-colors cursor-pointer"
                  onClick={() => navigate({ to: '/itinerary/$id', params: { id: itinerary.id } })}
                >
                  <CardHeader>
                    <CardTitle>{itinerary.request.destination}</CardTitle>
                    <CardDescription>
                      {itinerary.request.travelDates.start} - {itinerary.request.travelDates.end} •{' '}
                      {itinerary.request.budgetTier} budget
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {itinerary.request.interests.map((interest) => (
                        <Badge key={interest} variant="outline">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
