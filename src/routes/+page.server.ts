import skillContent from '../../static/SKILL.md?raw';

export const load = async () => {
	return {
		skillContent,
		seo: {
			title: 'SEO & GEO Optimization for Svelte 5',
			description:
				'A universal library for SEO, Open Graph, and Schema.org optimization in SvelteKit projects.',
			url: '/',
			image: '/quartzo-ogimage.webp',
			imageAlt: 'Quartzo library banner',
			tags: ['Svelte', 'SEO', 'Schema.org', 'Open Graph'],
			breadcrumbs: [
				{ name: 'Home', url: '/' },
			],
			alternates: [
				{ hreflang: 'pt-BR', href: '/' },
			]
		}
	};
};
