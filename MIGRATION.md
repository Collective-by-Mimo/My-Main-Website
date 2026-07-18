# Two-Site Split — Migration Plan of Record

Branch: `split/two-sites`
Architecture: **Option A — monorepo, two apps + shared packages**
Target deploys:
- `apps/movsum` → `movsummirzazada.com` (personal)
- `apps/collective` → `mimoscollective.com` (solo services brand)

Positioning: one person (Movsum Mirzazada) owns and runs both sites.
"Mimo's Collective" is a brand, not a company. No team/headcount language.

---

## Page → Site mapping (source of truth for the `git mv` commits that follow)

### → apps/movsum (personal, `movsummirzazada.com`)

| Current path in `src/` | Destination | Notes |
|---|---|---|
| `pages/HomePage.jsx` | `apps/movsum/src/pages/HomePage.jsx` | Personal half only. Existing Hero split's "Collective brand" half becomes a HandoffBlock at the bottom of this page. |
| `pages/AboutPage.jsx` | `apps/movsum/src/pages/AboutPage.jsx` | |
| `pages/MediaPage.jsx` | `apps/movsum/src/pages/MediaPage.jsx` | |
| `pages/ContactPage.jsx` | `apps/movsum/src/pages/ContactPage.jsx` | |
| — | `apps/movsum/src/pages/ResumePage.jsx` | NEW per Appendix A |
| — | `apps/movsum/src/pages/MediaKitPage.jsx` | NEW per Appendix A |
| `components/EditorialSection.jsx` | `apps/movsum/src/components/` | Personal-only |
| `components/HighlightsSection.jsx` | `apps/movsum/src/components/` | Personal-only |
| `components/OfficialLinks.jsx` | `apps/movsum/src/components/` | |
| `components/PressLogos.jsx` | `apps/movsum/src/components/` | |
| `components/VideoIntroduction.jsx` | `apps/movsum/src/components/` | |
| `components/PhotoGallery.jsx` | `apps/movsum/src/components/` | |
| `components/PhotoCard.jsx` | `apps/movsum/src/components/` | |
| `components/PhotoLightbox.jsx` | `apps/movsum/src/components/` | |
| `components/FilmCard.jsx` | `apps/movsum/src/components/` | |
| `components/SmartFilmCard.jsx` | `apps/movsum/src/components/` | |
| `components/FilmDetailModal.jsx` | `apps/movsum/src/components/` | |
| `components/FilmographyFilter.jsx` | `apps/movsum/src/components/` | |
| `components/PressKitTab.jsx` | `apps/movsum/src/components/` | |
| `components/TimelineSlider.jsx` | `apps/movsum/src/components/` | Personal bio timeline |
| `components/WelcomeMessage.jsx` | `apps/movsum/src/components/` | |
| — | `apps/movsum/vercel.json` | NEW: 301s `/collective`, `/services`, `/mimo-collective`, `/mimo-collective/*` → `https://mimoscollective.com[/*]` |

### → apps/collective (services, `mimoscollective.com`)

