import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BuilderSection } from './components/BuilderSection';
import { GamesSection } from './components/GamesSection';
import { TechSection } from './components/TechSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onScrollTo={scrollTo} />
      <main style={{ flex: 1 }}>
        <Hero onScrollTo={scrollTo} />
        <BuilderSection />
        <GamesSection />
        <TechSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
