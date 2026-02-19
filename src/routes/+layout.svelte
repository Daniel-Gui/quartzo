<script lang="ts">
	import './layout.css';

	const { children } = $props();
</script>

<main id="main" tabindex="-1">
	{@render children()}
</main>
