<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
</script>

<div class="hero-bg" aria-hidden="true"></div>

<main class="hero-wrapper">
	<div class="hero-container">
		<section class="hero">
		<!-- LEFT: TEXT -->
		<div class="hero-text">
			<div class="eyebrow">
				<span class="eyebrow-dot"></span>
				<span>Business Systems &amp; Automation</span>
			</div>

			<h1 class="hero-title">
				Turn Operational Complexity Into
				<span>Scalable Growth</span>
			</h1>

			<p class="hero-subtitle">
				I design and implement practical digital systems that automate your workflows,
				capture more leads, and remove manual friction — so your business runs faster
				and more profitably.
			</p>

			<div class="hero-actions">
				<Button href="#" class="btn-primary" size="lg">
					<span>Get the Automation Stack Checklist</span>
					<span class="btn-icon" aria-hidden="true">▶</span>
				</Button>
				<Button type="button" variant="outline" class="btn-ghost" size="lg">
					<span>Book a Systems Strategy Call</span>
				</Button>
			</div>
		</div>

		<!-- RIGHT: VISUAL -->
		<div class="hero-visual">
			<div class="hero-visual-inner">
				<div class="card-orb">
					<div class="orb-node"></div>
					<div class="orb-node"></div>
					<div class="orb-node"></div>
					<div class="orb-node"></div>
				</div>

				<footer class="hero-visual-footer">
					<div class="card-footer-top">
						<div>
							<div class="card-label">Capabilities</div>
							<div class="card-stat">Automation · Workflows · Lead Capture</div>
						</div>
						<div>
							<div class="card-label">Impact</div>
							<div class="card-stat">Revenue · Efficiency</div>
						</div>
					</div>
					<div class="card-progress">
						<div class="card-progress-fill"></div>
					</div>
				</footer>
			</div>
		</div>
		</section>
	</div>
</main>

