import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
	resolve: {
    alias: {
      '@': '/src',
			'@components': '/src/components',
			'@layouts': '/src/layouts',
			'@pages': '/src/pages',
			'@constants': '/src/constants',
    },
  },
})
