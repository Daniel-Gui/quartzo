# Quartzo: SEO & GEO Optimizer for Svelte 5

<div align="center">
  <a href="#english">🇺🇸 English</a> | <a href="#portuguese">🇧🇷 Português</a>
</div>

---

<a id="english"></a>

## 🇺🇸 English

A universal and modern library for SEO and GEO optimization in Svelte 5 and SvelteKit projects.
Simplifies the management of Meta Tags, Open Graph, Twitter Cards, and Schema.org JSON-LD with native Runes support.

### Features

- 🚀 **Svelte 5 Ready**: Built with Runes (`$props`, `$derived`).
- 🔍 **Complete SEO**: Essential meta tags, Canonical URLs.
- 📱 **Social Media**: Open Graph (Facebook/LinkedIn) and Twitter Cards.
- 🤖 **Schema.org**: Automatic JSON-LD for `WebPage`, `Article`, `ProfilePage`, and `CreativeWork`.
- 🌍 **GEO Location**: Support for locale and basic internationalization.
- ⚡ **SSR Friendly**: Optimized for server-side rendering (SvelteKit).
- 🛡️ **Safe JSON-LD**: No use of `{@html}` and `<` escaping in payload.

### Installation

```bash
npm install quartzo
```

### Basic Usage

We recommend using the component in your pages (`+page.svelte`) receiving data from a `load` function (`+page.server.ts`), following SvelteKit SEO best practices.

#### 1. Load data on the server (`+page.server.ts`)

```typescript
export const load = async () => {
	return {
		seo: {
			title: 'My Awesome Article',
			description: 'A complete guide on Svelte 5 and SEO.',
			url: '/blog/my-article',
			image: '/images/cover.jpg',
			imageAlt: 'Article cover with Svelte logo',
			publishedDate: '2023-10-27T10:00:00Z',
			tags: ['Svelte', 'SEO', 'Web Development'],
			breadcrumbs: [
				{ name: 'Blog', url: '/blog' },
				{ name: 'My Awesome Article', url: '/blog/my-article' }
			],
			alternates: [
				{ hreflang: 'pt-BR', href: '/blog/meu-artigo' },
				{ hreflang: 'en-US', href: '/en/blog/my-article' }
			]
		}
	};
};
```

#### 2. Use the component on the page (`+page.svelte`)

```svelte
<script lang="ts">
	import { SeoGeoOptimizer } from 'quartzo';

	let { data } = $props();
</script>

<SeoGeoOptimizer
	title={data.seo.title}
	description={data.seo.description}
	url={data.seo.url}
	siteUrl="https://mysite.com"
	siteName="My Tech Blog"
	image={data.seo.image}
	imageAlt={data.seo.imageAlt}
	type="article"
	publishedDate={data.seo.publishedDate}
	tags={data.seo.tags}
	breadcrumbs={data.seo.breadcrumbs}
	alternates={data.seo.alternates}
	noindex={false}
	author="Daniel Guimarães"
	twitterCreator="@heydan_dev"
/>
```

### Props

