# Verify Locally Before Deploying

This branch (`split/two-sites`) contains the **scaffold** of the two-site split:

- Monorepo layout: `apps/movsum`, `apps/collective`, `packages/{ui,supabase,content}`
- Both apps are working Vite + React skeletons with routers, cross-link, JSON-LD, Vercel Analytics wiring, `sitemap.xml`, `robots.txt`
- `apps/movsum/vercel.json` has the 301 redirects for `/collective`, `/services`, `/mimo-collective`, `/mimo-collective/*`
- Root Vite app in `src/` **is untouched** — the current live site continues to build and deploy exactly as before

What is **NOT** yet done on this branch (deliberately, because it needs a real `npm install` + `npm run build` after every step, and this session had no registry access):

- The `git mv` of real pages/components from `src/` into `apps/movsum/src/` and `apps/collective/src/`
- The `git mv` of shared shell components (Header, Footer, Layout, shadcn primitives) into `packages/ui/src/`
- The `git mv` of Supabase surface (contexts, hooks) into `packages/supabase/src/`
- Deletion of `src/components/AudioCallButton.jsx` (0 bytes — approved to drop)
- Deletion of root `src/`, root `vite.config.js`, and root build scripts once both apps stand on their own

## Do this locally to complete the migration

Prereqs: Node 20 (matches `.nvmrc`), git, npm.

### 1. Verify current state builds green

```bash
git checkout split/two-sites
npm install                 # installs root + all workspaces
npm --workspace @mimo/movsum run build
npm --workspace @mimo/collective run build
# Both should exit 0 and produce dist/ inside each app.
```

If both build, the scaffold is sound. Continue.

### 2. Execute the file moves (MIGRATION.md commits 3–8)

Follow the mapping table in `MIGRATION.md` exactly. For each row:

```bash
git mv src/<path> <destination>
# Then update every remaining import of that file — grep will find them:
grep -r "from ['\"]@/<oldpath>" src/ apps/ packages/
# Rewrite each to point at @mimo/ui, @mimo/supabase, or the new apps/*/src path.
```

Suggested batch order (each batch = one commit):

**Batch A — shared UI primitives → `packages/ui`:**
`components/ui/*` → `packages/ui/src/primitives/*`
`components/{Header,Footer,Layout,LogoComponent,Hero,HeroImage,DualCTA,CallToAction,ScrollToTop,LinkCard,LanguageSelector,CurrencySelector,GoogleTranslateWidget}.jsx` → `packages/ui/src/`
`components/{HypnoticBackground,GradientBackground,FloatingParticles}.jsx` → `packages/ui/src/backgrounds/`
`hooks/{use-mobile.jsx,use-toast.js}` → `packages/ui/src/hooks/`

**Batch B — Supabase surface → `packages/supabase`:**
`contexts/*` → `packages/supabase/src/contexts/`
`hooks/{useConversations.js,useConversation.js,useCart.jsx,useGeminiAssistant.js}` → `packages/supabase/src/hooks/`
`config/aiConfig.js` → `packages/supabase/src/config/`
`types/caseTypes.js` → `packages/supabase/src/types/`
Delete `components/AudioCallButton.jsx` (0 bytes, approved).
Create `packages/supabase/src/client.js` reading `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`.

**Batch C — personal pages → `apps/movsum/src/pages/`:**
See MIGRATION.md § "apps/movsum". Replace the current placeholder routes in `apps/movsum/src/App.jsx` with the real pages.

**Batch D — services pages → `apps/collective/src/pages/`:**
See MIGRATION.md § "apps/collective". Replace placeholder routes in `apps/collective/src/App.jsx`.

**Batch E — retire root app:**
```bash
git rm -r src/
git rm vite.config.js index.html jsconfig.json postcss.config.js tailwind.config.js
# Adjust root package.json: drop "dev"/"build"/"preview" scripts, keep only workspace tooling.
```

After each batch: `npm --workspace @mimo/movsum run build && npm --workspace @mimo/collective run build`. Both must pass before the next batch.

### 3. Fill in TODOs

Grep for `TODO(mimo):` and `TODO:` in `packages/content/src/*.js` and both `apps/*/src/App.jsx`. Every one is a real placeholder needing your input:

- Tagline (personal)
- Booking URL (Calendly/Cal.com)
- Resume PDF path + "Last updated" date
- Socials (LinkedIn, GitHub, Instagram, X — drop dead ones)
- Brand accents (personal + collective)
- Mimo's Collective one-liner
- Mimo's Collective services list (3–6 items)
- Contact/inquiry email for Collective (`hello@mimoscollective.com` proposed)
- Typography display font pick

### 4. Vercel — two projects, one repo

In Vercel dashboard, create two projects both pointing at `Collective-by-Mimo/My-Main-Website`, branch `main` (after this branch is merged):

| Setting | Project A (personal) | Project B (collective) |
|---|---|---|
| Root Directory | `apps/movsum` | `apps/collective` |
| Framework Preset | Vite | Vite |
| Build Command | `npm run build` | `npm run build` |
| Output Directory | `dist` | `dist` |
| Install Command | `npm install --workspaces=false` (project root install; workspace deps resolve via monorepo hoisting) — or leave default if it works | same |
| Node version | 20 | 20 |
| Domain | `movsummirzazada.com` (+ `www`) | `mimoscollective.com` (+ `www`) |
| Env vars | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (reuse existing values) | same values |

### 5. DNS records to paste at your registrar

**For `mimoscollective.com`** (new domain, add to registrar):

| Type | Name | Value | TTL |
|---|---|---|---|
| A | `@` | `76.76.21.21` | 3600 |
| CNAME | `www` | `cname.vercel-dns.com.` | 3600 |

**For `movsummirzazada.com`** (existing — Vercel dashboard will show the exact required records after you add the domain to the new project; typical values are the same as above). Vercel's dashboard is authoritative — copy from there, not from this doc, in case Vercel changes their edge IP.

Do NOT change nameservers unless Vercel explicitly asks. A/CNAME records at the registrar is enough.

### 6. Post-deploy checks

- [ ] `curl -I https://movsummirzazada.com/collective` returns `301` → `https://mimoscollective.com`
- [ ] `curl -I https://movsummirzazada.com/services` returns `301` → `https://mimoscollective.com`
- [ ] `curl -I https://movsummirzazada.com/mimo-collective` returns `301` → `https://mimoscollective.com`
- [ ] `curl -s https://movsummirzazada.com/sitemap.xml | head` returns the sitemap
- [ ] `curl -s https://mimoscollective.com/sitemap.xml | head` returns the sitemap
- [ ] Both pages contain a `<script type="application/ld+json">` block — one `Person`, one `Organization`, each `sameAs` includes the other domain
- [ ] Click "Mimo's Collective →" in the header/footer of the personal site → lands on collective
- [ ] Click "About Movsum →" in the header/footer of collective → lands on personal
- [ ] Both sites' Header + Footer show the cross-link
- [ ] No text on collective mentions "team", "we are", "our staff", "founders" (grep the built HTML)
- [ ] Vercel Analytics shows `cross_to_collective` and `cross_to_personal` events firing when you click each
