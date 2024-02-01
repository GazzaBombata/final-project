export default {
  build: {
    outDir: 'client/dist',
    publicDir: 'public',
    rollupOptions: {
      input: 'client/app.jsx', 
    },
  },
  server: {
    proxy: {
      '/v1': 'http://localhost:8080',
    },
  },
}