import { useState } from 'react';
import { useCaptureEmail } from '../hooks/useQueries';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Mail, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface EmailCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EmailCaptureModal({ open, onOpenChange }: EmailCaptureModalProps) {
  const captureEmail = useCaptureEmail();

  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState('');
  const [agreedToMarketing, setAgreedToMarketing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    if (!agreedToMarketing) {
      toast.error('Please agree to receive travel tips and offers');
      return;
    }

    try {
      await captureEmail.mutateAsync({
        email: email.trim(),
        interests: destination.trim() ? [destination.trim()] : [],
        requestedDate: new Date().toISOString(),
      });

      setSubmitted(true);
      toast.success('Thank you! Check your email for your mini-itinerary.');
    } catch (error) {
      console.error('Error capturing email:', error);
      toast.error('Failed to submit. Please try again.');
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
      setDestination('');
      setAgreedToMarketing(false);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sunset-coral" />
                Get Your Free Mini-Itinerary
              </DialogTitle>
              <DialogDescription>
                Enter your email and we'll send you a personalized sample itinerary to inspire your next trip!
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Dream Destination (optional)</Label>
                <Input
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g., Paris, Tokyo, Bali"
                />
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="marketing"
                  checked={agreedToMarketing}
                  onCheckedChange={(checked) => setAgreedToMarketing(checked as boolean)}
                />
                <Label htmlFor="marketing" className="text-sm font-normal cursor-pointer leading-tight">
                  I agree to receive travel tips, destination guides, and special offers. You can unsubscribe
                  anytime.
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={captureEmail.isPending}>
                {captureEmail.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Get My Free Itinerary
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                We respect your privacy. Your information is secure and will never be shared.
              </p>
            </form>
          </>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-sunset-coral/20 flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8 text-sunset-coral" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">You're All Set!</h3>
              <p className="text-muted-foreground">
                Check your inbox for your personalized mini-itinerary. Happy travels!
              </p>
            </div>
            <Button onClick={handleClose} className="mt-4">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
