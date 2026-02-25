import { Link, useRouterState } from '@tanstack/react-router';
import { Plane, Map, BookOpen } from 'lucide-react';
import LoginButton from './LoginButton';

export default function Navigation() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-foreground hover:text-sunset-coral transition-colors">
          <Plane className="w-6 h-6 text-sunset-coral" />
          <span className="hidden sm:inline">AI Travel Planner</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/planner"
            className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-sunset-coral ${
              isActive('/planner') ? 'text-sunset-coral' : 'text-muted-foreground'
            }`}
          >
            <Map className="w-4 h-4" />
            <span className="hidden sm:inline">Plan Trip</span>
          </Link>

          <Link
            to="/guides"
            className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-sunset-coral ${
              isActive('/guides') ? 'text-sunset-coral' : 'text-muted-foreground'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Guides</span>
          </Link>

          <LoginButton />
        </div>
      </nav>
    </header>
  );
}
