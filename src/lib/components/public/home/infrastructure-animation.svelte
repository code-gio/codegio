<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let containerEl: HTMLDivElement | undefined;
  let canvasEl: HTMLCanvasElement | undefined;
  let ctx: CanvasRenderingContext2D | null = null;
  let rafId: number | undefined;
  let resizeObserver: ResizeObserver | undefined;
  let t = 0;

  const C = {
    cyan: '#22d3ee',
    violet: '#818cf8',
    pink: '#f472b6',
    orange: '#fb923c',
    white: '#ffffff',
    bg: '#0d0f18'
  };

  function hex(h: string, a = 1): string {
    if (h.startsWith('rgba') || h.startsWith('rgb')) {
      const m = h.match(/[\d.]+/g);
      if (!m || m.length < 3) return h;
      return `rgba(${m[0]},${m[1]},${m[2]},${a})`;
    }
    const r = parseInt(h.slice(1, 3), 16),
      g = parseInt(h.slice(3, 5), 16),
      b = parseInt(h.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${a})`;
  }

  const nodes = [
    { type: 'gear', color: C.cyan, angle: 0, r: 200, speed: 0.0007, size: 38 },
    { type: 'cloud', color: C.pink, angle: Math.PI * 0.4, r: 210, speed: -0.0005, size: 36 },
    { type: 'server', color: C.orange, angle: Math.PI * 0.85, r: 195, speed: 0.0006, size: 34 },
    { type: 'graph', color: C.violet, angle: Math.PI * 1.25, r: 205, speed: -0.0008, size: 36 },
    { type: 'circuit', color: C.cyan, angle: Math.PI * 1.65, r: 198, speed: 0.0005, size: 32 }
  ];

  interface Particle {
    nodeIdx: number;
    progress: number;
    speed: number;
    size: number;
    alpha: number;
  }
  let particles: Particle[] = [];
  function spawnParticles() {
    nodes.forEach((n, i) => {
      particles.push({
        nodeIdx: i,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.003,
        size: 1.5 + Math.random() * 2,
        alpha: 0
      });
    });
  }

  const rings = [
    { r: 80, dash: [4, 8], color: C.violet, alpha: 0.12, rot: 0, speed: 0.0003 },
    { r: 120, dash: [2, 12], color: C.cyan, alpha: 0.08, rot: 1.2, speed: -0.0002 },
    { r: 160, dash: [6, 6], color: C.pink, alpha: 0.07, rot: 0, speed: 0.00015 }
  ];

  interface Dot {
    x: number;
    y: number;
    r: number;
    alpha: number;
    speed: number;
    phase: number;
  }
  let dots: Dot[] = [];
  function initDots(w: number, h: number) {
    dots = Array.from({ length: 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8,
      alpha: Math.random() * 0.25,
      speed: 0.0003 + Math.random() * 0.0008,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function center() {
    if (!canvasEl) return { x: 0, y: 0 };
    return { x: canvasEl.width / 2, y: canvasEl.height / 2 };
  }

  function scale() {
    if (!canvasEl) return 1;
    const W = canvasEl.width;
    const H = canvasEl.height;
    return Math.min(W, H) / 400;
  }

  function glow(c: CanvasRenderingContext2D, color: string, blur = 20) {
    c.shadowColor = color;
    c.shadowBlur = blur;
  }
  function noGlow(c: CanvasRenderingContext2D) {
    c.shadowBlur = 0;
    c.shadowColor = 'transparent';
  }

  function drawCore(c: CanvasRenderingContext2D, x: number, y: number) {
    const s = scale();
    const pulse = 0.92 + 0.08 * Math.sin(t * 0.04);
    const r = 48 * pulse * s;

    [90, 70, 55].forEach((hr, i) => {
      const a = 0.04 - i * 0.012;
      c.beginPath();
      c.arc(x, y, hr * pulse * s, 0, Math.PI * 2);
      const g = c.createRadialGradient(x, y, 0, x, y, hr * pulse * s);
      g.addColorStop(0, hex(C.violet, 0));
      g.addColorStop(0.7, hex(C.cyan, a));
      g.addColorStop(1, hex(C.cyan, 0));
      c.strokeStyle = hex(C.cyan, a * 3);
      c.lineWidth = 1;
      glow(c, C.cyan, 6);
      c.stroke();
    });

    const grad = c.createRadialGradient(x - r * 0.2, y - r * 0.3, 0, x, y, r);
    grad.addColorStop(0, hex(C.white, 0.9));
    grad.addColorStop(0.3, hex(C.cyan, 0.7));
    grad.addColorStop(0.7, hex(C.violet, 0.5));
    grad.addColorStop(1, hex(C.violet, 0));
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI * 2);
    c.fillStyle = grad;
    glow(c, C.cyan, 30);
    c.fill();
    noGlow(c);

    const spot = c.createRadialGradient(x - r * 0.18, y - r * 0.22, 0, x, y, r * 0.5);
    spot.addColorStop(0, 'rgba(255,255,255,0.55)');
    spot.addColorStop(1, 'rgba(255,255,255,0)');
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI * 2);
    c.fillStyle = spot;
    c.fill();
  }

  function drawConnection(c: CanvasRenderingContext2D, cx: number, cy: number, nx: number, ny: number, color: string) {
    const grad = c.createLinearGradient(cx, cy, nx, ny);
    grad.addColorStop(0, hex(color, 0.0));
    grad.addColorStop(0.4, hex(color, 0.25));
    grad.addColorStop(1, hex(color, 0.15));
    c.beginPath();
    c.moveTo(cx, cy);
    const mx = (cx + nx) / 2 + (ny - cy) * 0.08;
    const my = (cy + ny) / 2 - (nx - cx) * 0.08;
    c.quadraticCurveTo(mx, my, nx, ny);
    c.strokeStyle = grad;
    c.lineWidth = 1.2;
    c.setLineDash([5, 8]);
    c.stroke();
    c.setLineDash([]);
  }

  function drawParticle(c: CanvasRenderingContext2D, p: Particle) {
    const { x: cx, y: cy } = center();
    const s = scale();
    const n = nodes[p.nodeIdx];
    const nx = cx + Math.cos(n.angle) * n.r * s;
    const ny = cy + Math.sin(n.angle) * n.r * s;
    const mx = (cx + nx) / 2 + (ny - cy) * 0.08;
    const my = (cy + ny) / 2 - (nx - cx) * 0.08;
    const q = p.progress;
    const px = (1 - q) * (1 - q) * nx + 2 * (1 - q) * q * mx + q * q * cx;
    const py = (1 - q) * (1 - q) * ny + 2 * (1 - q) * q * my + q * q * cy;
    const a = Math.min(q * 5, 1) * Math.min((1 - q) * 5, 1);
    c.beginPath();
    c.arc(px, py, p.size, 0, Math.PI * 2);
    c.fillStyle = hex(n.color, a * 0.9);
    glow(c, n.color, 10);
    c.fill();
    noGlow(c);
  }

  function drawRings(c: CanvasRenderingContext2D, cx: number, cy: number) {
    const s = scale();
    rings.forEach((ring) => {
      c.save();
      c.translate(cx, cy);
      c.rotate(ring.rot);
      c.beginPath();
      c.arc(0, 0, ring.r * s, 0, Math.PI * 2);
      c.strokeStyle = hex(ring.color, ring.alpha);
      c.lineWidth = 1;
      c.setLineDash(ring.dash);
      c.stroke();
      c.setLineDash([]);
      c.restore();
      ring.rot += ring.speed;
    });
  }

  function drawDots(c: CanvasRenderingContext2D) {
    dots.forEach((d) => {
      const a = d.alpha * (0.5 + 0.5 * Math.sin(t * d.speed * 60 + d.phase));
      c.beginPath();
      c.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      c.fillStyle = `rgba(255,255,255,${a})`;
      c.fill();
    });
  }

  function drawSpinArcs(c: CanvasRenderingContext2D, cx: number, cy: number) {
    const s = scale();
    const arcs = [
      { r: 64, speed: 0.012, gap: 1.2, color: C.cyan, lw: 1.5 },
      { r: 74, speed: -0.008, gap: 1.6, color: C.violet, lw: 1 },
      { r: 84, speed: 0.006, gap: 2.0, color: C.pink, lw: 0.8 }
    ];
    arcs.forEach((a) => {
      const r = a.r * s;
      const rot = t * a.speed;
      c.save();
      c.translate(cx, cy);
      c.rotate(rot);
      c.beginPath();
      c.arc(0, 0, r, a.gap / 2, Math.PI * 2 - a.gap / 2);
      c.strokeStyle = hex(a.color, 0.45);
      c.lineWidth = a.lw;
      glow(c, a.color, 8);
      c.stroke();
      noGlow(c);
      c.beginPath();
      c.arc(Math.cos(a.gap / 2) * r, Math.sin(a.gap / 2) * r, 3, 0, Math.PI * 2);
      c.fillStyle = a.color;
      glow(c, a.color, 12);
      c.fill();
      noGlow(c);
      c.restore();
    });
  }

  function resize() {
    if (!containerEl || !canvasEl) return;
    const rect = containerEl.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    if (canvasEl.width !== w || canvasEl.height !== h) {
      canvasEl.width = w;
      canvasEl.height = h;
      initDots(w, h);
    }
  }

  function frame() {
    if (!ctx || !canvasEl) return;
    const c = ctx;
    const W = canvasEl.width;
    const H = canvasEl.height;
    if (W <= 0 || H <= 0) {
      rafId = requestAnimationFrame(frame);
      return;
    }
    c.clearRect(0, 0, W, H);
    const { x: cx, y: cy } = center();

    drawDots(c);
    drawRings(c, cx, cy);
    nodes.forEach((n) => (n.angle += n.speed));
    const s = scale();
    nodes.forEach((n) => {
      const nx = cx + Math.cos(n.angle) * n.r * s;
      const ny = cy + Math.sin(n.angle) * n.r * s;
      drawConnection(c, cx, cy, nx, ny, n.color);
    });
    particles.forEach((p) => {
      p.progress += p.speed;
      if (p.progress > 1) p.progress = 0;
      drawParticle(c, p);
    });
    drawSpinArcs(c, cx, cy);
    drawCore(c, cx, cy);
    t++;
    rafId = requestAnimationFrame(frame);
  }

  onMount(() => {
    if (!containerEl || !canvasEl) return;
    ctx = canvasEl.getContext('2d');
    resize();
    spawnParticles();
    for (let i = 0; i < 8; i++) spawnParticles();
    resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(containerEl);
    rafId = requestAnimationFrame(frame);
  });

  onDestroy(() => {
    if (rafId) cancelAnimationFrame(rafId);
    resizeObserver?.disconnect();
  });
</script>

<div class="infrastructure-animation" bind:this={containerEl}>
  <canvas bind:this={canvasEl}></canvas>
</div>

<style>
  .infrastructure-animation {
    position: relative;
    width: 100%;
    min-height: 520px;
    aspect-ratio: 4 / 3;
    border-radius: var(--radius-lg, 0.5rem);
    overflow: hidden;
  }
  .infrastructure-animation canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
