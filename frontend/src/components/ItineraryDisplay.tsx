import { useState } from 'react';
import type { Itinerary } from '../backend';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Calendar, DollarSign, Heart } from 'lucide-react';
import DayTimeline from './DayTimeline';
import ShareButton from './ShareButton';
import BookingLinks from './BookingLinks';
import ExportPdfButton from './ExportPdfButton';
import ItineraryMap from './ItineraryMap';

interface ItineraryDisplayProps {
  itinerary: Itinerary;
  isOwner: boolean;
}

export default function ItineraryDisplay({ itinerary, isOwner }: ItineraryDisplayProps) {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-3 flex-1">
              <CardTitle className="text-3xl">{itinerary.request.destination}</CardTitle>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {itinerary.request.travelDates.start} - {itinerary.request.travelDates.end}
                </div>
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" />
                  {itinerary.request.budgetTier}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {itinerary.request.interests.map((interest) => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <ShareButton itineraryId={itinerary.id} />
              {isOwner && <ExportPdfButton itineraryId={itinerary.id} />}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Booking Links */}
      <BookingLinks
        destination={itinerary.request.destination}
        startDate={itinerary.request.travelDates.start}
        endDate={itinerary.request.travelDates.end}
      />

      {/* Main Content */}
      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="map" onClick={() => setShowMap(true)}>
            Map View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6 mt-6">
          {itinerary.days.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Your itinerary is being prepared. Check back soon for personalized recommendations!
                </p>
              </CardContent>
            </Card>
          ) : (
            itinerary.days.map((day, index) => (
              <DayTimeline
                key={index}
                dayNumber={index + 1}
                day={day}
                restaurants={itinerary.restaurants}
                transport={itinerary.transport}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="map" className="mt-6">
          {showMap && <ItineraryMap itinerary={itinerary} />}
        </TabsContent>
      </Tabs>
    </div>
  );
}
