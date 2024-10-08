import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{ // to remove cors error  
    proxy:{
      '/api' : 'http://localhost:3000'
    }
  },
  plugins: [react()],
})
