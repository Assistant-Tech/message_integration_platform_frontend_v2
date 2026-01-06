import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({ svgrOptions: { icon: true } }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup/vitest.setup.ts"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "tests/",
        "*.config.*",
        "dist/",
        "**/*.d.ts",
        "**/*.spec.*",
        "**/*.test.*",
      ],
    },
  },
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
});


