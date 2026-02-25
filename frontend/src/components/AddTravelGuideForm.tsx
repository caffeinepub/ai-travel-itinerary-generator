import { useState } from 'react';
import { useAddTravelGuide } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function AddTravelGuideForm() {
  const addGuide = useAddTravelGuide();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [season, setSeason] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const guideId = `guide-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    try {
      await addGuide.mutateAsync({
        id: guideId,
        title: title.trim(),
        description: description.trim(),
        season: season.trim() || undefined,
        exampleItineraries: [],
      });

      toast.success('Travel guide created successfully!');
      setTitle('');
      setDescription('');
      setSeason('');
    } catch (error) {
      console.error('Error creating guide:', error);
      toast.error('Failed to create travel guide');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Travel Guide
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Top Winter Trips 2026"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this travel guide..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="season">Season (optional)</Label>
            <Input
              id="season"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              placeholder="e.g., Winter, Summer, Spring"
            />
          </div>

          <Button type="submit" disabled={addGuide.isPending}>
            {addGuide.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Create Guide
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
