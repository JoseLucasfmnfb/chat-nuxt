// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader'
export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	devtools: { enabled: true },
	css: ['@/assets/styles/main.scss'],
	app: {
		head: {
		  link: [
			{
			  rel: 'stylesheet',
			  href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap'
			}
		  ]
		}
	}, 
	vite: {
		plugins: [svgLoader()],
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "@/assets/styles/_colors" as *; @use "@/assets/styles/_grid" as *;`,
				},
			},
		},
		server: {
			allowedHosts: true,
		}
	},
	runtimeConfig: {
		public: {
			CLIENT_ID: process.env.CLIENT_ID,
			CLIENT_SECRET: process.env.CLIENT_SECRET,
			REDIRECT_URI: process.env.REDIRECT_URI,
			TOKEN_ENDPOINT: process.env.TOKEN_ENDPOINT,
			AUTH_URL: process.env.AUTH_URL,
			BASE_API_URL: process.env.BASE_API_URL,
			ACCESS_TOKEN: process.env.ACCESS_TOKEN,
		}
	},
	nitro: {
		devProxy: {
			'/api/': {
				target: process.env.BASE_API_URL, // substitua com sua URL real
				changeOrigin: true,
				prependPath: true
			}
		}
	},
	modules: [
		'@nuxt/content',
		'@nuxt/eslint',
		'@nuxt/fonts',
		'@nuxt/icon',
		'@nuxt/image',
		'@nuxt/scripts',
		//'@nuxt/test-utils',
		'@nuxt/ui',
		'@pinia/nuxt'
	]
})