<script lang="ts">
	/**
	 * Componente SEO/GEO unificado
	 * Gera meta tags, Open Graph, Twitter Cards e Schema.org JSON-LD
	 */

	type PageType = 'website' | 'article' | 'profile' | 'creative_work';
	type PublisherType = 'Person' | 'Organization';
	type TwitterCard = 'summary' | 'summary_large_image' | 'player' | 'app';
	type AlternateLink = { href: string; hreflang: string };
	type BreadcrumbItem = { name: string; url: string };
	type JsonLdNode = Record<string, unknown>;

	interface Props {
		/** Título da página (`<title>`, meta, Open Graph e Twitter) */
		title: string;
		/** Título usado no JSON-LD (`headline`/`name`), sem sufixo do site. Fallback: `title` */
		headline?: string;
		/** Descrição da página */
		description: string;
		/** Tipo de página para OG e Schema.org */
		type?: PageType;
		/** URL canônica da página */
		url: string;
		/** Nome do site/projeto */
		siteName?: string;
		/** URL base do site */
		siteUrl?: string;
		/** Linguagem do conteúdo (Schema.org) */
		language?: string;
		/** Locale para Open Graph */
		locale?: string;
		/** URL da imagem OG/Twitter */
		image?: string;
		/** Texto alternativo da imagem social */
		imageAlt?: string;
		/** Diretivas para robots */
		robots?: string;
		/** Diretivas para googlebot */
		googlebot?: string;
		/** Forçar noindex */
		noindex?: boolean;
		/** Alternates hreflang */
		alternates?: AlternateLink[];
		/** Breadcrumbs para Schema.org */
		breadcrumbs?: BreadcrumbItem[];
		/** Nome do autor */
		author?: string;
		/** URL do autor */
		authorUrl?: string;
		/** Tipo de publisher no schema */
		publisherType?: PublisherType;
		/** Primeiro nome do perfil */
		profileFirstName?: string;
		/** Sobrenome do perfil */
		profileLastName?: string;
		/** Cargo do perfil */
		profileJobTitle?: string;
		/** Twitter site handle */
		twitterSite?: string;
		/** Twitter creator handle */
		twitterCreator?: string;
		/** Tipo de cartão do Twitter */
		twitterCard?: TwitterCard;
		/** Data de publicação (ISO 8601) */
		publishedDate?: string;
		/** Tags/keywords */
		tags?: string[];
		/** Seção do artigo */
		section?: string;
		/** Ano de criação (para works) */
		year?: string;
		/**
		 * Propriedades Schema.org mescladas na `Person` gerada (perfil, autor do artigo ou
		 * criador da obra), ex.: `@id`, `sameAs`, `worksFor`, `alumniOf`. Sobrescrevem as geradas.
		 */
		personSchema?: JsonLdNode;
		/** Nós Schema.org extras anexados ao JSON-LD (ex.: `WebSite`, `Organization`, `FAQPage`) */
		jsonLd?: JsonLdNode | JsonLdNode[];
	}

	let {
		title,
		headline,
		description,
		type = 'website',
		url,
		siteName,
		siteUrl,
		language = 'en-US',
		locale = 'en_US',
		image,
		imageAlt,
		robots,
		googlebot,
		noindex = false,
		alternates = [],
		breadcrumbs = [],
		author,
		authorUrl = siteUrl,
		publisherType = 'Organization',
		profileFirstName,
		profileLastName,
		profileJobTitle,
		twitterSite,
		twitterCreator,
		twitterCard,
		publishedDate,
		tags = [],
		section,
		year,
		personSchema,
		jsonLd = []
	}: Props = $props();

	const SCHEMA_CONTEXT = 'https://schema.org';
	// Tag de fechamento montada por concatenação: escrita literalmente, ela fecharia o bloco
	// de script deste próprio componente.
	const JSON_LD_OPEN = '<script type="application/ld+json">';
	const JSON_LD_CLOSE = '</' + 'script>';

	function joinUrl(base: string | undefined, path: string) {
		if (!base) return path;
		const baseEnds = base.endsWith('/');
		const pathStarts = path.startsWith('/');
		if (baseEnds && pathStarts) return `${base}${path.slice(1)}`;
		if (!baseEnds && !pathStarts) return `${base}/${path}`;
		return `${base}${path}`;
	}

	function compactObject<T extends Record<string, unknown>>(value: T) {
		return Object.fromEntries(
			Object.entries(value).filter(([, v]) => v !== undefined && v !== null && v !== '')
		) as T;
	}

	/**
	 * Serializa o JSON-LD para o corpo da tag de script, que nunca é decodificado como HTML.
	 * Trocar todo `<` pelo escape unicode do JSON impede que o payload feche a tag ou abra um
	 * comentário HTML, sem alterar os valores lidos por `JSON.parse`.
	 */
	function toJsonLd(value: unknown) {
		return JSON.stringify(value).replace(/</g, '\\u003c');
	}

	/** `Person` gerada + `personSchema` (que tem prioridade). */
	function buildPerson(fields: JsonLdNode) {
		return compactObject({ '@type': 'Person', ...fields, ...personSchema });
	}

	let profileFallbackName = $derived([profileFirstName, profileLastName].filter(Boolean).join(' '));
	let profileName = $derived(author ?? (profileFallbackName ? profileFallbackName : undefined));
	let authorName = $derived(author ?? profileName);
	let keywords = $derived(tags.length > 0 ? tags.join(', ') : undefined);
	let articleSection = $derived(section ?? (tags.length > 0 ? tags[0] : undefined));
	let canonicalUrl = $derived(url.startsWith('http') ? url : joinUrl(siteUrl, url));
	let imageUrl = $derived(
		image?.startsWith('http') ? image : image ? joinUrl(siteUrl, image) : undefined
	);
	let twitterCardValue = $derived(twitterCard ?? (imageUrl ? 'summary_large_image' : 'summary'));
	let schemaTitle = $derived(headline || title);
	let extraNodes = $derived(
		(Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((node) => ({
			'@context': SCHEMA_CONTEXT,
			...node
		}))
	);
	let schemaTag = $derived(JSON_LD_OPEN + toJsonLd(generateSchema()) + JSON_LD_CLOSE);
	let robotsContent = $derived(noindex ? 'noindex, nofollow' : robots);
	let googlebotContent = $derived(noindex ? (googlebot ?? 'noindex, nofollow') : googlebot);
	let alternatesResolved = $derived(
		alternates.map((item) => ({
			...item,
			href: item.href.startsWith('http') ? item.href : joinUrl(siteUrl, item.href)
		}))
	);

	let ogType = $derived(
		type === 'article' ? 'article' : type === 'creative_work' ? 'article' : type
	);

	function getSchemaType(): string {
		switch (type) {
			case 'article':
				return 'BlogPosting';
			case 'creative_work':
				return 'CreativeWork';
			case 'profile':
				return 'ProfilePage';
			default:
				return 'WebPage';
		}
	}

	function generateSchema() {
		const schemaType = getSchemaType();
		let baseSchema: Record<string, unknown>;

		const authorPerson =
			authorName || personSchema ? buildPerson({ name: authorName, url: authorUrl }) : undefined;

		if (schemaType === 'ProfilePage') {
			baseSchema = {
				'@context': SCHEMA_CONTEXT,
				'@type': 'ProfilePage',
				mainEntity: buildPerson({
					name: profileName,
					url: authorUrl,
					image: imageUrl,
					jobTitle: profileJobTitle,
					description: description,
					knowsAbout: tags.length > 0 ? tags : undefined
				}),
				inLanguage: language
			};
		} else if (schemaType === 'BlogPosting') {
			baseSchema = {
				'@context': SCHEMA_CONTEXT,
				'@type': 'BlogPosting',
				headline: schemaTitle,
				description: description,
				image: imageUrl,
				author: authorPerson,
				publisher: siteName
					? compactObject({
							'@type': publisherType,
							name: siteName,
							url: siteUrl
						})
					: undefined,
				datePublished: publishedDate,
				dateModified: publishedDate,
				mainEntityOfPage: {
					'@type': 'WebPage',
					'@id': canonicalUrl
				},
				keywords: keywords,
				articleSection: articleSection,
				inLanguage: language
			};
		} else if (schemaType === 'CreativeWork') {
			baseSchema = {
				'@context': SCHEMA_CONTEXT,
				'@type': 'CreativeWork',
				name: schemaTitle,
				description: description,
				image: imageUrl,
				creator: authorPerson,
				dateCreated: year,
				url: canonicalUrl,
				keywords: keywords,
				inLanguage: language
			};
		} else {
			baseSchema = {
				'@context': SCHEMA_CONTEXT,
				'@type': 'WebPage',
				name: schemaTitle,
				description: description,
				url: canonicalUrl,
				inLanguage: language
			};
		}

		const nodes: JsonLdNode[] = [baseSchema];

		if (breadcrumbs.length > 0) {
			nodes.push({
				'@context': SCHEMA_CONTEXT,
				'@type': 'BreadcrumbList',
				itemListElement: breadcrumbs.map((item, index) => ({
					'@type': 'ListItem',
					position: index + 1,
					name: item.name,
					item: item.url.startsWith('http') ? item.url : joinUrl(siteUrl, item.url)
				}))
			});
		}

		nodes.push(...extraNodes);

		return nodes.length === 1 ? baseSchema : nodes;
	}
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	{#if authorName}
		<meta name="author" content={authorName} />
	{/if}
	{#if keywords}
		<meta name="keywords" content={keywords} />
	{/if}
	{#if robotsContent}
		<meta name="robots" content={robotsContent} />
	{/if}
	{#if googlebotContent}
		<meta name="googlebot" content={googlebotContent} />
	{/if}
	<link rel="canonical" href={canonicalUrl} />
	{#each alternatesResolved as alternate (alternate.hreflang)}
		<link rel="alternate" hreflang={alternate.hreflang} href={alternate.href} />
	{/each}

	<!-- Open Graph -->
	<meta property="og:type" content={ogType} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	{#if imageUrl}
		<meta property="og:image" content={imageUrl} />
		{#if imageAlt}
			<meta property="og:image:alt" content={imageAlt} />
		{/if}
	{/if}
	{#if siteName}
		<meta property="og:site_name" content={siteName} />
	{/if}
	{#if locale}
		<meta property="og:locale" content={locale} />
	{/if}

	{#if type === 'article' && publishedDate}
		{#if authorName}
			<meta property="article:author" content={authorName} />
		{/if}
		<meta property="article:published_time" content={publishedDate} />
		{#each tags as tag (tag)}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}

	{#if type === 'profile'}
		{#if profileFirstName}
			<meta property="profile:first_name" content={profileFirstName} />
		{/if}
		{#if profileLastName}
			<meta property="profile:last_name" content={profileLastName} />
		{/if}
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content={twitterCardValue} />
	<meta name="twitter:url" content={canonicalUrl} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	{#if imageUrl}
		<meta name="twitter:image" content={imageUrl} />
		{#if imageAlt}
			<meta name="twitter:image:alt" content={imageAlt} />
		{/if}
	{/if}
	{#if twitterSite}
		<meta name="twitter:site" content={twitterSite} />
	{/if}
	{#if twitterCreator}
		<meta name="twitter:creator" content={twitterCreator} />
	{/if}

	<!-- Schema.org JSON-LD for AI/GEO (raw HTML: a script body is never entity-decoded) -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- JSON payload, every "<" is unicode-escaped -->
	{@html schemaTag}
</svelte:head>
