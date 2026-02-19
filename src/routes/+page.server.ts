export const load = async () => {
	return {
		seo: {
			title: 'Otimização SEO e GEO com Svelte 5',
			description:
				'Biblioteca universal para otimização de SEO, Open Graph e Schema.org em projetos SvelteKit.',
			url: '/',
			image: '/images/seo-banner.jpg',
			imageAlt: 'Banner com o logo do Svelte e ícones de SEO',
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
