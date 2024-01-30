import { promises as fsPromises } from 'fs';
import path from 'path';
import postcss from 'postcss';
import postcssModules from 'postcss-modules';
import postcssMantine from 'postcss-preset-mantine';
import postcssVars from 'postcss-simple-vars';
import { defineConfig } from 'tsup';

export default defineConfig({
  tsconfig: './tsconfig.build.json',
  entry: ['src/index.ts'],
  format: 'esm',
  dts: true,
  name: 'nextra-theme-infp',
  outExtension: () => ({ js: '.js' }),
  external: ['nextra', 'react', 'react-dom', '@mantine/core', '@mantine/hooks'],
  esbuildPlugins: [
    {
      name: 'css-module',
      setup(build): void {
        build.onResolve(
          { filter: /\.module\.css$/, namespace: 'file' },
          (args) => ({
            path: `${args.path}#css-module`,
            namespace: 'css-module',
            pluginData: {
              pathDir: path.join(args.resolveDir, args.path),
            },
          }),
        );
        build.onLoad(
          { filter: /#css-module$/, namespace: 'css-module' },
          async (args) => {
            const { pluginData } = args as {
              pluginData: { pathDir: string };
            };

            const source = await fsPromises.readFile(
              pluginData.pathDir,
              'utf8',
            );

            let cssModule = {};
            const result = await postcss([
              postcssMantine(),
              postcssVars({
                variables: {
                  'mantine-breakpoint-xs': '36em',
                  'mantine-breakpoint-sm': '48em',
                  'mantine-breakpoint-md': '62em',
                  'mantine-breakpoint-lg': '75em',
                  'mantine-breakpoint-xl': '88em',
                },
              }),
              postcssModules({
                getJSON(_, json) {
                  cssModule = json;
                },
              }),
            ]).process(source, { from: pluginData.pathDir });

            return {
              pluginData: { css: result.css },
              contents: `import "${
                pluginData.pathDir
              }"; export default ${JSON.stringify(cssModule)}`,
            };
          },
        );
        build.onResolve(
          { filter: /\.module\.css$/, namespace: 'css-module' },
          (args) => ({
            path: path.join(args.resolveDir, args.path, '#css-module-data'),
            namespace: 'css-module',
            pluginData: args.pluginData as { css: string },
          }),
        );
        build.onLoad(
          { filter: /#css-module-data$/, namespace: 'css-module' },
          (args) => ({
            contents: (args.pluginData as { css: string }).css,
            loader: 'css',
          }),
        );
      },
    },
  ],
});