| Current path in `src/` | Destination | Notes |
|---|---|---|
| `pages/MimoCollectivePage.jsx` | `apps/collective/src/pages/HomePage.jsx` | Rename — becomes services home |
| `pages/GeneralServicesPage.jsx` | `apps/collective/src/pages/services/general.jsx` | |
| `pages/PartnersServicesPage.jsx` | `apps/collective/src/pages/services/partners.jsx` | |
| `pages/BrandsPage.jsx` | `apps/collective/src/pages/BrandsPage.jsx` | |
| `pages/CollaborationsPage.jsx` | `apps/collective/src/pages/CollaborationsPage.jsx` | |
| `pages/OffersPage.jsx` | `apps/collective/src/pages/OffersPage.jsx` | |
| `pages/ShopPage.jsx` | `apps/collective/src/pages/ShopPage.jsx` | |
| `pages/ProductDetailPage.jsx` | `apps/collective/src/pages/ProductDetailPage.jsx` | |
| `pages/CheckoutSuccessPage.jsx` | `apps/collective/src/pages/CheckoutSuccessPage.jsx` | |
| `pages/LegalComplaintServicePage.jsx` | `apps/collective/src/pages/legal/service.jsx` | |
| `pages/WhatYouWillReceivePage.jsx` | `apps/collective/src/pages/legal/what-you-receive.jsx` | |
| `components/SampleCaseStructure.jsx` | `apps/collective/src/pages/legal/sample-case.jsx` | Was a route target |
| `components/LegalComplaintIntakeForm.jsx` | `apps/collective/src/pages/legal/intake.jsx` | Protected |
| `components/LegalComplaintClientDashboard.jsx` | `apps/collective/src/pages/legal/dashboard.jsx` | Protected |
| `components/LegalComplaintCaseDeliverable.jsx` | `apps/collective/src/pages/legal/deliverable.jsx` | Protected |
| `components/ClientMessagingPage.jsx` | `apps/collective/src/pages/messaging.jsx` | Protected |
| `pages/AuthPage.jsx` | `apps/collective/src/pages/AuthPage.jsx` | Protected surface lives here |
| `pages/AdminPage.jsx` | `apps/collective/src/pages/admin.jsx` | Protected |
| `components/admin/*` | `apps/collective/src/components/admin/` | Protected |
| `components/ProtectedRoute.jsx` | `apps/collective/src/components/ProtectedRoute.jsx` | |
| `components/RedirectMiddleware.jsx` | `apps/collective/src/components/RedirectMiddleware.jsx` | |
| `pages/ContactPage.jsx` (as `Inquiry`) | `apps/collective/src/pages/ContactPage.jsx` | Adapted for services inquiry (project type, budget) |
| `pages/TermsAndConditionsPage.jsx` | `apps/collective/src/pages/TermsAndConditionsPage.jsx` | Commerce sits here |
| `pages/PaymentTermsPage.jsx` | `apps/collective/src/pages/PaymentTermsPage.jsx` | |
| `components/ShoppingCart.jsx` | `apps/collective/src/components/` | |
| `components/CheckoutModal.jsx` | `apps/collective/src/components/` | |
| `components/ProductsList.jsx` | `apps/collective/src/components/` | |
| `components/ItemCard.jsx` | `apps/collective/src/components/` | |
| `components/PricingTierSelector.jsx` | `apps/collective/src/components/` | |
| `components/PricingExplanation.jsx` | `apps/collective/src/components/` | |
| `components/InquiryForm.jsx` | `apps/collective/src/components/` | |
| `components/ReviewForm.jsx` | `apps/collective/src/components/` | |
| `components/ReviewsList.jsx` | `apps/collective/src/components/` | |
| `components/RatingStars.jsx` | `apps/collective/src/components/` | |
| `components/CategoryFilter.jsx` | `apps/collective/src/components/` | |
| `components/FilterBar.jsx` | `apps/collective/src/components/` | |
| `components/CuratedLinksSection.jsx` | `apps/collective/src/components/` | |
| `components/CaseDocumentRenderer.jsx` | `apps/collective/src/components/` | |
| `components/UnreadBadge.jsx` | `apps/collective/src/components/` | Messaging |
| `components/TypingIndicator.jsx` | `apps/collective/src/components/` | Messaging |
| `components/MessageInput.jsx` | `apps/collective/src/components/` | |
| `components/MessageStatus.jsx` | `apps/collective/src/components/` | |
| `components/MessageThread.jsx` | `apps/collective/src/components/` | |
| `components/ConversationList.jsx` | `apps/collective/src/components/` | |
| `components/ConversationHeader.jsx` | `apps/collective/src/components/` | |
| `components/FileAttachment.jsx` | `apps/collective/src/components/` | |
| `components/AudioCallButton.jsx` | `apps/collective/src/components/` | Currently empty (0 bytes) — leave placeholder or drop, TBD in commit 4 |
| `components/ChatWidget.jsx` | `apps/collective/src/components/` | |
| `components/GeminiAssistantWidget.jsx` | `apps/collective/src/components/` | AI concierge for services |
| `pages/ChatPage.jsx` | `apps/collective/src/pages/ChatPage.jsx` | AI concierge is a service feature |
| — | `apps/collective/src/pages/WorkPage.jsx` | NEW: case studies grid per Appendix B |
| — | `apps/collective/src/pages/AboutPage.jsx` | NEW: solo-brand About (no team language) |
| — | `apps/collective/src/pages/PressPage.jsx` | NEW: brand kit / deck downloads |
| — | `apps/collective/vercel.json` | NEW: caching + optional 301 back-compat |

