---
name: quartzo-seo
description: SEO and GEO optimization for SvelteKit projects using Quartzo. Use when setting up or improving meta tags, Open Graph, Twitter Cards, Schema.org JSON-LD, canonical URLs, hreflang, or structured data in any Svelte 5 / SvelteKit application. Triggers on: SEO setup, meta tags, social sharing previews, Schema.org, JSON-LD, Open Graph, Twitter Cards, canonical URLs, hreflang, noindex, sitemap, structured data, GEO optimization, search engine optimization in SvelteKit.
---

# Quartzo SEO & GEO Optimizer

Quartzo provides a single `<SeoGeoOptimizer>` Svelte 5 component that generates all SEO meta tags, Open Graph, Twitter Cards, and Schema.org JSON-LD. It uses `<svelte:head>` internally — no `{@html}` injection.

## Installation

```bash
npm install quartzo
```

> Requires `svelte ^5.0.0` as peer dependency.

## Core Pattern

Always load SEO data server-side via `+page.server.ts`, then pass to the component in `+page.svelte`. This ensures crawlers and AI bots receive fully rendered metadata.

### 1. Server load function (`+page.server.ts`)

```typescript
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {
    seo: {
      title: 'Page Title',
      description: 'Concise description under 160 characters.',
      url: '/page-path',
      image: '/images/og-cover.jpg',
      imageAlt: 'Descriptive alt text for the social image'
    }
  };
};
```

### 2. Page component (`+page.svelte`)

```svelte
<script lang="ts">
	import { SeoGeoOptimizer } from 'quartzo';

	let { data } = $props();
</script>

<SeoGeoOptimizer
	title={data.seo.title}
	description={data.seo.description}
	url={data.seo.url}
	siteUrl="https://example.com"
	siteName="My Site"
	image={data.seo.image}
	imageAlt={data.seo.imageAlt}
/>
```

## Props Reference

| Prop               | Type                                                     | Default          | Required |
| ------------------ | -------------------------------------------------------- | ---------------- | -------- |
| `title`            | `string`                                                 | —                | ✅       |
| `description`      | `string`                                                 | —                | ✅       |
| `url`              | `string`                                                 | —                | ✅       |
| `siteUrl`          | `string`                                                 | —                | No       |
| `siteName`         | `string`                                                 | —                | No       |
| `image`            | `string`                                                 | —                | No       |
| `imageAlt`         | `string`                                                 | —                | No       |
| `type`             | `'website' \| 'article' \| 'profile' \| 'creative_work'` | `'website'`      | No       |
| `author`           | `string`                                                 | —                | No       |
| `authorUrl`        | `string`                                                 | `siteUrl`        | No       |
| `language`         | `string`                                                 | `'en-US'`        | No       |
| `locale`           | `string`                                                 | `'en_US'`        | No       |
| `twitterCard`      | `'summary' \| 'summary_large_image'`                     | Auto             | No       |
| `twitterSite`      | `string`                                                 | —                | No       |
| `twitterCreator`   | `string`                                                 | —                | No       |
| `robots`           | `string`                                                 | —                | No       |
| `googlebot`        | `string`                                                 | —                | No       |
| `noindex`          | `boolean`                                                | `false`          | No       |
| `alternates`       | `Array<{ hreflang: string; href: string }>`              | `[]`             | No       |
| `breadcrumbs`      | `Array<{ name: string; url: string }>`                   | `[]`             | No       |
| `publisherType`    | `'Person' \| 'Organization'`                             | `'Organization'` | No       |
| `publishedDate`    | `string` (ISO 8601)                                      | —                | No       |
| `tags`             | `string[]`                                               | `[]`             | No       |
| `section`          | `string`                                                 | —                | No       |
| `year`             | `string`                                                 | —                | No       |
| `profileFirstName` | `string`                                                 | —                | No       |
| `profileLastName`  | `string`                                                 | —                | No       |
| `profileJobTitle`  | `string`                                                 | —                | No       |

## Page Type Patterns

### Website (homepage, landing pages)

