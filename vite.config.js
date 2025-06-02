import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // ✅ חשוב כדי שקבצי ה-assets יעבדו בפרודקשן (Firebase Hosting)
  build: {
    outDir: 'dist', // ✅ ודא שהתיקייה הנבנית היא dist
  },
  plugins: [react()],
})
