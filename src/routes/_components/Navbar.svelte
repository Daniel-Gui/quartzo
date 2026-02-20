<script lang="ts">
	import IconGithub from './IconGithub.svelte';
	import IconNpm from './IconNpm.svelte';
	import Brand from './Brand.svelte';

	type Props = {
		githubUrl?: string;
		npmUrl?: string;
	};

	let {
		githubUrl = 'https://github.com/Daniel-Gui/quartzo',
		npmUrl = 'https://www.npmjs.com/package/quartzo'
	}: Props = $props();

	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	const links = [
		{ href: '#hero', label: 'Install' },
		{ href: '#usage', label: 'Usage' },
		{ href: '#faq', label: 'FAQ' }
	];
</script>

<nav class="ds-navbar">
	<div class="ds-navbar-container">
		<!-- Logo -->
		<div class="flex items-center gap-2">
			<a href="/" class="ds-navbar-brand" onclick={closeMenu}>
				<Brand class="h-8 w-auto" />
			</a>
		</div>

		<!-- Desktop Navigation -->
		<div class="hidden items-center gap-8 md:flex">
			{#each links as link (link.href)}
				<a href={link.href} class="ds-nav-link">
					{link.label}
				</a>
			{/each}
		</div>

		<!-- Social Icons & Actions -->
		<div class="hidden items-center gap-4 md:flex">
			<a
				href={githubUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="ds-nav-icon"
				aria-label="GitHub"
			>
				<IconGithub class="size-5" />
			</a>
			<a
				href={npmUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="ds-nav-icon"
				aria-label="NPM"
			>
				<IconNpm class="size-5" />
			</a>
		</div>

		<!-- Mobile Menu Button -->
		<div class="flex md:hidden">
			<button
				type="button"
				class="ds-nav-icon focus:outline-none"
				onclick={toggleMenu}
				aria-label="Menu"
			>
				{#if isMenuOpen}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="size-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="size-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<div class="border-t border-white/20 bg-white/95 backdrop-blur-md md:hidden">
			<div class="flex flex-col space-y-4 px-4 py-6">
				{#each links as link (link.href)}
					<a
						href={link.href}
						class="text-base font-medium text-mint-700 hover:text-mint-900"
						onclick={closeMenu}
					>
						{link.label}
					</a>
				{/each}
				<div class="flex items-center gap-4 border-t border-white/20 pt-4">
					<a
						href={githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="ds-nav-icon flex items-center gap-2"
					>
						<IconGithub class="size-5" />
						<span>GitHub</span>
					</a>
					<a
						href={npmUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="ds-nav-icon flex items-center gap-2"
					>
						<IconNpm class="size-5" />
						<span>NPM</span>
					</a>
				</div>
			</div>
		</div>
	{/if}
</nav>
