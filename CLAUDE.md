# Go to the Campus — Revamp Wireframe

A clickable **wireframe/prototype** that recreates the current gotothecampus.com
(campus.cru.org/high-school/go-to-the-campus/) so we can rearrange content and hand a
clear spec to the web team. It is **not** production code — it's a faithful clone we
revamp *after* it's complete. Hosted on GitHub Pages.

## Prime directive
Match the **current live site**. Clone first; rearrange second. When content is needed,
pull the **real copy** from the matching live URL — never invent placeholder text.

---

## Design system (do not drift)
- **Fonts:** Cru brand typography — **Sora** (ExtraBold 800) for headlines, section titles,
  nav and buttons; **Inter** for body copy. This is a deliberate deviation from the live site,
  which uses Source Sans Pro for display headings and Inter for body. The brand brief lists
  Sora as fixed primary. (Note: the live site already loads Sora but its heading stack reads
  `"Source Sans Pro", Sora-serif` — `Sora-serif` is not a real family, so Sora never applies.)
- **Colors:** slate `#383F43` (header, footer, dark sections, headings), yellow `#FFD000`
  (accents, buttons, rules), white, light `#f6f5f2`. All tokens live in `:root` in `styles.css`.
- **Buttons:** rectangular, uppercase, letter-spaced — `.btn-y` (yellow), `.btn-s` (slate),
  `.btn-o` (outline, for dark backgrounds).
- **Photography:** real images are hotlinked from the live WordPress library. Base URL:
  `https://campus.cru.org/high-school/go-to-the-campus/wp-content/uploads/sites/563/`
- **`<meta name="referrer" content="no-referrer">` is required in every page's `<head>`** —
  it lets cru.org's images load cross-origin (hotlink protection). Keep it.
- **Wireframe chrome:** the black prototype bar + red-dashed section outlines + `.wf-tag`
  handles are review tools, injected/handled by `site.js`. Leave them in; they toggle off via
  the "Show section labels" checkbox. Strip them only when we move toward production.

## Content source (IMPORTANT — read before adding pages)
All content comes from the live WordPress REST API, **not** from scraping rendered HTML:

    https://campus.cru.org/high-school/go-to-the-campus/wp-json/wp/v2/posts?per_page=50&page=N
    https://campus.cru.org/high-school/go-to-the-campus/wp-json/wp/v2/pages?per_page=50

`content.rendered` holds the full article body. Scraping the rendered Elementor page
loses most of the text — that mistake produced an earlier round of thin, half-invented
pages. Use the API.

- `class_list` on each post carries the real taxonomy as `page_categories-<slug>`.
  That is how section pages know which articles belong to them, including the numbered
  step groups on `share-your-faith` (`1-start-a-spiritual-conversation` … `7-…`).
- 18 posts have a genuinely empty body on the live site (offsite/video stubs). Those pages
  say so explicitly. **Do not fill them with invented copy.**
- Two slugs exist as both a page and a post (`developing-student-leaders`,
  `international-missions`); the post gets an `article-` prefix.

## Architecture (how the site is wired)
- **`styles.css`** — one shared stylesheet, linked by every page. Edit design here, once.
- **`site.js`** — injects the prototype bar, header/nav, and footer on every page, and wires
  the mobile menu, label toggle, content slider, and listing filters.
  **The `NAV` array at the top of `site.js` is the single source of truth for navigation.**
  Add/rename/reorder pages there and every page updates. Do not hand-code nav into pages.
- **Every page body** = just its own `<main>` content + `<script src="site.js"></script>`.
  Header/footer are injected — don't paste them into pages.
- Flat file structure at repo root; page = its slug (`share-your-faith.html`). Slugs are
  defined in the `NAV` array — match them exactly.

## Page types (copy these patterns)
1. **Homepage** — `index.html` (hero, pillars, featured slider, CTA, stats, tools, collections, stories, feedback).
2. **Section landing** — see `learn.html`: a `.page-hero.photo` + a `.tilegrid` of the section's sub-pages + a `.cta`.
3. **Sub-page** — see `share-your-faith.html`: `.page-hero.photo` + `.prose` body + a related `.cardgrid`.
4. **Article** — see `article.html`: header + hero image + `.prose` + related cards. This is the
   template; duplicate per article. On the real site these are fed by the Content Workflow /
   Bynder pipeline, so **a handful of filled samples is enough** — do not rebuild every article.
5. **Content listing** — see `content.html`: `.page-hero` + `.filterbar` chips + `.cardgrid` (cards carry `data-card="category"`).
6. **Blank skeleton** — `_template.html` to start any new page.

## Current state (complete)
All 128 articles and 30 section pages are built — 161 HTML files. Every internal link
resolves; there are no placeholder pages left.

Known deviations from the live site, all deliberate:
- `The Coaching Center` / `The Launch Box` are anchor sections on `launch.html`, matching
  the live site (they are not separate pages there).
- `Promote Your Ministry` is the live page title; its slug is `social-media-and-promotion`.
  The file uses the slug, the nav uses the title.
- `_template.html` is intentionally unlinked.

## Getting real content
1. Open the live homepage and read its nav to get the **actual URL** for each page above
   (labels are known; confirm the real hrefs from the live site).
2. For each page, fetch the live URL and pull the **real heading, intro, and body copy** into
   the matching template. Keep image references pointing at the live library (base URL above);
   reuse a fitting existing image if a page's own image isn't obvious.
3. For sample articles, take titles/blurbs from the homepage "Featured Content" and the live
   content index.

## Autonomous build directive (paste to run, then walk away)
> Using CLAUDE.md as the spec, build every page listed under "Pages to create." For each,
> duplicate the correct pattern file, pull the real heading/intro/body from the matching live
> URL on campus.cru.org, and keep image URLs on the live library base. Confirm each new slug
> exists in the `NAV` array in `site.js` (add any that are missing). Build ~5 sample article
> pages from `article.html` using Featured Content titles. Then commit, push to `main`, and
> confirm GitHub Pages is serving. Work in batches; don't stop for approval on individual
> pages. When done, print a checklist of every page created and flag anything you were unsure
> about (missing content, ambiguous image, broken link).

## QA checklist (end of run)
- [ ] Every `NAV` slug resolves to a real file (no 404s).
- [ ] Header/footer identical on every page (they should be — injected).
- [ ] All images load on the deployed URL (if any fail, we embed them).
- [ ] Mobile: hamburger opens, submenus readable.
- [ ] "Show section labels" toggles handles on/off.
- [ ] Real content on every page — no lorem ipsum, no invented facts.

## After the clone is complete
Come back to Mark with the full clickable site. *Then* we revamp — rearrange sections
(via the `.wf-tag` handles), cut/merge pages, rewrite copy. That work happens in the design
chat; you commit the results here.