### → packages/ui (shared)

| Current path in `src/` | Destination |
|---|---|
| `components/Header.jsx` | `packages/ui/src/Header.jsx` (adapted per-site via props) |
| `components/Footer.jsx` | `packages/ui/src/Footer.jsx` (adapted per-site via props) |
| `components/Layout.jsx` | `packages/ui/src/Layout.jsx` |
| `components/LogoComponent.jsx` | `packages/ui/src/Logo.jsx` |
| `components/Hero.jsx` | `packages/ui/src/Hero.jsx` |
| `components/HeroImage.jsx` | `packages/ui/src/HeroImage.jsx` |
| `components/DualCTA.jsx` | `packages/ui/src/DualCTA.jsx` |
| `components/CallToAction.jsx` | `packages/ui/src/CallToAction.jsx` |
| `components/ScrollToTop.jsx` | `packages/ui/src/ScrollToTop.jsx` |
| `components/LinkCard.jsx` | `packages/ui/src/LinkCard.jsx` |
| `components/LanguageSelector.jsx` | `packages/ui/src/LanguageSelector.jsx` |
| `components/CurrencySelector.jsx` | `packages/ui/src/CurrencySelector.jsx` |
| `components/GoogleTranslateWidget.jsx` | `packages/ui/src/GoogleTranslateWidget.jsx` |
| `components/HypnoticBackground.jsx` | `packages/ui/src/backgrounds/Hypnotic.jsx` |
| `components/GradientBackground.jsx` | `packages/ui/src/backgrounds/Gradient.jsx` |
| `components/FloatingParticles.jsx` | `packages/ui/src/backgrounds/FloatingParticles.jsx` |
| `components/ui/*` (shadcn primitives) | `packages/ui/src/primitives/*` |
| — | `packages/ui/src/SiblingSiteLink.jsx` NEW — the cross-link, absolute URL, keyboard-accessible, same-tab, fires `cross_to_collective` / `cross_to_personal` |
| — | `packages/ui/src/HandoffBlock.jsx` NEW — "Work with me / Services" section on Site A |
| — | `packages/ui/src/seo/{PersonJsonLd,OrganizationJsonLd,MetaTags}.jsx` NEW |
| — | `packages/ui/src/analytics.js` NEW — thin wrapper over `@vercel/analytics` + typed event helpers |

### → packages/supabase (shared)

| Current path in `src/` | Destination |
|---|---|
| `contexts/*` | `packages/supabase/src/contexts/` |
| `hooks/useConversations.js` | `packages/supabase/src/hooks/useConversations.js` |
| `hooks/useConversation.js` | `packages/supabase/src/hooks/useConversation.js` |
| `hooks/useCart.jsx` | `packages/supabase/src/hooks/useCart.jsx` |
| `hooks/useGeminiAssistant.js` | `packages/supabase/src/hooks/useGeminiAssistant.js` |
| `hooks/use-mobile.jsx` | `packages/ui/src/hooks/use-mobile.jsx` (UI hook, not backend) |
| `hooks/use-toast.js` | `packages/ui/src/hooks/use-toast.js` (UI hook) |
| `config/aiConfig.js` | `packages/supabase/src/config/aiConfig.js` |
| `types/caseTypes.js` | `packages/supabase/src/types/caseTypes.js` |
| — | `packages/supabase/src/client.js` NEW — single shared Supabase client factory reading `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` from each app's env |

