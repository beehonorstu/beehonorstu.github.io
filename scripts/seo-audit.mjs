import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const base = 'https://beehonor-studio.web.app';
const html = (route) => fs.readFileSync(path.join(dist, route, 'index.html'), 'utf8');
const find = (page, regex, message) => assert.match(page, regex, message);
const count = (text, needle) => text.split(needle).length - 1;
const errors = [];
const verify = (name, test) => {
  try {
    test();
    console.log(`PASS ${name}`);
  } catch (err) {
    errors.push(`${name}: ${err.message}`);
    console.error(`FAIL ${name}: ${err.message}`);
  }
};

const sitemap = fs.readFileSync(path.join(dist, 'sitemap-0.xml'), 'utf8');
const locales = ['en', 'fr', 'de', 'zh', 'tw', 'es', 'ja', 'pt', 'ko', 'ru', 'it', 'ar', 'id', 'tr', 'vi', 'th', 'nl', 'pl'];
const localeTag = (lang) => lang === 'zh' ? 'zh-Hans' : lang === 'tw' ? 'zh-Hant' : lang;

verify('Sitemap has no archived, legacy or noindex routes', () => {
  assert.ok(sitemap.includes(`<loc>${base}/products/isstracker/</loc>`));
  for (const expr of [/\/products\/logiccraft\//, /\/pricing\//, /\/terms\//, /\/license\//, /\/en\//, /\/404\//]) {
    assert.doesNotMatch(sitemap, expr);
  }
});

verify('Homepage canonical, correct hreflang and 18-language cluster', () => {
  const home = html('');
  find(home, new RegExp(`rel="canonical" href="${base}/"`), 'Missing homepage canonical');
  assert.equal(count(home, 'rel="alternate" hreflang="'), locales.length + 1);
  for (const lang of locales) {
    const url = lang === 'en' ? `${base}/` : `${base}/${lang}/`;
    assert.ok(home.includes(`rel="alternate" hreflang="${localeTag(lang)}" href="${url}"`), `Missing ${lang}`);
  }
  find(home, new RegExp('hreflang="x-default"'), 'Missing x-default');
  assert.equal(count(home, '"@type":"Organization"'), 1);
  find(home, /"@type":"WebSite"/, 'Missing WebSite schema');
});

verify('Featured apps are crawler-accessible links', () => {
  const page = html('');
  for (const slug of ['isstracker', 'drumpads', 'phonebattery', 'mathpuzzle']) {
    assert.ok(new RegExp(`<a[^>]*data-product-id="${slug}"[^>]*href="/products/${slug}/?"`).test(page),
      `Product ${slug} needs a visible anchor href`);
  }
  assert.ok(!/<(?:a|div)[^>]*data-product-id="(?:isstracker|drumpads|phonebattery|mathpuzzle)"[^>]*onclick=/.test(page),
    'Featured product cards should not rely on inline JavaScript navigation');
});

verify('Product details have accurate app schema', () => {
  for (const slug of ['isstracker', 'drumpads', 'phonebattery', 'mathpuzzle', 'flickwand']) {
    const page = html(`products/${slug}`);
    find(page, /"@type":"SoftwareApplication"/, `Missing SoftwareApplication: ${slug}`);
    find(page, /"operatingSystem":"Android"/, `Missing OS: ${slug}`);
    find(page, /"downloadUrl":"https:\/\/play\.google\.com/, `Missing download URL: ${slug}`);
    assert.ok(!page.includes('"aggregateRating"'), `Unverified ratings should not be added to ${slug}`);
    find(page, /"@type":"BreadcrumbList"/, 'Missing breadcrumbs');
  }
});

verify('Localized app language clusters include only real pages', () => {
  const en = html('products/drumpads');
  const zh = html('zh/products/drumpads');
  assert.equal(count(en, 'rel="alternate" hreflang="'), 3);
  assert.equal(count(zh, 'rel="alternate" hreflang="'), 3);
  assert.ok(zh.includes(`href="${base}/zh/products/drumpads/"`));
  assert.ok(!en.includes('href="https://beehonor-studio.web.app/de/products/drumpads/"'));
});

verify('Language tags, canonical and noindex rules', () => {
  find(html('tw'), /<html lang="zh-Hant"/, 'Traditional Chinese language tag');
  find(html('zh'), /<html lang="zh-Hans"/, 'Simplified Chinese language tag');
  find(html('tw'), new RegExp(`rel="canonical" href="${base}/tw/"`), 'Locale-specific canonical');
  find(html('products/logiccraft'), /name="robots" content="noindex, follow"/, 'Archived product noindex');
  find(html('fr/pricing'), /name="robots" content="noindex, follow"/, 'Localized pricing noindex');
  assert.ok(!html('products').includes('data-product-id="logiccraft"'), 'Archived product should not be promoted');
});

verify('AI discovery file matches the real publisher', () => {
  const llms = fs.readFileSync(path.join(dist, 'llms.txt'), 'utf8');
  assert.ok(llms.startsWith('# BeHonor Studio'));
  assert.ok(llms.includes(`${base}/products/isstracker/`));
  assert.doesNotMatch(llms, /Astro Boilerplate|# Cooper|npx create-astro/);
});

if (errors.length) {
  console.error(`\nSEO audit failed: ${errors.length} check(s)`);
  process.exitCode = 1;
} else {
  console.log('\nSEO audit passed: 7 groups');
}
