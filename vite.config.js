import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        empresa: resolve(__dirname, 'empresa.html'),
        produtos: resolve(__dirname, 'produtos.html'),
        contato: resolve(__dirname, 'contato.html'),
        'bloco-estrutural-14-19-39': resolve(__dirname, 'bloco-estrutural-14-19-39.html'),
        'bloco-estrutural-19-19-39': resolve(__dirname, 'bloco-estrutural-19-19-39.html'),
        'tubo-pluvial': resolve(__dirname, 'tubo-pluvial.html')
      }
    }
  }
});
