<script lang="ts">
	import { page } from '$app/stores';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import UserIcon from '@lucide/svelte/icons/user';
	import MenuIcon from '@lucide/svelte/icons/menu';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte.js';
	import logo from '$lib/assets/logo.svg';
	import logoWhite from '$lib/assets/logo-white.svg';

	const isHome = $derived($page?.url?.pathname === '/');

	// 1025 = breakpoint 1024px — mobile menu for tablet and mobile
	const isMobileMenu = new IsMobile(1025);
	let mobileMenuOpen = $state(false);

	type NavLink = { type: 'link'; label: string; href: string };
	type NavDropdown = {
		type: 'dropdown';
		label: string;
		links: { title: string; href: string; description?: string }[];
	};

	const navItems: (NavLink | NavDropdown)[] = [
		{ type: 'link', label: 'Landing', href: '/' },
		{ type: 'link', label: 'Account', href: '/account' },
		{ type: 'link', label: 'Work', href: '/work' },
		{ type: 'link', label: 'Blog', href: '/blog' },
		{
			type: 'dropdown',
			label: 'More',
			links: [
				{ title: 'About', href: '/about', description: 'Learn more about us.' },
				{ title: 'Downloads', href: '/downloads', description: 'Get our resources.' },
				{ title: 'Team Account', href: '/team', description: 'Manage your team.' }
			]
		}
	];

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
	class="sticky top-0 z-50 flex w-full items-center border-b border-border/40 bg-background/70 px-4 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 dark:border-border/30 dark:bg-background/50 sm:px-6 lg:py-4"
>
	<nav class="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 sm:gap-4">
		<a href="/" class="flex shrink-0" aria-label="Home">
			<img src={logo} alt="Codegio" class="h-5 w-auto sm:h-6 dark:hidden" />
			<img src={logoWhite} alt="Codegio" class="hidden h-5 w-auto sm:h-6 dark:block" />
		</a>

		{#if isMobileMenu.current}
			<!-- Mobile: hamburger + actions -->
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
							{#each navItems as item}
								{#if item.type === 'link'}
									<a
										href={item.href}
										class="text-foreground hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
										onclick={() => (mobileMenuOpen = false)}
									>
										{item.label}
									</a>
								{:else}
									<div class="border-b border-border/40 pb-3">
										<div class="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
											{item.label}
										</div>
										<div class="flex flex-col gap-0.5">
											{#each item.links as link (link.href)}
												<a
													href={link.href}
													class="text-foreground hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 text-sm transition-colors"
													onclick={() => (mobileMenuOpen = false)}
												>
													{link.title}
												</a>
											{/each}
										</div>
									</div>
								{/if}
							{/each}
						</nav>
					</Sheet.Content>
				</Sheet.Root>
				{#if !isHome}
					<Button variant="ghost" size="icon" onclick={toggleTheme} aria-label="Toggle theme" class="text-foreground">
						<MoonIcon class="size-4 sm:size-4 dark:hidden" />
						<SunIcon class="hidden size-4 dark:block sm:size-4" />
					</Button>
				{/if}
				<Button variant="ghost" href="/login" size="default" class="text-foreground">
					<UserIcon class="size-4" />
					Log in
				</Button>
				<Button variant="ghost" href="/login" size="icon" aria-label="Log in" class="text-foreground">
					<UserIcon class="size-4" />
				</Button>
			</div>
		{:else}
			<!-- Desktop: full nav -->
			<NavigationMenu.Root viewport={true} class="flex flex-1 justify-end">
				<NavigationMenu.List class="flex flex-wrap items-center gap-1">
					{#each navItems as item}
						{#if item.type === 'link'}
							<NavigationMenu.Item>
								<NavigationMenu.Link>
									{#snippet child()}
										<a
											href={item.href}
											class="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
											>{item.label}</a
										>
									{/snippet}
								</NavigationMenu.Link>
							</NavigationMenu.Item>
						{:else}
							<NavigationMenu.Item>
								<NavigationMenu.Trigger
									class="bg-transparent! text-foreground data-[state=open]:bg-accent/50!"
									>{item.label}</NavigationMenu.Trigger
								>
								<NavigationMenu.Content>
									<ul class="grid w-[200px] gap-2 p-2 sm:w-[280px]">
										{#each item.links as link (link.href)}
											{@render ListItem({
												href: link.href,
												title: link.title,
												content: link.description
											})}
										{/each}
									</ul>
								</NavigationMenu.Content>
							</NavigationMenu.Item>
						{/if}
					{/each}
				</NavigationMenu.List>
			</NavigationMenu.Root>

			<div class="flex shrink-0 items-center gap-2">
				{#if !isHome}
					<Button variant="ghost" size="icon" onclick={toggleTheme} aria-label="Toggle theme" class="text-foreground">
						<MoonIcon class="size-4 w-4 dark:hidden" />
						<SunIcon class="hidden size-4 w-4 dark:block" />
					</Button>
				{/if}
				<Button variant="ghost" href="/login" class="text-foreground">
					<UserIcon class="size-4" />
					Log in
				</Button>
			</div>
		{/if}
	</nav>
</header>
