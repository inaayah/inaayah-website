import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Download, Gamepad2, Play, Shield, Users, Zap } from 'lucide-react';
import { fetchGamesVersions } from '../lib/releases';
import './VigilantePage.css';

const GAME = '/games/vigilante-red-city';
const VIDEO = '1FrZbGsu7VA';
const screenshots = [1, 2, 3, 4];

export function VigilantePage() {
  const [playing, setPlaying] = useState(false);
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    fetchGamesVersions().then((versions) => {
      if (versions['vigilante-red-city']) {
        setVersion(`v${versions['vigilante-red-city']}`);
      }
    });
  }, []);

  return (
    <div className="vrc-page">
      <section className="vrc-hero" aria-labelledby="vrc-title">
        <img className="vrc-hero-art" src="/images/vigilante-red-city-banner.jpg" alt="The Demir family in the comic-book world of Red City" fetchPriority="high" />
        <div className="vrc-hero-shade" />
        <div className="vrc-shell vrc-hero-content">
          <a className="vrc-back" href="/games"><ArrowLeft size={16} /> All Inaayah games</a>
          <p className="vrc-eyebrow">A comic-book family beat ’em up</p>
          <h1 id="vrc-title">Vigilante:<br /><span>Red City</span></h1>
          <p className="vrc-lead">One family. One city.<br />Bring her home.</p>
          <p className="vrc-hero-copy">Vance wants Crossroads Garage. When the Demirs refuse, he takes Inaayah. Fight through the night as Murat, Zeynep or Emir—and take your family back.</p>
          <div className="vrc-actions">
            <a className="vrc-button" href="#downloads"><Download size={18} /> Get Inaayah Launcher</a>
            <a className="vrc-button vrc-button-outline" href="#trailer"><Play size={18} /> Watch the trailer</a>
          </div>
          <p className="vrc-platforms">macOS · Windows · Linux <span>Android · Google Play planned</span></p>
        </div>
      </section>

      <div className="vrc-strip" aria-label="Game features">
        <span><Zap size={17} /> Three heroes</span><span><Users size={17} /> Two-player co-op</span><span><Gamepad2 size={17} /> Five-stage campaign</span>
      </div>

      <section className="vrc-shell vrc-story" aria-labelledby="vrc-story-heading">
        <div>
          <p className="vrc-eyebrow">Crossroads is worth fighting for</p>
          <h2 id="vrc-story-heading">They came for the garage.<br />The Demirs fought back.</h2>
        </div>
        <div className="vrc-story-copy">
          <p>Take the fight from neon streets and subway platforms to the docks, Foundry Mile and Red Tower. Follow the story through illustrated comic scenes and voiced conversations, with the rescue always pulling you forward.</p>
          <p>Choose Murat’s heavyweight boxing, Zeynep’s kickboxing or Emir’s acrobatic electric attacks. Build combos, launch enemies, dodge trouble and use the street around you.</p>
        </div>
      </section>

      <section id="trailer" className="vrc-shell vrc-trailer-section" aria-labelledby="vrc-trailer-heading">
        <div className="vrc-section-heading"><div><p className="vrc-eyebrow">Story. Combat. Actual gameplay.</p><h2 id="vrc-trailer-heading">See what you’ll play.</h2></div><a href={`https://www.youtube.com/watch?v=${VIDEO}`} target="_blank" rel="noreferrer">Watch on YouTube <ArrowUpRight size={16} /></a></div>
        <div className="vrc-trailer">
          {playing ? (
            <iframe src={`https://www.youtube-nocookie.com/embed/${VIDEO}?autoplay=1&rel=0`} title="Vigilante Red City official story and gameplay trailer" allow="autoplay; encrypted-media; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
          ) : (
            <button className="vrc-trailer-poster" onClick={() => setPlaying(true)} aria-label="Play the Vigilante Red City story and gameplay trailer on YouTube">
              <img src="/images/vigilante-red-city-banner.jpg" alt="" loading="lazy" />
              <span className="vrc-play-icon"><Play size={30} fill="currentColor" /></span>
              <span className="vrc-trailer-caption">Official story & gameplay trailer</span>
            </button>
          )}
        </div>
        <p className="vrc-small">Pressing Play connects to YouTube. The trailer shows the story and real gameplay without revealing the rescue ending.</p>
      </section>

      <section className="vrc-shell vrc-features" aria-label="Ways to play">
        <article><span>01 / Fight your way</span><h3>Three different styles.</h3><p>A heavyweight father. A stunt-riding kickboxer. A parkour skater with an electric glove. Find the hero whose rhythm fits yours.</p></article>
        <article><span>02 / Bring someone</span><h3>A family fight, together.</h3><p>Play solo or team up with a second player in local shared-screen, split-screen or online co-op. Use matching versions for online play.</p></article>
        <article><span>03 / Keep the story</span><h3>More than the last punch.</h3><p>Save campaign checkpoints, collect Inaayah’s drawings and unlock comic chapters as you bring the story home.</p></article>
      </section>

      <section className="vrc-shell vrc-gallery-section" aria-labelledby="vrc-gallery-heading">
        <div className="vrc-section-heading"><div><p className="vrc-eyebrow">From the game</p><h2 id="vrc-gallery-heading">A city drawn for a fight.</h2></div><span className="vrc-small">Open an image for a closer look.</span></div>
        <div className="vrc-gallery">{screenshots.map(number => (
          <a href={`/images/vigilante-red-city-shot${number}.jpg`} key={number} target="_blank" rel="noreferrer" aria-label={`View gameplay screenshot ${number}`}><img src={`/images/vigilante-red-city-shot${number}.jpg`} alt={`Vigilante Red City gameplay screenshot ${number}`} loading="lazy" /><span>Gameplay / 0{number} <ArrowUpRight size={15} /></span></a>
        ))}</div>
      </section>

      <section id="downloads" className="vrc-download-section" aria-labelledby="vrc-download-heading">
        <div className="vrc-shell">
          <div className="vrc-section-heading"><div><p className="vrc-eyebrow">Your next fight starts here</p><h2 id="vrc-download-heading">Play Vigilante: Red City.</h2></div><span className="vrc-version">Desktop <span className="version-slot version-slot-badge">{version ?? <span className="version-skeleton" aria-hidden="true" />}</span></span></div>
          <div className="vrc-download-grid">
            <div className="vrc-desktop-downloads">
              <h3>Desktop</h3><p>Get Vigilante: Red City through the Inaayah Launcher. It installs the game, checks updates and keeps your library together.</p>
              <a className="vrc-button" href="/games#launcher"><Download size={18} /> Get Inaayah Launcher</a>
              <p className="vrc-supported-platforms">Available through the launcher on macOS, Windows and Linux.</p>
              <p className="vrc-small">Gamepad and keyboard support. macOS Universal; Windows and Linux x86_64. Allow approximately 1.5 GB for installation.</p>
            </div>
            <div className="vrc-android-downloads"><span className="vrc-preview-label">Coming to Google Play</span><h3>Android</h3><p>The Android edition will be distributed through Google Play. Store availability and pricing will be announced here.</p><p className="vrc-store-pending">Google Play listing not yet available.</p><p className="vrc-small">Designed for landscape play, with touch controls and local campaign saves.</p></div>
          </div>
        </div>
      </section>

      <section className="vrc-shell vrc-help" aria-labelledby="vrc-help-heading">
        <Shield size={30} /><div><h2 id="vrc-help-heading">Your game. Your choices.</h2><p>Campaign saves stay on your device. Internet Rooms is optional. Find our privacy information, terms and deletion instructions here.</p><div className="vrc-policy-links"><a href={`${GAME}/privacy`}>Privacy & retention</a><a href={`${GAME}/terms`}>Terms of use</a><a href={`${GAME}/delete-data`}>Delete online data</a><a href="mailto:support@inaayah.dev">Contact support</a></div></div>
      </section>
    </div>
  );
}
