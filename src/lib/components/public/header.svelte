<script lang="ts">
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import { navigationMenuTriggerStyle } from '$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte';
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
					<div class="text-sm font-medium leading-none">{title}</div>
					{#if content}
						<p class="text-muted-foreground line-clamp-2 text-sm leading-snug">{content}</p>
					{/if}
				</a>
			{/snippet}
		</NavigationMenu.Link>
	</li>
{/snippet}

<header
	class="sticky top-0 z-50 flex w-full items-center border-b border-border/40 bg-background/70 px-4 py-4 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 dark:border-border/30 dark:bg-background/50"
>
	<nav class="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
		<a href="/" class="flex shrink-0" aria-label="Home">
			<img src={logo} alt="Codegio" class="h-6 dark:hidden" />
			<img src={logoWhite} alt="Codegio" class="hidden h-6 dark:block" />
		</a>

		<NavigationMenu.Root viewport={!isMobile.current} class="flex flex-1 justify-end">
			<NavigationMenu.List class="flex flex-wrap items-center gap-1">
				{#each navItems as item}
					{#if item.type === 'link'}
						<NavigationMenu.Item>
							<NavigationMenu.Link>
								{#snippet child()}
									<a href={item.href} class={navigationMenuTriggerStyle()}>{item.label}</a>
								{/snippet}
							</NavigationMenu.Link>
						</NavigationMenu.Item>
					{:else}
						<NavigationMenu.Item>
							<NavigationMenu.Trigger>{item.label}</NavigationMenu.Trigger>
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
			<Button variant="ghost" size="icon" onclick={toggleTheme} aria-label="Toggle theme">
				<MoonIcon class="h-4 w-4 dark:hidden" />
				<SunIcon class="hidden h-4 w-4 dark:block" />
			</Button>
			<Button variant="ghost" href="/login">
				<UserIcon class="size-4" />
				Log in
			</Button>
		</div>
	</nav>
</header>
