<script lang="ts">
	import { siteConfig } from "$lib/config";
	import DarkModeToggle from "$lib/components/shared/dark-mode-toggle.svelte";
	const { children } = $props();
</script>

<main class="flex min-h-screen bg-background">
	<!-- Sidebar: hidden on mobile, visible from lg -->
	<aside
		class="hidden min-h-screen lg:flex lg:w-md xl:w-[430px] flex-col justify-between bg-muted/50 border-e border-border p-6"
		aria-label="Auth sidebar"
	>
		<!-- Sidebar header -->
		<div class="flex flex-wrap justify-between items-center gap-2">
			<a
				href="/"
				class="rounded-md text-xl font-semibold inline-flex items-center gap-2 focus:outline-none focus:opacity-80 focus:ring-2 focus:ring-ring"
				aria-label={siteConfig.title}
			>
				<img
					src={siteConfig.logo}
					alt=""
					class="h-8 w-auto dark:hidden"
				/>
				<img
					src={siteConfig.logoDark}
					alt=""
					class="hidden h-8 w-auto dark:block"
				/>
			</a>
		</div>

		<!-- Sidebar body -->
		<div class="space-y-6">
			<p class="text-2xl font-medium text-foreground leading-snug">
				{siteConfig.description}
			</p>
		</div>

		<!-- Sidebar footer -->
		<div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
			<span>© {new Date().getFullYear()} {siteConfig.title}</span>
			<a
				href="/terms"
				class="underline-offset-4 hover:text-foreground hover:underline focus:outline-none focus:underline"
			>
				Terms
			</a>
			<a
				href="/privacy"
				class="underline-offset-4 hover:text-foreground hover:underline focus:outline-none focus:underline"
			>
				Privacy
			</a>
			<DarkModeToggle />
		</div>
	</aside>

	<!-- Content: form area on the right -->
	<div class="grow flex flex-col min-h-screen">
		<!-- Mobile-only header with logo -->
		<header
			class="flex lg:hidden flex-wrap justify-center items-center w-full py-4 px-4 border-b border-border"
		>
			<a href="/" aria-label={siteConfig.title}>
				<img
					src={siteConfig.logo}
					alt=""
					class="h-4 dark:hidden"
				/>
				<img
					src={siteConfig.logoDark}
					alt=""
					class="hidden h-4 dark:block"
				/>
			</a>
		</header>

		<div
			class="flex-1 flex flex-col justify-center px-4 sm:px-5 py-6 sm:py-8"
		>
			<div
				class="mx-auto w-full max-w-sm sm:max-w-md flex flex-col justify-center gap-6"
			>
				{@render children()}
			</div>
		</div>
	</div>
</main>
