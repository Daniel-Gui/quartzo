<script lang="ts">
	import './layout.css';

	const { children } = $props();
</script>

<main class="ds-page flex flex-col pt-16" id="main" tabindex="-1">
	{@render children()}
</main>
