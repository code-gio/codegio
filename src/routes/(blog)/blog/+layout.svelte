<script lang="ts">
	import BlogHeader from '$lib/components/blog/blog-header.svelte';
	import Footer from '$lib/components/public/footer.svelte';
	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col bg-background text-foreground">
	<BlogHeader />
	<main class="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
		{@render children?.()}
	</main>
	<Footer />
</div>
