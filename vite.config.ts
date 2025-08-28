import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/app/components"),
      "@/hooks": path.resolve(__dirname, "./src/app/hooks"),
      "@/lib": path.resolve(__dirname, "./src/app/lib"),
      "@/services": path.resolve(__dirname, "./src/app/services"),
      "@/store": path.resolve(__dirname, "./src/app/store"),
      "@/types": path.resolve(__dirname, "./src/app/types"),
      "@/utils": path.resolve(__dirname, "./src/app/utils"),
      "@/assets": path.resolve(__dirname, "./src/app/assets"),
      "@/pages": path.resolve(__dirname, "./src/app/pages"),
      "@/features": path.resolve(__dirname, "./src/app/features"),
      "@/router": path.resolve(__dirname, "./src/app/router"),
      "@/styles": path.resolve(__dirname, "./src/app/styles"),
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false, // Disable sourcemaps for production
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["@radix-ui/themes", "framer-motion"],
          utils: ["axios", "react-hook-form", "zod"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion"],
  },
});
