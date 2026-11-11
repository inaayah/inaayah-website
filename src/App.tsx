import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BuilderSection } from './components/BuilderSection';
import { GamesSection } from './components/GamesSection';
import { TechSection } from './components/TechSection';
import { Footer } from './components/Footer';
import { VigilantePage } from './components/VigilantePage';

export const App: React.FC = () => {
  const [pathname, setPathname] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const isGamesRoute = pathname === '/games' || pathname.startsWith('/games/');
  const isVigilantePage = pathname.replace(/\/$/, '') === '/games/vigilante-red-city';

  useEffect(() => {
    document.title = isVigilantePage
      ? 'Vigilante: Red City — Story, Gameplay & Downloads | Inaayah Studio'
      : isGamesRoute
      ? 'Inaayah Games — Desktop Launcher, Co-Op Campaigns & Web Arcade // inaayah.dev/games'
      : 'Inaayah Studio — Indie Games, Web Builder & Creative Software';

    document.querySelectorAll<HTMLLinkElement>("link[rel='icon']").forEach((iconLink) => {
      const isPngFallback = iconLink.sizes.contains('32x32');
      iconLink.type = isPngFallback ? 'image/png' : 'image/svg+xml';
      iconLink.href = isGamesRoute
        ? '/brand/inaayah-games-icon.svg?v=opt2'
        : isPngFallback ? '/brand/inaayah-icon-32.png?v=opt2' : '/favicon.svg?v=opt2';
    });
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]') ?? document.createElement('meta');
    description.name = 'description';
    description.content = isVigilantePage
      ? 'Three heroes. One family. Watch the Vigilante: Red City story and gameplay trailer, see screenshots, and get the comic-book co-op beat ’em up through Inaayah Launcher.'
      : 'Independent games, creative software and web tools from Inaayah Studio.';
    if (!description.parentNode) document.head.appendChild(description);
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]') ?? document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = 'https://inaayah.dev' + (isVigilantePage ? '/games/vigilante-red-city/' : isGamesRoute ? '/games' : '/');
    if (!canonical.parentNode) document.head.appendChild(canonical);
  }, [isGamesRoute, isVigilantePage]);

  const navigateTo = (path: string, sectionId?: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      setPathname(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (sectionId) {
      window.setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigateTo('/', id);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        onScrollTo={scrollTo}
        onNavigate={navigateTo}
        isGamesRoute={isGamesRoute}
      />
      <main style={{ flex: 1 }}>
        {isVigilantePage ? (
          <VigilantePage />
        ) : isGamesRoute ? (
          <>
            <GamesSection isStandalonePage />
            <TechSection sectionIndex="02 //" />
          </>
        ) : (
          <>
            <Hero onScrollTo={scrollTo} />
            <BuilderSection />
            <GamesSection />
            <TechSection />
          </>
        )}
      </main>
      <Footer onNavigate={navigateTo} isGamesRoute={isGamesRoute} />
    </div>
  );
};

export default App;
