<script>
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	import CopyButton from './CopyButton.svelte';

	const command = 'npm install quartzo';
</script>

<section id="hero" class="ds-section">
	<div class="ds-container">
		<div class="ds-card">
			<div class="ds-card-body">
				<div class="flex flex-col items-center justify-center gap-4 text-center">
					<h1 class="ds-h1">Quartzo</h1>
					<p class="ds-muted text-sm">Uma biblioteca para SvelteKit com foco em SEO e GEO.</p>
					<div class="ds-code flex min-w-[300px] items-center justify-between gap-4">
						<code class="font-mono text-sm">{command}</code>
						<CopyButton text={command} />
					</div>
					<!--
					<a
						class="ds-btn ds-btn-primary"
						href="https://www.npmjs.com/"
						rel="noreferrer"
						target="_blank">Publicar no npm</a
					>
						-->
				</div>
			</div>
		</div>
	</div>
</section>
