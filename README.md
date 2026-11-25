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
- 🛡️ **Safe JSON-LD**: Emitted unescaped (so `&` stays `&`), with every `<` written as `\u003c` so the payload can never close its `<script>` tag.
- 🧩 **Extensible Schema**: Clean `headline` for structured data, extra `Person` properties (`sameAs`, `@id`, `worksFor`…) and extra nodes (`WebSite`, `Organization`, `FAQPage`…).

### 🤖 AI Agent Auto-Setup

Using an AI coding assistant (Antigravity, Cursor, Windsurf, Claude Code, etc.)? Quartzo includes a **SKILL.md** that lets your agent automatically install and configure SEO for your entire SvelteKit project — no manual setup needed.

1. Copy or download the `SKILL.md` from [quartzo.heydan.dev](https://quartzo.heydan.dev)
2. Add it to your agent's skills directory (e.g., `.cursor/skills/` or `.claude/skills/`)
3. Ask your agent to set up SEO — it will handle everything

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
| `headline`      | `string`                                                 | Title used in JSON-LD (`headline` / `name`)   | `title`                                      |
| `personSchema`  | `Record<string, unknown>`                                | Extra properties merged into the `Person`     | -                                            |
| `jsonLd`        | `Record<string, unknown> \| Record<string, unknown>[]`   | Extra Schema.org nodes appended to JSON-LD    | `[]`                                         |

### Structured Data (JSON-LD)

The component emits one `<script type="application/ld+json">`. Three props let you shape it without writing your own JSON-LD component:

- **`headline`**: the title used inside the schema (`BlogPosting.headline`, `CreativeWork.name`, `WebPage.name`). Use it when `title` carries a site suffix, so "My Post | My Blog" stays in `<title>` while the schema says "My Post". Falls back to `title`. Open Graph and Twitter keep using `title`.
- **`personSchema`**: properties merged into the generated `Person` (the `ProfilePage` main entity, the article `author`, or the creative work `creator`). Your values win over the generated ones, and `undefined` removes a generated one. Typical keys: `@id`, `sameAs`, `worksFor`, `alumniOf`, `givenName`.
- **`jsonLd`**: one or more extra nodes appended after the page node and breadcrumbs. `@context` defaults to `https://schema.org`.

```svelte
<SeoGeoOptimizer
	title="About | Jane Doe"
	headline="About Jane Doe"
	description="Full-stack developer specializing in SvelteKit."
	url="/about"
	siteUrl="https://example.com"
	type="profile"
	profileFirstName="Jane"
	profileLastName="Doe"
	profileJobTitle="Full-stack Developer"
	personSchema={{
		'@id': 'https://example.com/#person',
		sameAs: ['https://github.com/janedoe', 'https://www.linkedin.com/in/janedoe'],
		worksFor: { '@type': 'Organization', name: 'Acme' },
		alumniOf: { '@type': 'CollegeOrUniversity', name: 'State University' }
	}}
	jsonLd={{
		'@type': 'WebSite',
		'@id': 'https://example.com/#website',
		url: 'https://example.com',
		name: 'Jane Doe',
		publisher: { '@id': 'https://example.com/#person' }
	}}
/>
```

Pass the same `personSchema={{ '@id': 'https://example.com/#person' }}` on articles to link every post's author to that one `Person`.

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
- 🛡️ **JSON-LD Seguro**: Emitido sem escape HTML (o `&` continua `&`), com todo `<` escrito como `\u003c` para que o payload nunca feche a tag `<script>`.
- 🧩 **Schema Extensível**: `headline` limpo para dados estruturados, propriedades extras na `Person` (`sameAs`, `@id`, `worksFor`…) e nós extras (`WebSite`, `Organization`, `FAQPage`…).

### 🤖 Configuração Automática via Agente de IA

Usa um assistente de IA para programar (Antigravity, Cursor, Windsurf, Claude Code, etc.)? O Quartzo inclui um **SKILL.md** que permite ao seu agente instalar e configurar o SEO automaticamente em todo o seu projeto SvelteKit — sem configuração manual.

1. Copie ou baixe o `SKILL.md` em [quartzo.heydan.dev](https://quartzo.heydan.dev)
2. Adicione ao diretório de skills do seu agente (ex: `.cursor/skills/` ou `.claude/skills/`)
3. Peça ao agente para configurar o SEO — ele cuida de tudo

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
| `headline`      | `string`                                                 | Título usado no JSON-LD (`headline` / `name`)         | `title`                                      |
| `personSchema`  | `Record<string, unknown>`                                | Propriedades extras mescladas na `Person`             | -                                            |
| `jsonLd`        | `Record<string, unknown> \| Record<string, unknown>[]`   | Nós Schema.org extras anexados ao JSON-LD             | `[]`                                         |

### Dados Estruturados (JSON-LD)

O componente emite um único `<script type="application/ld+json">`. Três props permitem ajustá-lo sem escrever seu próprio componente de JSON-LD:

- **`headline`**: o título usado dentro do schema (`BlogPosting.headline`, `CreativeWork.name`, `WebPage.name`). Use quando o `title` tiver sufixo do site: "Meu Post | Meu Blog" fica no `<title>` e o schema recebe "Meu Post". Fallback: `title`. Open Graph e Twitter continuam usando `title`.
- **`personSchema`**: propriedades mescladas na `Person` gerada (a entidade principal do `ProfilePage`, o `author` do artigo ou o `creator` da obra). Seus valores têm prioridade sobre os gerados, e `undefined` remove um gerado. Chaves comuns: `@id`, `sameAs`, `worksFor`, `alumniOf`, `givenName`.
- **`jsonLd`**: um ou mais nós extras anexados depois do nó da página e dos breadcrumbs. O `@context` padrão é `https://schema.org`.

```svelte
<SeoGeoOptimizer
	title="Sobre | Jane Doe"
	headline="Sobre Jane Doe"
	description="Desenvolvedora full-stack especializada em SvelteKit."
	url="/sobre"
	siteUrl="https://example.com"
	type="profile"
	profileFirstName="Jane"
	profileLastName="Doe"
	profileJobTitle="Desenvolvedora Full-stack"
	personSchema={{
		'@id': 'https://example.com/#person',
		sameAs: ['https://github.com/janedoe', 'https://www.linkedin.com/in/janedoe'],
		worksFor: { '@type': 'Organization', name: 'Acme' },
		alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidade Estadual' }
	}}
	jsonLd={{
		'@type': 'WebSite',
		'@id': 'https://example.com/#website',
		url: 'https://example.com',
		name: 'Jane Doe',
		publisher: { '@id': 'https://example.com/#person' }
	}}
/>
```

Passe o mesmo `personSchema={{ '@id': 'https://example.com/#person' }}` nos artigos para ligar o autor de cada post a essa mesma `Person`.

### Boas Práticas de SEO com SvelteKit

1.  **SSR é Fundamental**: Use este componente em páginas renderizadas no servidor para garantir que os crawlers indexem corretamente.
2.  **Dados Dinâmicos**: Sempre carregue metadados no `load` function para garantir que o título e descrição correspondam ao conteúdo real.
3.  **Canonical URLs**: O componente gera automaticamente a tag canonical. Certifique-se de passar a `url` correta.
4.  **Imagens**: Use URLs absolutas ou configure `siteUrl` para resolver caminhos relativos automaticamente.
5.  **Controle de Indexação**: Use `noindex`, `robots` e `googlebot` para páginas finas ou variantes de baixo valor.
6.  **Hreflang**: Preencha `alternates` para versões multilíngues e evitar canibalização.

## Licença

MIT
