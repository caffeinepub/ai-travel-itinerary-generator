import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useSubmitItineraryRequest } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const INTERESTS = [
  { id: 'food', label: 'Food & Dining' },
  { id: 'adventure', label: 'Adventure' },
  { id: 'history', label: 'History & Culture' },
  { id: 'family-friendly', label: 'Family-Friendly' },
  { id: 'nightlife', label: 'Nightlife' },
];

const BUDGET_TIERS = [
  { value: 'budget', label: 'Budget' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'luxury', label: 'Luxury' },
];

export default function ItineraryRequestForm() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const submitRequest = useSubmitItineraryRequest();

  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [budgetTier, setBudgetTier] = useState('moderate');

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId) ? prev.filter((id) => id !== interestId) : [...prev, interestId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identity) {
      toast.error('Please log in to create an itinerary');
      return;
    }

    if (!destination.trim() || !startDate || !endDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (selectedInterests.length === 0) {
      toast.error('Please select at least one interest');
      return;
    }

    const itineraryId = `itinerary-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    try {
      await submitRequest.mutateAsync({
        id: itineraryId,
        destination: destination.trim(),
        travelDates: {
          start: startDate,
          end: endDate,
        },
        interests: selectedInterests,
        budgetTier,
        createdBy: identity.getPrincipal(),
      });

      toast.success('Itinerary created successfully!');
      navigate({ to: `/itinerary/${itineraryId}` });
    } catch (error) {
      console.error('Error creating itinerary:', error);
      toast.error('Failed to create itinerary. Please try again.');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-sunset-coral" />
          Trip Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="destination">Destination *</Label>
            <Input
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g., Paris, France"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Interests * (Select at least one)</Label>
            <div className="grid grid-cols-2 gap-3">
              {INTERESTS.map((interest) => (
                <div key={interest.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest.id}
                    checked={selectedInterests.includes(interest.id)}
                    onCheckedChange={() => handleInterestToggle(interest.id)}
                  />
                  <Label htmlFor={interest.id} className="cursor-pointer font-normal">
                    {interest.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget Tier *</Label>
            <Select value={budgetTier} onValueChange={setBudgetTier}>
              <SelectTrigger id="budget">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BUDGET_TIERS.map((tier) => (
                  <SelectItem key={tier.value} value={tier.value}>
                    {tier.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={submitRequest.isPending}>
            {submitRequest.isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating Itinerary...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Itinerary
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