<style>
	:global(:root) {
		--hero-bg-1: #050816;
		--hero-bg-2: #0f172a;
		--hero-accent-1: #38bdf8;
		--hero-accent-2: #a855f7;
		--hero-accent-3: #f97316;
		--hero-glass-bg: rgba(15, 23, 42, 0.8);
		--hero-glass-border: rgba(148, 163, 184, 0.4);
		--hero-text-main: #e5e7eb;
		--hero-text-muted: #9ca3af;
		--hero-radius-xl: 1.75rem;
		--hero-shadow-soft: 0 25px 60px rgba(15, 23, 42, 0.7);
		--hero-transition-fast: 180ms ease-out;
		--hero-transition-med: 260ms ease-out;
	}

	.hero-wrapper {
		position: relative;
		width: 100%;
		padding: 2.5rem 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hero-container {
		width: 100%;
		max-width: 80rem; /* 7xl */
		margin: 0 auto;
	}

	.hero-bg {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: -1;
		overflow: hidden;
		background: radial-gradient(
			circle at top left,
			#0b1120 0,
			#020617 40%,
			#000 100%
		);
	}

	.hero-bg::before,
	.hero-bg::after {
		content: "";
		position: absolute;
		width: 420px;
		height: 420px;
		border-radius: 999px;
		filter: blur(80px);
		opacity: 0.7;
		mix-blend-mode: screen;
		animation: floatBlob 18s infinite alternate;
	}

	.hero-bg::before {
		background: radial-gradient(circle, var(--hero-accent-1), transparent 60%);
		top: -80px;
		left: -120px;
	}

	.hero-bg::after {
		background: radial-gradient(circle, var(--hero-accent-2), transparent 60%);
		bottom: -120px;
		right: -120px;
		animation-delay: -4s;
	}

	@keyframes floatBlob {
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

	.hero {
		position: relative;
		width: 100%;
		display: grid;
		grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
		gap: 2.5rem;
		padding: 2.5rem 0;
	}

	.hero-text {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		z-index: 1;
		color: var(--hero-text-main);
	}

	.eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 0.8rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--hero-accent-1);
	}

	.eyebrow-dot {
		width: 9px;
		height: 9px;
		border-radius: 999px;
		background: radial-gradient(circle, var(--hero-accent-1), transparent 70%);
		box-shadow: 0 0 16px rgba(56, 189, 248, 0.9);
	}

	.hero-title {
		font-size: clamp(2.4rem, 3.3vw + 1rem, 3.8rem);
		line-height: 1.05;
		letter-spacing: -0.04em;
		font-weight: 700;
		color: var(--hero-text-main);
	}

	.hero-title span {
		background: linear-gradient(
			120deg,
			var(--hero-accent-1),
			var(--hero-accent-2),
			var(--hero-accent-3)
		);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		text-shadow: 0 0 30px rgba(15, 23, 42, 0.85);
	}

	.hero-subtitle {
		font-size: 0.98rem;
		color: var(--hero-text-muted);
		max-width: 34rem;
		line-height: 1.7;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.9rem;
		margin-top: 0.75rem;
	}

	:global(.btn-primary),
	:global(.btn-ghost) {
		position: relative;
		padding: 0.8rem 1.6rem;
		font-size: 0.95rem;
		border-radius: 999px;
		border: none;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		text-decoration: none;
		white-space: nowrap;
		transition: transform var(--hero-transition-fast),
			box-shadow var(--hero-transition-fast), background var(--hero-transition-fast),
			color var(--hero-transition-fast);
	}

	:global(.btn-primary) {
		background: radial-gradient(
			circle at top left,
			var(--hero-accent-1),
			var(--hero-accent-2)
		);
		color: #0b1120;
		font-weight: 600;
		box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.9),
			0 18px 40px rgba(56, 189, 248, 0.35);
	}

	:global(.btn-primary) :global(*) {
		color: inherit;
	}

	:global(.btn-primary)::after {
		content: "";
		position: absolute;
		inset: 1px;
		border-radius: inherit;
		border: 1px solid rgba(248, 250, 252, 0.32);
		opacity: 0.9;
		pointer-events: none;
	}

	:global(.btn-primary):hover {
		transform: translateY(-1px) scale(1.02);
		box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.9),
			0 20px 48px rgba(56, 189, 248, 0.45);
	}

	:global(.btn-primary):active {
		transform: translateY(0) scale(0.99);
		box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.9),
			0 12px 26px rgba(56, 189, 248, 0.28);
	}

	:global(.btn-ghost) {
		background-color: transparent;
		border: 1px solid rgba(148, 163, 184, 0.6);
		color: var(--hero-text-main);
		font-weight: 500;
	}

	:global(.btn-ghost):hover {
		background-color: rgba(15, 23, 42, 0.85);
		transform: translateY(-1px);
		box-shadow: 0 14px 30px rgba(15, 23, 42, 0.8);
	}

	.btn-icon {
		display: inline-flex;
		width: 18px;
		height: 18px;
		border-radius: 999px;
		border: 1px solid rgba(15, 23, 42, 0.9);
		background: #020617;
		align-items: center;
		justify-content: center;
		font-size: 0.75rem;
	}

	.hero-visual {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hero-visual-inner {
		position: relative;
		width: 100%;
		max-width: 360px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		padding: 1.4rem 0;
	}

	.card-orb {
		position: relative;
		width: 72%;
		aspect-ratio: 1 / 1;
		border-radius: 999px;
		margin: 0.8rem auto 1.1rem;
		background: radial-gradient(
				circle at 30% 10%,
				rgba(248, 250, 252, 0.9),
				transparent 50%
			),
			radial-gradient(circle at 10% 80%, rgba(56, 189, 248, 0.8), transparent 60%),
			radial-gradient(
				circle at 90% 20%,
				rgba(168, 85, 247, 0.85),
				transparent 60%
			),
			radial-gradient(circle at 50% 120%, rgba(15, 23, 42, 1), #020617 60%);
		overflow: visible;
		border: 1px solid rgba(248, 250, 252, 0.08);
		box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.9), 0 40px 80px rgba(15, 23, 42, 0.9);
		animation: slowSpin 26s linear infinite;
	}

	.card-orb::before,
	.card-orb::after {
		content: "";
		position: absolute;
		inset: 6%;
		border-radius: inherit;
		border: 1px dashed rgba(148, 163, 184, 0.35);
		box-shadow: inset 0 0 60px rgba(15, 23, 42, 0.85);
	}

	.card-orb::after {
		inset: 18%;
		border-style: solid;
		opacity: 0.7;
	}

	@keyframes slowSpin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.orb-node {
		position: absolute;
		width: 12px;
		height: 12px;
		border-radius: 999px;
		background: radial-gradient(circle, #f9fafb, rgba(248, 250, 252, 0));
		box-shadow: 0 0 18px rgba(248, 250, 252, 0.9),
			0 0 40px rgba(56, 189, 248, 0.9);
		animation: floatNode 7s ease-in-out infinite alternate;
	}

	.orb-node:nth-child(1) {
		top: 16%;
		left: 12%;
		animation-delay: -1.5s;
	}
	.orb-node:nth-child(2) {
		top: 24%;
		right: 8%;
		animation-delay: -3.2s;
	}
	.orb-node:nth-child(3) {
		bottom: 10%;
		left: 20%;
		animation-delay: -4.7s;
	}
	.orb-node:nth-child(4) {
		bottom: 18%;
		right: 18%;
		animation-delay: -2.3s;
	}

	@keyframes floatNode {
		0% {
			transform: translate3d(0, 0, 0);
			opacity: 0.9;
		}
		100% {
			transform: translate3d(6px, -10px, 0);
			opacity: 0.6;
		}
	}

	.hero-visual-footer {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		font-size: 0.8rem;
		color: var(--hero-text-muted);
	}

	.card-footer-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.card-label {
		text-transform: uppercase;
		letter-spacing: 0.14em;
		font-size: 0.7rem;
		color: rgba(148, 163, 184, 0.9);
	}

	.card-stat {
		font-size: 0.9rem;
		color: #e5e7eb;
		font-weight: 500;
	}

	.card-progress {
		position: relative;
		width: 100%;
		height: 4px;
		border-radius: 999px;
		background: rgba(15, 23, 42, 0.9);
		overflow: hidden;
		margin-top: 0.4rem;
	}

	.card-progress-fill {
		position: absolute;
		inset: 0;
		width: 70%;
		background: linear-gradient(
			90deg,
			var(--hero-accent-1),
			var(--hero-accent-2),
			var(--hero-accent-3)
		);
		border-radius: inherit;
		box-shadow: 0 0 16px rgba(56, 189, 248, 0.6);
		transform-origin: left center;
		animation: pulseWidth 3.4s ease-in-out infinite alternate;
	}

	@keyframes pulseWidth {
		0% {
			transform: scaleX(0.82);
		}
		100% {
			transform: scaleX(1);
		}
	}

	@media (max-width: 900px) {
		.hero {
			grid-template-columns: minmax(0, 1fr);
			padding: 1.9rem 0;
		}

		.hero-visual {
			order: -1;
		}

		.hero-visual-inner {
			margin-inline: auto;
		}
	}

	@media (max-width: 640px) {
		.hero-wrapper {
			padding: 1.4rem 1rem;
		}

		.hero {
			padding: 1.6rem 0;
		}

		.hero-actions {
			flex-direction: column;
			align-items: stretch;
		}

		:global(.btn-primary),
		:global(.btn-ghost) {
			width: 100%;
			justify-content: center;
		}
	}
</style>
