import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  //For github pages:
  //base: '/sabor-express-frontend-react/',
  plugins: [react()],
})
