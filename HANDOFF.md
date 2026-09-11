# HANDOFF — Go to the Campus revamp wireframe

Written 2026-09-11. Last updated 2026-09-11. Read this first, then `CLAUDE.md` for the
build spec.

**Keeping this file current (Mark's convention, agreed 2026-09-11).** This is not a
changelog — git already records what changed and why, and a second running log would only
drift from it. Record here what the commit log cannot carry: decisions and the reasoning
behind them, approaches tried and rejected, gotchas, current state, and what is next.
Rhythm: capture a ruling in the commit message immediately (so nothing is lost if a
session ends abruptly), then fold it into this file at natural stopping points. A ruling
that took real back-and-forth to reach gets written in straight away rather than waiting.
Routine execution of an already-recorded decision does not need an entry.

---

## 1. What this is

A clickable wireframe that reproduces the live **Go to the Campus** site
(`campus.cru.org/high-school/go-to-the-campus/`) so Mark Michal can rearrange content
and hand a clear spec to the Cru web team.

- **Repo:** `~/Documents/MY DOCUMENTS/Projects/gttc-revamp`
- **Live:** https://markmichal.github.io/gttc-revamp/
- **Publishing:** GitHub Pages, `main` branch, root. A push deploys in 1–2 minutes.
- **Owner:** Mark Michal (non-technical; Innovation Director, Cru High School Ministry)

The repo is **public** because GitHub Free requires it for Pages. It carries `noindex`
meta tags and a `robots.txt` so it stays out of search — Mark's explicit choice when
told the tradeoff. It is still reachable by anyone with the link.

### Current state

| | |
|---|---|
| HTML pages | 162 — 128 articles, 30 section pages, plus `index`, `content`, `_template` |
| Embedded videos | 49 across 41 pages |
| Articles with the live site's hand-picked "More to Explore" | 87 |
| Section pages with photo headers | 30 |
| Broken links / broken images / empty thumbnails | 0 |
| Commits on `main` | 35 |

### The files that matter

- **`styles.css`** — all design. Every layout and type rule.
- **`site.js`** — injects the prototype bar, header/nav, and footer on every page.
  The `NAV` array at the top is the single source of truth for navigation.
- **162 `.html` files** — each page is just its own `<main>` plus `<script src="site.js">`.
- `CLAUDE.md` — build spec. `robots.txt`, `.nojekyll` (the latter makes Pages serve
  `_template.html`, which Jekyll would otherwise skip for its leading underscore).

---

## 2. The most important thing to know

**Content comes from the WordPress REST API, not from scraping rendered HTML.**

```
https://campus.cru.org/high-school/go-to-the-campus/wp-json/wp/v2/posts?per_page=50&page=N
https://campus.cru.org/high-school/go-to-the-campus/wp-json/wp/v2/pages?per_page=50
```

`content.rendered` holds the full article body. The live site is built in Elementor, so
scraping the rendered page loses most of the text. An early round of this project did
exactly that and produced thin, half-invented pages — the testimony article came out at
284 words against the real 2,026. The whole site was rebuilt from the API afterwards.

Three things are **not** in the API and need the live DOM:

1. **Video URLs.** Elementor stores them in a `data-settings` JSON blob with escaped
   slashes (`https:\/\/www.youtube.com\/watch?v=…`). A naive regex misses them.
2. **Some images.** Three attachments return **401** from the API. Their URLs were
   recovered from the live pages' `og:image` meta.
3. **Section hero images.** They sit on Elementor motion-effect layers. Matching the
   first background image in the markup grabs card thumbnails instead.

`class_list` on each post carries the real taxonomy as `page_categories-<slug>`. That is
how section pages know which articles belong to them, including the numbered step groups
on Share Your Faith.

---

## 3. Decisions made, and why

### Content

- **Every page is real content from the live site.** Nothing invented. Where the live
  site has nothing, the page says so rather than being padded.
- **14 articles are near-empty stubs** (offsite or video-only entries with no body text
  anywhere — not in the API, not in the rendered page, not in Elementor data). Those
  pages state this openly.
- **"More to Explore"** replaced an earlier invented "More in *Image Article*" section.
  The live site hand-picks companions per article; 87 articles now carry their real
  trio. **41 have an empty carousel on the live site** — those keep same-section
  suggestions plus a visible line saying the live site selected none. Mark reviewed the
  list and was happy to leave it.
- **Share Your Faith keeps its 7 numbered steps.** That is its real structure. Five other
  pages had inherited stray numbered headings and were flattened to a single grid.

### Design

- **Typography: Sora ExtraBold headlines, Inter body** — the Cru brand kit. This is a
  **deliberate departure** from the live site, which uses Source Sans Pro for display
  headings. Mark approved it after seeing it.
- **Sentence case sitewide.** 115 of 128 article titles were rewritten *in the markup*,
  not by CSS transform, because CSS lowercasing would have destroyed proper nouns.
  Preserved: Cru, God, Jesus, Christ, Christian, Bible, Holy Spirit, Scripture,
  Soularium, GodTools, Satisfied, personal names, places, Gen Z, the pronoun "I", and
  existing acronyms. **Mark's specific rulings:** *gospel* lowercase; *Cru High School*
  capitalised as the ministry name; *Coaching Center* capitalised as a named programme;
  **THRIVE** always all-caps; *Reach Your School Playbook* kept as a product name.
  ALL-CAPS inside article body copy is left alone — that is Cru writers' own emphasis.
- **Article layout:** lead image on top directly under the nav, title beneath it in
  uppercase-free sentence case with a yellow left bar, breadcrumb below the title showing
  the real section path from the taxonomy. Image, title, breadcrumb and body all align to
  the same **712px** text column. Lead images are cropped to a **2.25:1** band
  (two-thirds of their previous height) from the centre.
- **Section-heading casing — settled 2026-09-11.** Page `<h1>`s were already sentence
  case; the `<h2 class="h-sec">` section headings were not. Mark's rulings:
  - `More to Explore` → **More to explore** (215 headings across 128 articles).
  - `Other Ways to Join Us` → **Other ways to join us**.
  - `Our Favorite Coaching Center Resources` → **Our favorite Coaching Center resources**
    — *Coaching Center* stays capitalised as a named programme, consistent with the
    earlier ruling.
  - `Resources on <Section Name>` on the 16 section pages → first shortened to
    **Resources**, then **removed entirely**. Mark's reasoning: the word sets up nothing
    and does not help the reader, and the page `<h1>` immediately above already names the
    section. The sections keep their `.wf-tag` handles so they remain grabbable when
    rearranging.
  - **The 7 numbered steps on Share Your Faith keep title case** — Mark's explicit
    decision to leave them for now.
  - **`.wf-tag` labels were deliberately left in title case**, per the existing rule that
    prototype tooling is not brand content. A blind find-and-replace would have caught
    them; restrict heading edits to `<h2 class="h-sec">`.
- **Section headers** are 300px tall photos. The live site uses 550px; 300px was chosen
  to match Mark's preference for less vertical space. 13 of them carry a custom
  `background-position` because the default centre crop cut people's faces off.

### Corrections to the live site found along the way

Worth passing to the web team:

1. **The live site's Sora migration never took effect.** Its heading CSS reads
   `"Source Sans Pro", Sora-serif`. `Sora-serif` is not a real family name, so the
   browser skips it. Changing that one string to `Sora, sans-serif` would switch the live
   headlines to brand type immediately.
2. **41 articles have an empty "More to Explore"** on the live site — 20 of the 23 real
   ones are Video Articles, which points at the video template rather than 20 separate
   oversights.
3. **Three media attachments return 401** from the API while their pages render fine —
   likely a permissions quirk in the media library.
4. `/learn/` **301-redirects** to `/learn/understand-cru/`; there is no Learn landing page.
5. **Promote Your Ministry** is the page title; its slug is `social-media-and-promotion`.
6. The Lead landing page has **no Large Group Outreaches tile** (nav only) but **does**
   have Opportunities Subscription.

---

## 4. Tried and rejected

- **Scraping rendered Elementor HTML.** Lost most body text. Replaced wholesale by the
  REST API. Do not go back to it.
- **CSS `text-transform` for sentence case.** Would have rendered "How do i start a cru
  movement at my school?". Titles are rewritten in the markup instead.
- **A sidebar on article pages.** The live site has one (search + Recent Posts). Mark
  explicitly declined it — do not add it without asking.
- **The angled white wedge under header images.** On the live site's hero. Mark declined;
  not worth the effort.
- **Full-bleed header images.** Offered; Mark preferred them contained at current size.
- **`youtube-nocookie` without `referrerpolicy`.** Produced "Video player configuration
  error 153" on every embed — see Gotcha 2 below.
- **Removing the related-cards row** to match the live site exactly. Started, then
  reversed at Mark's request; the rows stay.

---

## 5. Gotchas that will bite you

**1. Stale cache is the usual explanation, not a failed change.**
This cost real time twice. `styles.css` and `site.js` are hash-versioned
(`styles.css?v=abc12345`) and every HTML file must be re-stamped after either changes —
there is a re-versioning snippet used in most commits. But **GitHub Pages also caches the
HTML itself for ~10 minutes**, which the version stamps cannot reach. When something you
just deployed looks unchanged, suspect cache before assuming the edit failed. Mark hits
this too; tell him to hard-refresh (Cmd+Shift+R).

**2. YouTube embeds need a per-iframe `referrerpolicy`.**
Every page carries `<meta name="referrer" content="no-referrer">` because cru.org's
hotlink protection needs it to serve images. But YouTube needs a referrer to verify the
embedding domain, and without one every player shows **Error 153**. Each iframe therefore
carries `referrerpolicy="strict-origin-when-cross-origin"`. Do not remove either piece.

**3. Two slugs exist as both a page and a post** — `developing-student-leaders` and
`international-missions`. The post gets an `article-` filename prefix. Card links must
point at the post file, not the page file.

**4. Don't let footer links leak into extracted lists.** The "More to Explore" scan
originally swept up the footer's "Contact us" button as a related article on 18 pages.
Scans that walk forward from a heading must stop at the "Give us feedback" block.

**5. Section hero `background-position` is per-page and deliberate.** Don't normalise it.

**6. Check for an existing block before adding one.** 87 articles were shipping *two*
identical "More to Explore" sections: when the live site's hand-picked companions were
added, the original related-cards block was never removed, so the same three cards
rendered twice in a row. Mark caught it in the browser on 2026-09-11; all 87 pairs were
verified byte-identical before one was deleted. The 41 fallback articles only ever had
one. Every article now carries exactly one — assert that if you touch this area again.

---

## 6. Known issues and unfinished pieces

- **Two hero images were never individually checked:** Working with Adults and Snapshot
  Cards. Both are very wide, so the crop risk is low, but they are unverified.
- **Two YouTube videos are dead** (`UrmypdukU7A`, `3dGuN57R0Ek`) — broken on the live
  site too. Those pages say so and link out.
- **Soularium has no header image.** Correct: the live page has none.
- **`.wf-tag` review labels keep their capitals** — deliberate, they are prototype
  tooling rather than brand content.
- **`_template.html` is intentionally unlinked.**
- **The 41 fallback "More to Explore" sections** carry my suggestions, not Cru's. The
  on-page note says so. If the web team fills them in on the live site, re-extract.
- **Images are hotlinked from campus.cru.org.** If those files move or are renamed, this
  prototype breaks. Downloading them into the repo was offered and not taken up.

---

## 7. Next steps

Nothing is in flight. Candidates, roughly in order of value:

1. **Check the two unverified hero crops** (Working with Adults, Snapshot Cards).
2. **Rearranging** — the actual point of the wireframe. Tick "Show section labels" in the
   prototype bar to reveal `.wf-tag` handles on every section, then decide what moves,
   merges, or goes. That work was always meant to start once the clone was faithful.
3. **Hand the six live-site findings** in section 3 to the web team.
4. If this becomes a longer-lived artefact, **bring the images local** so it stops
   depending on the live WordPress library.

*(Section-heading casing was next on this list and is now settled — see section 3.)*

---

## 8. Working with Mark

- Non-technical. Plain language, no jargon dumps. He reads and reacts visually — he
  spots things in the browser and reports them, often accurately, and several of his
  reports uncovered bugs broader than the symptom he noticed.
- He decides; surface the tradeoff and let him rule. The casing rulings in section 3 are
  a good example of how that goes.
- Verify before agreeing. On more than one occasion his report was right about the
  symptom but the cause was different from what either of us assumed — and once the site
  was actually correct and the real problem was his browser cache.
- Keep risky or large changes to a **single commit** so `git revert <sha>` undoes them
  cleanly. He has asked for that explicitly, and it made the typography change easy to
  offer.
