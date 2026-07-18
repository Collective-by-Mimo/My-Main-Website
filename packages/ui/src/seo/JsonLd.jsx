import React from "react";

// Small wrapper to inject JSON-LD structured data into any page's <head>.
// Use with react-helmet-async in the consuming app if you prefer;
// this component is head-agnostic and safe to render inline.
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
