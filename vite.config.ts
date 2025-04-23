import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import { envOnlyMacros } from 'vite-env-only'
import tsconfigPaths from 'vite-tsconfig-paths'

declare module '@remix-run/node' {
	interface Future {
		v3_singleFetch: true
	}
}

export default defineConfig({
	plugins: [
		envOnlyMacros(),
		remix({
			future: {
				v3_fetcherPersist: true,
				v3_relativeSplatPath: true,
				v3_throwAbortReason: true,
				v3_singleFetch: true,
				v3_lazyRouteDiscovery: true
			}
			// routes(defineRoutes) {
			// 	return defineRoutes((route) => {
			// 		// route('auth', 'components/layouts/auth.tsx', () => {
			// 		// 	route('login', 'pages/auth/login/route.tsx')
			// 		// })
			// 		route('/auth/login', 'pages/auth/login/route.tsx')
			// 	})
			// }
		}),
		tsconfigPaths()
	],
	esbuild: {
		supported: {
			'top-level-await': true
		}
	},
	optimizeDeps: {
		esbuildOptions: {
			target: 'esnext'
		}
	}
})
