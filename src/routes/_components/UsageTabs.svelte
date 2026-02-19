<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { fade, fly, slide } from 'svelte/transition';

	import CopyButton from './CopyButton.svelte';

	type TabItem = {
		id: string;
		label: string;
		fileName: string;
		description: string;
		code: string;
	};

	const tabs: TabItem[] = [
		{
			id: 'server',
			label: '1. Server Loader',
			fileName: '+page.server.ts',
			description: 'Carregue os metadados no servidor para garantir SEO dinâmico e SSR correto.',
			code: `export const load = async () => {
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
};`
		},
		{
			id: 'client',
			label: '2. Page Component',
			fileName: '+page.svelte',
			description:
				'Receba os dados e passe para o componente. O tipo "article" ativa recursos específicos.',
			code: `\u003Cscript lang="ts">
  import { SeoGeoOptimizer } from 'quartzo';

  let { data } = $props();
\u003C/script>

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
/>`
		},
		{
			id: 'advanced',
			label: 'Advanced GEO',
			fileName: '+page.svelte',
			description: 'Exemplo avançado com configurações de robôs e localização geográfica.',
			code: `<SeoGeoOptimizer
  title="Produto Premium"
  description="O melhor produto do mercado."
  url="https://loja.com/produto"
  breadcrumbs={[
    { name: 'Loja', url: '/' },
    { name: 'Produtos', url: '/produtos' },
    { name: 'Premium', url: '/produtos/premium' }
  ]}
  alternates={[
    { hreflang: 'pt-BR', href: '/br/produto' },
    { hreflang: 'en-US', href: '/en/product' }
  ]}
  robots="index, follow"
  googlebot="index, follow, max-snippet:-1"
/>`
		}
	];

	let activeTab = $state(tabs[0].id);

	function handleKeydown(event: KeyboardEvent, tabId: string) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			activeTab = tabId;
		}
	}
</script>

<section class="ds-section">
	<div class="ds-container">
		<div class="mb-8 text-center">
			<h2 class="ds-h2 mb-4">Como usar</h2>
			<p class="ds-muted">Exemplos práticos de integração em seu projeto SvelteKit.</p>
		</div>

		<div class="ds-tabs">
			<!-- Tabs Header -->
			<div class="ds-tab-list" role="tablist" aria-label="Exemplos de uso">
				{#each tabs as tab (tab.id)}
					{@const isActive = activeTab === tab.id}
					<button
						class="ds-tab-trigger"
						role="tab"
						aria-selected={isActive}
						aria-controls={`panel-${tab.id}`}
						id={`tab-${tab.id}`}
						tabindex={isActive ? 0 : -1}
						onclick={() => (activeTab = tab.id)}
						onkeydown={(e) => handleKeydown(e, tab.id)}
					>
						{tab.label}
						{#if isActive}
							<div
								class="ds-tab-indicator"
								transition:slide={{ axis: 'x', duration: 250, easing: cubicOut }}
							></div>
						{/if}
					</button>
				{/each}
			</div>

			<!-- Tab Content -->
			<div class="ds-tab-content bg-white/60 backdrop-blur-md">
				{#each tabs as tab (tab.id)}
					{#if activeTab === tab.id}
						<div
							role="tabpanel"
							id={`panel-${tab.id}`}
							aria-labelledby={`tab-${tab.id}`}
							in:fly={{ y: 10, duration: 300, easing: cubicOut }}
							out:fade={{ duration: 150 }}
							class="absolute inset-0 flex flex-col p-6 md:p-8"
						>
							<div class="mb-6">
								<p class="text-base leading-relaxed text-mint-700 md:text-lg">
									{tab.description}
								</p>
							</div>

							<div
								class="relative flex flex-1 flex-col overflow-hidden rounded-xl border border-mint-800/50 bg-mint-900 shadow-inner"
							>
								<!-- Code Header -->
								<div
									class="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
								>
									<span class="font-mono text-xs text-mint-200/60">
										{tab.fileName}
									</span>
									<CopyButton text={tab.code} class="!p-1.5" />
								</div>

								<!-- Code Body -->
								<div class="scrollbar-hide flex-1 overflow-auto">
									<pre class="p-4 font-mono text-sm text-mint-100"><code class="block"
											>{tab.code}</code
										></pre>
								</div>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</section>
