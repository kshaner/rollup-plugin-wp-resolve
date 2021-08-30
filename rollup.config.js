import pkg from './package.json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
	input: 'src/index.js',
	plugins: [
		nodeResolve(),
		commonjs(),
	],
	output: [
		{
			file: pkg.module,
			format: 'es'
		},
		{
			file: pkg.main,
			format: 'cjs',
			exports: 'default'
		}
	],
};
