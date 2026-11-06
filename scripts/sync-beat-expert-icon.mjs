/**
 * Copy the release-ready Beat Expert Play Store icon into this website.
 *
 * Source: sibling Android checkout, DrumPads/app/src/main/ic_launcher-playstore.png
 * Output: public/images/apps/beat_expert_icon.png
 *
 * This is a one-time/repeatable asset sync, not a build-time dependency:
 * the generated PNG is committed with the website so Firebase and CI can
 * build without the Android repository present.
 *
 * Optional: BEAT_EXPERT_ICON_SOURCE=/path/to/ic_launcher-playstore.png
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';

const root = process.cwd();
const source = resolve(
  process.env.BEAT_EXPERT_ICON_SOURCE ||
    resolve(root, '../../StartupWork/DrumPads/app/src/main/ic_launcher-playstore.png'),
);
const target = resolve(root, 'public/images/apps/beat_expert_icon.png');

const png = await readFile(source);
const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
if (!png.subarray(0, 8).equals(signature)) {
  throw new Error('Beat Expert icon source is not a PNG');
}
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);
if (width !== 512 || height !== 512) {
  throw new Error('Expected a 512 x 512 Play Store icon; got ' + width + ' x ' + height);
}
await mkdir(dirname(target), { recursive: true });
await writeFile(target, png);
const sha = createHash('sha256').update(png).digest('hex');
console.log('Beat Expert icon synced: ' + source + ' -> ' + target);
console.log('512 x 512 PNG, ' + png.length + ' bytes, SHA-256 ' + sha);
