<script lang="ts">
	import { formatDate } from '$lib/utils';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
	<header class="mb-6">
		<h1 class="text-3xl font-semibold capitalize text-foreground">{data.meta.title}</h1>
		<p class="mt-2 text-sm text-muted-foreground">
			Published {formatDate(data.meta.date)}
		</p>
		{#if data.meta.categories?.length}
			<div class="mt-4 flex flex-wrap gap-2">
				{#each data.meta.categories as category}
					<span
						class="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
					>
						#{category}
					</span>
				{/each}
			</div>
		{/if}
	</header>

	<div class="prose max-w-none">
		<data.content />
	</div>
</article>
