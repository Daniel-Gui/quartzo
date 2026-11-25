import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// The adapter gets its own Wrangler config so it doesn't overwrite worker.js (see that file).
	kit: { adapter: adapter({ config: 'wrangler.adapter.jsonc' }) }
};

export default config;
