import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// NOTE: Dev-only Hostinger Horizons visual-editor plugins (visual-editor,
// selection-mode, iframe-route-restoration) intentionally NOT imported here.
// They are dev tooling for the legacy root Vite config only; not shipped
// to the production movsum deployment.
const isDev = process.env.NODE_ENV !== "production";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: { port: 3001 },
});
