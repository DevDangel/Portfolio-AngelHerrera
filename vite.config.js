import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const rewriteCvMiddleware = () => ({
  name: 'rewrite-cv',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // Si la ruta es exactamente /cv/curriculum (sin barra al final)
      if (req.url === '/cv/curriculum' || req.url === '/cv/curriculum/') {
        req.url = '/cv/curriculum/index.html';
      }
      next();
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), rewriteCvMiddleware()],
  server: {
    allowedHosts: ['9528120e7a1f07.lhr.life']
  }
})
