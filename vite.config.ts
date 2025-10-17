import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
  resolve: {
    alias: {
      "@components": "/src/components",
      "@layouts": "/src/layouts",
      "@pages": "/src/pages",
      "@constants": "/src/constants",
      "@assets": "/src/assets",
      "@api": "/src/services/api",
      "@styles": "/src/styles",
      "@hooks": "/src/hooks",
      "@utils": "/src/utils",
      "@contexts": "/src/contexts",
    },
  },
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/api": {
        target: process.env.VITE_API_BASE_URL || "http://localhost:8080", // Backend URL
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
});
