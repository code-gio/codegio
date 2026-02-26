<script lang="ts">
	import { formatDate } from '$lib/utils';
	import { siteConfig } from '$lib/config';
	import type { Post } from '$lib/types/blog';

	let { data } = $props();
	let posts = $derived(data.posts as Post[]);
</script>

<svelte:head>
	<title>Blog | {siteConfig.title}</title>
	<meta name="description" content={siteConfig.description} />
</svelte:head>

<section>
	<h1 class="mb-8 text-3xl font-semibold text-foreground">Blog</h1>
	<ul class="flex flex-col gap-8">
		{#each posts as post}
			<li class="border-b border-border/40 pb-8 last:border-b-0">
				<a
					href="/blog/{post.slug}"
					class="block text-2xl font-medium text-foreground underline-offset-4 hover:underline"
				>
					{post.title}
				</a>
				<p class="mt-1 text-sm text-muted-foreground">{formatDate(post.date)}</p>
				<p class="mt-2 text-muted-foreground">{post.description}</p>
			</li>
		{/each}
	</ul>
</section>
