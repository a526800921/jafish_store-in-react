import babel from 'rollup-plugin-babel'

export default {
	input: './src/index.ts',
	output: {
		format: 'umd',
		file: `./dist/index.js`,
		name: 'store-in-react',
	},
	plugins: [
		babel({
			externalHelpers: true,
			runtimeHelpers: true,
			exclude: ['node_modules/**'],
		}),
	],
}