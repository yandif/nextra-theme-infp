import path from 'node:path';

import { defineConfig, splitVendorChunkPlugin } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  esbuild: {
    jsx: 'transform',
  },
  build: {
    target: 'es2015',
    lib: {
      name: 'INFP',
      entry: './theme/index.ts',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['path', 'fs', 'stream', 'zlib', 'react', 'nextra', 'util'],
      output: {
        globals: {
          react: 'React',
          path: 'path',
          fs: 'fs',
          stream: 'stream',
          zlib: 'zlib',
          util: 'util',
        },
      },
    },
  },
  plugins: [
    dts({
      staticImport: true,
      insertTypesEntry: true,
      copyDtsFiles: false,
      outDir: 'lib',
    }),
    splitVendorChunkPlugin(),
  ],
});