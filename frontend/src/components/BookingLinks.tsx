import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Plane, Hotel, Ticket } from 'lucide-react';
import { generateBookingUrl } from '../utils/bookingLinkGenerator';

interface BookingLinksProps {
  destination: string;
  startDate: string;
  endDate: string;
}

export default function BookingLinks({ destination, startDate, endDate }: BookingLinksProps) {
  const flightUrl = generateBookingUrl('flights', destination, startDate, endDate);
  const hotelUrl = generateBookingUrl('hotels', destination, startDate, endDate);
  const activitiesUrl = generateBookingUrl('activities', destination, startDate, endDate);

  return (
    <Card className="bg-accent/20">
      <CardHeader>
        <CardTitle className="text-lg">Book Your Trip</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-3">
          <Button variant="outline" className="justify-start" asChild>
            <a href={flightUrl} target="_blank" rel="noopener noreferrer">
              <Plane className="w-4 h-4 mr-2" />
              Flights
              <ExternalLink className="w-3 h-3 ml-auto" />
            </a>
          </Button>

          <Button variant="outline" className="justify-start" asChild>
            <a href={hotelUrl} target="_blank" rel="noopener noreferrer">
              <Hotel className="w-4 h-4 mr-2" />
              Hotels
              <ExternalLink className="w-3 h-3 ml-auto" />
            </a>
          </Button>

          <Button variant="outline" className="justify-start" asChild>
            <a href={activitiesUrl} target="_blank" rel="noopener noreferrer">
              <Ticket className="w-4 h-4 mr-2" />
              Activities
              <ExternalLink className="w-3 h-3 ml-auto" />
            </a>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-3">
          * These are affiliate links. We may earn a commission at no extra cost to you.
        </p>
      </CardContent>
    </Card>
  );
}