```svelte
<SeoGeoOptimizer
	title="My Website"
	description="What this site is about."
	url="/"
	siteUrl="https://example.com"
	siteName="My Website"
	image="/og-home.jpg"
	imageAlt="Site banner"
	type="website"
	language="en-US"
	locale="en_US"
/>
```

### Article (blog posts, news)

```svelte
<SeoGeoOptimizer
	title={post.title}
	description={post.excerpt}
	url={`/blog/${post.slug}`}
	siteUrl="https://example.com"
	siteName="My Blog"
	image={post.coverImage}
	imageAlt={post.coverAlt}
	type="article"
	author={post.author}
	publishedDate={post.publishedAt}
	tags={post.tags}
	section={post.category}
	breadcrumbs={[
		{ name: 'Blog', url: '/blog' },
		{ name: post.title, url: `/blog/${post.slug}` }
	]}
	twitterCreator="@handle"
/>
```

### Profile (about pages, team members)

```svelte
<SeoGeoOptimizer
	title="About Jane Doe"
	description="Full-stack developer specializing in SvelteKit."
	url="/about"
	siteUrl="https://example.com"
	type="profile"
	image="/team/jane.jpg"
	imageAlt="Photo of Jane Doe"
	profileFirstName="Jane"
	profileLastName="Doe"
	profileJobTitle="Full-stack Developer"
	tags={['Svelte', 'TypeScript', 'Node.js']}
/>
```

### Creative Work (portfolios, projects)

```svelte
<SeoGeoOptimizer
	title={project.name}
	description={project.description}
	url={`/portfolio/${project.slug}`}
	siteUrl="https://example.com"
	type="creative_work"
	author="Jane Doe"
	year="2024"
	tags={project.technologies}
	image={project.thumbnail}
	imageAlt={project.thumbnailAlt}
/>
```

## Multilingual / Hreflang

For multilingual sites, pass `alternates` with all language versions including the current one:

```svelte
<SeoGeoOptimizer
	title="Mon Article"
	description="Description en français."
	url="/fr/blog/mon-article"
	siteUrl="https://example.com"
	language="fr-FR"
	locale="fr_FR"
	alternates={[
		{ hreflang: 'fr-FR', href: '/fr/blog/mon-article' },
		{ hreflang: 'en-US', href: '/en/blog/my-article' },
		{ hreflang: 'x-default', href: '/en/blog/my-article' }
	]}
	{...rest}
/>
```

## SEO Best Practices

1. **Always SSR** — Use `+page.server.ts` for SEO data. Client-only rendering prevents crawlers from indexing metadata.
2. **Unique per page** — Every page must have a distinct `title` and `description`. Never reuse across routes.
3. **`siteUrl` on all pages** — Set once (env var or config) to resolve relative URLs to absolute for OG/Twitter.
4. **Images as absolute URLs** — Pass absolute URLs for `image`, or set `siteUrl` to auto-resolve relative paths.
5. **`noindex` for thin pages** — Use `noindex={true}` on search results, filtered views, or paginated pages after page 1.
6. **Breadcrumbs for hierarchy** — Generate structured breadcrumbs for nested content (blog categories, docs).
7. **Canonical URL accuracy** — The `url` prop becomes the canonical tag. Ensure it matches the true page URL (no query params, no trailing slash inconsistencies).

## Implementation Checklist

After implementing, verify:

- [ ] `title` is unique, under 60 characters, and describes the page content
- [ ] `description` is unique, under 160 characters, and compelling
- [ ] `url` matches the actual route path
- [ ] `siteUrl` is set to the production domain (e.g., `https://example.com`)
- [ ] `image` is provided (minimum 1200×630px for optimal social sharing)
- [ ] `type` matches the content: `website`, `article`, `profile`, or `creative_work`
- [ ] `language` and `locale` match the page language
- [ ] `noindex` is `false` on indexable pages, `true` on thin/utility pages
- [ ] Component is placed at the top level of the page component (not inside conditionals)
- [ ] SEO data is loaded in `+page.server.ts`, not client-side
