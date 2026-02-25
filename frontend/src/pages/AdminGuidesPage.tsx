import { useGetCallerUserRole } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ShieldAlert } from 'lucide-react';
import AddTravelGuideForm from '../components/AddTravelGuideForm';
import TravelGuidesGrid from '../components/TravelGuidesGrid';

export default function AdminGuidesPage() {
  const { data: userRole, isLoading } = useGetCallerUserRole();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-sunset-coral" />
      </div>
    );
  }

  if (userRole !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" />
              Access Denied
            </CardTitle>
            <CardDescription>You don't have permission to access this page</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertDescription>
                This page is restricted to administrators only.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Manage Travel Guides</h1>
          <p className="text-muted-foreground">Create and manage curated travel guides</p>
        </div>

        <AddTravelGuideForm />

        <div>
          <h2 className="text-2xl font-bold mb-6">Existing Guides</h2>
          <TravelGuidesGrid />
        </div>
      </div>
    </div>
  );
}
