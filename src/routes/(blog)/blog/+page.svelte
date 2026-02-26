<script lang="ts">
	import { siteConfig } from '$lib/config';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import type { Post } from '$lib/types/blog';

	let { data } = $props();
	let posts = $derived(data.posts as Post[]);
</script>

<svelte:head>
	<title>Blog | {siteConfig.title}</title>
	<meta name="description" content={siteConfig.description} />
</svelte:head>

<section class="max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
	<!-- Title -->
	<div class="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
		<h2 class="text-2xl font-bold md:text-4xl md:leading-tight text-foreground">Blog</h2>
		<p class="mt-1 text-muted-foreground">{siteConfig.description}</p>
	</div>
	<!-- End Title -->

	<!-- Grid -->
	<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each posts as post}
			<a
				href="/blog/{post.slug}"
				class="group hover:bg-muted-hover focus:outline-none focus:bg-muted-focus rounded-xl p-5 transition"
			>
				<div class="aspect-video">
					{#if post.image}
						<img
							class="w-full object-cover rounded-xl"
							src={post.image}
							alt={post.title}
						/>
					{:else}
						<div
							class="w-full h-full rounded-xl bg-muted flex items-center justify-center text-foreground/40 text-2xl font-semibold"
							aria-hidden="true"
						>
							{post.title.charAt(0)}
						</div>
					{/if}
				</div>
				<h3 class="mt-5 text-xl text-foreground">
					{post.title}
				</h3>
				<p class="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-foreground">
					Learn more
					<ArrowRightIcon
						class="shrink-0 size-4 transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1"
					/>
				</p>
			</a>
		{/each}
	</div>
	<!-- End Grid -->
</section>
