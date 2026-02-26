<script lang="ts">
	import { formatDate } from '$lib/utils';
	import { siteConfig } from '$lib/config';
	let { data } = $props();

	let shareOpen = $state(false);

	function toggleShare() {
		shareOpen = !shareOpen;
	}

	function copyLink() {
		navigator.clipboard.writeText(shareUrl).then(() => {
			shareOpen = false;
		});
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (shareOpen && !target.closest('[data-share-dropdown]')) {
			shareOpen = false;
		}
	}

	$effect(() => {
		if (typeof document === 'undefined') return;
		if (shareOpen) {
			document.addEventListener('click', handleClickOutside);
			return () => document.removeEventListener('click', handleClickOutside);
		}
	});

	const shareUrl = $derived(`${siteConfig.url}/blog/${data.slug}`);
	const twitterShareUrl = $derived(
		`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(data.meta.title)}`
	);
	const facebookShareUrl = $derived(
		`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
	);
	const linkedInShareUrl = $derived(
		`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
	);

	const author = siteConfig.author;
	const firstCategory = $derived(data.meta.categories?.[0]);
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<div class="max-w-340 px-4 sm:px-6 lg:px-8 mx-auto">
	<div class="grid lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-6">
		<!-- Content -->
		<div class="lg:col-span-2">
			<div class="py-8 lg:pe-8">
				<div class="space-y-5 lg:space-y-8">
					<a
						href="/blog"
						class="inline-flex items-center gap-x-1.5 text-sm text-muted-foreground decoration-2 hover:underline focus:outline-none focus:underline"
					>
						<svg
							class="shrink-0 size-4"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="m15 18-6-6 6-6" />
						</svg>
						Back to Blog
					</a>

					<h1 class="text-3xl font-bold lg:text-5xl text-foreground">
						{data.meta.title}
					</h1>

					<div class="flex items-center gap-x-5">
						{#if firstCategory}
							<a
								href="/blog"
								class="inline-flex items-center gap-1.5 py-1 px-3 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm bg-muted text-foreground hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary"
							>
								{firstCategory}
							</a>
						{/if}
						<p class="text-xs sm:text-sm text-foreground">
							{formatDate(data.meta.date)}
						</p>
					</div>

					<div class="prose prose-lg max-w-none text-foreground space-y-5 lg:space-y-8">
						<data.content />
					</div>

					<div
						class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-y-5 lg:gap-y-0"
					>
						<!-- Badges/Tags -->
						{#if data.meta.categories?.length}
							<div>
								{#each data.meta.categories as category}
									<a
										href="/blog"
										class="m-0.5 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-muted text-foreground hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary"
									>
										{category}
									</a>
								{/each}
							</div>
						{/if}
						<!-- End Badges/Tags -->

						<div class="flex justify-end items-center gap-x-1.5">
							<button
								type="button"
								class="flex items-center gap-x-2 text-sm text-muted-foreground hover:text-foreground focus:outline-none focus:text-foreground"
								title="Like"
							>
								<svg
									class="shrink-0 size-4"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path
										d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
									/>
								</svg>
								0
							</button>

							<div class="block h-3 border-e border-border mx-3"></div>

							<button
								type="button"
								class="flex items-center gap-x-2 text-sm text-muted-foreground hover:text-foreground focus:outline-none focus:text-foreground"
								title="Comment"
							>
								<svg
									class="shrink-0 size-4"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path
										d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"
									/>
								</svg>
								0
							</button>

							<div class="block h-3 border-e border-border mx-3"></div>

							<!-- Share dropdown -->
							<div class="relative inline-flex" data-share-dropdown>
								<button
									type="button"
									onclick={toggleShare}
									class="flex items-center gap-x-2 text-sm text-muted-foreground hover:text-foreground focus:outline-none focus:text-foreground"
									aria-haspopup="menu"
									aria-expanded={shareOpen}
									aria-label="Share menu"
								>
									<svg
										class="shrink-0 size-4"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
										<polyline points="16 6 12 2 8 6" />
										<line x1="12" x2="12" y1="2" y2="15" />
									</svg>
									Share
								</button>
								{#if shareOpen}
									<div
										class="absolute right-0 top-full mt-1 z-10 w-56 bg-background border border-border shadow-lg rounded-xl p-2"
										role="menu"
									>
										<button
											type="button"
											onclick={copyLink}
											class="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-foreground hover:bg-muted focus:outline-none focus:bg-muted"
										>
											<svg
												class="shrink-0 size-4"
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
											>
												<path
													d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
												/>
												<path
													d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
												/>
											</svg>
											Copy link
										</button>
										<div class="border-t border-border my-2"></div>
										<a
											href={twitterShareUrl}
											target="_blank"
											rel="noopener noreferrer"
											class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-foreground hover:bg-muted focus:outline-none focus:bg-muted"
										>
											<svg
												class="shrink-0 size-4"
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												viewBox="0 0 16 16"
											>
												<path
													d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
												/>
											</svg>
											Share on Twitter
										</a>
										<a
											href={facebookShareUrl}
											target="_blank"
											rel="noopener noreferrer"
											class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-foreground hover:bg-muted focus:outline-none focus:bg-muted"
										>
											<svg
												class="shrink-0 size-4"
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												viewBox="0 0 16 16"
											>
												<path
													d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
												/>
											</svg>
											Share on Facebook
										</a>
										<a
											href={linkedInShareUrl}
											target="_blank"
											rel="noopener noreferrer"
											class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-foreground hover:bg-muted focus:outline-none focus:bg-muted"
										>
											<svg
												class="shrink-0 size-4"
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												viewBox="0 0 16 16"
											>
												<path
													d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
												/>
											</svg>
											Share on LinkedIn
										</a>
									</div>
								{/if}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- End Content -->

		<!-- Sidebar -->
		<div
			class="lg:col-span-1 lg:w-full lg:h-full lg:bg-linear-to-r lg:from-background lg:via-transparent lg:to-transparent"
		>
			<div class="sticky top-0 inset-s-0 py-8 lg:ps-8">
				{#if author}
					<!-- Avatar Media -->
					<div
						class="group flex items-center gap-x-3 border-b border-border pb-8 mb-8"
					>
						<a
							class="block shrink-0 focus:outline-none"
							href={author.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								class="size-10 rounded-full"
								src={author.avatar}
								alt={author.name}
							/>
						</a>

						<a
							class="group grow block focus:outline-none"
							href={author.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							<h5
								class="group-hover:text-muted-foreground text-sm font-semibold text-foreground"
							>
								{author.name}
							</h5>
							<p class="text-sm text-muted-foreground">
								{author.role}
							</p>
						</a>

						<div class="grow">
							<div class="flex justify-end">
								<a
									href={author.url}
									target="_blank"
									rel="noopener noreferrer"
									class="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg bg-primary border border-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
								>
									<svg
										class="shrink-0 size-4"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path
											d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
										/>
										<circle cx="9" cy="7" r="4" />
										<line x1="19" x2="19" y1="8" y2="14" />
										<line x1="22" x2="16" y1="11" y2="11" />
									</svg>
									Follow
								</a>
							</div>
						</div>
					</div>
					<!-- End Avatar Media -->
				{/if}

				{#if data.relatedPosts?.length}
					<div class="space-y-6">
						{#each data.relatedPosts as post}
							<a
								class="group flex items-center gap-x-6 focus:outline-none"
								href="/blog/{post.slug}"
							>
								<div class="grow min-w-0">
									<span
										class="text-sm font-bold text-foreground group-hover:text-primary group-focus:text-primary line-clamp-2"
									>
										{post.title}
									</span>
								</div>
								<div
									class="shrink-0 relative rounded-lg overflow-hidden size-20 bg-muted"
								>
									<!-- Placeholder when no image in post; optional: use post.image when added to type -->
								</div>
							</a>
						{/each}
					</div>
				{/if}
			</div>
		</div>
		<!-- End Sidebar -->
	</div>
</div>
