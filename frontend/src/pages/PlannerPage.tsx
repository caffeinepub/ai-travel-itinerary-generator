import { useInternetIdentity } from '../hooks/useInternetIdentity';
import ItineraryRequestForm from '../components/ItineraryRequestForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function PlannerPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Login Required</CardTitle>
            <CardDescription>Please log in to create personalized travel itineraries</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Click the "Login" button in the navigation bar to get started with Internet Identity.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Plan Your Perfect Trip</h1>
          <p className="text-muted-foreground text-lg">
            Tell us about your travel preferences and we'll create a personalized itinerary
          </p>
        </div>

        <ItineraryRequestForm />
      </div>
    </div>
  );
}
