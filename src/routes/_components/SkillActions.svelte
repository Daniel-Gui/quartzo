<script lang="ts">
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import IconCheck from './IconCheck.svelte';
	import IconCopy from './IconCopy.svelte';

	let { skillContent }: { skillContent: string } = $props();

	let copied = $state(false);
	let isClicking = $state(false);

	function copySkill() {
		navigator.clipboard.writeText(skillContent);
		copied = true;
		isClicking = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div class="flex flex-col items-center gap-3">
	<p class="ds-muted text-xs">Add this skill to your AI agent to auto-configure SEO</p>
	<div class="flex items-center gap-3">
		<button
			onclick={copySkill}
			onanimationend={() => (isClicking = false)}
			class="ds-btn ds-btn-secondary cursor-pointer text-xs"
			class:animate-elastic={isClicking}
			aria-label="Copy AI Skill to clipboard"
		>
			<span class="grid place-items-center">
				{#if copied}
					<span
						in:scale={{ duration: 180, easing: cubicOut, start: 0.5 }}
						out:scale={{ duration: 120, easing: cubicIn, start: 0.5 }}
						class="col-start-1 row-start-1"
					>
						<IconCheck class="size-4" />
					</span>
				{:else}
					<span
						in:scale={{ duration: 180, easing: cubicOut, start: 0.5 }}
						out:scale={{ duration: 120, easing: cubicIn, start: 0.5 }}
						class="col-start-1 row-start-1"
					>
						<IconCopy class="size-4" />
					</span>
				{/if}
			</span>
			{copied ? 'Copied!' : 'Copy AI Skill'}
		</button>

		<a
			href="/SKILL.md"
			download="SKILL.md"
			class="ds-btn ds-btn-primary cursor-pointer text-xs"
			aria-label="Download SKILL.md file"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="size-4"
				aria-hidden="true"
			>
				<path
					d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z"
				/>
				<path
					d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z"
				/>
			</svg>
			Download Skill
		</a>
	</div>
</div>
