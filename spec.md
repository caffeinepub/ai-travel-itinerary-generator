# Specification

## Summary
**Goal:** Integrate Google AdSense into the AI Travel Planner website so the user can sign up for AdSense monetization.

**Planned changes:**
- Add the Google AdSense auto-ads `<script>` tag to `frontend/index.html` in the `<head>` section, using a placeholder publisher ID (`ca-pub-XXXXXXXXXX`) with a clear comment indicating where to replace it with the real ID.
- Create a reusable `AdBanner.tsx` component that renders a responsive AdSense `<ins>` ad unit with a placeholder ad slot ID and a comment to replace it with the real slot ID from the AdSense dashboard.
- Place the `AdBanner` component on the HomePage: once below the hero section and once above the footer.

**User-visible outcome:** The site will include the required AdSense script and ad unit placeholders. Once approved by Google AdSense, the user can replace the placeholder publisher ID and slot IDs with their real credentials to start displaying ads.
