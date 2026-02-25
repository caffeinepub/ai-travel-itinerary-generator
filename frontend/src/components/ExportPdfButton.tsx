import { useState } from 'react';
import { useGetCallerUserProfile, useExportItineraryPdf } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Download, Loader2, Crown } from 'lucide-react';
import { toast } from 'sonner';
import UpgradePromptModal from './UpgradePromptModal';

interface ExportPdfButtonProps {
  itineraryId: string;
}

export default function ExportPdfButton({ itineraryId }: ExportPdfButtonProps) {
  const { data: userProfile } = useGetCallerUserProfile();
  const exportPdf = useExportItineraryPdf();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const isPremium = userProfile?.subscriptionTier === 'premium';

  const handleExport = async () => {
    if (!isPremium) {
      setShowUpgradeModal(true);
      return;
    }

    try {
      const blob = await exportPdf.mutateAsync(itineraryId);
      if (blob) {
        const url = blob.getDirectURL();
        const link = document.createElement('a');
        link.href = url;
        link.download = `itinerary-${itineraryId}.pdf`;
        link.click();
        toast.success('PDF downloaded successfully!');
      }
    } catch (error: any) {
      console.error('Error exporting PDF:', error);
      if (error.message?.includes('not implemented')) {
        toast.error('PDF export is coming soon!');
      } else {
        toast.error('Failed to export PDF');
      }
    }
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={handleExport} disabled={exportPdf.isPending}>
        {exportPdf.isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Exporting...
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
            {!isPremium && <Crown className="w-3 h-3 ml-1 text-sunset-yellow" />}
          </>
        )}
      </Button>

      <UpgradePromptModal open={showUpgradeModal} onOpenChange={setShowUpgradeModal} />
    </>
  );
}
