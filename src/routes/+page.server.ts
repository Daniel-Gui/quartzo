export const load = async () => {
	return {
		seo: {
			title: 'Otimização SEO e GEO com Svelte 5',
			description:
				'Biblioteca universal para otimização de SEO, Open Graph e Schema.org em projetos SvelteKit.',
			url: '/',
			image: '/quartzo-ogimage.webp',
			imageAlt: 'Banner da biblioteca Quartzo',
			publishedDate: new Date().toISOString(),
			tags: ['Svelte', 'SEO', 'Schema.org', 'Open Graph'],
			breadcrumbs: [
				{ name: 'Início', url: '/' },
				{ name: 'SEO Lib', url: '/seo-lib' }
			],
			alternates: [
				{ hreflang: 'pt-BR', href: '/' },
				{ hreflang: 'en-US', href: '/en' }
			]
		}
	};
};
