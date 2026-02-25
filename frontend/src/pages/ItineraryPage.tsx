import { useParams } from '@tanstack/react-router';
import { useGetItinerary } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import ItineraryDisplay from '../components/ItineraryDisplay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';

export default function ItineraryPage() {
  const { id } = useParams({ from: '/itinerary/$id' });
  const { identity } = useInternetIdentity();
  const { data: itinerary, isLoading, error } = useGetItinerary(id);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-sunset-coral" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Error Loading Itinerary</CardTitle>
            <CardDescription>We couldn't load this itinerary</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Itinerary Not Found</CardTitle>
            <CardDescription>This itinerary doesn't exist or you don't have access to it</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const isOwner = identity && itinerary.request.createdBy.toString() === identity.getPrincipal().toString();

  return (
    <div className="container mx-auto px-4 py-12">
      <ItineraryDisplay itinerary={itinerary} isOwner={isOwner || false} />
    </div>
  );
}
