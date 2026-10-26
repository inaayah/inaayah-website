import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BuilderSection } from './components/BuilderSection';
import { GamesSection } from './components/GamesSection';
import { TechSection } from './components/TechSection';
import { Footer } from './components/Footer';

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

  useEffect(() => {
    document.title = isGamesRoute
      ? 'Inaayah Games — Desktop Launcher, Co-Op Campaigns & Web Arcade // inaayah.dev/games'
      : 'Inaayah Studio — Indie Games, Web Builder & Creative Software';

    document.querySelectorAll<HTMLLinkElement>("link[rel='icon']").forEach((iconLink) => {
      const isPngFallback = iconLink.sizes.contains('32x32');
      iconLink.type = isGamesRoute || isPngFallback ? 'image/png' : 'image/svg+xml';
      iconLink.href = isGamesRoute
        ? '/icon.png'
        : isPngFallback ? '/brand/inaayah-icon-32.png' : '/favicon.svg';
    });
  }, [isGamesRoute]);

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
      <main style={{ flex: 1, paddingTop: isGamesRoute ? 32 : 0 }}>
        {isGamesRoute ? (
          <>
            <GamesSection isStandalonePage />
            <TechSection />
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
