import react from '@vitejs/plugin-react-swc';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  esbuild: {
    jsx: 'transform',
  },
  build: {
    target: 'es2015',
    lib: {
      name: 'INFP',
      entry: './src/index.ts',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'nextra'],
      output: {
        globals: { react: 'React' },
      },
    },
  },
  plugins: [
    react(),
    dts({
      staticImport: true,
      insertTypesEntry: true,
      copyDtsFiles: false,
      outDir: 'lib',
    }),
    splitVendorChunkPlugin(),
  ],
});
