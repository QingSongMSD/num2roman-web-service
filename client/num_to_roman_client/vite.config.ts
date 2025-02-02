/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { glob } from "glob";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // support `describe`, `test` etc. globally,
    // so you don't need to import them every time
    globals: true,
    // run tests in jsdom environment
    environment: "jsdom",
    // global test setup
    setupFiles: "./tests/setup.tsx",
    pool: "vmThreads",
    server: {
      deps: {
        inline: [/@react-spectrum\/.*/],
      },
    },
  },
  optimizeDeps: {
    include: glob.sync("@react-spectrum/*", { cwd: "node_modules/" }),
  },
});
