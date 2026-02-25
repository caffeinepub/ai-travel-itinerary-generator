export function generateBookingUrl(
  type: 'flights' | 'hotels' | 'activities',
  destination: string,
  startDate: string,
  endDate: string
): string {
  const affiliateId = 'ai-travel-planner';

  switch (type) {
    case 'flights':
      return `https://www.expedia.com/Flights?destination=${encodeURIComponent(destination)}&startDate=${startDate}&endDate=${endDate}&affid=${affiliateId}`;

    case 'hotels':
      return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}&checkin=${startDate}&checkout=${endDate}&aid=${affiliateId}`;

    case 'activities':
      return `https://www.viator.com/searchResults/all?text=${encodeURIComponent(destination)}&pid=${affiliateId}`;

    default:
      return '#';
  }
}
