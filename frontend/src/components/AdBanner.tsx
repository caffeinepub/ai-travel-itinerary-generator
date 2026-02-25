import { useEffect } from 'react';

/**
 * Google AdSense Display Ad Banner
 *
 * ACTION REQUIRED — Replace the placeholder IDs before going live:
 *
 * 1. data-ad-client: Replace "ca-pub-XXXXXXXXXX" with your AdSense
 *    Publisher ID (found in your AdSense dashboard under Account > Account information).
 *    Example: "ca-pub-1234567890123456"
 *
 * 2. data-ad-slot: Replace "1234567890" with the Ad Unit Slot ID
 *    created in your AdSense dashboard under Ads > By ad unit > Display ads.
 *    Each placement on the page can use a different slot ID.
 *
 * After replacing both IDs, ads will begin serving once your site
 * is approved by Google AdSense.
 */

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdBannerProps {
  /** Optional extra className for the outer wrapper */
  className?: string;
}

export default function AdBanner({ className = '' }: AdBannerProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense script not yet loaded or blocked — safe to ignore
    }
  }, []);

  return (
    <div
      className={`w-full overflow-hidden flex items-center justify-center ${className}`}
      aria-label="Advertisement"
    >
      {/* ── Replace data-ad-client and data-ad-slot with your real IDs ── */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXX"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
