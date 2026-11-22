# Dental Care Guide

A static, illustrated course for teenagers and adults: six lessons, 14 practical care cards, and a 20-question quiz in English, Russian, Ukrainian, and German. Built with Astro, TypeScript, MDX, original SVG illustrations, and plain CSS. No accounts, server, analytics, remote fonts, or third-party embeds.

## Run locally

Use Node 24 (see `.nvmrc`) and npm:

```sh
nvm use
npm ci
npm run dev
```

Open the URL Astro prints, including `/Dental-Care-Guide/en/`. The unprefixed entry selects a language. Direct localized URLs always retain their language.

```sh
npm run validate         # formatting, types, content/state tests, build, links and size budgets
npm run preview -- --port 4387 # production preview for verification
```

Run `npm run format` before submitting changes. Builds run the unit/content tests automatically, so incomplete translations fail the build.

## Browser and performance verification

```sh
npx playwright install --with-deps chromium firefox webkit
npm run test:e2e
```

Playwright starts a production preview on port 4387. Build first. If using installed Chrome locally, run `BROWSER_PATH=/usr/bin/google-chrome npm run test:e2e -- --project=chromium`. The full suite covers Chromium, Firefox, and WebKit; the detailed mobile, enlarged-text and axe accessibility sweep runs in Chromium, across all lessons, page types, locales and both themes. Keyboard quiz completion, storage failures, language changes, themes, progress and JavaScript-disabled pages have separate tests.

With the production preview running on port 4387:

```sh
npm run test:performance
```

Set `BROWSER_PATH` if using a system Chrome binary. Lighthouse runs mobile checks against representative pages and writes JSON to `artifacts/lighthouse/`. Targets are Performance ≥95, Accessibility 100, Best Practices/SEO ≥95. `test:links` checks generated links, fragments and assets, and enforces gzip budgets: Learn/Practice JS ≤30KB, quiz JS ≤50KB, total shared CSS ≤25KB. Browser output goes to `playwright-report/`.

Validate root hosting separately; keep the same base for build, preview and tests:

```sh
BASE_PATH=/ npm run build
BASE_PATH=/ npm run test:links
BASE_PATH=/ npm run test:e2e
```

Stop any previously started preview before changing the base. Restore the repository build with `npm run build`. External sources are checked separately with `npm run test:sources`; outages do not fail ordinary builds.

## Content and translations

- `src/content/lessons/{locale}/*.mdx`: lesson frontmatter and prose, validated by the Astro collection schema.
- `src/content/practice/{locale}.json`: recommendations, routine groups, source and lesson references.
- `src/content/quiz/{locale}.json`: prompts, four options and answer explanations.
- `src/data/quiz.ts`: invariant question IDs, lesson links, difficulty/scenario metadata, correct option IDs and quiz version.
- `src/i18n/ui.ts` and `diagrams.ts`: interface and explanatory diagram wording.
- `src/components/diagrams/`: shared, theme-aware educational SVG geometry and native-button interactions.
- `src/components/illustrations/`: original decorative care motifs and typed lesson/routine scenes.
- `src/data/sources.ts`: stable source registry and localized display descriptions.
- `docs/editorial-review.md`: claim table, qualifications, terminology, review checklist and maintenance process.

Keep lesson, question, option and recommendation IDs stable across languages. Update all four versions together. To add a language, add it to the locale configuration and Astro configuration, supply every content file and dictionary, extend source titles and tests, and perform an editorial and browser review. Never use silent English fallbacks.

Each lesson supplies its title, opening question, example, takeaway, optional deeper explanation, sources and actual update date. MDX places each diagram beside the relevant explanation. The shared route derives section links from lesson headings, then renders the example, takeaway, and named neighboring lesson links. Original SVGs are schematic, without fabricated measurements or fixed disease timelines. All explanations remain available without JavaScript.

When question meaning, options or correctness changes, increment `quizVersion` to invalidate incompatible attempts. Changes to wording alone need not discard attempts. Run checks after every content update; automated tests cannot establish translation quality or medical accuracy.

## Preferences and privacy

