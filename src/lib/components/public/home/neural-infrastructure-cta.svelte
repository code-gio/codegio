<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let containerEl: HTMLDivElement | undefined;
  let canvasEl: HTMLCanvasElement | undefined;
  let ctx: CanvasRenderingContext2D | null = null;
  let rafId: number | undefined;
  let resizeObserver: ResizeObserver | undefined;

  function hexA(hex: string, a: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${a})`;
  }

  function easeOutBack(x: number): number {
    const c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  }

  const ITEMS = [
    { label: 'Web',        color: '#22d3ee' },
    { label: 'SEO',        color: '#38bdf8' },
    { label: 'CRM',        color: '#818cf8' },
    { label: 'Automation', color: '#a78bfa' },
    { label: 'Analytics',  color: '#c084fc' },
    { label: 'Reporting',  color: '#f472b6' },
    { label: 'Revenue',    color: '#fb923c' },
  ];

  const STATES = { IDLE: 0, ENTERING: 1, CHECKING: 2, DONE: 3 } as const;
  type State = typeof STATES[keyof typeof STATES];

  const ENTER_DUR  = 38;
  const CHECK_DUR  = 50;
  const HOLD_DUR   = 60;
  const LOOP_PAUSE = 120;

  interface BurstParticle {
    x: number; y: number;
    vx: number; vy: number;
    alpha: number; r: number; color: string;
  }

  interface Cell {
    x: number; y: number;
    item: typeof ITEMS[number];
    state: State;
    progress: number;
    checkProgress: number;
    burstParticles: BurstParticle[];
    glowAlpha: number;
    cardW: number;
  }

  interface Connection {
    from: number; to: number;
    progress: number; alpha: number;
  }

  let cells: Cell[] = [];
  let connections: Connection[] = [];
  let currentIdx = 0;
  let loopTimer = 0;
  let t = 0;
  let layoutW = 800;

  const BREAKPOINT_SM = 480;
  const BREAKPOINT_MD = 768;

  function buildLayout(W: number, H: number) {
    const cols = W < BREAKPOINT_SM ? 1 : W < BREAKPOINT_MD ? 2 : 3;
    const rows = Math.ceil(ITEMS.length / cols);
    const isMobile = W < BREAKPOINT_MD;
    const padding = isMobile ? Math.min(W * 0.08, 24) : 0;
    const availableW = W - padding * 2;
    const availableH = H - (isMobile ? 80 : 60);
    const cellW = Math.min(availableW / (cols + (cols > 1 ? 0.3 : 0)), isMobile ? 180 : 220);
    const cellH = Math.min(availableH / (rows + 0.8), isMobile ? 72 : 110);
    const totalW = cols * cellW;
    const totalH = rows * cellH;
    const startX = (W - totalW) / 2 + cellW / 2;
    const startY = (H - totalH) / 2 + cellH / 2 + (isMobile ? 20 : 0);

    const gap = isMobile ? 20 : 24;
    const baseCardW = Math.min(cellW - gap, isMobile ? 160 : 140);

    cells = ITEMS.map((item, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const isLastRow = row === rows - 1;
      const itemsInLastRow = ITEMS.length - (rows - 1) * cols;
      const isAloneInRow = isLastRow && itemsInLastRow === 1;
      const existing = cells[i];
      return {
        x: isAloneInRow ? W / 2 : startX + col * cellW,
        y: startY + row * cellH,
        item,
        cardW: isAloneInRow ? Math.min(W * 0.85, totalW - 24) : baseCardW,
        state:         existing?.state         ?? STATES.IDLE,
        progress:      existing?.progress      ?? 0,
        checkProgress: existing?.checkProgress ?? 0,
        burstParticles: existing?.burstParticles ?? [],
        glowAlpha:     existing?.glowAlpha     ?? 0,
      };
    });
    layoutW = W;
  }

  function resetLoop() {
    currentIdx = 0;
    loopTimer  = 0;
    connections = [];
    cells.forEach(c => {
      c.state = STATES.IDLE;
      c.progress = 0;
      c.checkProgress = 0;
      c.burstParticles = [];
      c.glowAlpha = 0;
      // cardW is preserved (set by buildLayout)
    });
  }

  function spawnBurst(cell: Cell) {
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2;
      const speed = 1.2 + Math.random() * 2.0;
      cell.burstParticles.push({
        x: cell.x, y: cell.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 0.9, r: 1.5 + Math.random() * 2,
        color: cell.item.color,
      });
    }
  }

  function tryAddConnection(idx: number) {
    const maxDist = layoutW < BREAKPOINT_MD ? 160 : 260;
    for (let k = 0; k < idx; k++) {
      const dx = cells[idx].x - cells[k].x;
      const dy = cells[idx].y - cells[k].y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < maxDist && Math.random() < 0.55) {
        connections.push({ from: k, to: idx, progress: 0, alpha: 0 });
      }
    }
  }

  function drawRoundRect(
    c: CanvasRenderingContext2D,
    x: number, y: number, w: number, h: number, r: number
  ) {
    c.beginPath();
    c.moveTo(x + r, y);
    c.lineTo(x + w - r, y);
    c.quadraticCurveTo(x + w, y, x + w, y + r);
    c.lineTo(x + w, y + h - r);
    c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    c.lineTo(x + r, y + h);
    c.quadraticCurveTo(x, y + h, x, y + h - r);
    c.lineTo(x, y + r);
    c.quadraticCurveTo(x, y, x + r, y);
    c.closePath();
  }

  function drawCheckmark(
    c: CanvasRenderingContext2D,
    x: number, y: number, size: number, progress: number, color: string
  ) {
    if (progress <= 0) return;
    const p1x = x - size * 0.35, p1y = y;
    const midx = x - size * 0.08, midy = y + size * 0.32;
    const p2x  = x + size * 0.42, p2y  = y - size * 0.38;
    const seg1End = 0.45;

    c.beginPath();
    c.strokeStyle = color;
    c.lineWidth   = 2.2;
    c.lineCap     = 'round';
    c.lineJoin    = 'round';

    if (progress <= seg1End) {
      const tt = progress / seg1End;
      c.moveTo(p1x, p1y);
      c.lineTo(p1x + (midx - p1x) * tt, p1y + (midy - p1y) * tt);
    } else {
      c.moveTo(p1x, p1y);
      c.lineTo(midx, midy);
      const tt = (progress - seg1End) / (1 - seg1End);
      c.lineTo(midx + (p2x - midx) * tt, midy + (p2y - midy) * tt);
    }
    c.stroke();
  }

  function resize() {
    if (!containerEl || !canvasEl) return;
    const rect = containerEl.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    if (canvasEl.width !== w || canvasEl.height !== h) {
      canvasEl.width  = w;
      canvasEl.height = h;
      buildLayout(w, h);
    }
  }

  function frame() {
    if (!ctx || !canvasEl) return;
    const c = ctx;
    const W = canvasEl.width, H = canvasEl.height;
    if (W <= 0 || H <= 0) { rafId = requestAnimationFrame(frame); return; }

    const isCompact = layoutW < BREAKPOINT_MD;
    const cardH = isCompact ? 44 : 52;
    const fontSz = isCompact ? 11 : 13;
    const cbr = isCompact ? 8 : 10;
    const glowR = isCompact ? 48 : 80;
    const cardPad = isCompact ? 20 : 26;
    const barInset = isCompact ? 38 : 46;

    c.clearRect(0, 0, W, H);

    // ── sequencer ──
    if (currentIdx < cells.length) {
      const cell = cells[currentIdx];
      if (cell.state === STATES.IDLE) {
        cell.state    = STATES.ENTERING;
        cell.progress = 0;
      } else if (cell.state === STATES.ENTERING) {
        cell.progress += 1 / ENTER_DUR;
        if (cell.progress >= 1) {
          cell.progress = 1;
          cell.state    = STATES.CHECKING;
          cell.checkProgress = 0;
        }
      } else if (cell.state === STATES.CHECKING) {
        cell.checkProgress += 1 / CHECK_DUR;
        if (cell.checkProgress >= 1) {
          cell.checkProgress = 1;
          cell.state = STATES.DONE;
          spawnBurst(cell);
          tryAddConnection(currentIdx);
          currentIdx++;
        }
      }
    } else {
      loopTimer++;
      if (loopTimer > HOLD_DUR + LOOP_PAUSE) resetLoop();
    }

    // ── connections ──
    connections.forEach(conn => {
      conn.progress = Math.min(1, conn.progress + 0.025);
      conn.alpha    = conn.progress < 0.5 ? conn.progress * 2 : 1;
      const a = cells[conn.from], b = cells[conn.to];
      if (!a || !b) return;

      const grad = c.createLinearGradient(a.x, a.y, b.x, b.y);
      grad.addColorStop(0, hexA(a.item.color, conn.alpha * 0.22));
      grad.addColorStop(1, hexA(b.item.color, conn.alpha * 0.22));
      const ex = a.x + (b.x - a.x) * conn.progress;
      const ey = a.y + (b.y - a.y) * conn.progress;

      c.beginPath();
      c.moveTo(a.x, a.y);
      c.lineTo(ex, ey);
      c.strokeStyle = grad;
      c.lineWidth = 1;
      c.setLineDash([4, 6]);
      c.stroke();
      c.setLineDash([]);

      c.beginPath();
      c.arc(ex, ey, 2, 0, Math.PI * 2);
      c.fillStyle    = hexA(b.item.color, conn.alpha * 0.8);
      c.shadowColor  = b.item.color;
      c.shadowBlur   = 8;
      c.fill();
      c.shadowBlur   = 0;
    });

    // ── cells ──
    cells.forEach((cell, idx) => {
      if (cell.state === STATES.IDLE) return;

      const eased = easeOutBack(Math.min(cell.progress, 1));
      const cardW = cell.cardW;
      const x     = cell.x - cardW / 2;
      const bounce = isCompact ? 14 : 22;
      const y     = cell.y - cardH / 2 + (1 - eased) * bounce;
      const alpha = eased;

      // ambient glow on done nodes
      if (cell.state === STATES.DONE) {
        cell.glowAlpha = 0.06 + 0.04 * Math.sin(t * 0.04 + idx * 1.1);
        const glowGrad = c.createRadialGradient(cell.x, cell.y, 0, cell.x, cell.y, glowR);
        glowGrad.addColorStop(0, hexA(cell.item.color, cell.glowAlpha));
        glowGrad.addColorStop(1, hexA(cell.item.color, 0));
        c.beginPath();
        c.arc(cell.x, cell.y, glowR, 0, Math.PI * 2);
        c.fillStyle = glowGrad;
        c.fill();
      }

      c.save();
      c.globalAlpha = alpha;

      // card fill
      drawRoundRect(c, x, y, cardW, cardH, 10);
      c.fillStyle = hexA(cell.item.color, 0.06);
      c.fill();

      // card border
      drawRoundRect(c, x, y, cardW, cardH, 10);
      const border = c.createLinearGradient(x, y, x + cardW, y + cardH);
      border.addColorStop(0, hexA(cell.item.color, 0.5));
      border.addColorStop(1, hexA(cell.item.color, 0.12));
      c.strokeStyle = border;
      c.lineWidth   = 1.2;
      c.stroke();

      // top highlight
      c.beginPath();
      c.moveTo(x + 12, y);
      c.lineTo(x + cardW - 12, y);
      c.strokeStyle = hexA(cell.item.color, 0.25);
      c.lineWidth   = 1;
      c.stroke();

      // checkbox
      const cbx = x + cardPad, cby = y + cardH / 2;
      c.beginPath();
      c.arc(cbx, cby, cbr, 0, Math.PI * 2);
      if (cell.state === STATES.DONE) {
        const cbGrad = c.createRadialGradient(cbx - 2, cby - 2, 0, cbx, cby, cbr);
        cbGrad.addColorStop(0,   hexA('#ffffff', 0.9));
        cbGrad.addColorStop(0.4, hexA(cell.item.color, 1));
        cbGrad.addColorStop(1,   hexA(cell.item.color, 0.7));
        c.fillStyle   = cbGrad;
        c.shadowColor = cell.item.color;
        c.shadowBlur  = 12;
        c.fill();
        c.shadowBlur  = 0;
      } else {
        c.strokeStyle = hexA(cell.item.color, 0.5);
        c.lineWidth   = 1.5;
        c.stroke();
      }

      if (cell.checkProgress > 0) {
        drawCheckmark(c, cbx, cby, cbr, cell.checkProgress, '#ffffff');
      }

      // label
      c.font         = `500 ${fontSz}px "DM Mono", monospace`;
      c.fillStyle    = hexA('#ffffff', 0.85);
      c.textAlign    = 'left';
      c.textBaseline = 'middle';
      c.fillText(cell.item.label, x + barInset, y + cardH / 2 + 0.5);

      // progress bar (CHECKING or DONE only; IDLE/ENTERING skipped above)
      if (cell.state !== STATES.ENTERING) {
        const barX = x + barInset, barY = y + cardH - (isCompact ? 10 : 12);
        const barW2 = cardW - (cardPad + barInset);
        c.beginPath();
        c.roundRect(barX, barY, barW2, 2, 1);
        c.fillStyle = hexA(cell.item.color, 0.12);
        c.fill();
        const fill = cell.state === STATES.DONE ? 1 : cell.checkProgress;
        c.beginPath();
        c.roundRect(barX, barY, barW2 * fill, 2, 1);
        c.fillStyle   = hexA(cell.item.color, 0.6);
        c.shadowColor = cell.item.color;
        c.shadowBlur  = 4;
        c.fill();
        c.shadowBlur  = 0;
      }

      c.restore();

      // burst particles
      cell.burstParticles = cell.burstParticles.filter(p => p.alpha > 0.02);
      cell.burstParticles.forEach(p => {
        p.x  += p.vx; p.y  += p.vy;
        p.vx *= 0.93;  p.vy *= 0.93;
        p.alpha *= 0.91;
        c.beginPath();
        c.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        c.fillStyle   = hexA(p.color, p.alpha);
        c.shadowColor = p.color;
        c.shadowBlur  = 6;
        c.fill();
        c.shadowBlur  = 0;
      });
    });

    // ── top counter + progress bar ──
    const doneCount = cells.filter(c2 => c2.state === STATES.DONE).length;
    if (doneCount > 0 || currentIdx > 0) {
      const cx   = W / 2;
      const topOffset = isCompact ? 42 : 54;
      const topY = cells.reduce((mn, cell) => Math.min(mn, cell.y), Infinity) - topOffset;

      c.font         = `600 ${isCompact ? 10 : 11}px "DM Mono", monospace`;
      c.textAlign    = 'center';
      c.textBaseline = 'middle';
      c.fillStyle    = hexA('#ffffff', 0.25);
      c.fillText(`${doneCount} / ${ITEMS.length} COMPLETE`, cx, topY);

      const barW = isCompact ? Math.min(W * 0.7, 140) : 180;
      const barH = 2;
      const bx = cx - barW / 2, by = topY + (isCompact ? 10 : 12);

      c.beginPath();
      c.roundRect(bx, by, barW, barH, 1);
      c.fillStyle = hexA('#ffffff', 0.08);
      c.fill();

      if (doneCount > 0) {
        const fill        = doneCount / ITEMS.length;
        const activeColor = cells.filter(c2 => c2.state === STATES.DONE).slice(-1)[0]?.item.color ?? '#22d3ee';
        const barGrad     = c.createLinearGradient(bx, 0, bx + barW, 0);
        barGrad.addColorStop(0,   hexA('#22d3ee', 0.7));
        barGrad.addColorStop(0.5, hexA('#818cf8', 0.7));
        barGrad.addColorStop(1,   hexA(activeColor, 0.7));
        c.beginPath();
        c.roundRect(bx, by, barW * fill, barH, 1);
        c.fillStyle   = barGrad;
        c.shadowColor = activeColor;
        c.shadowBlur  = 6;
        c.fill();
        c.shadowBlur  = 0;
      }
    }

    t++;
    rafId = requestAnimationFrame(frame);
  }

  onMount(() => {
    if (!containerEl || !canvasEl) return;
    ctx = canvasEl.getContext('2d');
    resize();
    resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(containerEl);
    rafId = requestAnimationFrame(frame);
  });

  onDestroy(() => {
    if (rafId) cancelAnimationFrame(rafId);
    resizeObserver?.disconnect();
  });
</script>

<div class="checklist-animation" bind:this={containerEl}>
  <canvas bind:this={canvasEl}></canvas>
</div>

<style>
  .checklist-animation {
    position: relative;
    width: 100%;
    min-height: 320px;
    aspect-ratio: 4 / 3;
    border-radius: var(--radius-lg, 0.5rem);
    overflow: hidden;
  }
  .checklist-animation canvas {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  @media (max-width: 768px) {
    .checklist-animation {
      min-height: 420px;
      aspect-ratio: 3 / 4;
    }
  }
  @media (max-width: 480px) {
    .checklist-animation {
      min-height: 520px;
      aspect-ratio: 9 / 16;
    }
  }
</style>