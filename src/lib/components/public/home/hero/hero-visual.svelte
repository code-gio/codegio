<script lang="ts"></script>

<div class="hero-visual">
	<div class="hero-visual-inner">
		<div class="hero-orb">
			<div class="hero-orb-ring hero-orb-ring-outer"></div>
			<div class="hero-orb-ring hero-orb-ring-inner"></div>
			<div class="hero-orb-node" style="top: 16%; left: 12%; animation-delay: -1.5s"></div>
			<div class="hero-orb-node" style="top: 24%; right: 8%; animation-delay: -3.2s"></div>
			<div class="hero-orb-node" style="bottom: 10%; left: 20%; animation-delay: -4.7s"></div>
			<div class="hero-orb-node" style="bottom: 18%; right: 18%; animation-delay: -2.3s"></div>
		</div>

		<footer class="hero-visual-footer">
			<div class="hero-visual-stats">
				<div>
					<div class="hero-visual-label">Capabilities</div>
					<div class="hero-visual-stat">Automations · Workflows</div>
				</div>
				<div>
					<div class="hero-visual-label">Impact</div>
					<div class="hero-visual-stat">Revenue · Efficiency</div>
				</div>
			</div>
			<div class="hero-progress">
				<div class="hero-progress-fill"></div>
			</div>
		</footer>
	</div>
</div>

<style>
	.hero-visual {
		display: flex;
		align-items: center;
		justify-content: center;
		order: -1;
	}

	@media (min-width: 900px) {
		.hero-visual {
			order: 0;
		}
	}

	.hero-visual-inner {
		position: relative;
		width: 100%;
		max-width: 360px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		padding: 1.5rem 0;
		margin-inline: auto;
	}

	@media (min-width: 900px) {
		.hero-visual-inner {
			margin-inline: 0;
		}
	}

	.hero-orb {
		position: relative;
		width: 72%;
		aspect-ratio: 1 / 1;
		border-radius: 9999px;
		margin: 0.5rem auto 0.75rem;
		overflow: visible;
		background: radial-gradient(
				circle at 30% 10%,
				#f8fafc 90%,
				transparent 50%
			),
			radial-gradient(circle at 10% 80%, rgba(56, 189, 248, 0.5), transparent 60%),
			radial-gradient(circle at 90% 20%, rgba(168, 85, 247, 0.5), transparent 60%),
			radial-gradient(circle at 50% 120%, #e2e8f0 0%, #cbd5e1 60%);
		border: 1px solid rgba(148, 163, 184, 0.3);
		box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.1), 0 40px 80px rgba(56, 189, 248, 0.15);
		animation: heroOrbSpin 26s linear infinite;
	}

	:global(.dark) .hero-orb {
		background: radial-gradient(
				circle at 30% 10%,
				rgba(248, 250, 252, 0.9),
				transparent 50%
			),
			radial-gradient(circle at 10% 80%, rgba(56, 189, 248, 0.8), transparent 60%),
			radial-gradient(circle at 90% 20%, rgba(168, 85, 247, 0.85), transparent 60%),
			radial-gradient(circle at 50% 120%, #0f172a 0%, #020617 60%);
		border-color: rgba(248, 250, 252, 0.08);
		box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.9), 0 40px 80px rgba(15, 23, 42, 0.9);
	}

	.hero-orb-ring {
		position: absolute;
		border-radius: inherit;
		border: 1px dashed rgba(148, 163, 184, 0.35);
	}

	.hero-orb-ring-outer {
		inset: 6%;
		box-shadow: inset 0 0 60px rgba(15, 23, 42, 0.3);
	}

	:global(.dark) .hero-orb-ring-outer {
		box-shadow: inset 0 0 60px rgba(15, 23, 42, 0.85);
	}

	.hero-orb-ring-inner {
		inset: 18%;
		border-style: solid;
		opacity: 0.7;
	}

	.hero-orb-node {
		position: absolute;
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 9999px;
		background: radial-gradient(circle, #f9fafb, transparent);
		box-shadow: 0 0 18px rgba(248, 250, 252, 0.9), 0 0 40px rgba(56, 189, 248, 0.9);
		animation: heroOrbNode 7s ease-in-out infinite alternate;
	}

	.hero-visual-footer {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
		font-size: 0.875rem;
		color: var(--color-muted-foreground);
	}

	.hero-visual-stats {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.hero-visual-label {
		text-transform: uppercase;
		letter-spacing: 0.14em;
		font-size: 0.7rem;
		color: rgba(148, 163, 184, 0.9);
	}

	.hero-visual-stat {
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--color-foreground);
	}

	.hero-progress {
		position: relative;
		width: 100%;
		height: 4px;
		border-radius: 9999px;
		background: rgba(226, 232, 240, 0.9);
		overflow: hidden;
		margin-top: 0.375rem;
	}

	:global(.dark) .hero-progress {
		background: rgba(15, 23, 42, 0.9);
	}

	.hero-progress-fill {
		position: absolute;
		inset: 0;
		width: 70%;
		background: linear-gradient(
			90deg,
			var(--color-hero-accent-1),
			var(--color-hero-accent-2),
			var(--color-hero-accent-3)
		);
		border-radius: inherit;
		box-shadow: 0 0 16px rgba(56, 189, 248, 0.6);
		transform-origin: left center;
		animation: heroProgressPulse 3.4s ease-in-out infinite alternate;
	}

	@keyframes heroOrbSpin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes heroOrbNode {
		0% {
			transform: translate3d(0, 0, 0);
			opacity: 0.9;
		}
		100% {
			transform: translate3d(6px, -10px, 0);
			opacity: 0.6;
		}
	}

	@keyframes heroProgressPulse {
		0% {
			transform: scaleX(0.82);
		}
		100% {
			transform: scaleX(1);
		}
	}
</style>
