<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { cn } from "$lib/utils.js";

	const steps = [
		{
			title: "Diagnose the bottleneck.",
			description:
				"We identify what's actually limiting growth — whether it's traffic, conversion, retention, or operational inefficiency. No guesswork, just data.",
		},
		{
			title: "Architect the structure.",
			description:
				"We design a simple, scalable system that grows with you. Clear processes, clean integrations, and a foundation that won't need rebuilding in six months.",
		},
		{
			title: "Implement the infrastructure.",
			description:
				"Web, SEO, CRM, automation, analytics — connected properly. Every tool talks to the next. No silos, no manual handoffs, no wasted effort.",
		},
		{
			title: "Test and optimize.",
			description:
				"Everything must produce measurable results. We track what matters, iterate quickly, and double down on what works.",
		},
	];
</script>

<!-- Approach -->
<div >
	<div class="mx-auto max-w-7xl px-4 py-10 xl:px-0 lg:pt-20 lg:pb-20  sm:px-6 lg:px-8">
		<!-- Title -->
		<div class="mb-10 max-w-3xl lg:mb-14">
			<h2 class="text-2xl font-semibold text-foreground md:text-4xl md:leading-tight">
				HOW I WORK
			</h2>
			<p class="mt-2 text-base leading-relaxed text-muted-foreground md:text-lg">
				Strategy First. Implementation Second. I don't jump into building until we've mapped
				the real problem and the clearest path to solving it. That discipline saves time,
				money, and headaches.
			</p>
		</div>

		<!-- Grid -->
		<div class="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
			<!-- Image -->
			<div class="aspect-w-16 aspect-h-9 lg:aspect-none">
				<img
					class="w-full rounded-xl object-cover"
					src="https://images.unsplash.com/photo-1587614203976-365c74645e83?q=80&w=480&h=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt="Team collaborating on strategic planning"
				/>
			</div>

			<!-- Timeline -->
			<div>
				{#each steps as step, i}
					<div class="ms-1 flex gap-x-5">
						<!-- Icon -->
						<div
							class={cn(
								"relative",
								i < steps.length - 1 &&
									"after:absolute after:top-8 after:bottom-0 after:start-4 after:-translate-x-[0.5px] after:border-s after:border-border"
							)}
						>
							<div class="relative z-10 flex size-8 items-center justify-center">
								<span
									class="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-xs font-semibold uppercase text-primary"
								>
									{i + 1}
								</span>
							</div>
						</div>

						<!-- Content -->
						<div class="grow pb-8 pt-0.5 sm:pb-12">
							<p class="text-sm text-muted-foreground lg:text-base">
								<span class="text-foreground">Step {i + 1} — {step.title}</span>
								{" "}{step.description}
							</p>
						</div>
					</div>
				{/each}

				<p class="mb-6 text-sm italic text-muted-foreground lg:text-base">
					If it doesn't increase revenue or reduce operational friction, it doesn't stay.
				</p>

				<Button href="#">
					<svg
						class="size-4 shrink-0"
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
							d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
						></path>
					</svg>
					Schedule a call
				</Button>
			</div>
		</div>
	</div>
</div>
