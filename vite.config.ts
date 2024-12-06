import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

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
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // Backend URL
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
})
