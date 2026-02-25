import { useState } from 'react';
import { useGenerateShareableLink } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Share2, Copy, Check } from 'lucide-react';
import { SiFacebook, SiX } from 'react-icons/si';
import { toast } from 'sonner';

interface ShareButtonProps {
  itineraryId: string;
}

export default function ShareButton({ itineraryId }: ShareButtonProps) {
  const generateLink = useGenerateShareableLink();
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerateLink = async () => {
    try {
      const shareId = await generateLink.mutateAsync(itineraryId);
      const url = `${window.location.origin}/shared/${shareId}`;
      setShareUrl(url);
    } catch (error) {
      console.error('Error generating share link:', error);
      toast.error('Failed to generate share link');
    }
  };

  const handleCopy = async () => {
    if (!shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleSocialShare = (platform: 'twitter' | 'facebook') => {
    if (!shareUrl) return;

    const text = 'Check out my travel itinerary!';
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    };

    window.open(urls[platform], '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={handleGenerateLink}>
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Your Itinerary</DialogTitle>
          <DialogDescription>Share your travel plans with friends and family</DialogDescription>
        </DialogHeader>

        {generateLink.isPending ? (
          <div className="py-8 text-center text-muted-foreground">Generating share link...</div>
        ) : shareUrl ? (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input value={shareUrl} readOnly />
              <Button variant="outline" size="icon" onClick={handleCopy}>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => handleSocialShare('twitter')}
              >
                <SiX className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => handleSocialShare('facebook')}
              >
                <SiFacebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
