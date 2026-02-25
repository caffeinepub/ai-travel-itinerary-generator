import { useParams } from '@tanstack/react-router';
import { useGetItinerary } from '../hooks/useQueries';
import ItineraryDisplay from '../components/ItineraryDisplay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';

export default function SharedItineraryPage() {
  const { shareId } = useParams({ from: '/shared/$shareId' });
  
  // Extract the actual itinerary ID from the share ID (format: id-xd37)
  const itineraryId = shareId.replace('-xd37', '');
  
  const { data: itinerary, isLoading, error } = useGetItinerary(itineraryId);

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
            <CardDescription>We couldn't load this shared itinerary</CardDescription>
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
            <CardDescription>This shared itinerary doesn't exist or is no longer available</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <ItineraryDisplay itinerary={itinerary} isOwner={false} />
    </div>
  );
}
