import { describe, expect, it } from 'vitest';
import { render } from 'svelte/server';
import SeoGeoOptimizer from './seo-geo-optimizer.svelte';

type Props = Parameters<typeof SeoGeoOptimizer>[1];
type Node = Record<string, unknown>;

const LD_JSON_SCRIPT = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;

function renderHead(props: Props) {
	return render(SeoGeoOptimizer, { props }).head;
}

/** Raw text between the JSON-LD script tags, exactly as a crawler would read it. */
function jsonLdBodies(head: string) {
	return [...head.matchAll(LD_JSON_SCRIPT)].map((match) => match[1]);
}

/** The JSON-LD payload as an array of nodes. */
function jsonLdNodes(props: Props): Node[] {
	const bodies = jsonLdBodies(renderHead(props));
	expect(bodies).toHaveLength(1);
	const parsed = JSON.parse(bodies[0]) as Node | Node[];
	return Array.isArray(parsed) ? parsed : [parsed];
}

const base = {
	description: 'Description',
	url: '/page',
	siteUrl: 'https://example.com'
} satisfies Partial<Props>;

describe('JSON-LD escaping', () => {
	const tricky =
		'UX Design & E-commerce <b>"quoted"</b> \'single\' </script><script>alert(1)</script>';

	it.each([
		['website', 'name'],
		['article', 'headline'],
		['creative_work', 'name']
	] as const)('round-trips a %s title through JSON.parse', (type, key) => {
		const [node] = jsonLdNodes({ ...base, type, title: tricky, description: tricky });
		expect(node[key]).toBe(tricky);
		expect(node.description).toBe(tricky);
	});

	it('round-trips profile and breadcrumb values', () => {
		const nodes = jsonLdNodes({
			...base,
			type: 'profile',
			title: tricky,
			author: tricky,
			breadcrumbs: [{ name: tricky, url: '/a&b' }]
		});
		expect((nodes[0].mainEntity as Node).name).toBe(tricky);
		const [crumb] = nodes[1].itemListElement as Node[];
		expect(crumb.name).toBe(tricky);
		expect(crumb.item).toBe('https://example.com/a&b');
	});

	it('does not HTML-encode the script body', () => {
		const [body] = jsonLdBodies(renderHead({ ...base, title: 'Tom & Jerry "Show"' }));
		expect(body).not.toContain('&amp;');
		expect(body).not.toContain('&quot;');
		expect(body).toContain('Tom & Jerry \\"Show\\"');
	});

	it('cannot be broken out of with a closing script tag', () => {
		const head = renderHead({ ...base, title: '</script><script>alert(1)</script><!--' });
		const [body] = jsonLdBodies(head);
		expect(body).not.toContain('<');
		expect(body).toContain('\\u003c/script>');
		expect(head.match(/<script/g)).toHaveLength(1);
	});

	it('still HTML-escapes the <title> and meta tags', () => {
		const head = renderHead({ ...base, title: 'A & B <c>' });
		expect(head).toContain('<title>A &amp; B &lt;c></title>');
		expect(head).toContain('<meta property="og:title" content="A &amp; B &lt;c>"');
	});
});

describe('headline', () => {
	const title = 'My Post | My Blog';

	it.each([
		['website', 'name'],
		['article', 'headline'],
		['creative_work', 'name']
	] as const)('falls back to title for %s', (type, key) => {
		const [node] = jsonLdNodes({ ...base, type, title });
		expect(node[key]).toBe(title);
	});

	it.each([
		['website', 'name'],
		['article', 'headline'],
		['creative_work', 'name']
	] as const)('overrides the %s schema name without touching <title>', (type, key) => {
		const props = { ...base, type, title, headline: 'My Post' };
		const [node] = jsonLdNodes(props);
		expect(node[key]).toBe('My Post');
		const head = renderHead(props);
		expect(head).toContain('<title>My Post | My Blog</title>');
		expect(head).toContain('<meta property="og:title" content="My Post | My Blog"');
	});
});

describe('personSchema', () => {
	const personSchema = {
		'@id': 'https://example.com/#person',
		sameAs: ['https://github.com/jane', 'https://www.linkedin.com/in/jane'],
		worksFor: { '@type': 'Organization', name: 'Acme & Co' },
		alumniOf: [{ '@type': 'CollegeOrUniversity', name: 'State University' }]
	};

	it('merges into the profile Person', () => {
		const [page] = jsonLdNodes({
			...base,
			type: 'profile',
			title: 'About Jane',
			profileFirstName: 'Jane',
			profileLastName: 'Doe',
			profileJobTitle: 'Developer',
			personSchema
		});
		expect(page.mainEntity).toEqual({
			'@type': 'Person',
			name: 'Jane Doe',
			url: 'https://example.com',
			jobTitle: 'Developer',
			description: 'Description',
			...personSchema
		});
	});

	it('wins over generated properties', () => {
		const [page] = jsonLdNodes({
			...base,
			type: 'profile',
			title: 'About',
			author: 'Generated',
			personSchema: { name: 'Override', url: undefined }
		});
		const person = page.mainEntity as Node;
		expect(person.name).toBe('Override');
		expect(person).not.toHaveProperty('url');
	});

	it('merges into the article author and creative work creator', () => {
		const ref = { '@id': 'https://example.com/#person' };
		const [post] = jsonLdNodes({
			...base,
			type: 'article',
			title: 'T',
			author: 'Jane',
			personSchema: ref
		});
		expect(post.author).toEqual({
			'@type': 'Person',
			name: 'Jane',
			url: 'https://example.com',
			...ref
		});

		const [work] = jsonLdNodes({ ...base, type: 'creative_work', title: 'T', personSchema: ref });
		expect(work.creator).toEqual({ '@type': 'Person', url: 'https://example.com', ...ref });
	});

	it('leaves the author out when neither author nor personSchema is set', () => {
		const [post] = jsonLdNodes({ ...base, type: 'article', title: 'T' });
		expect(post).not.toHaveProperty('author');
	});
});

describe('jsonLd', () => {
	const website = {
		'@type': 'WebSite',
		'@id': 'https://example.com/#website',
		name: 'Example & Co',
		url: 'https://example.com'
	};

	it('appends a single node and adds @context', () => {
		const nodes = jsonLdNodes({ ...base, title: 'Home', jsonLd: website });
		expect(nodes).toHaveLength(2);
		expect(nodes[0]['@type']).toBe('WebPage');
		expect(nodes[1]).toEqual({ '@context': 'https://schema.org', ...website });
	});

	it('appends several nodes after breadcrumbs and keeps a custom @context', () => {
		const faq = { '@context': 'https://schema.org/', '@type': 'FAQPage', mainEntity: [] };
		const nodes = jsonLdNodes({
			...base,
			title: 'Home',
			breadcrumbs: [{ name: 'Home', url: '/' }],
			jsonLd: [website, faq]
		});
		expect(nodes.map((node) => node['@type'])).toEqual([
			'WebPage',
			'BreadcrumbList',
			'WebSite',
			'FAQPage'
		]);
		expect(nodes[3]['@context']).toBe('https://schema.org/');
	});

	it('keeps a single object when nothing is appended', () => {
		const [body] = jsonLdBodies(renderHead({ ...base, title: 'Home', jsonLd: [] }));
		expect(JSON.parse(body)).toMatchObject({ '@type': 'WebPage' });
	});
});
