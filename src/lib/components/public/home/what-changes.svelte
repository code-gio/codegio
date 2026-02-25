<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import UsersIcon from "@lucide/svelte/icons/users";
	import BarChart3Icon from "@lucide/svelte/icons/bar-chart-3";
	import LayoutGridIcon from "@lucide/svelte/icons/layout-grid";
	import ZapIcon from "@lucide/svelte/icons/zap";
	import ClockIcon from "@lucide/svelte/icons/clock";

	const benefits = [
		{
			title: "Sustainable Revenue",
			description:
				"Systems that run without you constantly pushing. Growth that compounds.",
			icon: TrendingUpIcon,
			iconColor: "text-chart-2",
		},
		{
			title: "Lead Capture",
			description:
				"Every lead gets tracked, scored, and followed up. No one falls through the cracks.",
			icon: UsersIcon,
			iconColor: "text-chart-3",
		},
		{
			title: "Clear Visibility",
			description:
				"Know exactly what's working. Dashboards and metrics that drive decisions.",
			icon: BarChart3Icon,
			iconColor: "text-destructive",
		},
		{
			title: "Team Structure",
			description:
				"Clear processes, defined roles. Less firefighting, more execution.",
			icon: LayoutGridIcon,
			iconColor: "text-chart-1",
		},
		{
			title: "Marketing Integration",
			description:
				"Campaigns that flow into your CRM, automation, and analytics. No manual handoffs.",
			icon: ZapIcon,
			iconColor: "text-chart-5",
		},
		{
			title: "Time Saving",
			description:
				"Optimize your workflow and maximize your output.",
			icon: ClockIcon,
			iconColor: "text-chart-4",
		},
	];
</script>

<section class="py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 max-w-3xl mx-auto xl:max-w-full">
			<span
				class="mb-2 block text-center text-sm font-normal uppercase text-muted-foreground lg:text-left"
			>
				WHAT THIS CHANGES
			</span>
			<h2
				class="text-center text-4xl font-semibold leading-[3.2rem] text-foreground lg:text-left"
			>
				What Strong Infrastructure <span class="text-primary">Produces</span>
			</h2>
		</div>

		<div
			class="mx-auto grid max-w-md grid-cols-1 gap-x-5 gap-y-5 sm:max-w-3xl sm:grid-cols-2 xl:max-w-full xl:grid-cols-4 xl:gap-x-8 xl:gap-y-8"
		>
			{#each benefits.slice(0, 4) as benefit}
				<Card.Root
					class="relative w-full flex flex-col gap-2 rounded-2xl border-border p-4 transition-all duration-500 xl:p-7"
				>
					<Card.Header class="p-0">
						<div class="mb-6">
							<svelte:component
								this={benefit.icon}
								class="size-[26px] {benefit.iconColor}"
							/>
						</div>
						<Card.Title class="mb-2 text-base font-semibold text-foreground transition-all duration-500">
							{benefit.title}
						</Card.Title>
					</Card.Header>
					<Card.Content class="p-0">
						<p class="text-sm font-normal leading-5 text-muted-foreground">
							{benefit.description}
						</p>
					</Card.Content>
				</Card.Root>
			{/each}

			<!-- CTA block - spans 2 cols, order-last on mobile -->
			<div
				class="relative order-last mt-8 w-full rounded-2xl transition-all duration-500 sm:col-span-2 lg:order-0 xl:mt-0"
			>
				<p
					class="mb-9 text-center text-base font-medium leading-6 text-foreground xl:text-left"
				>
					Instead of patching problems, you build leverage.
				</p>
				<div
					class="flex flex-col items-center justify-center gap-7 xl:flex-row xl:justify-start"
				>
					<Button href="#">Schedule a call</Button>
					<span class="text-sm font-normal text-muted-foreground">
						*Terms &amp; Conditions apply
					</span>
				</div>
			</div>

			<!-- 5th and 6th cards -->
			{#each benefits.slice(4, 6) as benefit}
				<Card.Root
					class="relative w-full flex flex-col gap-2 rounded-2xl border-border p-4 transition-all duration-500 xl:p-7"
				>
					<Card.Header class="p-0">
						<div class="mb-6">
							<svelte:component
								this={benefit.icon}
								class="size-[26px] {benefit.iconColor}"
							/>
						</div>
						<Card.Title class="mb-2 text-base font-semibold text-foreground transition-all duration-500">
							{benefit.title}
						</Card.Title>
					</Card.Header>
					<Card.Content class="p-0">
						<p class="text-sm font-normal leading-5 text-muted-foreground">
							{benefit.description}
						</p>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</div>
</section>
