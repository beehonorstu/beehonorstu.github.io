/**
 * Astro-compress optimizes PNGs as indexed-color files by default.
 * Restore the original full-color, alpha-capable Beat Expert Play Store icon
 * AFTER the site's static build so vivid neon gradients are not quantized.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

const source = resolve('public/images/apps/beat_expert_icon.png');
const output = resolve('dist/images/apps/beat_expert_icon.png');
const image = await readFile(source);
await writeFile(output, image);
const sha = createHash('sha256').update(image).digest('hex');
const rebuilt = createHash('sha256').update(await readFile(output)).digest('hex');
if (sha !== rebuilt) throw new Error('Beat Expert icon not restored correctly');
console.log('Preserved original Beat Expert PNG in Firebase build: ' + sha);
