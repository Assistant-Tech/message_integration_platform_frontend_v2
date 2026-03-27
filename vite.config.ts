import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({ svgrOptions: { icon: true } }),
    process.env.ANALYZE === "true" &&
      visualizer({
        filename: "stats.html",
        template: "treemap",
        gzipSize: true,
        brotliSize: true,
        open: true,
      }),
  ].filter(Boolean),
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
    allowedHosts: ["rachele-paleaceous-ethyl.ngrok-free.dev"],
  },
  build: {
    outDir: "dist",
    sourcemap: false,
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
