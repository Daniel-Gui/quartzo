<script lang="ts">
	import { SeoGeoOptimizer } from '$lib';
	import Faq from './_components/Faq.svelte';
	import Hero from './_components/Hero.svelte';
	import UsageTabs from './_components/UsageTabs.svelte';

	let { data } = $props();
</script>

<div class="ds-page">
	<SeoGeoOptimizer
		title={data.seo.title}
		description={data.seo.description}
		url={data.seo.url}
		siteUrl="https://seo-lib.svelte.dev"
		siteName="Svelte SEO/GEO Lib"
		image={data.seo.image}
		imageAlt={data.seo.imageAlt}
		publishedDate={data.seo.publishedDate}
		tags={data.seo.tags}
		breadcrumbs={data.seo.breadcrumbs}
		alternates={data.seo.alternates}
		type="website"
		language="pt-BR"
		locale="pt_BR"
		twitterSite="@sveltejs"
		twitterCreator="@heydan_dev"
	/>

	<Hero />
	<UsageTabs />
	<Faq />

	<footer class="ds-section">
		<div class="ds-container">
			<div class="ds-card">
				<div class="ds-card-body">
					<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
						<div class="ds-muted text-sm">
							Feito com ❤️ por <a class="ds-link" href="https://heydan.dev">Daniel Guimarães</a>
						</div>
						<a class="ds-btn ds-btn-primary" href="#hero">Instalar</a>
					</div>
				</div>
			</div>
		</div>
	</footer>
</div>
