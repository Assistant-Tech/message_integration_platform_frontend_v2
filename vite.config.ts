import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // Resolve the upstream API base URL and strip the /api/v1 suffix so the
  // dev proxy can forward the same path the browser requested.
  const apiBase = env.VITE_API_BASE_URL ?? "";
  const apiOrigin = apiBase.replace(/\/api\/v1\/?$/, "");

  return {
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
      allowedHosts: ["dev.chatblix.com"],
      // Proxy API calls in dev so the browser sees them as same-origin.
      // This is critical for HttpOnly + SameSite=Strict cookies (e.g.
      // `onboarding-token`, `refresh-token`, `sessionId`, `device-fingerprint`)
      // which the browser otherwise refuses to send cross-site.
      proxy: apiOrigin
        ? {
            "/api/v1": {
              target: apiOrigin,
              changeOrigin: true,
              secure: true,
              // Strip the cookie Domain attribute so the browser stores cookies
              // against the dev host (localhost / ngrok) instead of api.chatblix.com.
              cookieDomainRewrite: "",
              cookiePathRewrite: "/",
            },
          }
        : undefined,
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
        // `auth.store` and `auth.services` are dynamically imported from
        // `services/api/axios.ts` (and from each other) purely to break a
        // circular dependency — not for code-splitting. Since they're also
        // statically imported elsewhere in the app, Rollup warns that the
        // dynamic import won't move the module into a separate chunk. That's
        // expected; silence the specific warning so the build output stays
        // actionable.
        onwarn(warning, defaultHandler) {
          if (
            warning.code === "DYNAMIC_IMPORT_WILL_NOT_MOVE_MODULE" &&
            typeof warning.message === "string" &&
            (warning.message.includes("store/auth.store") ||
              warning.message.includes("services/auth.services"))
          ) {
            return;
          }
          defaultHandler(warning);
        },
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            ui: ["@radix-ui/themes", "framer-motion"],
            utils: ["axios", "react-hook-form", "zod"],
            // Isolate the ~8MB country/state/city dataset so it doesn't get
            // folded into the onboarding feature chunk. Only the onboarding
            // Step 2 page references it, and it's lazy-loaded on demand.
            "country-data": ["country-state-city"],
          },
        },
      },
      // The `country-data` chunk above legitimately ships ~8MB of reference
      // data (country/state/city JSON). Everything else should stay under 1MB,
      // so this limit only silences the warning for that one data chunk.
      chunkSizeWarningLimit: 9000,
    },
    optimizeDeps: {
      // Pre-bundle on dev server start so the first time a page imports these
      // packages Vite doesn't trigger a mid-session re-optimize, which causes
      // "Failed to fetch dynamically imported module" HMR errors for any route
      // the browser had already fetched (e.g. AdminLayout).
      include: ["react", "react-dom", "framer-motion", "react-joyride"],
    },
  };
});
