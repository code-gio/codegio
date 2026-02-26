<script lang="ts">
	import './layout.css';
	import { siteConfig } from '$lib/config';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation'
	let { data, children } = $props();
	let { supabase, session } = $derived(data);

	function applyTheme() {
		const stored = localStorage.getItem('theme');
		// Default to dark unless user explicitly chose light
		if (stored === 'light') document.documentElement.classList.remove('dark');
		else document.documentElement.classList.add('dark');
	}

	onMount(() => {
		const { data: authData } = supabase.auth.onAuthStateChange((_event: string, _session: import('@supabase/supabase-js').Session | null) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})
		applyTheme();
		return () => {
			authData.subscription.unsubscribe()
		};
	});
</script>

<svelte:head>
	<title>{siteConfig.title}</title>
	<meta name="description" content={siteConfig.description} />
	<link rel="icon" href={siteConfig.favicon} type="image/svg+xml" />
	<link rel="icon" href={siteConfig.faviconDark} type="image/svg+xml" media="(prefers-color-scheme: dark)" />
</svelte:head>
{@render children()}
