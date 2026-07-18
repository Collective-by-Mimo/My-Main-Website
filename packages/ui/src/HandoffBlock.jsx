import React from "react";
import { SiblingSiteLink } from "./SiblingSiteLink.jsx";

// The "Work with me / Services" section shown near the bottom of Site A's HomePage.
// This is the visitor's path from personal → services. Makes it clear
// it's the same person, two purposes.
export function HandoffBlock() {
  return (
    <section
      aria-labelledby="handoff-heading"
      className="mx-auto max-w-3xl px-6 py-16 text-center"
    >
      <p className="text-sm uppercase tracking-widest opacity-70">
        Work with me
      </p>
      <h2 id="handoff-heading" className="mt-3 text-3xl font-semibold sm:text-4xl">
        For services and client work — visit Mimo's Collective
      </h2>
      <p className="mt-4 text-base opacity-80 sm:text-lg">
        Mimo's Collective is where the work-for-clients lives. Same person, focused there
        on services, case studies, and inquiries. This site is the personal one.
      </p>
      <div className="mt-8">
        <SiblingSiteLink
          from="personal"
          className="rounded-lg border px-5 py-3 text-base"
        />
      </div>
    </section>
  );
}
