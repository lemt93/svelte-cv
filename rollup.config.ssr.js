import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import sveltePreprocess from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'

const production = process.env.NODE_ENV === 'production' && !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default [
	{
		input: 'src/main.js',
		output: {
			sourcemap: !production,
			format: 'iife',
			name: 'app',
			file: 'ssg/public/app.js'
		},
		plugins: [
			svelte({
				compilerOptions: {
					// enable run-time checks when not in production
					dev: !production,
					css: false,
					hydratable: true
				},
				extensions: ['.svelte', '.svx'],
				preprocess: [
					sveltePreprocess({
						sourceMap: !production,
						defaults: {
							style: 'scss'
						},
						scss: {
							renderSync: true
						},
						postcss: true
					}),
					mdsvex()
				]
			}),
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css({ output: 'bundle.css' }),

			// If you have external dependencies installed from
			// npm, you'll most likely need these plugins. In
			// some cases you'll need additional configuration -
			// consult the documentation for details:
			// https://github.com/rollup/plugins/tree/master/packages/commonjs
			resolve({
				browser: true,
				dedupe: ['svelte']
			}),
			commonjs(),

			// In dev mode, call `npm run start` once
			// the bundle has been generated
			process.env.ROLLUP_WATCH && serve(),

			// Watch the `public` directory and refresh the
			// browser on changes when not in production
			process.env.ROLLUP_WATCH && livereload('ssg'),

			// If we're building for production (npm run build
			// instead of npm run dev), minify
			production && terser()
		],
		watch: {
			clearScreen: false
		}
	},
	{
		input: 'src/generate.js',
		output: {
			sourcemap: !production,
			format: 'cjs',
			name: 'static-generator',
			file: 'ssg/public/generate.js'
		},
		external: ['fs', 'path'],
		plugins: [
			svelte({
				compilerOptions: {
					// enable run-time checks when not in production
					dev: !production,
					generate: 'ssr',
					hydratable: true,
					css: false
				},
				extensions: ['.svelte', '.svx'],
				preprocess: [
					sveltePreprocess({
						sourceMap: !production,
						defaults: {
							style: 'scss'
						},
						scss: {
							renderSync: true
						},
						postcss: true
					}),
					mdsvex()
				]
			}),
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css({ output: false }),

			// If you have external dependencies installed from
			// npm, you'll most likely need these plugins. In
			// some cases you'll need additional configuration -
			// consult the documentation for details:
			// https://github.com/rollup/plugins/tree/master/packages/commonjs
			resolve({
				dedupe: ['svelte']
			}),
			commonjs(),
		],
		watch: {
			clearScreen: false
		}
	}
]
