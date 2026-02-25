<script lang="ts">
	import HeroText from "./hero/hero-text.svelte";
	import HeroVisual from "./hero/hero-visual.svelte";
	import TrustedLogos from "./hero/trusted-logos.svelte";
</script>

<!-- Background: dark gradient with blobs in dark mode, subtle light gradient in light mode -->
<div
	class="hero-bg"
	aria-hidden="true"
>
	<span class="hero-blob hero-blob-1"></span>
	<span class="hero-blob hero-blob-2"></span>
</div>

<div class="hero-wrapper">
	<section class="hero">
		<HeroText />
		<HeroVisual />
	</section>
		<TrustedLogos />
</div>

<style>
	.hero-bg {
		position: fixed;
		inset: 0;
		z-index: -10;
		overflow: hidden;
		pointer-events: none;
		background: linear-gradient(to bottom right, #f8fafc, #ffffff, #f1f5f9);
	}

	:global(.dark) .hero-bg {
		background: radial-gradient(ellipse at top left, #0b1120 0%, #020617 40%, #000 100%);
	}

	.hero-blob {
		position: absolute;
		width: 420px;
		height: 420px;
		border-radius: 9999px;
		filter: blur(80px);
		opacity: 0.6;
		mix-blend-mode: multiply;
		animation: heroBlobFloat 18s ease-in-out infinite alternate;
	}

	:global(.dark) .hero-blob {
		opacity: 0.7;
		mix-blend-mode: screen;
	}

	.hero-blob-1 {
		top: -80px;
		left: -120px;
		background: radial-gradient(circle, var(--color-hero-accent-1), transparent 60%);
	}

	.hero-blob-2 {
		bottom: -120px;
		right: -120px;
		background: radial-gradient(circle, var(--color-hero-accent-2), transparent 60%);
		animation-delay: -4s;
	}

	.hero-wrapper {
		width: 100%;
		max-width: 80rem;
		margin-inline: auto;
		padding: 3.5rem 1.5rem;
	}

	.hero {
		position: relative;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		padding: 2.5rem 0;
		align-items: center;
	}

	/* Tablet: 2 columns with balanced ratio */
	@media (min-width: 641px) and (max-width: 899px) {
		.hero-wrapper {
			padding: 4rem 1.5rem;
		}

		.hero {
			grid-template-columns: 1fr 1fr;
			gap: 2rem;
			padding: 2rem 0;
			align-items: center;
		}
	}

	/* Desktop */
	@media (min-width: 900px) {
		.hero {
			grid-template-columns: 1.2fr 1fr;
		}
	}

	/* Mobile */
	@media (max-width: 640px) {
		.hero-wrapper {
			padding: 3.5rem 1rem;
		}

		.hero {
			gap: 2rem;
			padding: 1.5rem 0;
		}
	}

	@keyframes heroBlobFloat {
		0% {
			transform: translate3d(0, 0, 0) scale(1);
		}
		50% {
			transform: translate3d(40px, -40px, 0) scale(1.1);
		}
		100% {
			transform: translate3d(-30px, 30px, 0) scale(1.05);
		}
	}
</style>
