<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
</script>

<div class="z-1 flex flex-col gap-6 text-foreground">
	<div class="inline-flex items-center gap-2.5 text-sm font-medium uppercase tracking-[0.16em] text-sky-400">
		<span
			class="size-2.5 rounded-full bg-sky-400 shadow-[0_0_16px_rgba(56,189,248,0.9)]"
			aria-hidden="true"
		></span>
		<span>Growth Infrastructure &amp; Automation</span>
	</div>

	<h1
		class="text-[clamp(2.4rem,3.3vw+1rem,3.8rem)] font-bold leading-[1.05] tracking-tight text-foreground"
	>
		Design the Infrastructure That
		<span
			class="block bg-linear-to-r from-sky-400 via-violet-500 to-orange-500 bg-clip-text text-transparent"
		>
			Grows Your Business.
		</span>
	</h1>

	<p class="max-w-136 text-[0.98rem] font-medium leading-snug text-foreground">
		Most businesses don't struggle because of effort.<br />
		They struggle because their growth is built on disconnected systems.
	</p>

	<p class="max-w-136 text-[0.98rem] leading-[1.7] text-muted-foreground">
		I help service businesses and operators design and implement the infrastructure that drives
		consistent revenue, operational clarity, and scalable growth.
	</p>

	<div class="mt-3 flex flex-wrap gap-3.5">
		<div class="w-full sm:w-auto">
			<Button
				href="#"
				size="lg"
				class="w-full justify-center rounded-full border-0 bg-linear-to-r from-sky-400 to-violet-500 px-6 py-3 text-[0.95rem] font-semibold text-slate-900 shadow-[0_0_0_1px_rgba(15,23,42,0.9),0_18px_40px_rgba(56,189,248,0.35)] transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_0_0_1px_rgba(15,23,42,0.9),0_20px_48px_rgba(56,189,248,0.45)] active:translate-y-0 active:scale-[0.99] sm:w-auto"
			>
				<span>Build My Growth Infrastructure</span>
				<span
					class="inline-flex size-4.5 items-center justify-center rounded-full border border-slate-900/90 bg-slate-950 text-xs text-white"
					aria-hidden="true"
				>▶</span>
			</Button>
		</div>
		<div class="w-full sm:w-auto">
			<Button
				type="button"
				variant="outline"
				size="lg"
				class="w-full justify-center rounded-full border-slate-400/60 bg-transparent px-6 py-3 text-[0.95rem] font-medium transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:bg-slate-900/85 hover:shadow-[0_14px_30px_rgba(15,23,42,0.8)] dark:border-slate-500/50 dark:hover:bg-slate-950/90 sm:w-auto"
			>
				<span>Download the Systems Checklist</span>
			</Button>
		</div>
	</div>
</div>
