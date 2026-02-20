<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	type FaqItem = {
		title: string;
		body: string;
	};

	type Props = {
		items?: FaqItem[];
	};

	function slugify(value: string) {
		return value
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)/g, '');
	}

	const defaultItems: FaqItem[] = [
		{
			title: 'How do I install the library?',
			body: 'Simply run `npm install quartzo` in your SvelteKit project terminal. The library is compatible with Svelte 5 and SvelteKit 2.'
		},
		{
			title: 'What is SEO?',
			body: 'SEO (Search Engine Optimization) is the set of practices that help search engines understand and index your pages. The goal is to increase organic visibility through useful content, performance, and consistent metadata.'
		},
		{
			title: 'What is GEO (for AIs)?',
			body: 'GEO (Generative Engine Optimization) focuses on making content easy to understand and cite by AI assistants. Beyond traditional SEO, it prioritizes structure, data (Schema.org), clarity, context, and consistency in titles, descriptions, and entities.'
		},
		{
			title: 'Why do <title> and meta description matter?',
			body: 'They are the primary signals summarizing your content. They influence understanding, presentation in results, and click-through rate. On sites with many pages, keeping these consistent and unique per page is essential.'
		},
		{
			title: 'What is a Canonical URL?',
			body: 'It is the "official" URL of a page. It prevents duplicate content when the same content can be accessed through different URLs (parameters, trailing slashes, etc.).'
		},
		{
			title: 'What is Open Graph (OG)?',
			body: 'Open Graph defines how your page appears when shared (e.g., on WhatsApp, LinkedIn). It includes title, description, image, and content type.'
		},
		{
			title: 'What are Twitter Cards?',
			body: 'They are specific meta tags to improve link previews on X (Twitter). Typically uses "summary_large_image" when an image exists to maximize readability.'
		},
		{
			title: 'What is Schema.org JSON-LD?',
			body: 'It is a structured data format that describes what the page is (article, profile, creative work). It helps search engines and AIs understand entities, authors, dates, and topics reliably.'
		},
		{
			title: 'What are robots/noindex used for?',
			body: 'They allow you to control indexing. Useful for thin variations or pages you don\'t want in search results. "noindex" asks search engines not to index the page; "nofollow" reduces signal transmission through links.'
		},
		{
			title: 'What is hreflang used for?',
			body: 'It indicates alternative versions by language/region, preventing cannibalization between translated pages. It helps search engines deliver the correct version to the user.'
		},
		{
			title: 'What are breadcrumbs?',
			body: 'They are hierarchical links (Home → Category → Page) that improve navigation and help search engines understand the site structure. They can also be sent as structured data.'
		},
		{
			title: 'Why does SSR help with SEO?',
			body: 'With SSR, the initial HTML already contains the meta tags and base content, making indexing easier. In SvelteKit, this is the default and is recommended for content-driven sites.'
		}
	];

	let { items = defaultItems }: Props = $props();

	let root = $state<HTMLDivElement | null>(null);
	let openId = $state<string | null>(null);

	function getIds() {
		return new Set(items.map((i) => slugify(i.title)));
	}

	function syncFromUrl() {
		const url = new URL(window.location.href);
		const id = url.searchParams.get('faq');
		const ids = getIds();
		openId = id && ids.has(id) ? id : null;
	}

	function syncToUrl(id: string | null) {
		const url = new URL(window.location.href);
		if (id) url.searchParams.set('faq', id);
		else url.searchParams.delete('faq');
		history.replaceState({}, '', url.toString());
	}

	function toggle(id: string) {
		openId = openId === id ? null : id;
		syncToUrl(openId);
	}

	function onTriggerKeyDown(e: KeyboardEvent) {
		const target = e.currentTarget as HTMLButtonElement;
		if (!root) return;

		const triggers = Array.from(
			root.querySelectorAll<HTMLButtonElement>('[data-faq-trigger="true"]')
		);
		const index = triggers.indexOf(target);
		if (index === -1) return;

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			triggers[(index + 1) % triggers.length]?.focus();
			return;
		}

		if (e.key === 'ArrowUp') {
			e.preventDefault();
			triggers[(index - 1 + triggers.length) % triggers.length]?.focus();
			return;
		}

		if (e.key === 'Home') {
			e.preventDefault();
			triggers[0]?.focus();
			return;
		}

		if (e.key === 'End') {
			e.preventDefault();
			triggers[triggers.length - 1]?.focus();
		}
	}

	onMount(() => {
		syncFromUrl();
		const onPopState = () => syncFromUrl();
		window.addEventListener('popstate', onPopState);

		onDestroy(() => {
			window.removeEventListener('popstate', onPopState);
		});
	});
</script>

<section class="ds-section relative overflow-hidden" id="faq" tabindex="-1">
	<div
		class="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint-300/20 blur-[120px]"
	></div>

	<div class="ds-container relative z-10">
		<div class="mb-16 space-y-4 text-center">
			<h2 class="ds-h2">Frequently Asked Questions</h2>
			<p class="ds-muted mx-auto max-w-2xl text-lg">
				Essential concepts to understand the library's impact on your project.
			</p>
		</div>

		<div class="mx-auto space-y-4" bind:this={root}>
			{#each items as item (item.title)}
				{@const id = slugify(item.title)}
				{@const isOpen = openId === id}
				<div
					class="group overflow-hidden rounded-2xl border border-white/50 bg-white/40 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-white/60 hover:shadow-md {isOpen
						? 'ring-2 ring-mint-500/20'
						: ''}"
				>
					<button
						class="flex w-full cursor-pointer touch-manipulation items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-mint-500 focus-visible:ring-offset-2"
						data-faq-trigger="true"
						type="button"
						aria-expanded={isOpen}
						aria-controls={`${id}-panel`}
						id={`${id}-trigger`}
						onclick={() => toggle(id)}
						onkeydown={onTriggerKeyDown}
					>
						<span
							class="font-medium text-mint-500 transition-colors group-hover:text-mint-900"
							class:text-mint-900={isOpen}
						>
							{item.title}
						</span>
						<span
							class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/50 text-mint-300 transition-all duration-300 group-hover:bg-white group-hover:text-mint-900"
							class:rotate-180={isOpen}
							class:bg-mint-200={isOpen}
							class:text-mint-900={isOpen}
							aria-hidden="true"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="m6 9 6 6 6-6" />
							</svg>
						</span>
					</button>

					<div
						class="grid transition-[grid-template-rows] duration-300 ease-out"
						style="grid-template-rows: {isOpen ? '1fr' : '0fr'}"
						id={`${id}-panel`}
						role="region"
						aria-labelledby={`${id}-trigger`}
					>
						<div class="overflow-hidden">
							<div class="px-6 pt-0 pb-6 leading-relaxed text-mint-500">
								{item.body}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