| Prop            | Type                                                     | Description                                   | Default                                      |
| --------------- | -------------------------------------------------------- | --------------------------------------------- | -------------------------------------------- |
| `title`         | `string`                                                 | Page title (Meta, OG, Twitter)                | **Required**                                 |
| `description`   | `string`                                                 | Description (Meta, OG, Twitter)               | **Required**                                 |
| `url`           | `string`                                                 | Canonical URL (relative or absolute)          | **Required**                                 |
| `siteUrl`       | `string`                                                 | Base site URL (used to resolve relative URLs) | -                                            |
| `siteName`      | `string`                                                 | Site name (OG)                                | -                                            |
| `image`         | `string`                                                 | Featured image URL (OG, Twitter)              | -                                            |
| `imageAlt`      | `string`                                                 | Alternative text for social image             | -                                            |
| `type`          | `'website' \| 'article' \| 'profile' \| 'creative_work'` | Content type                                  | `'website'`                                  |
| `author`        | `string`                                                 | Author name                                   | -                                            |
| `language`      | `string`                                                 | Page language (Schema.org)                    | `'en-US'`                                    |
| `locale`        | `string`                                                 | Locale (Open Graph)                           | `'en_US'`                                    |
| `twitterCard`   | `'summary' \| 'summary_large_image'`                     | Twitter card type                             | Auto (`summary_large_image` if image exists) |
| `robots`        | `string`                                                 | General robots directives                     | -                                            |
| `googlebot`     | `string`                                                 | Specific googlebot directives                 | -                                            |
| `noindex`       | `boolean`                                                | Force noindex and nofollow                    | `false`                                      |
| `alternates`    | `Array<{ hreflang: string; href: string }>`              | Alternative hreflang links                    | `[]`                                         |
| `breadcrumbs`   | `Array<{ name: string; url: string }>`                   | Breadcrumbs for Schema.org                    | `[]`                                         |
| `publisherType` | `'Person' \| 'Organization'`                             | Publisher type in Schema.org                  | `'Organization'`                             |

### SEO Best Practices with SvelteKit

1.  **SSR is Fundamental**: Use this component on server-rendered pages to ensure crawlers index correctly.
2.  **Dynamic Data**: Always load metadata in the `load` function to ensure title and description match the actual content.
3.  **Canonical URLs**: The component automatically generates the canonical tag. Make sure to pass the correct `url`.
4.  **Images**: Use absolute URLs or configure `siteUrl` to resolve relative paths automatically.
5.  **Indexing Control**: Use `noindex`, `robots`, and `googlebot` for thin pages or low-value variants.
6.  **Hreflang**: Fill in `alternates` for multilingual versions and to avoid cannibalization.

---

<a id="portuguese"></a>

## 🇧🇷 Português

Uma biblioteca universal e moderna para otimização de SEO e GEO em projetos Svelte 5 e SvelteKit.
Simplifica a gestão de Meta Tags, Open Graph, Twitter Cards e Schema.org JSON-LD com suporte nativo a Runes.

### Características

- 🚀 **Svelte 5 Ready**: Construído com Runes (`$props`, `$derived`).
- 🔍 **SEO Completo**: Meta tags essenciais, Canonical URLs.
- 📱 **Social Media**: Open Graph (Facebook/LinkedIn) e Twitter Cards.
- 🤖 **Schema.org**: JSON-LD automático para `WebPage`, `Article`, `ProfilePage` e `CreativeWork`.
- 🌍 **GEO Location**: Suporte a locale e internacionalização básica.
- ⚡ **SSR Friendly**: Otimizado para renderização no servidor (SvelteKit).
- 🛡️ **JSON-LD Seguro**: Sem uso de `{@html}` e com escape de `<` no payload.

### Instalação

```bash
npm install quartzo
```

### Uso Básico

Recomendamos usar o componente em suas páginas (`+page.svelte`) recebendo dados de uma `load` function (`+page.server.ts`), conforme as melhores práticas de SEO para SvelteKit.

#### 1. Carregue os dados no servidor (`+page.server.ts`)

```typescript
export const load = async () => {
	return {
		seo: {
			title: 'Meu Artigo Incrível',
			description: 'Um guia completo sobre Svelte 5 e SEO.',
			url: '/blog/meu-artigo',
			image: '/images/cover.jpg',
			imageAlt: 'Capa do artigo com logo Svelte',
			publishedDate: '2023-10-27T10:00:00Z',
			tags: ['Svelte', 'SEO', 'Web Development'],
			breadcrumbs: [
				{ name: 'Blog', url: '/blog' },
				{ name: 'Meu Artigo Incrível', url: '/blog/meu-artigo' }
			],
			alternates: [
				{ hreflang: 'pt-BR', href: '/blog/meu-artigo' },
				{ hreflang: 'en-US', href: '/en/blog/my-article' }
			]
		}
	};
};
```

