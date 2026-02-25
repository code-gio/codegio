<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';

	let { children } = $props();

	function applyTheme() {
		const stored = localStorage.getItem('theme');
		const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
		if (stored === 'dark' || (!stored && prefersDark)) document.documentElement.classList.add('dark');
		else document.documentElement.classList.remove('dark');
	}

	onMount(applyTheme);
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