Namespaced keys use `dental-care:<deployment-base>:v1:` so other GitHub Pages projects do not collide. Local storage contains the manual language, theme (`system`, `light`, `dark`) and learning state (completed IDs and last lesson). Lesson completion is explicit; reset is available on Learn and lesson pages. Home and Learn offer a resume link to the last visited lesson. Progress is shared across languages. Session storage contains only the current quiz attempt in this tab, including selected and checked answers and the shuffled option order for each question. Option order stays stable through reloads and language changes; retry generates fresh permutations. Question order remains fixed. Retry clears the attempt; no long-term quiz history is kept. Malformed or inaccessible storage is tolerated and interactions continue in memory.

Only the unprefixed entry uses saved language, then the first supported browser language, then English. The switcher preserves the current route and anchor. System theme follows OS changes; an explicit theme is applied in the head before paint.

## GitHub Pages deployment

Repository: [0x59r11/Dental-Care-Guide](https://github.com/0x59r11/Dental-Care-Guide). Expected published URL: [https://0x59r11.github.io/Dental-Care-Guide/](https://0x59r11.github.io/Dental-Care-Guide/).

Production defaults in `astro.config.mjs` are `https://0x59r11.github.io` with base `/Dental-Care-Guide`. Override with `SITE_URL` and `BASE_PATH`; all URLs use the same base-aware helpers. Output contains directory-style pages, localized canonicals, reciprocal hreflang links, a sitemap and a multilingual 404 page.

1. Finish the owner review in `docs/editorial-review.md` before the release push.
2. Check `git remote -v`. If `origin` is missing, add it with `git remote add origin git@github.com:0x59r11/Dental-Care-Guide.git`. If it points elsewhere, update it with `git remote set-url origin git@github.com:0x59r11/Dental-Care-Guide.git`.
3. In repository **Settings → Pages**, choose **GitHub Actions** as the source. Configure the `github-pages` environment to allow deployment from the default branch.
4. Push the reviewed commits to the default branch (`git push -u origin master` for this checkout). `.github/workflows/pages.yml` validates both root and subpath builds on pull requests and main/master pushes. All three browser engines and performance checks must pass. Only default-branch pushes or manual runs on that branch upload the production subpath artifact and deploy it after both validation jobs succeed. To rerun, select **Actions → Validate and deploy → Run workflow** and choose the default branch. If the default branch is renamed beyond `main` or `master`, update the workflow's push filter.
5. The deployment job checks the published homepage, a German deep lesson, favicon, JS and CSS. Inspect the Actions result and test a shared deep link manually.

The workflow uses the built-in `GITHUB_TOKEN` and official Pages setup, artifact and deployment actions; no personal access token or `gh-pages` branch is required. Configuring the workflow locally does not publish the site. The shared footer links to the source repository in all four languages.

For a custom domain, change `SITE_URL`, set `BASE_PATH=/` in the build and test jobs, update which matrix build uploads the artifact, and configure the domain and DNS in GitHub Pages. Add `public/CNAME` if required by your setup. Do not rewrite lesson links. The storage namespace changes with the base; existing browser preferences do not migrate automatically.

## Release review

The latest content update date is 2026-11-15; it does not imply clinical endorsement. Owner review of all four languages, screen-reader checks, and a timed reading trial remain human release checks. Record actual results in `docs/editorial-review.md` and `docs/verification.md`. Review sources annually and after significant guideline changes. The displayed reading times are estimates.

## Licensing

Code is MIT licensed: see `LICENSE`. Original educational text and illustrations are CC BY 4.0: see `CONTENT-LICENSE.md`. External publications remain under their own licenses; they are linked rather than reproduced. Credit “Dental Care Guide contributors” with a link to the project and license when reusing original content, and identify changes.

## Expanded learning and assessment

The course explains plaque metabolism between meals, uncertain dark spots, lesion activity versus cavitation, and progression, stabilization, and arrest. Eight shared SVG diagrams include non-diagnostic dark-spot examples and possible lesion depth. The progression lesson renders three diagrams; other lessons retain their existing diagram.

The quiz has 20 single-choice questions: 4 foundational, 10 application, and 6 challenging, with 14 realistic scenarios. Every question has an explanation addressing a misconception and a link to its lesson. The end-of-attempt review links back to missed topics and individual lessons. Version 2 discards incompatible previous attempts; lesson completion and preferences are unaffected.

All content is supplied in English, Russian, Ukrainian, and German. Estimated durations are 15–20 minutes for lessons, 10–15 minutes for the quiz, and 30–40 minutes overall; reader timing remains a human review task. Difficulty describes editorial intent, not measured psychometric performance.
