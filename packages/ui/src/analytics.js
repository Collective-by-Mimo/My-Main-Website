// Thin wrapper over @vercel/analytics so consumers don't import it directly.
// If Vercel Analytics is not installed / initialised, `track` is a no-op.
//
// Event names used across the two sites (kept as a single source of truth):
//   Site A (personal):
//     - cv_download
//     - media_kit_download
//     - book_call_click
//     - contact_submit
//     - social_click
//     - cross_to_collective
//   Site B (collective):
//     - book_call_click
//     - inquiry_submit
//     - deck_download
//     - brand_kit_download
//     - case_study_view
//     - social_click
//     - newsletter_signup
//     - cross_to_personal

let vercelTrack = null;
try {
  // Lazy: only load if the package resolves. Both apps depend on it,
  // but this file compiles even when it's absent during scaffolding.
  // eslint-disable-next-line import/no-unresolved
  const mod = await import("@vercel/analytics");
  vercelTrack = mod.track;
} catch {
  vercelTrack = null;
}

export function track(eventName, props) {
  if (typeof window === "undefined") return;
  if (vercelTrack) {
    try { vercelTrack(eventName, props); } catch { /* swallow */ }
  }
  // Safe fallback for local dev.
  if (import.meta?.env?.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", eventName, props ?? {});
  }
}
