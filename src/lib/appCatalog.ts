/**
 * Store destinations and schema categories for the Android apps currently presented
 * as available. Do not claim ratings, review counts, prices or availability without
 * an authoritative source.
 */
export const appCatalog: Record<string, { storeUrl: string; category: string; name: string }> = {
  isstracker: {
    name: 'ISS Tracker',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.behonor.iss_tracker',
    category: 'UtilitiesApplication'
  },
  drumpads: {
    name: 'Beat Expert',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.behonor.drumpads',
    category: 'MusicApplication'
  },
  phonebattery: {
    name: 'Charge Expert',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.behonor.phonebattery',
    category: 'UtilitiesApplication'
  },
  mathpuzzle: {
    name: 'Math Puzzle',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.behonorstudio.mathpuzzle',
    category: 'GameApplication'
  },
  flickwand: {
    name: 'Flick Wand',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.behonorstudio.flickstartx',
    category: 'UtilitiesApplication'
  }
};

/** LogicCraft is no longer listed; keep legacy URLs as noindex archives. */
export const archivedAppSlugs = new Set(['logiccraft']);

export const englishSeoTitles: Record<string, string> = {
  isstracker: 'ISS Tracker: Live ISS Map & Pass Predictions',
  drumpads: 'Beat Expert: Drum Pads & Beat Maker',
  phonebattery: 'Charge Expert: Android Battery Monitor & Charging Alerts',
  mathpuzzle: 'Math Puzzle: Cross-Number Logic Game',
  flickwand: 'Flick Wand: Android Gesture Launcher'
};
