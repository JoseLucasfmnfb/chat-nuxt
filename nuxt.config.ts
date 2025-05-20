// https://nuxt.com/docs/api/configuration/nuxt-config
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
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "@/assets/styles/_colors" as *; @use "@/assets/styles/_grid" as *;`,
				},
			},
		},
	},

	modules: [
		'@nuxt/content',
		'@nuxt/eslint',
		'@nuxt/fonts',
		'@nuxt/icon',
		'@nuxt/image',
		'@nuxt/scripts',
		//'@nuxt/test-utils',
		'@nuxt/ui'
	]
})