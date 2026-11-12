# BeHonor Studio — SEO & GEO implementation notes

Updated: 2026-11-12

## Canonical publisher

- Canonical domain: https://beehonor-studio.web.app/
- Alternate GitHub Pages deployment should point its canonical links back to the Firebase domain.
- Crawlable robots policy: `/robots.txt`
- Sitemap index: `/sitemap-index.xml`
- Optional AI discovery summary: `/llms.txt` (not a Google ranking requirement)

## Search-engine foundations

1. Every indexable page has an absolute, normalized self-referencing canonical URL.
2. Every fully translated route has reciprocal `hreflang` annotations in the document head, including its own locale and `x-default`. Localized product detail routes list **only the languages actually published** for that product.
3. The existing URL routes `/zh/` and `/tw/` keep working, but their HTML and `hreflang` tags correctly use `zh-Hans` and `zh-Hant`.
4. The sitemap excludes legacy `/en/` redirects, 404 pages, archived LogicCraft pages, placeholder Pricing pages, and template-derived License/Terms pages marked `noindex`.
5. The main app card navigation uses HTML `<a href>` links, so both crawlers and keyboard users can reach product pages.
6. The main pages expose one consistent Organization identity, WebSite data, localized WebPage data and valid BreadcrumbList entries (using real canonical URLs).
7. Active Android product pages publish factual `SoftwareApplication` data: displayed name, description, image, platform and existing Google Play link. No fabricated review ratings, installation counts or pricing.

## GEO / generative search content

The public site has clear, human-visible statements of product purpose and limitations. The English ISS Tracker, Charge Expert, Math Puzzle, and Flick Wand pages include concise answers to common user questions, grounded in documented functionality. The About page and `llms.txt` describe the same publisher and current product portfolio.

Google Search Central recommends ordinary technical SEO and helpful first-hand content for AI search, not special GEO hacks. `llms.txt` is retained only as an optional factual navigation file, **not** as a ranking promise.

- Google guide: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Localized pages: https://developers.google.com/search/docs/specialty/international/localized-versions
- Software app schema: https://developers.google.com/search/docs/appearance/structured-data/software-app

## Verification

Run:

```bash
npm run build
npm run seo:check
```

The `seo:check` test validates static output from `dist/`, including language alternates, crawlable links, JSON-LD, canonical references, noindex and sitemap exclusions, and `llms.txt`. It must run **after** a fresh build.

## Follow-up checks outside the repository

- Verify the Firebase site in Google Search Console and submit or refresh the sitemap index. Search indexation is not instant or guaranteed.
- Check key product URLs in Google's URL Inspection and Rich Results Test.
- Track branded and non-branded queries, clicks, impressions and index coverage in Search Console (and available AI feature reporting).
- Review app availability and local store listing links when apps are released or retired.
- Have the site's old License/Terms/website privacy wording reviewed for factual and legal accuracy. The License and Terms pages are currently kept accessible but excluded from search indexing; `noindex` does not fix their content.
- Refresh `llms.txt` whenever the active product portfolio materially changes.

## Scope

This work improves eligibility, content accuracy, internal linking and technical discoverability. It **does not guarantee** search ranking, rich results, AI citations, or Google Play conversions.
