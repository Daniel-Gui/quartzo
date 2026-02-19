# Quartzo: SEO & GEO Optimizer for Svelte 5

Uma biblioteca universal e moderna para otimização de SEO e GEO em projetos Svelte 5 e SvelteKit.
Simplifica a gestão de Meta Tags, Open Graph, Twitter Cards e Schema.org JSON-LD com suporte nativo a Runes.

## Características

- 🚀 **Svelte 5 Ready**: Construído com Runes (`$props`, `$derived`).
- 🔍 **SEO Completo**: Meta tags essenciais, Canonical URLs.
- 📱 **Social Media**: Open Graph (Facebook/LinkedIn) e Twitter Cards.
- 🤖 **Schema.org**: JSON-LD automático para `WebPage`, `Article`, `ProfilePage` e `CreativeWork`.
- 🌍 **GEO Location**: Suporte a locale e internacionalização básica.
- ⚡ **SSR Friendly**: Otimizado para renderização no servidor (SvelteKit).
- 🛡️ **JSON-LD Seguro**: Sem uso de `{@html}` e com escape de `<` no payload.

## Instalação

```bash
npm install quartzo
```

## Uso Básico

Recomendamos usar o componente em suas páginas (`+page.svelte`) recebendo dados de uma `load` function (`+page.server.ts`), conforme as melhores práticas de SEO para SvelteKit.

### 1. Carregue os dados no servidor (`+page.server.ts`)

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

### 2. Use o componente na página (`+page.svelte`)

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

## Props

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

## Boas Práticas de SEO com SvelteKit

1. **SSR é Fundamental**: Use este componente em páginas renderizadas no servidor para garantir que os crawlers indexem corretamente.
2. **Dados Dinâmicos**: Sempre carregue metadados no `load` function para garantir que o título e descrição correspondam ao conteúdo real.
3. **Canonical URLs**: O componente gera automaticamente a tag canonical. Certifique-se de passar a `url` correta.
4. **Imagens**: Use URLs absolutas ou configure `siteUrl` para resolver caminhos relativos automaticamente.
5. **Controle de Indexação**: Use `noindex`, `robots` e `googlebot` para páginas finas ou variantes de baixo valor.
6. **Hreflang**: Preencha `alternates` para versões multilíngues e evitar canibalização.

## Licença

MIT
