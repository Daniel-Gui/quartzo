<script lang="ts">
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import IconCheck from './IconCheck.svelte';
	import IconCopy from './IconCopy.svelte';

	let { text, class: className = '' } = $props();

	let copied = $state(false);
	let isClicking = $state(false);

	function copy() {
		navigator.clipboard.writeText(text);
		copied = true;
		isClicking = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<button
	onclick={copy}
	onanimationend={() => (isClicking = false)}
	class="flex cursor-pointer items-center justify-center rounded-full p-2 text-mint-400 transition-colors duration-200 hover:bg-white/10 hover:text-white {className}"
	class:animate-elastic={isClicking}
	aria-label="Copiar"
	title="Copiar para área de transferência"
>
	<div class="grid place-items-center">
		{#if copied}
			<span
				in:scale={{ duration: 180, easing: cubicOut, start: 0.5 }}
				out:scale={{ duration: 120, easing: cubicIn, start: 0.5 }}
				class="col-start-1 row-start-1"
			>
				<IconCheck class="size-5" />
			</span>
		{:else}
			<span
				in:scale={{ duration: 180, easing: cubicOut, start: 0.5 }}
				out:scale={{ duration: 120, easing: cubicIn, start: 0.5 }}
				class="col-start-1 row-start-1"
			>
				<IconCopy class="size-5" />
			</span>
		{/if}
	</div>
</button>