#### 2. Use o componente na página (`+page.svelte`)

```svelte
<script lang="ts">
	import { SeoGeoOptimizer } from 'quartzo';

	let { data } = $props();
</script>

<SeoGeoOptimizer
	title={data.seo.title}
	description={data.seo.description}
	url={data.seo.url}
	siteUrl="https://meusite.com"
	siteName="Meu Blog Tech"
	image={data.seo.image}
	imageAlt={data.seo.imageAlt}
	type="article"
	publishedDate={data.seo.publishedDate}
	tags={data.seo.tags}
	breadcrumbs={data.seo.breadcrumbs}
	alternates={data.seo.alternates}
	noindex={false}
	author="Daniel Guimarães"
	twitterCreator="@heydan_dev"
/>
```

### Props

| Prop            | Tipo                                                     | Descrição                                             | Default                                      |
| --------------- | -------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------- |
| `title`         | `string`                                                 | Título da página (Meta, OG, Twitter)                  | **Obrigatório**                              |
| `description`   | `string`                                                 | Descrição (Meta, OG, Twitter)                         | **Obrigatório**                              |
| `url`           | `string`                                                 | URL canônica (relativa ou absoluta)                   | **Obrigatório**                              |
| `siteUrl`       | `string`                                                 | URL base do site (usado para resolver URLs relativas) | -                                            |
| `siteName`      | `string`                                                 | Nome do site (OG)                                     | -                                            |
| `image`         | `string`                                                 | URL da imagem de destaque (OG, Twitter)               | -                                            |
| `imageAlt`      | `string`                                                 | Texto alternativo da imagem social                    | -                                            |
| `type`          | `'website' \| 'article' \| 'profile' \| 'creative_work'` | Tipo de conteúdo                                      | `'website'`                                  |
| `author`        | `string`                                                 | Nome do autor                                         | -                                            |
| `language`      | `string`                                                 | Idioma da página (Schema.org)                         | `'en-US'`                                    |
| `locale`        | `string`                                                 | Locale (Open Graph)                                   | `'en_US'`                                    |
| `twitterCard`   | `'summary' \| 'summary_large_image'`                     | Tipo do card Twitter                                  | Auto (`summary_large_image` se tiver imagem) |
| `robots`        | `string`                                                 | Diretivas gerais para robots                          | -                                            |
| `googlebot`     | `string`                                                 | Diretivas específicas para googlebot                  | -                                            |
| `noindex`       | `boolean`                                                | Força noindex e nofollow                              | `false`                                      |
| `alternates`    | `Array<{ hreflang: string; href: string }>`              | Links alternativos hreflang                           | `[]`                                         |
| `breadcrumbs`   | `Array<{ name: string; url: string }>`                   | Breadcrumbs para Schema.org                           | `[]`                                         |
| `publisherType` | `'Person' \| 'Organization'`                             | Tipo de publisher no Schema.org                       | `'Organization'`                             |

### Boas Práticas de SEO com SvelteKit

1.  **SSR é Fundamental**: Use este componente em páginas renderizadas no servidor para garantir que os crawlers indexem corretamente.
2.  **Dados Dinâmicos**: Sempre carregue metadados no `load` function para garantir que o título e descrição correspondam ao conteúdo real.
3.  **Canonical URLs**: O componente gera automaticamente a tag canonical. Certifique-se de passar a `url` correta.
4.  **Imagens**: Use URLs absolutas ou configure `siteUrl` para resolver caminhos relativos automaticamente.
5.  **Controle de Indexação**: Use `noindex`, `robots` e `googlebot` para páginas finas ou variantes de baixo valor.
6.  **Hreflang**: Preencha `alternates` para versões multilíngues e evitar canibalização.

## Licença

MIT
