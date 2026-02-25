<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
	import DownloadIcon from "@lucide/svelte/icons/download";
</script>

<div class="hero-text z-1 flex flex-col items-center text-center gap-6 text-foreground sm:items-start sm:text-left">
	<div class="inline-flex items-center gap-2.5 text-sm font-medium uppercase tracking-[0.16em] text-sky-400">
		<span
			class="hidden size-2.5 rounded-full bg-sky-400 shadow-[0_0_16px_rgba(56,189,248,0.9)] sm:inline-block"
			aria-hidden="true"
		></span>
		<span>Growth Infrastructure &amp; Automation</span>
	</div>

	<h1
		class="text-[clamp(2.4rem,3.3vw+1rem,3.8rem)] font-bold leading-[1.05] tracking-tight text-foreground"
	>
		Lets Design the Infrastructure That
		<span
			class="block bg-linear-to-r from-sky-400 via-violet-500 to-orange-500 bg-clip-text text-transparent"
		>
			Grows Your Business.
		</span>
	</h1>



	<p class="max-w-136 text-[0.98rem] leading-[1.7] text-muted-foreground">
		Most businesses don't struggle because of effort.
		They struggle because their growth is built on disconnected systems.
		I help service businesses and operators design and implement the infrastructure that drives
		consistent revenue, operational clarity, and scalable growth.
	</p>

	<div class="mt-3 flex flex-wrap justify-center gap-3.5 sm:justify-start">
		<div class="w-full sm:w-auto">
			<Button
				href="#"
				size="lg"
				class="bg-gradient-to-r from-sky-400 to-violet-500 text-white border-0 shadow-md hover:brightness-110 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-all duration-200"
			>
				Build My Growth Infrastructure
				<ArrowRightIcon class="size-4" />
			</Button>
		</div>
		<div class="w-full sm:w-auto">
			<Button
				type="button"
				variant="outline"
				size="lg"
				class="border-2 bg-gradient-to-r from-sky-400/10 to-violet-500/10 hover:from-sky-400 hover:to-violet-500 hover:text-white hover:border-transparent transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
			>
				<DownloadIcon class="size-4" />
				Download the Systems Checklist
			</Button>
		</div>
	</div>
</div>
