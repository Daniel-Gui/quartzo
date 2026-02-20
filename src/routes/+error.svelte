<script>
	import { page } from '$app/state';
	import Brand from './_components/Brand.svelte';
</script>

<div class="relative flex flex-1 items-center justify-center overflow-hidden">
	<!-- Decorative Brand Logo Background -->
	<Brand
		class="pointer-events-none absolute top-1/2 left-1/2 h-screen w-auto -translate-x-1/2 -translate-y-1/2 text-mint-200"
	/>

	<!-- Content -->
	<div class="ds-container relative z-10">
		<div class="ds-card">
			<div class="ds-card-body">
				<div class="flex flex-col items-center justify-center gap-8 py-8 text-center">
					<span class="text-8xl font-bold tracking-tighter text-mint-300 sm:text-9xl">
						{page.status}
					</span>

					<div class="space-y-3">
						<h1 class="ds-h2">
							{#if page.status === 404}
								Page not found
							{:else}
								Something went wrong
							{/if}
						</h1>
						<p class="ds-muted text-base leading-relaxed">
							{#if page.status === 404}
								The page you're looking for doesn't exist or has been moved.
							{:else if page.error?.message}
								{page.error.message}
							{:else}
								An unexpected error occurred. Please try again later.
							{/if}
						</p>
					</div>

					<a class="ds-btn ds-btn-primary" href="/">Go Home</a>
				</div>
			</div>
		</div>
	</div>
</div>
