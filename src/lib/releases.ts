export interface LauncherReleaseData {
  version: string;
  assets: Array<{ name: string; size?: number }>;
}

let launcherReleasePromise: Promise<LauncherReleaseData | null> | null = null;
let gamesCatalogPromise: Promise<Record<string, string>> | null = null;

export function fetchLauncherRelease(): Promise<LauncherReleaseData | null> {
  if (launcherReleasePromise) return launcherReleasePromise;

  launcherReleasePromise = (async () => {
    try {
      let release: any = null;
      try {
        const edgeRes = await fetch('https://releases.inaayah.dev/api/launcher/latest');
        if (edgeRes.ok) release = await edgeRes.json();
      } catch {}

      if (!release) {
        const ghRes = await fetch('https://api.github.com/repos/inaayah/inaayah-launcher/releases/latest');
        if (ghRes.ok) release = await ghRes.json();
      }

      if (!release) return null;
      const rawVer = release.version || release.tag_name;
      if (!rawVer || typeof rawVer !== 'string') return null;

      const version = rawVer.startsWith('v') ? rawVer : `v${rawVer}`;
      const assets = Array.isArray(release.assets) ? release.assets : [];
      return { version, assets };
    } catch {
      return null;
    }
  })();

  return launcherReleasePromise;
}

export function fetchGamesVersions(): Promise<Record<string, string>> {
  if (gamesCatalogPromise) return gamesCatalogPromise;

  gamesCatalogPromise = (async () => {
    try {
      const response = await fetch('https://releases.inaayah.dev/api/games');
      if (!response.ok) return {};
      const catalog: unknown = await response.json();
      if (!Array.isArray(catalog)) return {};

      return Object.fromEntries(
        catalog
          .filter(
            (item) =>
              typeof item?.id === 'string' &&
              typeof item?.version === 'string' &&
              /^\d+\.\d+\.\d+$/.test(item.version)
          )
          .map((item) => [item.id, item.version])
      );
    } catch {
      return {};
    }
  })();

  return gamesCatalogPromise;
}
