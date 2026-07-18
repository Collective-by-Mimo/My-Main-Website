import React from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SiblingSiteLink, HandoffBlock, JsonLd } from "@mimo/ui";
import { personJsonLd } from "@mimo/content";

function Header() {
  return (
    <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
      <a href="/" className="font-semibold">Movsum Mirzazada</a>
      <nav className="flex items-center gap-6 text-sm">
        <a href="/about">About</a>
        <a href="/media">Media</a>
        <a href="/resume">CV</a>
        <a href="/media-kit">Media Kit</a>
        <a href="/contact">Contact</a>
        <SiblingSiteLink from="personal" />
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mx-auto mt-24 max-w-5xl border-t px-6 py-10 text-sm opacity-80">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span>© {new Date().getFullYear()} Movsum Mirzazada · Dubai, UAE</span>
        <SiblingSiteLink from="personal" />
      </div>
    </footer>
  );
}

// Placeholder pages — real content is migrated in a follow-up commit
// (see MIGRATION.md commit 8). Root src/ still contains the working versions.
function Placeholder({ title }) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p className="mt-4 opacity-80">
        This page will be populated from the existing root <code>src/pages/</code> in the
        next commit on this branch. See <code>MIGRATION.md</code>.
      </p>
    </main>
  );
}

function HomeWithHandoff() {
  return (
    <>
      <Placeholder title="Movsum Mirzazada" />
      <HandoffBlock />
    </>
  );
}

export function App() {
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://movsummirzazada.com/" />
      </Helmet>
      <JsonLd data={personJsonLd()} />
      <Header />
      <Routes>
        <Route path="/" element={<HomeWithHandoff />} />
        <Route path="/about" element={<Placeholder title="About" />} />
        <Route path="/media" element={<Placeholder title="Media" />} />
        <Route path="/resume" element={<Placeholder title="CV / Resume" />} />
        <Route path="/media-kit" element={<Placeholder title="Media Kit" />} />
        <Route path="/contact" element={<Placeholder title="Contact" />} />
      </Routes>
      <Footer />
    </>
  );
}
