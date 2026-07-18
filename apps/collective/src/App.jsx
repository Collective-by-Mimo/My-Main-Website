import React from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SiblingSiteLink, JsonLd } from "@mimo/ui";
import { organizationJsonLd } from "@mimo/content";

function Header() {
  return (
    <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
      <a href="/" className="font-semibold">Mimo's Collective</a>
      <nav className="flex items-center gap-6 text-sm">
        <a href="/services">Services</a>
        <a href="/work">Work</a>
        <a href="/about">About</a>
        <a href="/press">Press</a>
        <a href="/contact">Contact</a>
        <SiblingSiteLink from="collective" />
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mx-auto mt-24 max-w-5xl border-t px-6 py-10 text-sm opacity-80">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span>© {new Date().getFullYear()} Mimo's Collective · Dubai, UAE</span>
        <SiblingSiteLink from="collective" />
      </div>
    </footer>
  );
}

// Placeholder — real service/work/etc pages migrated in a follow-up commit.
// NOTE: no "we are a team" / "our staff" / "founders" language anywhere on this site.
function Placeholder({ title }) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p className="mt-4 opacity-80">
        Content will be populated from the existing root <code>src/pages/</code> in the
        next commit on this branch. See <code>MIGRATION.md</code>.
      </p>
    </main>
  );
}

export function App() {
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://mimoscollective.com/" />
      </Helmet>
      <JsonLd data={organizationJsonLd()} />
      <Header />
      <Routes>
        <Route path="/" element={<Placeholder title="Mimo's Collective" />} />
        <Route path="/services" element={<Placeholder title="Services" />} />
        <Route path="/services/:slug" element={<Placeholder title="Service" />} />
        <Route path="/work" element={<Placeholder title="Selected Work" />} />
        <Route path="/about" element={<Placeholder title="About" />} />
        <Route path="/press" element={<Placeholder title="Press & Brand Kit" />} />
        <Route path="/contact" element={<Placeholder title="Start a project" />} />
      </Routes>
      <Footer />
    </>
  );
}
