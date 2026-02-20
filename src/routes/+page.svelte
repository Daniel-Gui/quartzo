<script lang="ts">
	import { SeoGeoOptimizer } from '$lib';
	import Faq from './_components/Faq.svelte';
	import Hero from './_components/Hero.svelte';
	import UsageTabs from './_components/UsageTabs.svelte';
	import Footer from './_components/Footer.svelte';
	import Navbar from './_components/Navbar.svelte';

	let { data } = $props();
</script>

<SeoGeoOptimizer
	title={data.seo.title}
	description={data.seo.description}
	url={data.seo.url}
	siteUrl="https://quartzo.heydan.dev"
	siteName="Quartzo - SEO/GEO Lib"
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

<div class="ds-page pt-16">
	<Navbar
		githubUrl="https://github.com/Daniel-Gui/quartzo"
		npmUrl="https://www.npmjs.com/package/quartzo"
	/>

	<Hero />
	<UsageTabs />
	<Faq />
	<Footer />
</div>
