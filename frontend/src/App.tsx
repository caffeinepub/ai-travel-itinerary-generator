import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import HomePage from './pages/HomePage';
import PlannerPage from './pages/PlannerPage';
import ItineraryPage from './pages/ItineraryPage';
import SharedItineraryPage from './pages/SharedItineraryPage';
import GuidesPage from './pages/GuidesPage';
import GuideDetailPage from './pages/GuideDetailPage';
import AdminGuidesPage from './pages/AdminGuidesPage';
import Layout from './components/Layout';
import ProfileSetupModal from './components/ProfileSetupModal';
import { Toaster } from '@/components/ui/sonner';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const plannerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/planner',
  component: PlannerPage,
});

const itineraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/itinerary/$id',
  component: ItineraryPage,
});

const sharedItineraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/shared/$shareId',
  component: SharedItineraryPage,
});

const guidesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/guides',
  component: GuidesPage,
});

const guideDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/guides/$id',
  component: GuideDetailPage,
});

const adminGuidesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/guides',
  component: AdminGuidesPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  plannerRoute,
  itineraryRoute,
  sharedItineraryRoute,
  guidesRoute,
  guideDetailRoute,
  adminGuidesRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <ProfileSetupModal />
      <Toaster />
    </ThemeProvider>
  );
}
