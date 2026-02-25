import TravelGuidesGrid from '../components/TravelGuidesGrid';

export default function GuidesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Travel Guides</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore curated travel guides and example itineraries for popular destinations around the world
        </p>
      </div>

      <TravelGuidesGrid />
    </div>
  );
}
