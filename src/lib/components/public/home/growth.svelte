<script lang="ts">
	import * as Carousel from "$lib/components/ui/carousel/index.js";
	import type { CarouselAPI } from "$lib/components/ui/carousel/context.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import GlobeIcon from "@lucide/svelte/icons/globe";
	import FilterIcon from "@lucide/svelte/icons/filter";
	import ZapIcon from "@lucide/svelte/icons/zap";
	import BarChart3Icon from "@lucide/svelte/icons/bar-chart-3";
	import LayoutGridIcon from "@lucide/svelte/icons/layout-grid";

	const slides = [
		{
			title: "Lead Infrastructure",
			description:
				"The foundation of high-converting websites, SEO strategy, structured content systems, and clear offer positioning.",
			icon: GlobeIcon,
			iconColor: "text-chart-1",
		},
		{
			title: "Capture Infrastructure",
			description:
				"Funnel logic, CRM setup and optimization, form integrations, and proper lead routing that connects every step.",
			icon: FilterIcon,
			iconColor: "text-chart-2",
		},
		{
			title: "Automation Infrastructure",
			description:
				"Follow-up workflows, onboarding systems, internal process automation, and client reporting automation that run on their own.",
			icon: ZapIcon,
			iconColor: "text-chart-3",
		},
		{
			title: "Visibility Infrastructure",
			description:
				"Analytics setup, performance dashboards, revenue tracking, and operational reporting that give you full visibility.",
			icon: BarChart3Icon,
			iconColor: "text-destructive",
		},
		{
			title: "Operational Infrastructure",
			description:
				"Workflow design, internal systems, role clarity, and structured execution processes that keep everything running smoothly.",
			icon: LayoutGridIcon,
			iconColor: "text-chart-5",
		},
	];

	let api = $state<CarouselAPI | undefined>(undefined);

	function scrollPrev() {
		api?.scrollPrev();
	}

	function scrollNext() {
		api?.scrollNext();
	}
</script>

<section class="py-24">
	<div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-14 text-center">
			<h2
				class="mb-4 max-w-full text-center text-4xl font-bold leading-13 text-foreground lg:mx-auto lg:max-w-3xl"
			>
				What growth infrastructure actually means
			</h2>
			<p
				class="text-lg font-normal leading-[1.8rem] text-muted-foreground lg:mx-auto lg:max-w-3xl"
			>
				This is not just marketing, it's not just automation, it's the
				architecture that supports sustainable growth.
			</p>
		</div>
		<div
			class="mx-auto flex flex-col items-center justify-center gap-8 lg:flex-row xl:justify-between"
		>
			<div class="w-full lg:w-1/4">
				<div
					class="relative h-auto rounded-2xl border border-border/40 dark:border-border/30 bg-background/50 backdrop-blur-md supports-[backdrop-filter]:bg-background/40 dark:bg-background/35 px-6 py-9 xl:h-64"
				>
					<h2
						class="mb-5 text-center text-2xl font-bold leading-9 text-foreground lg:text-left"
					>
						Explore the five layers
					</h2>
					<p
						class="mb-11 text-center text-sm leading-6 text-foreground lg:text-left"
					>
						Use the arrows to navigate through each layer of growth infrastructure
					</p>
					<!-- Carousel controls -->
					<div class="flex items-center justify-center gap-4 lg:justify-start">
						<Button
							type="button"
							size="icon"
							onclick={scrollPrev}
							aria-label="Previous slide"
							class="bg-gradient-to-r from-sky-400 to-violet-500 text-white border-0 shadow-md hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
						>
							<svg
								class="h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
							>
								<path
									d="M10.0002 11.9999L6 7.99971L10.0025 3.99719"
									stroke="currentColor"
									stroke-width="1.6"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</Button>
						<Button
							type="button"
							size="icon"
							onclick={scrollNext}
							aria-label="Next slide"
							class="bg-gradient-to-r from-sky-400 to-violet-500 text-white border-0 shadow-md hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
						>
							<svg
								class="h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
							>
								<path
									d="M5.99984 4.00012L10 8.00029L5.99748 12.0028"
									stroke="currentColor"
									stroke-width="1.6"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</Button>
					</div>
				</div>
			</div>
			<div class="w-full lg:w-3/4">
				<Carousel.Root
					setApi={(emblaApi) => (api = emblaApi)}
					opts={{ loop: true, align: "start" }}
					class="w-full"
				>
					<Carousel.Content
						class="-ms-3 md:-ms-4 lg:-ms-5"
					>
						{#each slides as slide, i (i)}
							{@const Icon = slide.icon}
							<Carousel.Item
								class="basis-full ps-3 md:basis-1/2 md:ps-4 lg:basis-1/3 lg:ps-5"
							>
								<div
									class="relative h-auto w-full rounded-2xl border border-border/40 dark:border-border/30 bg-background/50 backdrop-blur-md supports-[backdrop-filter]:bg-background/40 dark:bg-background/35 px-4 py-4 transition-all duration-500 sm:px-5 sm:py-6 h-64"
								>
									<div class="mb-3">
										<Icon class="size-[26px] {slide.iconColor}" />
									</div>
									<h4 class="mb-2 text-lg font-semibold text-foreground">
										{slide.title}
									</h4>
									<p class="text-sm leading-6 text-foreground">
										{slide.description}
									</p>
								</div>
							</Carousel.Item>
						{/each}
					</Carousel.Content>
				</Carousel.Root>
			</div>
		</div>
	</div>
</section>
