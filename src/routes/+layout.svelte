<script lang="ts">
	import './layout.css';
	import '$lib/styles/cursor-aurora.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';

	let { children } = $props();

	function applyTheme() {
		const stored = localStorage.getItem('theme');
		// Default to dark unless user explicitly chose light
		if (stored === 'light') document.documentElement.classList.remove('dark');
		else document.documentElement.classList.add('dark');
	}

	onMount(() => {
		applyTheme();

		const dot = document.getElementById('cursor-dot');
		const ring = document.getElementById('cursor-ring');
		if (!dot || !ring) return;

		document.body.classList.add('custom-cursor');

		let mx = 0;
		let my = 0;
		let rx = 0;
		let ry = 0;
		let rafId: number;

		function onMouseMove(e: MouseEvent) {
			mx = e.clientX;
			my = e.clientY;
			dot!.style.left = `${mx}px`;
			dot!.style.top = `${my}px`;
		}

		function lerpRing() {
			rx += (mx - rx) * 0.14;
			ry += (my - ry) * 0.14;
			ring!.style.left = `${rx}px`;
			ring!.style.top = `${ry}px`;
			rafId = requestAnimationFrame(lerpRing);
		}
		rafId = requestAnimationFrame(lerpRing);

		document.addEventListener('mousemove', onMouseMove);

		return () => {
			document.body.classList.remove('custom-cursor');
			document.removeEventListener('mousemove', onMouseMove);
			cancelAnimationFrame(rafId);
		};
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<!-- Cursor -->
<div id="cursor-dot" aria-hidden="true"></div>
<div id="cursor-ring" aria-hidden="true"></div>
<!-- Aurora BG -->
<div class="aurora" aria-hidden="true">
	<div class="aurora-blob"></div>
	<div class="aurora-blob"></div>
	<div class="aurora-blob"></div>
</div>
<div class="noise" aria-hidden="true"></div>
{@render children()}
