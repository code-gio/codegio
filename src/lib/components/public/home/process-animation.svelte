<script lang="ts">
	// Process animation: 4 cards in a 2×2 CSS grid
	// Each card has its own normalised SVG viewBox="0 0 166 158"
</script>

<div class="process-animation">
	<div class="grid">

		<!-- Card 1: DIAGNOSE -->
		<div class="cell" style="--ci:0.2s; --ff:5s; --fd:0s;">
			<svg viewBox="0 0 166 158" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<defs>
					<linearGradient id="cb1" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stop-color="#22d3ee" stop-opacity="0.45" />
						<stop offset="100%" stop-color="#22d3ee" stop-opacity="0.10" />
					</linearGradient>
					<filter id="f1"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
					<clipPath id="cc1"><rect x="0" y="0" width="166" height="158" rx="10"/></clipPath>
				</defs>
				<!-- border -->
				<rect x="0" y="0" width="166" height="158" rx="10" fill="rgba(34,211,238,0.04)" stroke="url(#cb1)" stroke-width="1.3"/>
				<!-- corner brackets -->
				<path d="M 20 36 L 20 16 L 40 16"  fill="none" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M 126 16 L 146 16 L 146 36" fill="none" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M 20 122 L 20 142 L 40 142" fill="none" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M 126 142 L 146 142 L 146 122" fill="none" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<!-- content lines (clipped) -->
				<g clip-path="url(#cc1)">
					<rect x="28" y="39" width="88"  height="8" rx="2" fill="#22d3ee" opacity="0.08"/>
					<rect x="28" y="53" width="66"  height="8" rx="2" fill="#22d3ee" opacity="0.08"/>
					<rect x="28" y="67" width="100" height="8" rx="2" fill="#22d3ee" opacity="0.08"/>
					<rect x="28" y="81" width="56"  height="8" rx="2" fill="#22d3ee" opacity="0.08"/>
					<rect x="28" y="95" width="80"  height="8" rx="2" fill="#22d3ee" opacity="0.08"/>
					<rect x="28" y="109" width="72" height="8" rx="2" fill="#22d3ee" opacity="0.08"/>
					<!-- highlighted row -->
					<rect x="28" y="67" width="100" height="8" rx="2" fill="#22d3ee" opacity="0.22"/>
					<circle cx="138" cy="71" r="4.5" fill="#22d3ee" filter="url(#f1)" opacity="0.95"/>
					<!-- scan line -->
					<rect class="scan" x="16" y="16" width="134" height="2.5" rx="1" fill="#22d3ee" opacity="0.55"/>
				</g>
			</svg>
			<span class="label" style="--lc:#22d3ee">Diagnose</span>
		</div>

		<!-- Card 2: ARCHITECT -->
		<div class="cell" style="--ci:0.35s; --ff:6.5s; --fd:-1.5s;">
			<svg viewBox="0 0 166 158" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<defs>
					<linearGradient id="g2" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" stop-color="#818cf8"/>
						<stop offset="100%" stop-color="#a78bfa"/>
					</linearGradient>
					<linearGradient id="cb2" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stop-color="#818cf8" stop-opacity="0.45"/>
						<stop offset="100%" stop-color="#818cf8" stop-opacity="0.10"/>
					</linearGradient>
					<filter id="f2"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
				</defs>
				<rect x="0" y="0" width="166" height="158" rx="10" fill="rgba(129,140,248,0.04)" stroke="url(#cb2)" stroke-width="1.3"/>
				<!-- top-left node -->
				<circle cx="43"  cy="60" r="12" fill="none" stroke="#818cf8" stroke-width="1.3" opacity="0.75"/>
				<circle cx="43"  cy="60" r="4.5" fill="#818cf8" opacity="0.7"/>
				<!-- top-right node -->
				<circle cx="123" cy="60" r="12" fill="none" stroke="#818cf8" stroke-width="1.3" opacity="0.75"/>
				<circle cx="123" cy="60" r="4.5" fill="#818cf8" opacity="0.7"/>
				<!-- bottom-center node -->
				<circle cx="83"  cy="116" r="14" fill="none" stroke="#a78bfa" stroke-width="1.7"/>
				<circle cx="83"  cy="116" r="6"   fill="url(#g2)" filter="url(#f2)"/>
				<!-- connecting lines -->
				<line class="dline" x1="55"  y1="60"  x2="111" y2="60"  stroke="#818cf8" stroke-width="1.1" stroke-dasharray="5 3" opacity="0.4" style="--dl:0.6s;"/>
				<line class="dline" x1="35"  y1="70"  x2="73"  y2="102" stroke="#818cf8" stroke-width="1.1" opacity="0.38" style="--dl:0.8s;"/>
				<line class="dline" x1="131" y1="70"  x2="93"  y2="102" stroke="#818cf8" stroke-width="1.1" opacity="0.38" style="--dl:0.8s;"/>
			</svg>
			<span class="label" style="--lc:#818cf8">Architect</span>
		</div>

		<!-- Card 3: IMPLEMENT -->
		<div class="cell" style="--ci:0.5s; --ff:5.5s; --fd:-3s;">
			<svg viewBox="0 0 166 158" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<defs>
					<linearGradient id="cb3" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stop-color="#c084fc" stop-opacity="0.45"/>
						<stop offset="100%" stop-color="#c084fc" stop-opacity="0.10"/>
					</linearGradient>
					<filter id="f3"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
					<!-- motion path for travelling dot -->
					<path id="pp3" d="M 16 80 L 154 80"/>
				</defs>
				<rect x="0" y="0" width="166" height="158" rx="10" fill="rgba(192,132,252,0.04)" stroke="url(#cb3)" stroke-width="1.3"/>
				<!-- left box -->
				<rect x="12"  y="60" width="38" height="36" rx="6" fill="#c084fc" opacity="0.10" stroke="#c084fc" stroke-width="1.1"/>
				<!-- centre box (active) -->
				<rect x="61"  y="54" width="44" height="44" rx="6" fill="#c084fc" opacity="0.17" stroke="#e879f9" stroke-width="1.6"/>
				<!-- right box -->
				<rect x="116" y="60" width="38" height="36" rx="6" fill="#c084fc" opacity="0.10" stroke="#c084fc" stroke-width="1.1"/>
				<!-- left arrow -->
				<line x1="50" y1="78" x2="61"  y2="78" stroke="#c084fc" stroke-width="1.3" opacity="0.45"/>
				<polyline points="58,75 61,78 58,81" fill="none" stroke="#c084fc" stroke-width="1.3" opacity="0.45"/>
				<!-- right arrow -->
				<line x1="105" y1="78" x2="116" y2="78" stroke="#e879f9" stroke-width="1.6"/>
				<polyline points="113,75 116,78 113,81" fill="none" stroke="#e879f9" stroke-width="1.6"/>
				<!-- travelling dot -->
				<circle r="3" fill="#e879f9" filter="url(#f3)" opacity="0">
					<animateMotion dur="1.8s" repeatCount="indefinite"><mpath href="#pp3"/></animateMotion>
					<animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.85;1" dur="1.8s" repeatCount="indefinite"/>
				</circle>
				<text x="83" y="132" text-anchor="middle" font-family="DM Mono, monospace" font-size="7" letter-spacing="2" fill="#c084fc" opacity="0.38">CONNECTED</text>
			</svg>
			<span class="label" style="--lc:#c084fc">Implement</span>
		</div>

		<!-- Card 4: OPTIMIZE -->
		<div class="cell" style="--ci:0.65s; --ff:6s; --fd:-2s;">
			<svg viewBox="0 0 166 158" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<defs>
					<linearGradient id="g4" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" stop-color="#f472b6"/>
						<stop offset="100%" stop-color="#fb923c"/>
					</linearGradient>
					<linearGradient id="cb4" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stop-color="#f472b6" stop-opacity="0.45"/>
						<stop offset="100%" stop-color="#fb923c" stop-opacity="0.10"/>
					</linearGradient>
					<linearGradient id="tg4" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" stop-color="#f472b6"/>
						<stop offset="100%" stop-color="#fb923c"/>
					</linearGradient>
					<filter id="f4"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
				</defs>
				<rect x="0" y="0" width="166" height="158" rx="10" fill="rgba(244,114,182,0.04)" stroke="url(#cb4)" stroke-width="1.4"/>
				<!-- chart axes -->
				<line x1="16" y1="148" x2="158" y2="148" stroke="#f472b6" stroke-width="0.6" opacity="0.2"/>
				<line x1="16" y1="14"  x2="16"  y2="148" stroke="#f472b6" stroke-width="0.6" opacity="0.2"/>
				<!-- horizontal grid -->
				<line x1="16" y1="114" x2="158" y2="114" stroke="#f472b6" stroke-width="0.4" stroke-dasharray="4 4" opacity="0.1"/>
				<line x1="16" y1="80"  x2="158" y2="80"  stroke="#f472b6" stroke-width="0.4" stroke-dasharray="4 4" opacity="0.1"/>
				<line x1="16" y1="46"  x2="158" y2="46"  stroke="#f472b6" stroke-width="0.4" stroke-dasharray="4 4" opacity="0.1"/>
				<!-- area fill -->
				<path d="M 20 142 L 52 122 L 84 100 L 114 73 L 156 40 L 156 148 L 20 148 Z" fill="url(#g4)" opacity="0.07"/>
				<!-- trend line -->
				<path class="tl" d="M 20 142 L 52 122 L 84 100 L 114 73 L 156 40" stroke="url(#tg4)" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" filter="url(#f4)"/>
				<!-- tip dot -->
				<circle cx="156" cy="40" r="4.5" fill="#fb923c"/>
			</svg>
			<span class="label" style="--lc:#f472b6">Optimize</span>
		</div>

	</div>
</div>

<style>
	.process-animation {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		min-height: 200px;
		padding: 1rem;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 16px;
		width: 100%;
		max-width: 480px;
	}

	.cell {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		animation:
			cardIn 0.55s var(--ci, 0s) cubic-bezier(0.22, 1, 0.36, 1) both,
			floatY  var(--ff, 6s)       var(--fd, 0s)                   ease-in-out infinite alternate;
	}

	.cell svg {
		width: 100%;
		height: auto;
		display: block;
	}

	.label {
		font-family: 'DM Mono', monospace;
		font-size: 8px;
		letter-spacing: 2.5px;
		text-transform: uppercase;
		color: var(--lc, #fff);
		opacity: 0.45;
	}

	@keyframes cardIn {
		from { opacity: 0; transform: scale(0.86) translateY(12px); }
		to   { opacity: 1; transform: scale(1)    translateY(0);     }
	}

	@keyframes floatY {
		0%   { transform: translateY(0);    }
		100% { transform: translateY(-7px); }
	}

	/* scan line (card 1) */
	:global(.scan) {
		animation: scanMove 2.6s 1.2s ease-in-out infinite;
	}
	@keyframes scanMove {
		0%   { transform: translateY(-44px); opacity: 0;   }
		8%   {                               opacity: 0.9; }
		88%  {                               opacity: 0.7; }
		100% { transform: translateY(44px);  opacity: 0;   }
	}

	/* draw-on lines (card 2) */
	:global(.dline) {
		stroke-dasharray: 80;
		stroke-dashoffset: 80;
		animation: draw 0.6s var(--dl, 0s) ease-out forwards;
	}
	@keyframes draw {
		to { stroke-dashoffset: 0; }
	}

	/* trend line (card 4) */
	:global(.tl) {
		stroke-dasharray: 110;
		stroke-dashoffset: 110;
		animation:
			draw    1.5s 0.5s ease-out  forwards,
			tlLoop  5s   2s   ease-in-out infinite;
	}
	@keyframes tlLoop {
		0%   { stroke-dashoffset: 110; }
		55%  { stroke-dashoffset: 0;   }
		100% { stroke-dashoffset: 0;   }
	}
</style>