import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { glob } from "glob";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: glob.sync("@react-spectrum/*", { cwd: "node_modules/" }),
  },
});
