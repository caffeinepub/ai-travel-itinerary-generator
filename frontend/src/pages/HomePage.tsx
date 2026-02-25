import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Plane, MapPin, Calendar, Sparkles, Share2, Edit3, Star, CheckCircle, Zap, Globe, Gift } from 'lucide-react';
import TravelGuidesGrid from '../components/TravelGuidesGrid';
import EmailCaptureModal from '../components/EmailCaptureModal';
import AdBanner from '../components/AdBanner';
import { useState } from 'react';

export default function HomePage() {
  const [showEmailCapture, setShowEmailCapture] = useState(false);

  return (
    <div className="w-full overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-[680px] flex items-center">
        {/* Colorful layered background */}
        <div className="absolute inset-0 hero-gradient" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/assets/generated/hero-colorful-banner.dim_1400x600.png)' }}
        />
        {/* Decorative blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blob-pink opacity-40 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blob-yellow opacity-40 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blob-teal opacity-20 blur-3xl" />

        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-5xl mx-auto text-center space-y-6">

            {/* FREE badge — above the headline */}
            <div className="inline-flex items-center gap-2 bg-free-badge text-free-badge-text font-black text-lg md:text-xl px-6 py-2 rounded-full shadow-lg shadow-yellow-400/40 animate-bounce-slow border-2 border-yellow-300">
              <Gift className="w-5 h-5" />
              100% FREE — No Credit Card Required!
              <Star className="w-5 h-5 fill-current" />
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tight leading-tight">
              <span className="text-gradient-hero">Pack Your Bags.</span>
              <br />
              <span className="text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">We'll Plan the Rest!</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)] max-w-3xl mx-auto">
              AI-powered travel itineraries in seconds — personalized to your style, budget, and dream destinations.
              <span className="font-bold text-yellow-200"> Completely free, forever.</span>
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-lg bg-white text-fuchsia-700 hover:bg-yellow-50 font-black shadow-xl shadow-black/20 border-0 px-8 py-6 rounded-full">
                <Link to="/planner">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Planning — It's Free!
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg border-2 border-white text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm px-8 py-6 rounded-full font-bold">
                <Link to="/guides">
                  <MapPin className="w-5 h-5 mr-2" />
                  Browse Guides
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 pt-4 text-white/80 text-sm font-medium">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-300" /> No signup needed</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-300" /> Instant results</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-300" /> 10,000+ trips planned</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── AD BANNER — below hero ── */}
      {/* Replace data-ad-client and data-ad-slot inside AdBanner with your real AdSense IDs */}
      <div className="container mx-auto px-4 py-8">
        <AdBanner />
      </div>

      {/* ── FREE CALLOUT BANNER ── */}
      <section className="free-banner-gradient py-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white font-black text-2xl leading-none">FREE</p>
                <p className="text-white/80 text-sm">Always & forever</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/30" />
            <p className="text-white text-xl md:text-2xl font-bold max-w-xl">
              🎉 Unlike other travel apps, <span className="underline decoration-yellow-300 decoration-2">we never charge you</span> for AI-generated itineraries!
            </p>
            <div className="hidden md:block w-px h-12 bg-white/30" />
            <Button asChild size="lg" className="bg-white text-fuchsia-700 hover:bg-yellow-50 font-black rounded-full px-8 shadow-lg">
              <Link to="/planner">Try It Free Now →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-display font-black mb-4 text-foreground">
            Why Travelers <span className="text-gradient-coral">Love Us</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need for the perfect trip — and it won't cost you a dime
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 — coral/pink */}
          <div className="feature-card-coral rounded-2xl p-8 space-y-4 shadow-lg hover:scale-105 transition-transform duration-200">
            <div className="w-14 h-14 rounded-xl bg-white/30 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-black text-white">Instant AI Magic</h3>
            <p className="text-white/85 leading-relaxed">
              Get a complete day-by-day itinerary in seconds, tailored to your interests, budget, and travel style.
            </p>
            <div className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">⚡ Seconds, not hours</div>
          </div>

          {/* Card 2 — teal/cyan */}
          <div className="feature-card-teal rounded-2xl p-8 space-y-4 shadow-lg hover:scale-105 transition-transform duration-200">
            <div className="w-14 h-14 rounded-xl bg-white/30 flex items-center justify-center">
              <Edit3 className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-black text-white">Fully Customizable</h3>
            <p className="text-white/85 leading-relaxed">
              Adjust activities, timings, and every detail of your trip to match exactly what you want.
            </p>
            <div className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">🎨 Your trip, your way</div>
          </div>

          {/* Card 3 — purple/indigo */}
          <div className="feature-card-purple rounded-2xl p-8 space-y-4 shadow-lg hover:scale-105 transition-transform duration-200">
            <div className="w-14 h-14 rounded-xl bg-white/30 flex items-center justify-center">
              <Share2 className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-black text-white">Share Instantly</h3>
            <p className="text-white/85 leading-relaxed">
              Share your itinerary with travel companions or on social media with a single click.
            </p>
            <div className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">🔗 One-click sharing</div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how-it-works-bg py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-display font-black mb-4 text-white">
              Plan Your Trip in <span className="text-yellow-300">3 Easy Steps</span>
            </h2>
            <p className="text-white/80 text-lg">From idea to itinerary in under a minute</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4 group">
              <div className="w-20 h-20 rounded-full bg-white text-fuchsia-600 flex items-center justify-center text-3xl font-black mx-auto shadow-xl group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="font-black text-xl text-white">Tell Us Your Dream</h3>
              <p className="text-white/75 leading-relaxed">
                Enter your destination, travel dates, interests, and budget — takes 30 seconds!
              </p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="w-20 h-20 rounded-full bg-yellow-300 text-fuchsia-700 flex items-center justify-center text-3xl font-black mx-auto shadow-xl group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="font-black text-xl text-white">AI Builds Your Plan</h3>
              <p className="text-white/75 leading-relaxed">
                Our AI instantly creates a personalized itinerary with activities, restaurants, and tips.
              </p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="w-20 h-20 rounded-full bg-green-300 text-emerald-800 flex items-center justify-center text-3xl font-black mx-auto shadow-xl group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="font-black text-xl text-white">Go Explore!</h3>
              <p className="text-white/75 leading-relaxed">
                Customize your itinerary, book your trip, and embark on your adventure — for free!
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-white text-fuchsia-700 hover:bg-yellow-50 font-black rounded-full px-10 py-6 text-lg shadow-xl">
              <Link to="/planner">
                <Globe className="w-5 h-5 mr-2" />
                Start My Free Trip Plan
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── FEATURED GUIDES ── */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-display font-black mb-4 text-foreground">
            🌍 Trending <span className="text-gradient-teal">Travel Guides</span>
          </h2>
          <p className="text-muted-foreground text-lg">Curated itineraries for the world's most exciting destinations</p>
        </div>
        <TravelGuidesGrid limit={3} />
        <div className="text-center mt-10">
          <Button asChild size="lg" variant="outline" className="border-2 border-fuchsia-500 text-fuchsia-600 hover:bg-fuchsia-50 font-bold rounded-full px-8">
            <Link to="/guides">View All Guides →</Link>
          </Button>
        </div>
      </section>

      {/* ── AD BANNER — above final CTA ── */}
      {/* Replace data-ad-client and data-ad-slot inside AdBanner with your real AdSense IDs */}
      <div className="container mx-auto px-4 py-8">
        <AdBanner />
      </div>

      {/* ── FINAL CTA ── */}
      <section className="cta-gradient py-20">
        <div className="container mx-auto px-4 text-center space-y-6">
          {/* Big FREE badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-300 text-yellow-900 font-black text-2xl md:text-3xl px-8 py-3 rounded-full shadow-2xl shadow-yellow-400/50 border-4 border-yellow-200">
            🎁 IT'S FREE!
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-black text-white">
            Your Next Adventure Awaits
          </h2>
          <p className="text-white/90 text-xl max-w-2xl mx-auto">
            Join thousands of happy travelers who plan smarter, not harder — with zero cost, zero hassle.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button asChild size="lg" className="bg-white text-fuchsia-700 hover:bg-yellow-50 font-black text-lg rounded-full px-10 py-6 shadow-xl">
              <Link to="/planner">
                <Calendar className="w-5 h-5 mr-2" />
                Create My Free Itinerary
              </Link>
            </Button>
            <Button
              size="lg"
              className="bg-yellow-300 hover:bg-yellow-200 text-yellow-900 font-black text-lg rounded-full px-10 py-6 shadow-xl border-0"
              onClick={() => setShowEmailCapture(true)}
            >
              <Gift className="w-5 h-5 mr-2" />
              Get Free Mini-Itinerary
            </Button>
          </div>

          <p className="text-white/60 text-sm pt-2">No credit card. No hidden fees. No catch. Just great travel planning.</p>
        </div>
      </section>

      <EmailCaptureModal open={showEmailCapture} onOpenChange={setShowEmailCapture} />
    </div>
  );
}