### → packages/content (shared)

| — | `packages/content/src/bio.js` — short + long bio, tagline |
| — | `packages/content/src/brand.js` — colors, socials |
| — | `packages/content/src/jsonld.js` — Person (Site A) + Organization (Site B) builders, both with `sameAs` cross-referencing each other's domain |

### Leaving in the current root (temporary — until Vite plugins are decided)

| Path | Action |
|---|---|
| `plugins/visual-editor/*`, `plugins/selection-mode/*`, `plugins/vite-plugin-iframe-route-restoration.js` | Kept at repo root; each app's `vite.config.js` will import them ONLY when `isDev`. Not shipped to prod builds. |
| `tools/generate-llms.js` | Kept at repo root; both apps' `build` scripts call it. |
| `DOCUMENTATION.md` | Kept at repo root as historical record. |
| `README.md` | Will be rewritten in the final commit to document the monorepo. |

---

## Cross-link contract

Every site renders `SiblingSiteLink` in both Header and Footer:

- On **Site A** (`movsummirzazada.com`): label `Mimo's Collective →`, href `https://mimoscollective.com`, event `cross_to_collective`.
- On **Site B** (`mimoscollective.com`): label `About Movsum →`, href `https://movsummirzazada.com`, event `cross_to_personal`.

Same tab, absolute URL, `rel="me"`, keyboard-accessible, respects `prefers-reduced-motion`.

## Redirect contract (in `apps/movsum/vercel.json`)

```
/collective                → https://mimoscollective.com    (301)
/services                  → https://mimoscollective.com    (301)
/mimo-collective           → https://mimoscollective.com    (301)
/mimo-collective/:path*    → https://mimoscollective.com/:path*  (301)
```

## SEO / no-duplicate-content contract

- Site A: `sitemap.xml` and `robots.txt` cover only personal routes.
- Site B: `sitemap.xml` and `robots.txt` cover only services routes.
- JSON-LD `Person` on Site A `sameAs` includes `https://mimoscollective.com`.
- JSON-LD `Organization` on Site B `sameAs` includes `https://movsummirzazada.com`.
- Contact/inquiry copy differs between sites (personal contact vs. project inquiry) — not duplicate.

## Env vars (Vercel per-project, not committed)

Both projects need the same values:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- Anything else already set on the current `My-Main-Website` Vercel project — verify at deploy step.

## Node

Both Vercel projects pinned to Node 20 (matches `.nvmrc`).

## Analytics

`@vercel/analytics` package added in both apps' `package.json` in a later commit. Events routed through `packages/ui/src/analytics.js`.

## Commit sequence on this branch

1. **(this commit)** Empty scaffold dirs + this MIGRATION.md — build stays green.
2. Root `package.json` gains `"workspaces": ["apps/*", "packages/*"]`.
3. `git mv` shared primitives → `packages/ui`.
4. `git mv` Supabase surface → `packages/supabase`.
5. Create `apps/movsum` app skeleton (Vite config, `package.json`, `index.html`, `main.jsx`, empty router).
6. Create `apps/collective` app skeleton likewise.
7. `git mv` personal pages/components → `apps/movsum`.
8. `git mv` services pages/components → `apps/collective`.
9. Add `SiblingSiteLink`, `HandoffBlock`, JSON-LD, analytics wrapper in `packages/ui`.
10. Add `apps/movsum/vercel.json` redirects; add `sitemap.xml`, `robots.txt`, OG image placeholders in both apps.
11. Wire analytics events at call sites.
12. Verify `npm run build` in both `apps/movsum` and `apps/collective` — report exit codes.
13. Rewrite root `README.md` documenting the monorepo + deploy targets. Print DNS record values.

Every commit is small, on `split/two-sites`, no force-push.
