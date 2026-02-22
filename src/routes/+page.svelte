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
	siteName="Quartzo"
	image={data.seo.image}
	imageAlt={data.seo.imageAlt}
	tags={data.seo.tags}
	breadcrumbs={data.seo.breadcrumbs}
	alternates={data.seo.alternates}
	type="website"
	language="en-US"
	locale="en_US"
	twitterCreator="@dandanielGui"
	author="Daniel Guimarães"
/>

<Navbar
	githubUrl="https://github.com/Daniel-Gui/quartzo"
	npmUrl="https://www.npmjs.com/package/quartzo"
/>

<Hero skillContent={data.skillContent} />
<UsageTabs />
<Faq />
<Footer />
