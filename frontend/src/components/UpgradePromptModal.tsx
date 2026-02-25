import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Crown, Check } from 'lucide-react';

interface UpgradePromptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UpgradePromptModal({ open, onOpenChange }: UpgradePromptModalProps) {
  const features = [
    'Export itineraries as PDF',
    'Detailed travel guides',
    'Priority support',
    'Unlimited itineraries',
    'Advanced customization',
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-sunset-yellow" />
            Upgrade to Premium
          </DialogTitle>
          <DialogDescription>
            Unlock premium features to enhance your travel planning experience
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-sunset-coral" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <Button className="w-full" size="lg">
            <Crown className="w-4 h-4 mr-2" />
            Upgrade Now
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Premium subscription management coming soon
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
