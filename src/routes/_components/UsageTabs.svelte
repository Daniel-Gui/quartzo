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
			description: 'Load metadata on the server to ensure dynamic SEO and proper SSR.',
			code: `export const load = async () => {
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
        { hreflang: 'pt-BR', href: '/blog/my-article' },
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
				'Receive data and pass it to the component. The "article" type enables specific features.',
			code: `\u003Cscript lang="ts">
  import { SeoGeoOptimizer } from 'quartzo';

  let { data } = $props();
\u003C/script>

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
/>`
		},
		{
			id: 'advanced',
			label: 'Advanced GEO',
			fileName: '+page.svelte',
			description: 'Advanced example with robots directives and geographic localization.',
			code: `<SeoGeoOptimizer
  title="Premium Product"
  description="The best product on the market."
  url="https://store.com/product"
  breadcrumbs={[
    { name: 'Store', url: '/' },
    { name: 'Products', url: '/products' },
    { name: 'Premium', url: '/products/premium' }
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

<section id="usage" class="ds-section">
	<div class="ds-container">
		<div class="mb-8 text-center">
			<h2 class="ds-h2 mb-4">How to Use</h2>
			<p class="ds-muted">Practical integration examples for your SvelteKit project.</p>
		</div>

		<div class="ds-tabs">
			<!-- Tabs Header -->
			<div class="ds-tab-list" role="tablist" aria-label="Usage examples">
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
									<CopyButton text={tab.code} class="p-1.5!" />
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
