<script lang="ts">
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import UserIcon from '@lucide/svelte/icons/user';
	import MenuIcon from '@lucide/svelte/icons/menu';
	import RssIcon from '@lucide/svelte/icons/rss';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte.js';
	import { siteConfig, publicNav } from '$lib/config';
	import type { NavItem } from '$lib/types/nav';
	import logo from '$lib/assets/logo.svg';
	import logoWhite from '$lib/assets/logo-white.svg';

	// 1025 = breakpoint 1024px — mobile menu for tablet and mobile
	const isMobileMenu = new IsMobile(1025);
	let mobileMenuOpen = $state(false);

	function hasChildren(item: NavItem): item is NavItem & { items: NavItem[] } {
		return Array.isArray(item.items) && item.items.length > 0;
	}

	function toggleTheme() {
		const isDark = document.documentElement.classList.toggle('dark');
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	}

	type ListItemProps = HTMLAttributes<HTMLAnchorElement> & {
		title: string;
		href: string;
		content?: string;
	};
</script>

{#snippet ListItem({ title, content, href, class: className, ...restProps }: ListItemProps)}
	<li>
		<NavigationMenu.Link>
			{#snippet child()}
				<a
					{href}
					class={cn(
						'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none',
						className
					)}
					{...restProps}
				>
					<div class="text-sm font-medium leading-none text-foreground">{title}</div>
					{#if content}
						<p class="text-muted-foreground line-clamp-2 text-sm leading-snug">{content}</p>
					{/if}
				</a>
			{/snippet}
		</NavigationMenu.Link>
	</li>
{/snippet}

<header
	class="sticky top-0 z-50 flex w-full items-center border-b border-border/40 bg-background/70 px-4 py-3 backdrop-blur-md supports-backdrop-filter:bg-background/60 dark:border-border/30 dark:bg-background/50 sm:px-6 lg:py-4"
>
	<nav class="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 sm:gap-4">
		<a href="/" class="flex shrink-0" aria-label="Home">
			<img src={logo} alt={siteConfig.title} class="h-5 w-auto sm:h-6 dark:hidden" />
			<img src={logoWhite} alt={siteConfig.title} class="hidden h-5 w-auto sm:h-6 dark:block" />
		</a>

		{#if isMobileMenu.current}
			<!-- Mobile: hamburger + RSS + theme + log in -->
			<div class="flex flex-1 items-center justify-end gap-1 sm:gap-2">
				<Sheet.Root bind:open={mobileMenuOpen}>
					<Sheet.Trigger
						class="inline-flex size-9 items-center justify-center rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
						aria-label="Open menu"
					>
						<MenuIcon class="size-5" />
					</Sheet.Trigger>
					<Sheet.Content side="left" class="w-[min(320px,85vw)]">
						<Sheet.Header class="border-b pb-4">
							<Sheet.Title class="text-lg font-semibold text-foreground">Menu</Sheet.Title>
						</Sheet.Header>
						<nav class="flex flex-col gap-1 pt-4">
							{#each publicNav as item (item.title + (item.url ?? '') + (item.items?.length ?? 0))}
								{#if hasChildren(item)}
									<div class="border-b border-border/40 pb-3">
										<div class="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
											{item.title}
										</div>
										<div class="flex flex-col gap-0.5">
											{#each item.items as child (child.url ?? child.title)}
												{#if !child.disabled}
													<a
														href={child.url ?? '#'}
														class="text-foreground hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 text-sm transition-colors"
														onclick={() => (mobileMenuOpen = false)}
														target={child.external ? '_blank' : undefined}
														rel={child.external ? 'noopener noreferrer' : undefined}
													>
														{child.title}
													</a>
												{/if}
											{/each}
										</div>
									</div>
								{:else if !item.disabled}
									<a
										href={item.url ?? '#'}
										class="text-foreground hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
										onclick={() => (mobileMenuOpen = false)}
										target={item.external ? '_blank' : undefined}
										rel={item.external ? 'noopener noreferrer' : undefined}
									>
										{item.title}
									</a>
								{/if}
							{/each}
							<a
								href="/rss.xml"
								target="_blank"
								rel="noopener noreferrer"
								class="text-foreground hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2.5 text-sm font-medium transition-colors flex items-center gap-2"
								onclick={() => (mobileMenuOpen = false)}
							>
								<RssIcon class="size-4" />
								RSS Feed
							</a>
						</nav>
					</Sheet.Content>
				</Sheet.Root>
				<Button variant="ghost" size="icon" href="/rss.xml" target="_blank" aria-label="RSS feed" class="text-foreground">
					<RssIcon class="size-4 sm:size-4" />
				</Button>
				<Button variant="ghost" size="icon" onclick={toggleTheme} aria-label="Toggle theme" class="text-foreground">
					<MoonIcon class="size-4 sm:size-4 dark:hidden" />
					<SunIcon class="hidden size-4 dark:block sm:size-4" />
				</Button>
				<!-- <Button variant="ghost" href="/sign-in" size="default" class="text-foreground">
					<UserIcon class="size-4" />
					Log in
				</Button> -->
				<Button variant="ghost" href="/sign-in" size="icon" aria-label="Log in" class="text-foreground">
					<UserIcon class="size-4" />
				</Button>
			</div>
		{:else}
			<!-- Desktop: public nav + RSS + theme + log in -->
			<NavigationMenu.Root viewport={true} class="flex flex-1 justify-end">
				<NavigationMenu.List class="flex flex-wrap items-center gap-1">
					{#each publicNav as item (item.title + (item.url ?? '') + (item.items?.length ?? 0))}
						{#if hasChildren(item)}
							<NavigationMenu.Item>
								<NavigationMenu.Trigger
									class="bg-transparent! text-foreground data-[state=open]:bg-accent/50!"
									>{item.title}</NavigationMenu.Trigger
								>
								<NavigationMenu.Content>
									<ul class="grid w-[200px] gap-2 p-2 sm:w-[280px]">
										{#each item.items as child (child.url ?? child.title)}
											{#if !child.disabled}
												{@render ListItem({
													href: child.url ?? '#',
													title: child.title,
													content: child.label
												})}
											{/if}
										{/each}
									</ul>
								</NavigationMenu.Content>
							</NavigationMenu.Item>
						{:else if !item.disabled}
							<NavigationMenu.Item>
								<NavigationMenu.Link>
									{#snippet child()}
										<a
											href={item.url ?? '#'}
											class="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
											target={item.external ? '_blank' : undefined}
											rel={item.external ? 'noopener noreferrer' : undefined}
											>{item.title}</a
										>
									{/snippet}
								</NavigationMenu.Link>
							</NavigationMenu.Item>
						{/if}
					{/each}
				</NavigationMenu.List>
			</NavigationMenu.Root>
			<div class="flex shrink-0 items-center gap-2">
				<Button variant="ghost" size="icon" href="/rss.xml" target="_blank" aria-label="RSS feed" class="text-foreground">
					<RssIcon class="size-4 w-4" />
				</Button>
				<Button variant="ghost" size="icon" onclick={toggleTheme} aria-label="Toggle theme" class="text-foreground">
					<MoonIcon class="size-4 w-4 dark:hidden" />
					<SunIcon class="hidden size-4 w-4 dark:block" />
				</Button>
				<Button variant="ghost" href="/sign-in" class="text-foreground">
					<UserIcon class="size-4" />
					Log in
				</Button>
			</div>
		{/if}
	</nav>
</header>
