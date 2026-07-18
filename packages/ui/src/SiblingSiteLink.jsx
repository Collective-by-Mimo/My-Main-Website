import React from "react";
import { track } from "./analytics.js";

// Persistent cross-link shown in the Header and Footer of BOTH sites.
// Same tab, absolute URL, keyboard-accessible, respects prefers-reduced-motion.
//
// Usage:
//   <SiblingSiteLink from="personal" />   → renders "Mimo's Collective →"
//   <SiblingSiteLink from="collective" /> → renders "About Movsum →"
export function SiblingSiteLink({ from, className = "" }) {
  const config = from === "personal"
    ? {
        href: "https://mimoscollective.com",
        label: "Mimo's Collective →",
        event: "cross_to_collective",
        aria: "Go to Mimo's Collective — my work and services",
      }
    : {
        href: "https://movsummirzazada.com",
        label: "About Movsum →",
        event: "cross_to_personal",
        aria: "Go to the personal site of Movsum Mirzazada — the person behind Mimo's Collective",
      };

  return (
    <a
      href={config.href}
      rel="me noopener"
      onClick={() => track(config.event)}
      aria-label={config.aria}
      className={
        "inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
        className
      }
    >
      {config.label}
    </a>
  );
}
