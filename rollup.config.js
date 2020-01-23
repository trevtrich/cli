/* eslint import/no-extraneous-dependencies: ['error', {'devDependencies': true}] */
import executable from 'rollup-plugin-executable';

export default {
  input: 'src/index.js',
  plugins: [executable()],
  output: [{file: 'bin/trev.js', format: 'cjs', sourcemap: true, banner: '#!/usr/bin/env node'}]
};
