import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: "",
  plugins: [react(), tailwindcss()],
  server: {
    fs: {
      // Vite cannot execute PHP: keep backend source private during local previews.
      deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/*.php'],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  // ✅ ВАЖНО: чтобы hover/focus/media и т.п. гарантированно работали
  // даже если браузер не понимает CSS nesting
  css: {
    transformer: "lightningcss",
  },

  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      // Единый многостраничный сайт с отдельным HTML для каждого адреса.
      // dostavka/index.html → dist/dostavka/index.html (URL https://baroripark.ru/dostavka/)
      input: {
        // ключ "index" — чтобы главный бандл остался index-*.js, как до многостраничности
        index: path.resolve(__dirname, "index.html"),
        dostavka: path.resolve(__dirname, "dostavka/index.html"),
        eda: path.resolve(__dirname, "eda/index.html"),
        taxi: path.resolve(__dirname, "taxi/index.html"),
        smena: path.resolve(__dirname, "smena/index.html"),
        tariffs: path.resolve(__dirname, "tariffs/index.html"),
        info: path.resolve(__dirname, "info/index.html"),
      },
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-swiper': ['swiper'],
        },
      },
    },
  },
});
